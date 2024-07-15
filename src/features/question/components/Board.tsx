import { useState } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import QuestionData from "../assets/QuestionData.json";

export const Board = () => {
  const [selectorsOfA, setSelectorsOfA] = useState(["Aさん", "Bさん", "Cさん"]);
  const [selectorsOfB, setSelectorsOfB] = useState(["Dさん", "Cさん", "Eさん"]);

  return (
    <>
      <AwesomeSlider fillParent={true} animation="cubeAnimation">
        {QuestionData.map((item, index) => (
          <div
            key={index}
            className="flex-col w-screen h-screen items-center bg-white"
          >
            <div
              id="question"
              className="bg-yellow-600 text-center text-7xl sm:px-6 lg:px-8 lg:py-16"
            >
              {item.question_text}
            </div>

            <div id="options_container" className="flex justify-around my-16">
              <div id="option_a_container" className="w-1/4">
                <div className="text-4xl text-center">
                  A:{item.question_options.A}
                </div>

                <div
                  id="selector_a_container"
                  className="flex flex-wrap gap-2 my-8"
                >
                  {selectorsOfA.map((selector, index) => (
                    <div
                      key={index}
                      className="bg-green-100 border-4 rounded-full text-base"
                    >
                      {selector}
                    </div>
                  ))}
                </div>
              </div>

              <div id="option_b_container" className="w-1/4">
                <div className="text-4xl text-center">
                  B:{item.question_options.B}
                </div>

                <div
                  id="selector_b_container"
                  className="flex flex-wrap gap-2 my-8"
                >
                  {selectorsOfB.map((selector, index) => (
                    <div
                      key={index}
                      className="bg-red-100 border-4 rounded-full text-base"
                    >
                      {selector}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </AwesomeSlider>
    </>
  );
};
