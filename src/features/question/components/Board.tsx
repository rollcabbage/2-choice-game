import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import QuestionData from "../assets/QuestionData.json";

export const Board = () => {
  return (
    <AwesomeSlider fillParent={true} animation="cubeAnimation">
      {QuestionData.map((item, index) => (
        <div
          key={index}
          className="flex-col w-screen h-screen items-center bg-white"
        >
          <div className="bg-yellow-600 text-center text-7xl sm:px-6 lg:px-8 lg:py-16">
            {item.question_text}
          </div>
          <div className="columns-2 text-center sm:px-6 lg:px-8 lg:py-16">
            <div className="text-4xl">A:{item.question_options.A}</div>
            <div className="text-4xl">B:{item.question_options.B}</div>
          </div>
        </div>
      ))}
    </AwesomeSlider>
  );
};
