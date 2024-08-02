import { ReactNode } from 'react';

import styles from './Button.module.css';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  title: string;
  onClick?: () => void;
  icon?: ReactNode;
};

const Button = (props: ButtonProps) => {
  return (
    <button type={props.type} className={`${styles.button} ${styles.neumorphism}`} onClick={props.onClick}>
      <span>{props.title}</span>
      {props.icon && (
        <div className={styles.icon_button}>
          <span className={styles.icon}>{props.icon}</span>
        </div>
      )}
    </button>
  );
};

export default Button;
