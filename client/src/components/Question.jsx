import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

export default function Question() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
        <div className="mb-8">
          <h2>Question</h2>

          {/*Display Dynamic Answer */}
          <div className="grid gap-4"></div>
        </div>
        {/* Show Explanation */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-blue" />
            </div>
            <div className="ml-3">
              <p className="text-blue-800 font-medium"> Explanation:</p>
              <p className="text-blue-700 mt-1">Current Question Explanation</p>
            </div>
          </div>
        </div>
        {/* Display the button */}
        <div className="flex justify-between items-center ">
          <button className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-5 disabled:cursor-not-allowed transition-all duration-200">
            <ArrowLeft size={20} />
            <span>Previous</span>
          </button>
          <button className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-5 disabled:cursor-not-allowed transition-all duration-200">
            <ArrowRight size={20} />
            <span>Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}
