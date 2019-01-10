//this will give you a group of text area fields
import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
//we do this this way
//in here we just create one form and pass the props from the main component

const TextAreaFieldGroup = ({
  name,
  placeholder,
  error,
  value,
  info,
  onChange
}) => {
  return (
    <div className="form-group">
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
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextAreaFieldGroup;
