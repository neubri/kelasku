import { Clock } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementTimer } from "../store/quizSlice";

export default function Timer() {
  const dispatch = useDispatch();
  const { timeLeft, isTimerActive } = useSelector((state) => state.quiz);

  useEffect(() => {
    let interval;

    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        dispatch(decrementTimer());
      }, 1000);

      //clean up useEffect
      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    }
  }, [dispatch, isTimerActive, timeLeft]);

  //get timer color
  const getTimerColor = () => {
    if (timeLeft > 120) return "text-green-600";
    if (timeLeft > 60) return "text-yellow-600";
    return "text-red-600";
  };

  //format time
  const formatTime = (second) => {
    const min = Math.floor(second / 60);
    const secs = second % 60;
    return `${min.toString().padStart(2, 0)}:${secs.toString().padStart(2, 0)}`;
  };
  return (
    <div className={`flex items-center space-x-2 ${getTimerColor()}`}>
      <Clock size={20} />
      <span className="font-mono text-lg font-semibold">
        {formatTime(timeLeft)}
      </span>
    </div>
  );
}
