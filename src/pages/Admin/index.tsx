import { ChangeEvent, FormEvent, useContext, useState } from 'react';

import { FaPlusCircle } from 'react-icons/fa';

import styles from './Admin.module.css';
import { AuthContext } from '../../context/AuthContext';
import { IQuestion } from '../../interfaces/IQuestion';
import { IQuiz } from '../../interfaces/IQuiz';

const Admin = () => {
  const { user } = useContext(AuthContext);
  const [isCreateQuiz, setIsCreateQuiz] = useState(false);
  const [quizTitle, setQuizTitle] = useState('');

  const handleQuizTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setQuizTitle(event.target.value);
  };

  const createQuiz = () => {
    setIsCreateQuiz(true);
  };

  const [questions, setQuestions] = useState<IQuestion[]>([
    { question: '', rightAnswer: '', wrongAnswers: ['', '', '', ''] }
  ]);

  const handleChange = (
    index: number,
    field: keyof IQuestion,
    value: string,
    answerIndex?: number
  ) => {
    setQuestions(prevQuestions => {
      return prevQuestions.map((q, i) => {
        if (i === index) {
          if (field === 'wrongAnswers' && answerIndex !== undefined) {
            const updatedWrongAnswers = [...q.wrongAnswers];
            updatedWrongAnswers[answerIndex] = value;

            return { ...q, wrongAnswers: updatedWrongAnswers };
          } else {
            return { ...q, [field]: value };
          }
        }

        return q;
      });
    });
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', rightAnswer: '', wrongAnswers: ['', '', '', ''] }
    ]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const quiz: IQuiz = {
      quizTitle,
      questions
    };

    console.log(quiz);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>{user?.name} Admin</h1>

        <button className={`${styles.button_create} ${styles.neumorphism}`} onClick={createQuiz}>
          <span>Criar Quiz</span>
          <div className={styles.icon_button}>
            <span className={styles.icon}><FaPlusCircle size={22} /></span>
          </div>
        </button>
      </div>

      {!isCreateQuiz && (
        questions[0].question === '' ? (
          <p className={`${styles.no_quizzes} ${styles.neumorphism}`}>
            Você ainda não criou nenhum Quiz, clique em CRIAR QUIZ, é fácil e rápido!
          </p>
        ) : (
          <p className={`${styles.no_quizzes} ${styles.neumorphism}`}>
            Seus Quizzes
          </p>
        )
      )}

      {isCreateQuiz && (
        <form className={styles.form} noValidate onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="quizTitle">*Título do Quiz</label>
          <input
            type="text"
            name="quizTitle"
            id="quizTitle"
            className={`${styles.input} ${styles.neumorphism}`}
            value={quizTitle}
            onChange={handleQuizTitle}
          />

          {questions.map((q, index) => (
            <div key={index} className={styles.form}>
              <label className={styles.label} htmlFor={`question${index}`}>*Pergunta {index + 1}</label>
              <input
                type="text"
                name={`question${index}`}
                id={`question${index}`}
                className={`${styles.input} ${styles.neumorphism}`}
                value={q.question}
                onChange={(e) => handleChange(index, 'question', e.target.value)}
              />

              <label className={styles.label} htmlFor={`rightAnswer${index}`}>*Resposta Correta</label>
              <input
                type="text"
                name={`rightAnswer${index}`}
                id={`rightAnswer${index}`}
                className={`${styles.input} ${styles.neumorphism}`}
                value={q.rightAnswer}
                onChange={(e) => handleChange(index, 'rightAnswer', e.target.value)}
              />

              {q.wrongAnswers.map((answer, ansIndex) => (
                <div key={ansIndex} className={`${styles.form} ${styles.wrong_answer}`}>
                  <label className={styles.label} htmlFor={`wrongAnswer${index}${ansIndex}`}>*Resposta Errada</label>
                  <input
                    type="text"
                    name={`wrongAnswer${index}${ansIndex}`}
                    id={`wrongAnswer${index}${ansIndex}`}
                    className={`${styles.input} ${styles.neumorphism}`}
                    value={answer}
                    onChange={(e) => handleChange(index, 'wrongAnswers', e.target.value, ansIndex)}
                  />
                </div>
              ))}
            </div>
          ))}

          <button
            onClick={addQuestion}
            className={`${styles.button_create} ${styles.neumorphism}`}
          >
            <span>Adicionar Pergunta</span>
            <div className={styles.icon_button}>
              <span className={styles.icon}><FaPlusCircle size={22} /></span>
            </div>
          </button>
          
          <button
            type="submit"
            className={`${styles.button_create} ${styles.neumorphism} ${styles.submit}`}
          >
            Enviar
          </button>
        </form>
      )}
    </div>
  );
};

export default Admin;
