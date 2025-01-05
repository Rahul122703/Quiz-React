import react from "react";
import { useState, useContext } from "react";
import axios from "axios";

const AppContext = react.createContext();

const options = {
  general_knowledge: 9,
  books: 10,
  film: 11,
  music: 12,
  musicals_and_theatres: 13,
  television: 14,
  video_games: 15,
  board_games: 16,
  science_and_nature: 17,
  computers: 18,
  mathematics: 19,
  mythology: 20,
  sports: 21,
  geography: 22,
  history: 23,
  politics: 24,
  art: 25,
  celebrities: 26,
  animals: 27,
  vehicles: 28,
  comics: 29,
  gadgets: 30,
  anime_and_manga: 31,
  cartoons_and_animations: 32,
};

const API_ENDPOINT = `https://opentdb.com/api.php?`;

const AppProvider = ({ children }) => {
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "computers",
    difficulty: "easy",
  });

  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wating, setWating] = useState(true);
  const [questionData, setQuestionData] = useState();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(false);

  const fetchData = async (url) => {
    setLoading(true);
    const response = await axios(url).catch((e) => console.log(e));
    console.log(response);
    if (response) {
      if (response.data.results.length !== 0 || response.status !== 429) {
        setQuizData(response.data.results);
        setLoading(false);
        setWating(false);
        setQuestionData(response.data.results[index]);
        setScore(0);
        setIndex(0);
        setError(false);
      } else {
        console.log("here");
        setError(true);
        setWating(true);
        setLoading(false);
      }
    } else {
      console.log("here");
      setError(true);
      setWating(true);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({
      ...quiz,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = `amount=${quiz.amount}`;
    const category = `category=${options[quiz.category]}`;
    const difficulty = `difficulty=${quiz.difficulty}`;
    fetchData(
      `${API_ENDPOINT}${amount}&${category}&${difficulty}&type=multiple`
    );
    setWating(false);
  };

  const nextQuestion = (currentItem) => {
    if (currentItem) {
      setScore((currentScore) => currentScore + 1);
    }
    setIndex((currentIndex) => currentIndex + 1);
    setQuestionData(quizData[index]);
    console.log(quiz);
  };

  const playAgain = () => {
    setWating(true);
  };

  return (
    <AppContext.Provider
      value={{
        handleSubmit,
        fetchData,
        handleChange,
        nextQuestion,
        playAgain,
        loading,
        options,
        wating,
        quiz,
        quizData,
        score,
        questionData,
        index,
        error,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
