import { ButtonHTMLAttributes } from "react";

import styles from "../../styles/button.module.css";

export const Button = ({
  title,
  icon,
  ...props
}: Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "onClick" | "disabled" | "title"
> & { icon?: any; title: string }) => {
  return (
    <button {...props} className={styles.button}>
      <span>{title}</span>
    </button>
  );
};
