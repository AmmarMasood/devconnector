import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
//i will not use this in login/register however to create form ever again we do this this way
//in here we just create one form and pass the props from the main component

const TextFieldGroup = ({
  name,
  placeholder,
  label,
  error,
  value,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error //using classnames package to use multiple class so that we can add red color to form when there is error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {
        //doing this will put message below field
      }
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string,
  info: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};
//if we not pass the default mapped props will be
// TextFieldGroup.propTypes.defaultProps = {
//   type: "Text"
// };
export default TextFieldGroup;
