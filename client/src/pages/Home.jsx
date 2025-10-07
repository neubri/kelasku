import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";
import http from "../lib/http";
import Swal from "sweetalert2";

export default function Home() {
  const [quiz, setQuiz] = useState([]);

  const fetchQuizData = async () => {
    try {
      const { data } = await http({
        method: "GET",
        url: "/quizzes",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setQuiz(data);

      console.log(data, "<<<");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  return (
    <div className="min-h-svh w-full p-6 md:p-10 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Kelasku</h1>
          <p className="text-gray-600">Pilih quiz yang ingin Anda kerjakan</p>
        </div>

        {/* Quiz Cards */}
        {quiz.length === 0 ? (
          <div className="flex justify-center">
            <Card className="w-full max-w-md text-center bg-blue-50 border-2 border-blue-200 shadow-lg">
              <CardContent className="py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
                <p className="text-gray-500">Memuat data quiz...</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quiz.map((singleQuiz) => (
              <Card
                key={singleQuiz.id}
                className="text-center bg-blue-50 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader className="pb-2">
                  {/* Icon Book/Document */}
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center shadow-md">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <CardTitle className="text-lg font-bold text-gray-800 mb-2">
                    {singleQuiz.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    {singleQuiz.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex flex-col gap-3 px-6 pb-6">
                  <Button
                    variant="outline"
                    className="w-full h-10 border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-medium"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Riwayat Nilai
                  </Button>
                  <Button
                    className="w-full h-10 bg-orange-500 hover:bg-orange-600 text-white font-medium"
                    onClick={() =>
                      console.log(`Starting quiz: ${singleQuiz.id}`)
                    }
                  >
                    Mulai CBT
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
