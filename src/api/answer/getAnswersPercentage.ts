import { backendBaseUrl } from '../../helpers/baseUrl';

const getAnswersPercentage = async (userId: string, page: number = 1) => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;

    const response = await fetch(`${backendBaseUrl}/answers/${userId}/percentage?page=${page}`, {
      method: 'GET',
      headers: {
        'api_key': apiKey,
        'Content-Type': 'application/json; charset=utf-8'
      }
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

export default getAnswersPercentage;
