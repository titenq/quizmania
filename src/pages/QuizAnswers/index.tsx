import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { FaCheckCircle, FaLink, FaTimesCircle } from 'react-icons/fa';

import styles from './QuizAnswers.module.css';
import getAnswers from '../../api/answer/getAnswers';
import { IAnswer, IAnswersCreateResponse } from '../../interfaces/IAnswer';
import formatDate from '../../helpers/formatDate';
import calculatePercentage from '../../helpers/calculatePercentage';

const QuizAnswers = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const location = useLocation();
  const quizTitle = location.state?.quizTitle;
  const [answers, setAnswers] = useState<IAnswersCreateResponse[]>();

  useEffect(() => {
    const fetchAnswers = async (quizId: string) => {
      const response = await getAnswers(quizId);

      setAnswers(response);
    };

    quizId && fetchAnswers(quizId);
  }, [quizId]);

  const handleAnswersResponse = (quizId: string, answers: IAnswer[]) => {
    navigate(`/quiz/${quizId}/answers/response`,
      { state: { answers } }
    );
  };
  
  return (
    <div className={styles.container}>
      {answers && (
        <table className={styles.neumorphism_table}>
          <thead>
            <tr>
              <th>Título</th>
              <th style={{ width: '20%' }}>Data</th>
              <th style={{ width: '15%' }}>Corretas</th>
              <th style={{ width: '15%' }}>Erradas</th>
              <th style={{ width: '5%' }}>Link</th>
            </tr>
          </thead>

          <tbody>
            {answers && answers.map(answer => {
              const rightAnswers = answer.rightAnswers;
              const wrongAnswers = answer.wrongAnswers;
              const totalAnswers = answer.totalAnswers;
              const { rightPercentage, wrongPercentage } = calculatePercentage({
                rightAnswers,
                wrongAnswers,
                totalAnswers
              });

              return (
              <tr key={answer._id}>
                <td>{quizTitle}</td>
                <td style={{ textAlign: 'center' }}>{formatDate(answer.createdAt)}</td>
                <td style={{ textAlign: 'center' }}>
                  <span className={styles.icon_container}>
                    {answer.rightAnswers} &nbsp;&nbsp; {`${rightPercentage}%`}
                    <FaCheckCircle size={22} style={{ color: '#00c853' }} />
                  </span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span className={styles.icon_container}>
                      {answer.wrongAnswers} &nbsp;&nbsp; {`${wrongPercentage}%`}
                    <FaTimesCircle size={22} style={{ color: '#f44336' }} />
                  </span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <FaLink
                    size={18}
                    className={styles.link_icon}
                    onClick={() => handleAnswersResponse(answer.quizId, answer.answers)}
                  />
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default QuizAnswers;
