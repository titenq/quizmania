import { backendBaseUrl } from '../../helpers/baseUrl';
import { IQuiz } from '../../interfaces/IQuiz';

const createQuiz = async (quiz: IQuiz) => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;
    console.log({quiz})
    console.log({apiKey})

    const response = await fetch(`${backendBaseUrl}/quizzes`, {
      method: 'POST',
      headers: {
        'api_key': apiKey
      },
      body: JSON.stringify(quiz)
    });

    console.log(JSON.stringify(quiz))

    if (!response.ok) {
      console.log('erro')
      console.log({response})
      throw new Error('Erro ao criar quiz');
    }

    const data = await response.json();

    console.log(data)

    return data;
  } catch (error) {
    console.log(error)
    throw new Error('Erro ao criar quiz');
  }
};

export default createQuiz;
