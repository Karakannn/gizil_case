import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./containers/Home";
import ThreeFiberContainer from "./containers/ThreeFiber";
import { RenderModeProvider } from "@/context/render-mode-context";
import { ShapeProvider } from "@/context/shape-context";
import { ThreeJSProvider } from "@/context/three-js-context";
import { ThreeJSContainer } from "./containers/Three";
export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "with-threejs",
          element: <ThreeJSContainer />,
        },
        {
          path: "with-react-three-fiber",
          element: <ThreeFiberContainer />,
        },
      ],
    },
  ]);

  return (
    <ShapeProvider>
      <RenderModeProvider>
        <ThreeJSProvider>
          <RouterProvider router={router} />{" "}
        </ThreeJSProvider>
      </RenderModeProvider>
    </ShapeProvider>
  );
}
