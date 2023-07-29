/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetListWorkerImages
// ====================================================

export interface GetListWorkerImages_getWorkerImages {
  __typename: "WorkerImage";
  pathFaceInCollection: string | null;
  identification: string | null;
  collectionId: string | null;
  faceId: string | null;
  status: string | null;
  created: string | null;
  modified: string | null;
  entity: string | null;
}

export interface GetListWorkerImages {
  getWorkerImages: (GetListWorkerImages_getWorkerImages | null)[] | null;
}

export interface GetListWorkerImagesVariables {
  identification: string;
}
