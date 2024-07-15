import { createBrowserRouter } from "react-router-dom";

export const createRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      lazy: async () => {
        const { Landing } = await import("@/features/misc");
        return { Component: Landing };
      },
    },
    {
      path: "/board",
      lazy: async () => {
        const { Board } = await import("@/features/question");
        return { Component: Board };
      },
    },
    {
      path: "*",
      lazy: async () => {
        const { NotFound } = await import("@/features/misc");
        return { Component: NotFound };
      },
    },
  ]);
