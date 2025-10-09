import { FileText, LayoutGrid } from "lucide-react";

export default function ProgressBar({ current, total, className = "" }) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className={`w-full ${className}`}>
      {/* Quiz Header */}
      <div className=" bg-white mb-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white mr-4">
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
        <button className="inline-flex items-center gap-2 justify-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium text-sm shadow-sm transition">
          Daftar Soal
          <LayoutGrid size={16} />
        </button>
      </div>

      {/* Quiz Progress */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Question {current} of {total}
        </span>
        <span className="text-sm font-medium text-gray-700 ">
          {percentage}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        {/* Progressbar */}
        <div
          className="bg-gradient-to-r from-orange-500 to-orange-600 h-full rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
