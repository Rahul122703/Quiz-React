import React from "react";
import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { handleSubmit, options, handleChange, quiz, error } =
    useGlobalContext();

  return (
    <main className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 min-h-screen flex justify-center items-center py-8 px-4">
      <section className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-xl">
        {error && (
          <div
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center"
            role="alert">
            <strong class="font-bold">
              Please reduce the amount or change category or try again
            </strong>
          </div>
        )}
        {/* variable */}
        <form className="space-y-6">
          <h2 className="text-4xl font-semibold text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Setup Quiz
          </h2>
          <div className="form-control">
            <label
              htmlFor="amount"
              className="block text-lg font-medium text-gray-700">
              Number of Questions
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              className="form-input w-full p-4 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-blue-300 transition duration-300 ease-in-out"
              min={1}
              max={50}
              defaultValue={10}
              value={quiz.amount}
              onChange={handleChange}
            />
          </div>

          {/* Category */}
          <div className="form-control">
            <label
              htmlFor="category"
              className="block text-lg font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              id="category"
              value={quiz.category}
              onChange={handleChange}
              className="form-input w-full p-4 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-blue-300 transition duration-300 ease-in-out">
              {/* variable */}
              {Object.entries(options).map(([category, id]) => {
                return (
                  <option value={category} key={id}>
                    {category}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Difficulty */}
          <div className="form-control">
            <label
              htmlFor="difficulty"
              className="block text-lg font-medium text-gray-700">
              Select Difficulty
            </label>
            <select
              name="difficulty"
              id="difficulty"
              value={quiz.difficulty}
              onChange={handleChange}
              className="form-input w-full p-4 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-blue-300 transition duration-300 ease-in-out">
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleSubmit}>
            Start
          </button>
        </form>
      </section>
    </main>
  );
};

export default SetupForm;
