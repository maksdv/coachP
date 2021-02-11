import React, { InputHTMLAttributes } from "react";
import styles from "../../styles/forms.module.css";

export const FormItem = ({
  label,
  placeholder,
  children,
  value,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  placeholder?: string;
}) => {
  return (
    <div>
      <input
        {...props}
        className={styles.formField}
        placeholder={placeholder}
      />
      <label className={styles.label}>{label}</label>
    </div>
  );
};
