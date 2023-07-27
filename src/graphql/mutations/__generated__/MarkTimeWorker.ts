/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MarkRecordWorkerInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: MarkTimeWorker
// ====================================================

export interface MarkTimeWorker_markRecordWorker {
  __typename: "Worker";
  identification: string;
  fullName: string;
}

export interface MarkTimeWorker {
  markRecordWorker: MarkTimeWorker_markRecordWorker | null;
}

export interface MarkTimeWorkerVariables {
  props: MarkRecordWorkerInput;
}
