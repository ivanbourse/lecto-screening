import axios from 'axios';

export async function getQuestions () {
   const result = await axios.get("https://opentdb.com/api.php?amount=10&category=18");
   return result;
}