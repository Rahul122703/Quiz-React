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
  } = useGlobalContext();

  if (wating) {
    return <SetupForm />;
  }

  if (loading) {
    return <Loader />;
  }
  console.log(`${index + 1} / ${quiz.amount} `);

  if (quiz.amount === index + 1) {
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
      <section className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-6 md:p-10 text-center">
        {/* Correct Answers */}
        <p className="text-lg md:text-xl font-semibold text-gray-700 mb-6">
          Correct Answers:
          <span className="text-blue-600">
            {score}/{index + 1}
          </span>
        </p>

        {/* Question Container */}
        <article className="mb-8">
          <h2
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-6"
            dangerouslySetInnerHTML={{ __html: question }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {answers.map((currentItem, index) => {
              return (
                <button
                  className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition"
                  key={index}
                  onClick={() => nextQuestion(currentItem === correct_answer)}
                  dangerouslySetInnerHTML={{ __html: currentItem }}
                />
              );
            })}
          </div>
        </article>
        <button
          className="bg-purple-600 text-white py-3 px-8 rounded-lg shadow-md font-medium text-lg hover:bg-purple-700 transition"
          onClick={() => nextQuestion()}>
          Next Question
        </button>
      </section>
    </main>
  );
}

export default App;
