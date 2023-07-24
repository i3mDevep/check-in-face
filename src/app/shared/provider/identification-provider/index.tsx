import { ReactNode, createContext, useContext, useReducer } from 'react';
import {
  AddAction,
  StateIdentification,
  initialStateIdentification,
  reducer,
} from './state';

export const IdentificationStateContext = createContext<
  StateIdentification | undefined
>(initialStateIdentification);

export const IdentificationDispatchContext = createContext<
  React.Dispatch<AddAction> | undefined
>(undefined);

export const IdentificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialStateIdentification);

  return (
    <IdentificationDispatchContext.Provider value={dispatch}>
      <IdentificationStateContext.Provider value={state}>
        {children}
      </IdentificationStateContext.Provider>
    </IdentificationDispatchContext.Provider>
  );
};

export const useIdentificationState = () => {
  const context = useContext(IdentificationStateContext);
  if (!context) {
    throw new Error(
      'Use useIdentificationState hook inside IdentificationProvider.'
    );
  }
  return context;
};

export const useIdentificationDispatch = () => {
  const context = useContext(IdentificationDispatchContext);
  if (!context) {
    throw new Error(
      'Use useIdentificationDispatch hook inside IdentificationProvider.'
    );
  }
  return context;
};
