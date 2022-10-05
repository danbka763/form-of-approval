import { getRandom } from "../helpers/randomize";

const approvalsData = {
  41: {
    id: 41,
    name: "Ичединское",
    date: "08.09.2022",
    reasons: [
      { id: 0, title: "Изменение коэффициента продуктивности" },
      { id: 1, title: "Поломка бурильных труб" },
      { id: 2, title: "Открытое фотанирование" },
    ],
    dataPrev: {
      Qz: 30,
      w: 61,
      Qn: 30 * (1 - 61 / 100),
    },
  },
  44: {
    id: 44,
    name: "Чайво",
    date: "08.09.2022",
    reasons: [
      { id: 0, title: "Изменение коэффициента продуктивности" },
      { id: 1, title: "Поломка бурильных труб" },
      { id: 2, title: "Открытое фотанирование" },
    ],
    dataPrev: {
      Qz: 24,
      w: 54,
      Qn: 24 * (1 - 54 / 100),
    },
  },
  3: {
    id: 3,
    name: "Кольская",
    date: "08.09.2022",
    reasons: [
      { id: 0, title: "Изменение коэффициента продуктивности" },
      { id: 1, title: "Поломка бурильных труб" },
      { id: 2, title: "Открытое фотанирование" },
    ],
    dataPrev: {
      Qz: 42,
      w: 76,
      Qn: 42 * (1 - 76 / 100),
    },
  },
};

export const getApprovalsData = async (id) => {
  return approvalsData[id];
};

export const postApprovalsData = async (data) => {
  let dataServer = approvalsData[data.id]

  dataServer.dataForApproval = data.data
  dataServer.reason = data.reason

  if (data.refound) {
    dataServer.refound = data.refound
  }

  dataServer.dateCreateDataForApproval = new Date()

  dataServer.statusApproval = true

  const acceptId = getRandom(0, 1)

  dataServer.dataForApproval[0].accept = !!acceptId
  dataServer.dataForApproval[1].accept = !acceptId
  
  return {status: true, data: approvalsData[data.id]}
};
