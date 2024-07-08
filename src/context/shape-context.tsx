import React, { createContext, useContext} from "react";
import { Shape, useShapeManager } from "@/hooks/use-shape-manager";

interface ShapeContextProps {
  shapes: Shape[];
  selectedShape: Shape | null;
  handleShapeSelect: (shape: Shape | null) => void;
  createShape: (name: string, shapeType: string) => void;
  deleteShape: (shape: Shape) => void;
  handleScaleChange: (axis: string, value: number) => void;
  handlePositionChange: (axis: string, value: number) => void;
}

const ShapeContext = createContext<ShapeContextProps | undefined>(undefined);

export const ShapeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { shapes, selectedShape, createShape, deleteShape, handleShapeSelect, handleScaleChange, handlePositionChange } = useShapeManager();

  return (
    <ShapeContext.Provider value={{ shapes, selectedShape, handleShapeSelect, createShape, deleteShape, handleScaleChange, handlePositionChange }}>
      {children}
    </ShapeContext.Provider>
  );
};

export const useShapeContext = () => {
  const context = useContext(ShapeContext);
  if (!context) {
    throw new Error("useShapeContext must be used within a ShapeProvider");
  }
  return context;
};
