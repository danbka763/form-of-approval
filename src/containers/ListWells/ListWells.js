import { useContext, useEffect, useState } from "react";
import { ApprovalsContext } from "../../context/approvalsContext";

import "./ListWells.css";

const ListWells = (props) => {
  const { setVisibleModal } = props;

  const { wells, getApprovalForm } = useContext(ApprovalsContext);

  const [wellsList, setWellsList] = useState([]);

  useEffect(() => {
    setWellsList(wells);
  }, [wells]);

  return (
    <div className="main__list-wells">
      <div className="main__wells">
        {wellsList.map((well, i) => (
          <div
            key={i}
            className="main__well"
            style={{
              backgroundColor: i % 2 ? "#f5f5f5" : "#fff",
              border: i === wells.length - 1 && 0,
            }}
          >
            <label>
              <span>{well.id}</span> <span>/</span> <span>{well.name}</span>
            </label>
            <button
              className="main__open-modal"
              onClick={() => {
                getApprovalForm(well.id);
                setVisibleModal(true);
              }}
            >
              Открыть форму
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListWells;
