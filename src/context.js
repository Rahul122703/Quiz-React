import react, { useEffect } from "react";
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
  const [wating, setWaiting] = useState(true);
  const [questionData, setQuestionData] = useState();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(false);

  const fetchData = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);

      if (!response.ok) {
        console.log(`Error: ${response.status} - ${response.statusText}`);
        setError(true);
        setWaiting(true);
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log("fetched data", data);

      if (data.results.length !== 0 && response.status !== 429) {
        setQuizData(data.results);
        setLoading(false);
        setWaiting(false);
        setQuestionData(data.results[index]);
        console.log(data.results);
        setScore(0);
        setIndex(0);
        setError(false);
      } else {
        console.log("No valid data");
        setError(true);
        setWaiting(true);
        setLoading(false);
      }
    } catch (error) {
      console.log("Fetch error:", error);
      setError(true);
      setWaiting(true);
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
    console.log(
      `${API_ENDPOINT}${amount}&${category}&${difficulty}&type=multiple`
    );
    setWaiting(false);
  };

  const nextQuestion = (currentItem) => {
    setIndex((currentIndex) => {
      console.log("old index", currentIndex);
      return currentIndex + 1;
    });
    if (currentItem) {
      setScore((currentScore) => currentScore + 1);
    }
  };

  useEffect(() => {
    setQuestionData(quizData[index]);
  }, [index]);

  const playAgain = () => {
    setWaiting(true);
    setIndex(0);
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
