import { ICalculatePercentage } from '../interfaces/IAnswer';

const calculatePercentage = ({ rightAnswers, wrongAnswers, totalAnswers }: ICalculatePercentage) => {
  const rightPercentage = ((rightAnswers / totalAnswers) * 100);
  const wrongPercentage = ((wrongAnswers / totalAnswers) * 100);

  return {
    rightPercentage,
    wrongPercentage
  };
};

export default calculatePercentage;
