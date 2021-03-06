import React from "react";
import {getSosInfoStorage} from "../storage/sosInfoStorage";

export interface SosInfoI {
  phoneNumber: string | undefined;
  emergencyCode: string;
  name?: string;
  addressComment?: string;
  address?: string;
  geolocation?: {
    latitude: number,
    longitude: number,
    accuracy: number
  };
  requestPending: boolean;
  termsAccepted: boolean;
}

export interface SosInfoContextValue {
  currentValue: SosInfoI;
  updateValue: (values: { [x: string]: any }) => void;
  clearStore: () => void;
}

const defaultValue: SosInfoI = {
  phoneNumber: undefined,
  emergencyCode: "1",
  requestPending: false,
  termsAccepted: false,
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
  const [currentValue, setCurrentValue] = React.useState<SosInfoI>(() => {
    const localStorageInfo = getSosInfoStorage();
    if(localStorageInfo) return localStorageInfo;

    return defaultValue;
  });

  const updateValue = React.useCallback(
    (values: { [x: string]: any }) => {
      setCurrentValue({
        ...currentValue,
        ...values,
        geolocation: {
          ...currentValue.geolocation,
          ...values.geolocation,
        },
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
