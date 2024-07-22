import { useRef, useState } from "react";
import { channel } from "@/lib/supabase";
import { Button, Field, Input, Label } from "@headlessui/react";
import hero from "../assets/hero.png";

export const Selector = () => {
  const [name, setName] = useState<string>("");
  const nameRef = useRef<HTMLInputElement>(null!);
  const [answerable, setAnswerable] = useState<boolean>(false);

  const handleSelectorA = () => {
    channel.send({
      type: "broadcast",
      event: "A",
      payload: { answer: "A", name: name },
    });
    setAnswerable(true);
  };

  const handleSelectorB = () => {
    channel.send({
      type: "broadcast",
      event: "B",
      payload: { answer: "B", name: name },
    });
    setAnswerable(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setName(nameRef.current.value);
  };

  const handleAnswerable = () => {
    setAnswerable(false);
  };

  channel.on("broadcast", { event: "answerable" }, (message) =>
    handleAnswerable()
  );

  return (
    <>
      {name == "" ? (
        <div className="flex flex-col items-center justify-center mx-auto w-screen h-screen border-2 text-center bg-sky-950">
          <img className="w-3/5 " src={hero}></img>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Field>
              <Label className="font-bold text-white text-2xl">
                名前を入力してください
              </Label>
              <Input
                ref={nameRef}
                placeholder="Name"
                className="mt-5 px-5 py-5 w-11/12 block border border-gray-500 rounded-lg bg-sky-950 data-[hover]:bg-white data-[focus]:bg-white"
              />
              <Button
                type="submit"
                value="OK"
                className="text-2xl font-extrabold bg-green-500 px-5 py-2 rounded-full my-5 data-[hover]:bg-green-600 data-[active]:bg-green-700"
              >
                start
              </Button>
            </Field>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mx-auto w-screen h-screen text-center bg-sky-950">
          <img className="w-3/5 " src={hero}></img>
          <Button
            type="button"
            disabled={answerable}
            className="my-3 rounded-3xl bg-yellow-400 h-1/5 px-32 py-8 text-slate-700 text-6xl data-[active]:bg-yellow-300  data-[disabled]:bg-gray-500"
            onClick={handleSelectorA}
          >
            A
          </Button>
          <Button
            type="button"
            disabled={answerable}
            className="my-3 rounded-3xl bg-green-500 h-1/5 px-32 py-8 text-slate-700 text-6xl data-[active]:bg-green-300 data-[disabled]:bg-gray-500"
            onClick={handleSelectorB}
          >
            B
          </Button>
          <div className="text-lg text-white font-medium mt-5 ">{name}</div>
        </div>
      )}
    </>
  );
};
