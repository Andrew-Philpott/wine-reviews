import React from "react";
export default (initialFieldValues, validate) => {
  const [values, setValues] = React.useState(initialFieldValues);
  const [errors, setErrors] = React.useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const fieldValue = { [name]: value };
    setValues({
      ...values,
      ...fieldValue,
    });
    validate && validate(fieldValue);
  };
  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
  };
};
