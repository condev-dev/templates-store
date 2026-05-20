"use client";
import { useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";

const EditableInput = ({ label, value, type = "text" }) => {
  const inputRef = useRef(null);
  const [disabled, setDisabled] = useState(true);

  const handleEdit = () => {
    if (disabled) {
      setDisabled(false);
      requestAnimationFrame(() => inputRef.current?.select());
    } else {
      setDisabled(true);
    }
  };

  return (
    <>
      <div className="d-flex align-items-md-center align-items-start justify-content-end w-100 mt-md-4 flex-column flex-md-row">
        <label className="w-25 w-md-100">{label}</label>
        <div className="d-flex justify-content-between align-items-center w-75 w-md-100 mt-3 mt-md-0">
          <input
            ref={inputRef}
            className="input-group-text w-100"
            disabled={disabled}
            defaultValue={value}
            type={type}
            placeholder="ثبت نشده است"
          />
          <button
            onClick={handleEdit}
            className="btn-main btn-color btn-color-sm me-3"
          >
            {!disabled ? "ذخیره" : <FiEdit size={16} />}
          </button>
        </div>
      </div>
      <hr />
    </>
  );
};

export default EditableInput;
