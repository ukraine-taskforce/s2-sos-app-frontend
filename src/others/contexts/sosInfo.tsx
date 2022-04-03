import React from "react";

export interface SosInfoI {
  phoneNumber: string | undefined;
  emergencyCode: string;
  name?: string;
  location?: string;
}

export interface SosInfoContextValue {
  currentValue: SosInfoI;
  updateValue: (values: { [x: string]: any }) => void;
  clearStore: () => void;
}

const defaultValue: SosInfoI = {
  phoneNumber: undefined,
  emergencyCode: "1"
};

const SosInfoContext = React.createContext<SosInfoContextValue>({
  currentValue: defaultValue,
  updateValue: () => {},
  clearStore: () => {},
});

export function useSosInfoContext() {
  return React.useContext(SosInfoContext);
}

export const SosInfoContextProvider: React.FunctionComponent = ({ children }) => {
  const [currentValue, setCurrentValue] = React.useState<SosInfoI>(defaultValue);

  const updateValue = React.useCallback(
    (values: { [x: string]: any }) => {
      setCurrentValue({
        ...currentValue,
        ...values
      });
    },
    [currentValue, setCurrentValue]
  );

  const clearStore = React.useCallback(() => {
    setCurrentValue(defaultValue);
  }, [setCurrentValue]);

  return (
    <SosInfoContext.Provider
      value={{
        currentValue,
        updateValue,
        clearStore,
      }}
    >
      {children}
    </SosInfoContext.Provider>
  );
};
