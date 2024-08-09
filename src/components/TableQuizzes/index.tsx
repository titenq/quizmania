import { FaCheckCircle, FaLink, FaQuestionCircle, FaTimesCircle } from 'react-icons/fa';

import styles from './TableQuizzes.module.css';
import formatDate from '../../helpers/formatDate';
import { IQuizTableProps } from '../../interfaces/IQuiz';

const TableQuizzes: React.FC<IQuizTableProps> = (props) => {
  return (
    <table className={styles.neumorphism_table}>
      <thead>
        <tr>
          <th>{props.title} - Título</th>
          <th style={{ width: '20%' }}>Data</th>
          <th style={{ width: '15%' }}>Respostas</th>
          <th style={{ width: '5%' }}>Link</th>
        </tr>
      </thead>

      <tbody>
        {props.quizzes && props.quizzes.map(quiz => (
          <tr key={quiz._id}>
            <td>{quiz.quizTitle}</td>
            <td style={{ textAlign: 'center' }}>{formatDate(quiz.createdAt)}</td>
            <td style={{ textAlign: 'center' }}>
              <div className={styles.percentage}>
                <span className={styles.icon_container}>
                  {quiz.percentages.answersLength}
                  <FaQuestionCircle size={22} />
                </span>
                <span className={styles.icon_container}>
                  {quiz.percentages.percentRight}%
                  <FaCheckCircle size={22} style={{ color: '#00c853' }} />
                </span>
                <span className={styles.icon_container}>
                  {quiz.percentages.percentWrong}%
                  <FaTimesCircle size={22} style={{ color: '#f44336' }} />
                </span>
              </div>
            </td>
            <td style={{ textAlign: 'center' }}>
              <a href={`/quiz/${quiz._id}`} target='_blank' rel='noopener noreferrer'>
                <FaLink size={18} className={styles.link_icon} />
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableQuizzes;
