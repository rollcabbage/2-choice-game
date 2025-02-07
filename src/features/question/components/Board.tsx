import { useState } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import QuestionData from "../assets/QuestionData.json";
import { channel } from "@/lib/supabase";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Button, Dialog } from "@headlessui/react";
import _ from "lodash";

export const Board = () => {
  const [key, setKey] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectorsOfA, setSelectorsOfA] = useState<string[]>([]);
  const [selectorsOfB, setSelectorsOfB] = useState<string[]>([]);
  const [groupingResult, setGroupingResult] = useState<string[][]>();

  const receiveOptionA = (message) => {
    setSelectorsOfA([...selectorsOfA, message.payload.name]);
  };

  const receiveOptionB = (message) => {
    setSelectorsOfB([...selectorsOfB, message.payload.name]);
  };

  const moveToNextQuestion = (event) => {
    setSelectorsOfA([]);
    setSelectorsOfB([]);
    channel.send({
      type: "broadcast",
      event: "answerable",
    });
    setKey((prevKey) => prevKey + 1);
    if (event.nextIndex == QuestionData.length - 1) {
      console.log("lasted");
    }
    console.log(event);
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

  const grouping = () => {
    setIsOpen(true);
    const result: string[][] = Array.from({ length: 8 }, () => []);
    const shuffledArray = _.shuffle([...selectorsOfA, ...selectorsOfB]);
    shuffledArray.forEach((value, index) => {
      result[index % 8].push(value);
    });
    setGroupingResult(result);
    console.log(result);
  };

  channel.on("broadcast", { event: "A" }, (message) => receiveOptionA(message));

  channel.on("broadcast", { event: "B" }, (message) => receiveOptionB(message));

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex flex-col w-screen items-center justify-center bg-slate-950 text-white">
          {groupingResult?.map((group, index) => (
            <div key={index}>
              No.{index + 1} 組: {group + " "}
            </div>
          ))}
        </div>
      </Dialog>
      <AwesomeSlider
        fillParent={true}
        animation="cubeAnimation"
        onTransitionRequest={(event) => moveToNextQuestion(event)}
      >
        {QuestionData.map((item, index) => (
          <div
            key={index}
            className="flex-col w-screen h-screen items-center bg-sky-950 bg-[url('/public/question.png')]"
          >
            <div
              id="question"
              className="text-center text-white text-7xl sm:px-6 lg:px-8 lg:py-16"
            >
              {item.question_text}
              <Button
                className="fixed top-5 right-12 text-2xl "
                onClick={() => grouping()}
              >
                グループ分け
              </Button>
            </div>

            <div
              id="options_container"
              className="flex justify-center gap-10 my-16"
            >
              <div
                id="option_a_container"
                className="bg-yellow-400 rounded-lg w-1/3 h-full"
              >
                <div className="text-4xl text-center my-5 text-sky-950">
                  <div className="my-2">A</div>
                  {item.question_options.A}
                </div>

                <div
                  id="selector_a_container"
                  className="flex flex-wrap my-8 invisible"
                >
                  {selectorsOfA.map((selector, index) => (
                    <div
                      key={index}
                      className=" text-sky-950 text-2xl font-bold mx-3"
                    >
                      {selector}
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  回答者数：{selectorsOfA.length}
                </div>
              </div>

              <div
                id="option_b_container"
                className="bg-green-500 rounded-lg w-1/3"
              >
                <div className="text-4xl text-center my-5 text-sky-950">
                  <div className="my-2">B</div>
                  {item.question_options.B}
                </div>

                <div
                  id="selector_b_container"
                  className="flex flex-wrap gap-2 my-8 invisible"
                >
                  {selectorsOfB.map((selector, index) => (
                    <div
                      key={index}
                      className=" text-sky-950 text-2xl font-bold mx-2"
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
      <div className="fixed top-5 left-5 text-white font-bold">
        <CountdownCircleTimer
          key={key}
          isPlaying
          duration={30}
          colors={["#FF7F50", "#DC143C", "#FF0000", "#FF0000"]}
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
