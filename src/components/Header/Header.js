import FHeaderForm from "../../ui-kit/FHeaderForm";
import FSvg from "../../ui-kit/FSvg";

import "./Header.css"

const Header = (props) => {
  const {resize, setResize, close} = props

  return (
    <FHeaderForm>
      <p>Согласование параметров работы скважин на 12 августа</p>
      <div className="form__svg-container">
        <div className="form__button" onClick={setResize}>
          <FSvg svg={resize ? "resize_small" : "resize_big"} width={16} />
        </div>
        <div className="form__button" onClick={close}>
          <FSvg svg="close" width={14} />
        </div>
      </div>
    </FHeaderForm>
  );
};

export default Header