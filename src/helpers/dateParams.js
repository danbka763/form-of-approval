export const monthText = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export const getTextDate = (date) => {
  const dateMass = [
    date.getDate(),
    date.getMonth(),
    date.getFullYear(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];
  const day = dateMass[0] > 9 ? dateMass[0] : "0" + dateMass[0];
  const month = dateMass[1] >= 9 ? dateMass[1] + 1 : "0" + dateMass[1];
  const year = dateMass[2];
  const hours = dateMass[3] > 9 ? dateMass[3] : "0" + dateMass[3];
  const min = dateMass[4] > 9 ? dateMass[4] : "0" + dateMass[4];
  const sec = dateMass[5] > 9 ? dateMass[5] : "0" + dateMass[5];

  return `${day}.${month}.${year} ${hours}:${min}:${sec}`;
};
