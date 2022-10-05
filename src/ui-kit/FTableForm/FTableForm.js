export const FTableForm = ({ children, date }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Параметр</th>
          <th>На согласование</th>
          <th>{date}</th>
          <th>+/-</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};
