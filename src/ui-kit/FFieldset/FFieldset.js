import "./FFieldset.css";

export const FFieldset = ({ children, title }) => {
  return (
    <fieldset>
      <legend>{title}</legend>
      {children}
    </fieldset>
  );
};
