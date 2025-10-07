import { BookOpen, Clock, File, Play, Trophy } from "lucide-react";

export default function QuizStart() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-6">
            <File className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            React Knowledge Quiz
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem alias
            aperiam numquam, magnam natus ex? Illo, facilis impedit! Voluptas
            aspernatur amet dicta dolor! Earum incidunt adipisci pariatur cum
            inventore fugit?
          </p>
        </div>
        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-purple-100 p-6 rounded-xl">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-800 mb-2">8</div>
            <div className="text-2xl font-medium ">Question</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-blue-800 mb-2">5:00</div>
            <div className="text-2xl font-medium ">Minutes</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
            <div className="flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-purple-800 mb-2">100%</div>
            <div className="text-2xl font-medium ">Mas Score</div>
          </div>
        </div>

        {/* Rules */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Quiz Rules
          </h3>
          <div className="text-left bg-gray-50 rounded-xl max-w-2xl mx-auto">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex justify-center items-center text-sm font-semibold mr-3 mt-0.5">
                  1
                </span>
                <span>Each question has multiple choice answer</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex justify-center items-center text-sm font-semibold mr-3 mt-0.5">
                  2
                </span>
                <span>You have 5 minutes to complete all question</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex justify-center items-center text-sm font-semibold mr-3 mt-0.5">
                  3
                </span>
                <span>
                  Once you select an answer, you'll see the explanation
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex justify-center items-center text-sm font-semibold mr-3 mt-0.5">
                  4
                </span>
                <span>You can navigate back to previous question</span>
              </li>
            </ul>
          </div>
        </div>

        <button className="inline-flex items-center space-x-3 py-4 px-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg font-semibold text-lg cursor-pointer">
          <Play size={24} />
          <span>Start Quiz</span>
        </button>
      </div>
    </div>
  );
}
