/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface DisassociateWorkerImagesInput {
  identification: string;
  faceIds?: (string | null)[] | null;
}

export interface MarkRecordWorkerInput {
  dateRegister: string;
  imageKey: string;
  reason: string;
  type: string;
  force?: boolean
}

export interface WorkerInput {
  fullName?: string;
  identification: string;
  profilePath?: string | null;
  scheduleWeek?: string[]
  isPatch?: boolean;
}

export interface WorkerMarkTimeQuery {
  identification: string;
  year: string;
  month: string;
  day?: string | null;
  limit?: number;
  reverse?: boolean;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
