import styles from "../../styles/Header.module.css";
export const Logo = () => {
  return (
      <h1>
        <a href="#" className={styles.logo}>
        <strong>COACH</strong>
        <span>PYME</span>
        </a>
      </h1>
  );
};
