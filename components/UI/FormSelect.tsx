import React, { InputHTMLAttributes, useState } from "react";
import ReactSelect, { ActionMeta, ValueType } from "react-select";

import styles from "../../styles/forms.module.css";

type InputSelectProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  placeholder?: string;
  currentValue?: any;
  setCurrentValue: (value: ValueType<any>, actionMeta: ActionMeta) => void;
  data?: Array<any>;
};

const colourStyles = {
  control: (styles) => ({
    ...styles,
    color: "red",
  }),
};

export const FormSelect = ({
  label,
  placeholder,
  currentValue,
  setCurrentValue,
  data,
  children,
  ...props
}: InputSelectProps) => {
  const [showLabel, setShowLabel] = useState(false);
  return (
    <div>
      <ReactSelect
        instanceId={"mainSelect"}
        styles={colourStyles}
        options={data?.map((opt) => ({
          value: opt.code,
          label: opt.description,
        }))}
        placeholder={placeholder}
        value={currentValue}
        onChange={setCurrentValue}
      />
      <label className={styles.label}>{!currentValue ? label : null}</label>
    </div>
  );
};
