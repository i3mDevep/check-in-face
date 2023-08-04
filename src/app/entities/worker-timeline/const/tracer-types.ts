export enum TRACER_REASON {
  START_ANY_REASON = 'start any reason',
  START_WORK = 'start work',
  START_LUNCH = 'start lunch',
  END_LUNCH = 'end lunch',
  END_WORK = 'end work',
  END_ANY_REASON = 'end any reason',
}

export const typeWithTracerReason = {
  [TRACER_REASON.START_ANY_REASON]: 'in',
  [TRACER_REASON.START_WORK]: 'in',
  [TRACER_REASON.START_LUNCH]: 'out',
  [TRACER_REASON.END_LUNCH]: 'in',
  [TRACER_REASON.END_WORK]: 'out',
  [TRACER_REASON.END_ANY_REASON]: 'out',
};
