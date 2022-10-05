import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import { ApprovalsContext } from "../../context/approvalsContext";
import { getTextDate } from "../../helpers/dateParams";
import { formForTable } from "../../helpers/formForTable";
import ApprovalsAPI from "../../network/approvalsAPI";
import FFieldset from "../../ui-kit/FFieldset";
import FTableForm from "../../ui-kit/FTableForm";

import "./Modal.css";

const Modal = (props) => {
  const { close } = props;
  const { forms, cleanApproval } = useContext(ApprovalsContext);
  const { postApproval } = ApprovalsAPI();

  const [resize, setResize] = useState(false);
  const [loading, setLoading] = useState(true);
  const [idSelect, setIdSelect] = useState(null);
  const [message, setMessage] = useState("");
  const [refound, setRefound] = useState("");
  const [complete, setComplete] = useState(false);

  const tableNew = () =>
    formForTable.map((obj) => {
      return { ...obj };
    });

  const [tableData, setTableData] = useState(tableNew);

  useEffect(() => {
    if (forms.dataPrev) {
      if (forms.statusApproval) {
        const date = forms.dateCreateDataForApproval;
        setMessage(`Запрос на согласование отправлен ${getTextDate(date)}`);

        setComplete(true);
        setIdSelect(forms.reason.id);
        if (forms.refound) {
          setRefound(forms.refound);
        }
      }
      setTableData((table) =>
        table.map((line) => {
          if (forms.dataPrev[line.parameterCode]) {
            line.last = forms.dataPrev[line.parameterCode];
          }

          if (forms.dataForApproval) {
            for (const obj of forms.dataForApproval) {
              if (obj.code === line.parameterCode) {
                line.approval = obj.approval;
                line.diff = obj.diff;
                if (obj.accept !== undefined) {
                  line.accept = obj.accept;
                }
              }
            }
          }

          return line;
        })
      );

      setLoading(false);
    }
  }, [forms]);

  useEffect(() => {
    return () => {
      setTableData(tableNew);
      cleanApproval();
    };
  }, []);

  const changeInput = (data, index) => {
    const table = [...tableData];
    table[index].approval = data;
    table[index].diff = data.length
      ? Number((data - table[index].last).toFixed(4))
      : null;

    if (table[0].approval !== "" && table[1].approval !== "") {
      table[2].approval = (table[0].approval * (1 - table[1].approval / 100)).toFixed(4);
      table[2].diff = (table[2].approval - table[2].last).toFixed(4);
    } else {
      table[2].approval = "";
      table[2].diff = null;
    }
    setTableData(table);
  };

  const validation =
    idSelect !== null &&
    tableData[0].approval !== null &&
    tableData[1].approval !== null;

  const submit = async () => {
    const responce = await postApproval({
      id: forms.id,
      reason: {
        id: idSelect,
        title: forms.reasons[idSelect].title,
      },
      data: tableData
        .map((line) => {
          if (line.last === null) {
            return false;
          } else {
            return {
              code: line.parameterCode,
              approval: Number(line.approval),
              diff: Number(line.diff),
            };
          }
        })
        .filter(Boolean),
      refound: refound,
    });

    if (responce.status) {
      setComplete(true);
      const date = responce.data.dateCreateDataForApproval;
      const table = [...tableData];
      table[0].accept = responce.data.dataForApproval[0].accept;
      table[1].accept = responce.data.dataForApproval[1].accept;
      setMessage(`Запрос на согласование отправлен ${getTextDate(date)}`);
    } else {
      setMessage(
        "Ошибка выполнения запроса. Проверьте правильность введённых данных. "
      );
    }
  };

  return (
    <form id="form" className={resize ? "form-big" : "form-small"}>
      <Header
        resize={resize}
        close={close}
        setResize={() => setResize(!resize)}
      />

      <main>
        <label>
          {forms.id} {!!forms.id && "/"} {forms.name}
        </label>
        <FFieldset title={"Причина отконения"}>
          <div className="custom-select">
            <select
              disabled={loading}
              value={String(idSelect === null ? "" : idSelect)}
              onChange={(e) => {
                setMessage("");
                setIdSelect(Number(e.target.value));
              }}
              className={`${(loading || complete) && "form__disabled"}`}
            >
              {idSelect === null && <option value="" disabled />}
              {forms.reasons?.map((reason) => (
                <option key={reason.id} value={String(reason.id)}>
                  {reason.title}
                </option>
              ))}
            </select>
          </div>
        </FFieldset>

        <FTableForm date={forms.date}>
          {tableData.map((line, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 ? "#f5f5f5" : "#fff" }}>
              <td
                className={`${line.accept === true && "form__accept-parameter"}
                  ${line.accept === false && "form__reject-parameter"}`}
              >
                <p
                  title={`${
                    line.accept
                      ? "Согласовано"
                      : line.accept !== null && line.accept !== undefined
                      ? "Отклонено"
                      : ""
                  }`}
                >
                  {line.parameter}
                </p>
              </td>
              <td>
                <input
                  type="number"
                  value={line.approval}
                  onChange={(e) => changeInput(e.target.value, i)}
                  pattern="[0-9]*"
                  disabled={
                    loading ||
                    line.last === null ||
                    line.parameterCode === "Qn" ||
                    complete
                  }
                  className={`${loading && "form__disabled"}`}
                />
              </td>
              <td>{i === 2 ? line.last?.toFixed(4) : line.last}</td>
              <td>{line.diff}</td>
            </tr>
          ))}
        </FTableForm>

        <FFieldset title={"Мероприятия по возврату снижений"}>
          <textarea
            value={refound}
            onChange={(e) => {
              setRefound(e.target.value);
            }}
            disabled={loading || complete}
            className={`${loading && "form__disabled"}`}
          />
        </FFieldset>
      </main>
      <footer>
        <p>{loading ? "Загрузка данных..." : message}</p>
        <button
          disabled={loading || complete}
          className={`${loading && "form__disabled"}`}
          type="button"
          onClick={() =>
            validation
              ? submit()
              : setMessage(
                  "Заполните все обязательные поля (Причина отклонения, Qж, % воды)"
                )
          }
        >
          На согласование
        </button>
      </footer>
    </form>
  );
};

export default Modal;
