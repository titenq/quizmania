import { backendBaseUrl } from '../../helpers/baseUrl';
import { IAnswers } from '../../interfaces/IAnswer';

const createAnswer = async (answersData: IAnswers) => {
  try {
    const { quizId, answers } = answersData;
    const apiKey = import.meta.env.VITE_API_KEY;

    const response = await fetch(`${backendBaseUrl}/answers/${quizId}`, {
      method: 'POST',
      headers: {
        'api_key': apiKey,
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ answers })
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

export default createAnswer;
