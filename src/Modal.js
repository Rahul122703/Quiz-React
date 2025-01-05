import React from "react";
import { useGlobalContext } from "./context";

const Modal = () => {
  const { score, quiz, playAgain } = useGlobalContext();
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-4 transform transition-all duration-300 ease-in-out">
        <p className="text-center text-lg mt-2 text-gray-600">
          You answered {(score / quiz.amount) * 100}% of questions correct.
        </p>
        <button
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={() => playAgain()}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Modal;
