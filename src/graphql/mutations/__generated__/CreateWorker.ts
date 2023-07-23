/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WorkerInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateWorker
// ====================================================

export interface CreateWorker_putWorker {
  __typename: "Worker";
  fullName: string;
  identification: string;
  profilePath: string | null;
}

export interface CreateWorker {
  putWorker: CreateWorker_putWorker;
}

export interface CreateWorkerVariables {
  props: WorkerInput;
}
