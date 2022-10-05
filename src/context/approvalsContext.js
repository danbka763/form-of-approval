import { createContext, useEffect, useState } from "react";
import { getRandom } from "../helpers/randomize";
import ApprovalsAPI from "../network/approvalsAPI";
import WellsAPI from "../network/wellsAPI";

const ApprovalsContext = createContext({});

const ApprovalsContextProvider = (props) => {
  const { children } = props;

  const { getWells } = WellsAPI();
  const { getApproval } = ApprovalsAPI();

  const [wells, setWells] = useState([]);

  const [forms, setForms] = useState({});

  useEffect(
    () => async () => {
      const responce = await getWells();
      // Имитируем задержку при помощи setTimeout
      setTimeout(() => setWells(responce), getRandom(100, 350));
    }, []
  );

  const cleanApproval = () => {
    setForms({});
  };

  const getApprovalForm = async (id) => {
    const responce = await getApproval(id);
    // Имитируем задержку при помощи setTimeout
    setTimeout(() => setForms(responce), getRandom(250, 500));
  };

  return (
    <ApprovalsContext.Provider
      value={{ wells, forms, getApprovalForm, cleanApproval }}
    >
      {children}
    </ApprovalsContext.Provider>
  );
};

export { ApprovalsContextProvider, ApprovalsContext };
