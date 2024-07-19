import { useRef, useState } from "react";
import { channel } from "@/lib/supabase";
import { Button, Field, Input, Label } from "@headlessui/react";

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
        <div className="flex items-center justify-center mx-auto w-[430px] h-[932px] border-2 text-center">
          <form onSubmit={(e) => handleSubmit(e)}>
            <Field>
              <Label className="font-bold">名前を入力してください</Label>
              <Input
                ref={nameRef}
                className="mt-5 px-20 py-5 block border rounded-lg"
              />
              <Button
                type="submit"
                value="OK"
                className="mt-5 rounded-lg bg-sky-600 px-8 py-2 text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
              >
                保存
              </Button>
            </Field>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mx-auto w-[430px] h-[932px] border-2 text-center">
          <div className="text-lg font-medium">{name}</div>
          <Button
            type="button"
            disabled={answerable}
            className="mt-5 rounded-lg bg-sky-600 px-32 py-8 text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700  data-[disabled]:bg-gray-500"
            onClick={handleSelectorA}
          >
            A
          </Button>
          <Button
            type="button"
            disabled={answerable}
            className="mt-5 rounded-lg bg-green-600 px-32 py-8 text-white data-[hover]:bg-green-500 data-[active]:bg-green-700 data-[disabled]:bg-gray-500"
            onClick={handleSelectorB}
          >
            B
          </Button>
        </div>
      )}
    </>
  );
};
