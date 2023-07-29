/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WorkerMarkTimeQuery } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetListWorkerMarkTime
// ====================================================

export interface GetListWorkerMarkTime_getListWorkerMarkTime {
  __typename: "WorkerMarkTime";
  dateRegister: string | null;
  identification: string | null;
  type: string | null;
  reason: string | null;
  picture: string | null;
  created: string | null;
  modified: string | null;
  entity: string | null;
}

export interface GetListWorkerMarkTime {
  getListWorkerMarkTime: (GetListWorkerMarkTime_getListWorkerMarkTime | null)[] | null;
}

export interface GetListWorkerMarkTimeVariables {
  query: WorkerMarkTimeQuery;
}
