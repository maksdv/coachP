import { ReactChild } from "react";
import { Logo } from "./Logo";
import { Button } from "./Button";
import styles from "../../styles/Header.module.css";
import { COMMON_ACCES } from "../../utils/utilities-string";
export const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <nav>
        <ul className={styles.list}>
          <li>Inicio</li>
          <li>Qué obtengo</li>
          <li><Button title={COMMON_ACCES}/></li>
        </ul>
      </nav>
    </header>
  );
};
