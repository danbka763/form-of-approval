import { useState } from "react";
import Header from "../../components/Header";
import FFieldset from "../../ui-kit/FFieldset";

import "./Modal.css";

const Modal = (props) => {
  const { close } = props;

  const [resize, setResize] = useState(false);

  const tableData = [
    {parameter: "Qж", approval: null, last: 30, diff: null},
    {parameter: "% воды", approval: null, last: 61, diff: null},
    {parameter: "Qн", approval: null, last: 24.5700, diff: null, disabled: true},
    {parameter: "Hд", approval: null, last: null, diff: null},
    {parameter: "Pлин", approval: null, last: null, diff: null},
    {parameter: "Pбуф", approval: null, last: null, diff: null},
    {parameter: "Pзатр", approval: null, last: null, diff: null},
  ]

  return (
    <form id="form" className={resize ? "form-big" : "form-small"}>
      <Header
        resize={resize}
        close={close}
        setResize={() => setResize(!resize)}
      />

      <main>
        <label>41 / Ичединское</label>
        <FFieldset title={"Причина отключения"}>
          <div className="custom-select">
            <select>
              <option selected></option>
              <option>Пункт 1</option>
              <option>Пункт 2</option>
            </select>
          </div>
        </FFieldset>

        <table>
          <tr>
            <th>Параметр</th>
            <th>На согласование</th>
            <th>08.08.2020</th>
            <th>+/-</th>
          </tr>
            {tableData.map((line, i) => (
              <tr key={i} style={{backgroundColor: i % 2 ? "#f5f5f5" : "#fff"}}>
                <td>{line.parameter}</td>
                <td><input type="number" value={line.approval} disabled={line.disabled}/></td>
                <td>{i === 2 ? line.last.toFixed(4) : line.last}</td>
                <td>{line.diff}</td>
              </tr>
            ))}
        </table>

        <FFieldset title={"Мероприятия по возврату снижений"}>
          <textarea />
        </FFieldset>
      </main>
      <footer>
        <p></p>
        {/* <p>Запрос на согласование отправлен 12.08.2020 08:54:00</p> */}
        <button>На согласование</button>
      </footer>
    </form>
  );
};

export default Modal;
