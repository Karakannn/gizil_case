import React, { createContext, useContext, useState } from "react";

interface RenderModeContextProps {
  renderMode: boolean;
  setRenderMode: (mode: boolean) => void;
  singleRender: boolean;
  setSingleRender: (mode: boolean) => void;
}

const RenderModeContext = createContext<RenderModeContextProps | undefined>(undefined);

export const RenderModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [renderMode, setRenderMode] = useState(false);
  const [singleRender, setSingleRender] = useState(false);

  return <RenderModeContext.Provider value={{ renderMode, setRenderMode, singleRender, setSingleRender }}>{children}</RenderModeContext.Provider>;
};

export const useRenderModeContext = () => {
  const context = useContext(RenderModeContext);
  if (!context) {
    throw new Error("useRenderModeContext must be used within a RenderModeProvider");
  }
  return context;
};
