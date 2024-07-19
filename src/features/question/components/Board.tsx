import { useState } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import QuestionData from "../assets/QuestionData.json";
import { channel } from "@/lib/supabase";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export const Board = () => {
  const [key, setKey] = useState<number>(0);
  const [selectorsOfA, setSelectorsOfA] = useState<string[]>([]);
  const [selectorsOfB, setSelectorsOfB] = useState<string[]>([]);

  const receiveOptionA = (message) => {
    setSelectorsOfA([...selectorsOfA, message.payload.name]);
  };

  const receiveOptionB = (message) => {
    setSelectorsOfB([...selectorsOfB, message.payload.name]);
  };

  const moveToNextQuestion = () => {
    setSelectorsOfA([]);
    setSelectorsOfB([]);
    channel.send({
      type: "broadcast",
      event: "answerable",
    });
    setKey((prevKey) => prevKey + 1);
  };

  const showResults = () => {
    const a_container = document.getElementById("selector_a_container");
    a_container?.classList.remove("invisible");
    a_container?.classList.add("visible");

    const b_container = document.getElementById("selector_b_container");
    b_container?.classList.remove("invisible");
    b_container?.classList.add("visible");
  };

  const countDownCompleted = () => {
    showResults();
  };

  channel.on("broadcast", { event: "A" }, (message) => receiveOptionA(message));

  channel.on("broadcast", { event: "B" }, (message) => receiveOptionB(message));

  return (
    <>
      <AwesomeSlider
        fillParent={true}
        animation="cubeAnimation"
        onTransitionRequest={() => moveToNextQuestion()}
      >
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
                  className="flex flex-wrap gap-2 my-8 invisible"
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
                <div className="text-center">
                  回答者数：{selectorsOfA.length}
                </div>
              </div>

              <div id="option_b_container" className="w-1/4">
                <div className="text-4xl text-center">
                  B:{item.question_options.B}
                </div>

                <div
                  id="selector_b_container"
                  className="flex flex-wrap gap-2 my-8 invisible"
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
                <div className="text-center">
                  回答者数：{selectorsOfB.length}
                </div>
              </div>
            </div>
          </div>
        ))}
      </AwesomeSlider>
      <div className="fixed">
        <CountdownCircleTimer
          key={key}
          isPlaying
          duration={20}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[10, 5, 2, 0]}
          size={128}
          strokeWidth={12}
          onComplete={() => countDownCompleted()}
        >
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
      </div>
    </>
  );
};
