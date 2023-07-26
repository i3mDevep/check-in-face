import { GetListWorker_getListWorker } from 'src/graphql/queries/__generated__/GetListWorker';

export interface StateIdentification {
  workerSelected: null | GetListWorker_getListWorker;
}

export enum SelectedActionType {
  SELECT,
}

export interface AddAction {
  type: SelectedActionType.SELECT;
  payload: null | GetListWorker_getListWorker;
}

export const initialStateIdentification: StateIdentification = {
  workerSelected: null,
};


export type Action = AddAction;

export function reducer(
  StateIdentification: StateIdentification,
  action: Action
): StateIdentification {
  const { type, payload } = action;
  switch (type) {
    case SelectedActionType.SELECT:
      return { ...StateIdentification, workerSelected: payload };
    default:
      throw new Error('Incorrect action in IdentificationProvider reducer');
  }
}
