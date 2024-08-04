import { backendBaseUrl } from '../../helpers/baseUrl';
import { IQuizCheckAnswerProps } from '../../interfaces/IQuiz';

const checkAnswer = async (checkAnswerProps: IQuizCheckAnswerProps) => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;
    const { quizId } = checkAnswerProps;

    const response = await fetch(`${backendBaseUrl}/quizzes/quiz/${quizId}/answer`, {
      method: 'POST',
      headers: {
        'api_key': apiKey,
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(checkAnswerProps)
    });

    if (!response.ok) {
      const data = await response.json();

      return data;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

export default checkAnswer;
