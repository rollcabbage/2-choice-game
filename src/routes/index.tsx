import { RouterProvider } from "react-router-dom";
import { createRouter } from "./createRouter";
import { useMemo } from "react";

export const AppRouter = () => {
  const router = useMemo(() => createRouter(), []);
  return <RouterProvider router={router} />;
};
