/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetListWorker
// ====================================================

export interface GetListWorker_getListWorker {
  __typename: "Worker";
  fullName: string;
  identification: string;
  created: string | null;
  modified: string | null;
  entity: string | null;
  profilePath: string | null;
  scheduleWeek: string[] | null;
}

export interface GetListWorker {
  getListWorker: (GetListWorker_getListWorker | null)[] | null;
}
