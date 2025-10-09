import { FileText } from "lucide-react";
import { useDispatch } from "react-redux";
import { startQuiz } from "../store/quizSlice";

export default function QuizCard() {
  const dispatch = useDispatch();

  const handleStartQuiz = () => {
    dispatch(startQuiz());
  };

  return (
    <div className="rounded-2xl bg-blue-50 p-8 shadow-xl">
      <div className="bg-blue-100 rounded-2xl p-8 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mb-6">
            <FileText className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-800 mb-4">
            ESPS IPS 4 SD KELAS IV
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Kenampakan Alam dan Pemanfaatannya
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <button className="inline-flex items-center space-x-3 py-4 px-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg font-semibold text-lg cursor-pointer">
            <span>Riwayat Nilai Tes</span>
            <FileText size={24} />
          </button>
          <button
            className="inline-flex items-center space-x-3 py-4 px-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg font-semibold text-lg cursor-pointer"
            onClick={handleStartQuiz}
          >
            <span>Mulai CBT</span>
          </button>
        </div>
      </div>
    </div>
  );
}
