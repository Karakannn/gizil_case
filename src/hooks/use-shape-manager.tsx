import { useState, useEffect } from "react";

export interface Shape {
  id: string;
  name: string;
  shapeType: string;
  position: [number, number, number];
  scale: [number, number, number];
}

export const useShapeManager = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);

  useEffect(() => {
    const storedShapes = JSON.parse(localStorage.getItem("shapes") || "[]") as Shape[];
    setShapes(storedShapes);
  }, []);

  const createShape = (name: string, shapeType: string) => {
    const newShape: Shape = {
      id: Date.now().toString(),
      name,
      shapeType,
      position: [shapes.length * 2, 0, 0],
      scale: [1, 1, 1],
    };
    const updatedShapes = [...shapes, newShape];
    setShapes(updatedShapes);
    localStorage.setItem("shapes", JSON.stringify(updatedShapes));
  };

  const deleteShape = (shape: Shape) => {
    const updatedShapes = shapes.filter((s) => s.id !== shape.id);
    setShapes(updatedShapes);
    localStorage.setItem("shapes", JSON.stringify(updatedShapes));
  };

  const updateShape = (updatedShape: Shape) => {
    const updatedShapes = shapes.map((shape) => (shape.id === updatedShape.id ? updatedShape : shape));
    setShapes(updatedShapes);
    localStorage.setItem("shapes", JSON.stringify(updatedShapes));
  };

  const handleShapeSelect = (shape: Shape | null) => {
    setSelectedShape(shape);
  };

  const handleScaleChange = (axis: string, value: number) => {
    if (selectedShape) {
      const newScale = [...selectedShape.scale];
      if (axis === "x") newScale[0] = value;
      if (axis === "y") newScale[1] = value;
      if (axis === "z") newScale[2] = value;
      const updatedShape = { ...selectedShape, scale: newScale as [number, number, number] };
      setSelectedShape(updatedShape);
      updateShape(updatedShape);
    }
  };

  const handlePositionChange = (axis: string, value: number) => {
    if (selectedShape) {
      const newPosition = [...selectedShape.position];
      if (axis === "x") newPosition[0] = value;
      if (axis === "y") newPosition[1] = value;
      if (axis === "z") newPosition[2] = value;
      const updatedShape = { ...selectedShape, position: newPosition as [number, number, number] };
      setSelectedShape(updatedShape);
      updateShape(updatedShape);
    }
  };

  return {
    shapes,
    selectedShape,
    createShape,
    deleteShape,
    handleShapeSelect,
    handleScaleChange,
    handlePositionChange,
  };
};
