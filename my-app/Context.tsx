import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

// Define the type for the context value
interface FitnessContextType {
  completed: any[]; // Adjust this type based on your data structure
  setCompleted: Dispatch<SetStateAction<any[]>>;
  workout: number;
  setWorkout: Dispatch<SetStateAction<number>>;
  calories: number;
  setCalories: Dispatch<SetStateAction<number>>;
  minutes: number;
  setMinutes: Dispatch<SetStateAction<number>>;
}

// Create the context with a default value
const FitnessItemsContext = createContext<FitnessContextType | undefined>(undefined);

const FitnessContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [completed, setCompleted] = useState<any[]>([]);
  const [workout, setWorkout] = useState<number>(0);
  const [calories, setCalories] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

  return (
    <FitnessItemsContext.Provider
      value={{
        completed,
        setCompleted,
        workout,
        setWorkout,
        calories,
        setCalories,
        minutes,
        setMinutes,
      }}
    >
      {children}
    </FitnessItemsContext.Provider>
  );
};

export { FitnessContextProvider, FitnessItemsContext };
