import { ArrowLeft, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  answerQuestions,
  nextQuestion,
  previousQuestion,
} from "../store/quizSlice";

export default function Question() {
  const dispatch = useDispatch();
  const { questions, currentQuestionIndex, answers, showExplanation } =
    useSelector((state) => state.quiz);

  const currentQuestion = questions[currentQuestionIndex]; //index number question
  const currentAnswer = answers.find(
    (answer) => answer.questionId === currentQuestion.id
  );

  // answer event
  const handleOptionClick = (optionIndex) => {
    if (!currentAnswer) {
      dispatch(answerQuestions({ selectedOption: optionIndex }));
    }
  };

  // handle next
  const handleNext = () => {
    dispatch(nextQuestion());
  };

  //handle previous
  const handlePrevious = () => {
    dispatch(previousQuestion());
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white  shadow-xl transition-all duration-300 hover:shadow-2xl  p-6 border-6 border-blue-100 rounded-xl">
        <div className="mb-8">
          <div className="w-30 text-center bg-blue-100 rounded-xl p-2 border-2 border-blue-200 font-semibold text-lg text-gray-800 mb-2">
            Soal No. {currentQuestionIndex + 1}
          </div>
          <h2 className="text-xl font-semi-bold text-gray-800 mb-6 leading-relaxed">
            {currentQuestion.question}
          </h2>

          {/*Display Dynamic Answer */}
          <div className="grid gap-4">
            {currentQuestion.options.map((option, i) => {
              const isSelected = currentAnswer?.selectedOption === i;
              const isCorrect = i === currentQuestion.correctAnswer;
              const isWrong = isSelected && !isCorrect && showExplanation;

              let buttonClass = `w-full p-4 text-left rounded-xl border-1 border-gray-300 transition-all duration-200`;

              if (showExplanation) {
                if (isCorrect) {
                  buttonClass += `border-green-500 bg-green-50 text-green-800`;
                } else if (isWrong) {
                  buttonClass += `border-red-500 bg-red-50 text-red-800`;
                } else {
                  buttonClass += `border-gray-200 bg-gray-50 text-gray-600`;
                }
              } else if (isSelected) {
                buttonClass += `border-blue-500 bg-blue-50 text-blue-800`;
              } else {
                buttonClass += `border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md`;
              }

              if (isSelected) {
                buttonClass += `border-blue-500 bg-blue-50 text-blue-800`;
              } else {
                buttonClass += `border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md`;
              }

              return (
                <button
                  key={i}
                  className={buttonClass}
                  onClick={() => handleOptionClick(i)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{option}</span>
                    {showExplanation && isCorrect && (
                      <div className="flex items-center space-x-1">
                        <CheckCircle size={18} className="text-green-600" />
                        <span className="text-green-600 font-medium text-sm">
                          Jawaban Benar
                        </span>
                      </div>
                    )}
                    {showExplanation && isWrong && (
                      <div className="flex items-center space-x-1">
                        <XCircle size={18} className="text-red-600" />
                        <span className="text-red-600 font-medium text-sm">
                          Jawaban Salah
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Show Explanation */}
        {showExplanation && currentQuestion.explanation && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-blue" />
              </div>
              <div className="ml-3">
                <p className="text-blue-800 font-medium"> Pembahasan:</p>
                <p className="text-blue-700 mt-1">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Display the button */}
        <div className="flex justify-between items-center ">
          <button
            className={`flex items-center space-x-2 px-6 py-3 ${
              currentQuestionIndex === 0
                ? "bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                : "bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            } disabled:opacity-5 disabled:cursor-not-allowed transition-all duration-200`}
            onClick={handlePrevious}
          >
            <ArrowLeft size={20} />
            <span>Sebelum</span>
          </button>
          {showExplanation && (
            <button
              className={`flex items-center space-x-2 px-6 py-3 ${
                currentQuestionIndex === questions.length - 1
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-orange-500 hover:bg-orange-600"
              } text-white rounded-lg disabled:opacity-5 disabled:cursor-not-allowed transition-all duration-200`}
              onClick={handleNext}
            >
              <span>
                {currentQuestionIndex === questions.length - 1
                  ? "Kumpulkan"
                  : "Selanjutnya"}
              </span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
