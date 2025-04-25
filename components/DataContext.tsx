import React, { createContext, useContext, useState } from "react";

interface DataContextType {
  data: string[];
  setData: React.Dispatch<React.SetStateAction<string[]>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within provider");
  }

  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<string[]>([]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
