export const FSvg = ({ svg, width }) => {
  return (
    <img
      src={require(`../../utils/icons/${svg}.svg`)}
      width={width}
      alt="svg"
    />
  );
};
