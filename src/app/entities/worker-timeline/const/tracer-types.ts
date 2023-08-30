export enum TRACER_REASON {
  START_WORK = 'Empezar Jornada Laboral',
  START_LUNCH = 'Empezar Almuerzo',
  END_LUNCH = 'Terminar Almuerzo',
  END_WORK = 'Terminar Jornada Laboral',
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
  [TRACER_REASON.START_WORK]: 'in',
  [TRACER_REASON.START_LUNCH]: 'out',
  [TRACER_REASON.END_LUNCH]: 'in',
  [TRACER_REASON.END_WORK]: 'out',
};
