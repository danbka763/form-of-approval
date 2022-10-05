import { useState } from "react";
import Modal from "../Modal";

import "./Main.css";

const Main = () => {
  const [visibleModal, setVisibleModal] = useState(false);

  const wells = [
    { id: 41, name: "Ичединское" },
    { id: 44, name: "Чайво" },
    { id: 3, name: "Кольская" },
  ];

  return (
    <div className="main__list-wells">
      <div className="main__wells">
        {wells.map((well, i) => (
          <div
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
              onClick={() => setVisibleModal(true)}
            >
              Открыть форму
            </button>
          </div>
        ))}
      </div>

      {visibleModal && (
        <div className="modal">
          <Modal close={() => setVisibleModal(false)} />
        </div>
      )}
    </div>
  );
};

export default Main;
