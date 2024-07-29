import styles from './ModalError.module.css';
import { IModalErrorProps } from '../../interfaces/IModalErrorProps';

const ModalError = (props: IModalErrorProps) => (
  <div className={styles.modal}>
    <div className={styles.modal_content}>
      <h2 className={styles.modal_text}>Erro</h2>
      <p className={styles.modal_text}>{props.errorMessage}</p>

      <button
        onClick={props.handleModalClose}
        className={`${styles.button_create} ${styles.neumorphism} ${styles.button_modal_close}`}
      >
        Fechar
      </button>
    </div>
  </div>
);

export default ModalError;
