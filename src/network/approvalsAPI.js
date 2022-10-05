import { getApprovalsData, postApprovalsData } from "../data/approvalsData";

const ApprovalsAPI = () => {
  return {
    getApproval: async (id) => {
      try {
        // имитируем запрос
        const responce = await getApprovalsData(id);

        return responce;
      } catch (error) {
        alert(error);
      }
    },
    postApproval: async (data) => {
      try {
        // имитируем запрос
        const responce = await postApprovalsData(data);

        return responce;
      } catch (error) {
        alert(error);
      }
    },
  };
};

export default ApprovalsAPI;
