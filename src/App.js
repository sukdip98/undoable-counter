import "./styles.css";
import { useState } from "react";
export default function App() {
  const [value, setvalue] = useState(0);
  const [history, setHistory] = useState([]);

  const perform = (op, v) => {
    switch (op) {
      case "add":
        return v + 1;
      case "substract":
        return v - 1;
      default:
        return value;
    }
  };
  const performOperation = (operation) => {
    const oldCounter = value;
    let v = perform(operation, oldCounter);
    setvalue(v);
    setHistory([{ type: operation, old: oldCounter, new: v }, ...history]);
  };
  function onUndo() {
    if (history.length !== 0) {
      const [lattest, ...previous] = history;
      setvalue(lattest.old);
      setHistory(previous);
    }
  }
  const onReset = () => {
    setvalue(0);
    setHistory([]);
  };
  return (
    <div className="App">
      <h1>Undoable Counter</h1>
      <div className="header">
        <button onClick={onUndo} disabled={history.length === 0}>
          Undo
        </button>
        <h3>{value}</h3>
        <button onClick={() => onReset()}>Reset</button>
      </div>
      <div className="action">
        <button onClick={() => performOperation("add")}>Add</button>
        <button onClick={() => performOperation("substract")}>Substract</button>
      </div>
      {history.length !== 0 && (
        <table>
          <thead>
            <tr>
              <th>Operation</th>
              <th>old</th>
              <th>new</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h, i) => {
              return [
                <tr key={i}>
                  <td>{h.type}</td>
                  <td>{h.old}</td>
                  <td>{h.new}</td>
                </tr>
              ];
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
