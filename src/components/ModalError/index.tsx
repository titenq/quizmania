import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './ModalError.module.css';
import { IModalErrorProps } from '../../interfaces/IModalErrorProps';

const ModalError = (props: IModalErrorProps) => {
  const navigate = useNavigate();
  const [showModalError, setShowModalError] = useState(false);

  useEffect(() => {
    if (props.errorMessage) {
      setShowModalError(true);
    }
  }, [props.errorMessage]);

  const handleModalClose = () => {
    setShowModalError(false);
    props.setErrorMessage(null);

    if (props.shouldNavigate) {
      navigate('/');
    }
  };

  if (!showModalError) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <h2 className={styles.modal_text}>Erro</h2>
        <p className={styles.modal_text}>{props.errorMessage}</p>
        <button
          onClick={handleModalClose}
          className={`${styles.button_create} ${styles.neumorphism} ${styles.button_modal_close}`}
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ModalError;
