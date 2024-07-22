import { Button } from "@headlessui/react";
import { Link } from "react-router-dom";
import hero from "../assets/hero.png";

export const Landing = () => {
  return (
    <div className="flex h-screen w-screen items-center bg-auto bg-no-repeat bg-center bg-sky-950 bg-[url('/public/home.png')]">
      <div className="mx-auto text-center">
        <img className="" src={hero}></img>
        <Link to="/question">
          <Button className="text-2xl font-extrabold bg-green-500 px-5 py-2 rounded-full">
            start
          </Button>
        </Link>
      </div>
    </div>
  );
};
