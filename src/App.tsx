import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./containers/Home";
import ThreeFiberContainer from "./containers/ThreeFiber";
import ThreeJSContainer from "./containers/Three";
import { RenderModeProvider } from "@/context/render-mode-context";
import { ShapeProvider} from "@/context/shape-context";
import { ThreeJSProvider } from "@/context/three-js-context";
import { useShapeManager } from "./hooks/use-shape-manager";

const App: React.FC = () => {
  const shapeManager = useShapeManager();

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
          element: <ThreeJSContainer shapeManager={shapeManager} />,
        },
        {
          path: "with-react-three-fiber",
          element: <ThreeFiberContainer shapeManager={shapeManager} />,
        },
      ],
    },
  ]);

  return (
    <ShapeProvider>
      <RenderModeProvider>
        <ThreeJSProvider>
          <RouterProvider router={router} />
        </ThreeJSProvider>
      </RenderModeProvider>
    </ShapeProvider>
  );
};

export default App;
