import { backendBaseUrl } from '../../helpers/baseUrl';
import { IQuiz } from '../../interfaces/IQuiz';

const createQuiz = async (quiz: IQuiz) => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;

    const response = await fetch(`${backendBaseUrl}/quizzes`, {
      method: 'POST',
      headers: {
        'api_key': apiKey,
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(quiz)
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

export default createQuiz;
