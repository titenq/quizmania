/* import { IAnswersGet } from '../interfaces/IAnswer';

const getAnswersPercentage = (responseQuizzes: IAnswersGet[][], index: number) => {
  const calculatePercentage = (total: number, correct: number) => (total === 0 ? 0 : (correct / total) * 100);

  const quizData = responseQuizzes[index];
  const totalAnswers = quizData?.totalAnswers || 0;
  const rightAnswers = quizData?.rightAnswers || 0;
  const wrongAnswers = quizData?.wrongAnswers || 0;

  const correctPercentage = calculatePercentage(totalAnswers, rightAnswers);
  const wrongPercentage = calculatePercentage(totalAnswers, wrongAnswers);

  return {
    correctPercentage: `${correctPercentage.toFixed(2)}%`,
    wrongPercentage: `${wrongPercentage.toFixed(2)}%`
  };
};

export default getAnswersPercentage; */
