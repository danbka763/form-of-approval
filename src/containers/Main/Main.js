import { useState } from "react";
import Modal from "../Modal";

import "./Main.css";

const Main = () => {
  const [visibleModal, setVisibleModal] = useState(!false);

  return visibleModal ? (
    <div className="modal">
      <Modal close={() => setVisibleModal(false)} />
    </div>
  ) : (
    <button className="main__open-modal" onClick={() => setVisibleModal(true)}>
      Открыть форму
    </button>
  );
};

export default Main;
