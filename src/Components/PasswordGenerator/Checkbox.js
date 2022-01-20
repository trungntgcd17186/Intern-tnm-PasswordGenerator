import React from "react";

function checkbox(props) {
  const { value, onChange } = props;
  return (
    <div>
      <input type="checkbox" checked={value} onChange={onChange} />
    </div>
  );
}

export default checkbox;
