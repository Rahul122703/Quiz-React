import React from "react";
import { useGlobalContext } from "./context";
import SetupForm from "./SetupForm";
import Modal from "./Modal";
import Loader from "./Loading";

function App() {
  const {
    wating,
    loading,
    questionData,
    nextQuestion,
    score,
    index,
    quiz,
    playAgain,
  } = useGlobalContext();

  if (wating) {
    return <SetupForm />;
  }

  if (loading) {
    return <Loader />;
  }

  if (quiz.amount < index + 1) {
    return <Modal />;
  }

  const { question, incorrect_answers, correct_answer } = questionData;
  let answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);
  if (tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-800 flex items-center justify-center p-4">
      <section className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-6 md:p-10 relative">
        <div className="absolute top-0 left-0 bg-blue-500 text-white font-bold py-2 px-4 rounded-tl-lg rounded-br-lg">
          {index + 1} / {quiz.amount}
        </div>

        <p className="text-lg md:text-xl font-semibold text-gray-700 mb-6 text-center">
          Correct Answers:
          <span className="text-blue-600">
            {score}/{index}
          </span>
        </p>

        <article className="mb-8">
          <h2
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center"
            dangerouslySetInnerHTML={{ __html: question }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {answers.map((currentItem, index) => (
              <button
                className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition"
                key={index}
                onClick={() => nextQuestion(currentItem === correct_answer)}
                dangerouslySetInnerHTML={{ __html: currentItem }}
              />
            ))}
          </div>
        </article>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            className="bg-purple-600 text-white py-3 px-8 rounded-lg shadow-md font-medium text-lg hover:bg-purple-700 transition"
            onClick={() => nextQuestion()}>
            Next Question
          </button>
          <button
            className="bg-red-600 text-white py-3 px-8 rounded-lg shadow-md font-medium text-lg hover:bg-red-700 transition"
            onClick={() => playAgain()}>
            Restart
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
