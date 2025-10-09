import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "./ProgressBar";
import Question from "./Question";
import QuizStart from "./QuizStart";
import Result from "./Result";
import { useEffect } from "react";
import { setQuestions } from "../store/quizSlice";
import { sampleQuestion } from "../data/question";

export default function Quiz() {
  const dispatch = useDispatch();

  // load the question
  useEffect(() => {
    dispatch(setQuestions(sampleQuestion));
  }, [dispatch]);

  const {
    questions,
    currentQuestionIndex,
    isQuizCompleted,
    isTimerActive,
    answers,
  } = useSelector((state) => state.quiz);

  //loading quiz
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading</p>
        </div>
      </div>
    );
  }

  //is completed quiz
  if (isQuizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
        <Result />
      </div>
    );
  }

  //quiz start
  if (!isTimerActive && answers.length === 0) {
    console.log(questions.length, "<<<");
    return (
      <div className="min-h-screen py-8 px-4">
        <QuizStart />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border-6 border-blue-100">
          <div className="flex flex-col md:flex-row md:items-center md: justify-between space-y-4 md:space-y-0">
            <div className="flex-1">
              <ProgressBar
                current={currentQuestionIndex + 1}
                total={questions.length}
              />
            </div>
          </div>
        </div>
      </div>
      <Question />
    </div>
  );
}
