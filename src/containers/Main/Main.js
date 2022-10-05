import { useState } from "react";
import { ApprovalsContextProvider } from "../../context/approvalsContext";
import ListWells from "../ListWells";
import Modal from "../Modal";

import "./Main.css";

const Main = () => {
  const [visibleModal, setVisibleModal] = useState(false);

  return (
    <ApprovalsContextProvider>
      <ListWells setVisibleModal={setVisibleModal} />
      {visibleModal && (
        <div className="modal">
          <Modal close={() => setVisibleModal(false)} />
        </div>
      )}
    </ApprovalsContextProvider>
  );
};

export default Main;
