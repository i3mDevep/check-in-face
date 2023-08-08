export interface GetListWorker_getDetailWorker {
  __typename: 'Worker';
  fullName: string;
  identification: string;
  created: string | null;
  modified: string | null;
  entity: string | null;
  profilePath: string | null;
}

export interface GetDetailWorker {
  getDetailWorker: GetListWorker_getDetailWorker | null;
}

export interface GetDetailWorkerVariables {
  identification: string;
}
