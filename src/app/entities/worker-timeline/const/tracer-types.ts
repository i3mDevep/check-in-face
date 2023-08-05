export enum TRACER_REASON {
  START_ANY_REASON = 'start any reason',
  START_WORK = 'start work',
  START_LUNCH = 'start lunch',
  END_LUNCH = 'end lunch',
  END_WORK = 'end work',
  END_ANY_REASON = 'end any reason',
}

export enum TRACER_REASON_MANUAL {
  START_WORK_MANUAL = 'start work - manual',
  END_WORK_MANUAL = 'end work - manual',
}

export const typeWithTracerReasonManual = {
  [TRACER_REASON_MANUAL.END_WORK_MANUAL]: 'out',
  [TRACER_REASON_MANUAL.START_WORK_MANUAL]: 'in',
};

export const typeWithTracerReason = {
  [TRACER_REASON.START_ANY_REASON]: 'in',
  [TRACER_REASON.START_WORK]: 'in',
  [TRACER_REASON.START_LUNCH]: 'out',
  [TRACER_REASON.END_LUNCH]: 'in',
  [TRACER_REASON.END_WORK]: 'out',
  [TRACER_REASON.END_ANY_REASON]: 'out',
};
