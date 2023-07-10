const url = 'https://random-word-api.vercel.app/api?words=1';

const getRandomWord = async () => {
  try {
    const response = await fetch(url);
    const randomWord = await response.json();
    return randomWord;
  } catch (error) {
    console.log('Error fetching random word:', error);
    return null;
  }
};

export default getRandomWord;
