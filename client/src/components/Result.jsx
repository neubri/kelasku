import { FileText } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { resetQuiz, startQuiz } from "../store/quizSlice";

export default function Result() {
  const dispatch = useDispatch();

  const { score, questions } = useSelector((state) => state.quiz);

  const totalQuestion = questions.length;
  const percentage = Math.round((score / totalQuestion) * 100);

  const handleReset = () => {
    dispatch(resetQuiz());
  };

  const handleStartQuiz = () => {
    dispatch(startQuiz());
  };

  function getResultMessage(score) {
    if (score >= 85) {
      return "Selamat kamu mendapatkan nilai yang bagus! Tingkatkan terus belajar kamu agar mendapatkan hasil yang maksimal.";
    } else if (score >= 70) {
      return "Nilai kamu cukup baik! Terus semangat belajar agar hasilnya semakin meningkat.";
    } else {
      return "Jangan menyerah! Pelajari kembali materi dan coba lagi untuk hasil yang lebih baik.";
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Quiz Header */}
      <div className="bg-blue-100 rounded-3xl shadow-sm p-6 mb-6">
        <div className="border border-blue-200 rounded-2xl bg-white p-6 flex items-center justify-center">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-b from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white mr-4">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-800">
                ESPS IPS 4 SD KELAS IV
              </h1>
              <p className="text-sm text-gray-600">
                Kenampakan Alam dan Pemanfaatannya
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Result */}
      <div className="bg-white p-3 mb-6 rounded-2xl shadow-xl">
        <div className=" bg-white p-6 flex items-center justify-between">
          <div className="flex flex-col items-center py-3">
            <div className="bg-blue-100 rounded-full p-2 mb-2">Nilai CBT</div>
            <p className="text-gray-700 text-md py-2">
              Total nilai kamu adalah
            </p>
            <h1 className="text-orange-500 text-8xl">{percentage}.00</h1>
            <p className="text-gray-700 text-md py-2 text-center">
              {getResultMessage(percentage)}
            </p>
            <div className="flex justify-center items-center gap-4 py-2">
              <button
                className="font-semibold rounded-full bg-orange-200 py-3 px-6 text-orange-500 text-sm"
                onClick={handleStartQuiz}
              >
                Kerjakan Ulang
              </button>
              <button
                className="font-semibold rounded-full bg-orange-500 py-3 px-6 text-white text-sm"
                onClick={handleReset}
              >
                Kembali ke Kelas
              </button>
            </div>
          </div>

          {/* Separator */}
          <div className="flex items-center px-5">
            <div className="bg-gray-200 rounded-full h-85 px-0.5" />
          </div>

          {/* Share score */}
          <div className="flex flex-col w-full">
            <div className="bg-blue-100 px-4 py-2 rounded-lg font-light mb-4 text-center">
              Bagikan Nilai
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Nama sekolah
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama sekolah"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Kelas
                </label>
                <input
                  type="text"
                  placeholder="Masukkan kelas"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Masukkan alamat email"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex justify-end">
                <button className="px-6 py-2 bg-orange-500 text-white rounded-full font-semibold">
                  Bagikan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Quiz Explanation Header */}
      {/* <div className="bg-blue-100 rounded-3xl shadow-sm p-6">
        <div className="border border-blue-200 rounded-2xl bg-white p-6 flex items-center justify-center">
          <div>
            <h1 className="text-lg font-medium text-black">Pembahasan Soal</h1>
          </div>
        </div>
      </div> */}
    </div>
  );
}
