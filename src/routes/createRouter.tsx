import { basename } from "path";
import { createBrowserRouter } from "react-router-dom";

export const createRouter = () =>
  createBrowserRouter(
    [
      {
        path: "/",
        lazy: async () => {
          const { Landing } = await import("@/features/misc");
          return { Component: Landing };
        },
      },
      {
        path: "/question",
        lazy: async () => {
          const { Board } = await import("@/features/question");
          return { Component: Board };
        },
      },
      {
        path: "/answer",
        lazy: async () => {
          const { Selector } = await import("@/features/answer");
          return { Component: Selector };
        },
      },
      {
        path: "*",
        lazy: async () => {
          const { NotFound } = await import("@/features/misc");
          return { Component: NotFound };
        },
      },
    ]
    // { basename: "/2-choice-game/" }
  );
