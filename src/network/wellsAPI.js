import { getWellsData } from "../data/wellsData";

const WellsAPI = () => {
  return {
    getWells: async () => {
      try {
        // имитируем запрос
        const responce = await getWellsData();

        return responce;
      } catch (error) {
        alert(error);
      }
    },
  };
};

export default WellsAPI;
