//this will have social links etc
//in here we just create one form and pass the props from the main component
import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const InputGroup = ({
  name,
  placeholder,
  error,
  icon,
  value,
  info,
  onChange
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <textarea
        className={classnames("form-control form-control-lg", {
          "is-invalid": error //using classnames package to use multiple class so that we can add red color to form when there is error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {
        //doing this will put message below field
      }
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default InputGroup;
