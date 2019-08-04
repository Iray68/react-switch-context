import React, { Fragment } from "react";

const SubmittableInput = ({
  onChange,
  value,
  onSubmit,
  clearAfterSubmit = true,
  labelBtn
}) => (
  <Fragment>
    <input onChange={({ target }) => onChange(target.value)} value={value} />
    <button
      onClick={() => {
        onSubmit(value);
        if (clearAfterSubmit) onChange("");
      }}
    >
      {labelBtn}
    </button>
  </Fragment>
);

export default SubmittableInput;
