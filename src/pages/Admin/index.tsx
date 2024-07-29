import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaPlusCircle } from 'react-icons/fa';

import styles from './Admin.module.css';
import { AuthContext } from '../../context/AuthContext';

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const creatingQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>{user?.name} Admin</h1>

        <button className={`${styles.button_create} ${styles.neumorphism}`} onClick={creatingQuiz}>
          <span>Criar Quiz</span>
          <div className={styles.icon_button}>
            <span className={styles.icon}><FaPlusCircle size={22} /></span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Admin;
