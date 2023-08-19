import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type DisassociateWorkerImagesInput = {
  faceIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  identification: Scalars['ID']['input'];
};

export type GenerateWorkerPaymentQueryInput = {
  end: Scalars['String']['input'];
  holidays?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  identification: Scalars['ID']['input'];
  start: Scalars['String']['input'];
};

export type IntervalNonNightInput = {
  since?: InputMaybe<Scalars['Int']['input']>;
  until?: InputMaybe<Scalars['Int']['input']>;
};

export type IntervalNonNightType = {
  __typename?: 'IntervalNonNightType';
  since?: Maybe<Scalars['Int']['output']>;
  until?: Maybe<Scalars['Int']['output']>;
};

export type IntervalWorkerTime = {
  __typename?: 'IntervalWorkerTime';
  end?: Maybe<Scalars['ID']['output']>;
  minutes?: Maybe<Scalars['Int']['output']>;
  minutesFormatter?: Maybe<MinutesFormatter>;
  position?: Maybe<PositionInterval>;
  start?: Maybe<Scalars['String']['output']>;
};

export type IntervalWorkerTimeQueryInput = {
  end: Scalars['String']['input'];
  identification: Scalars['ID']['input'];
  start: Scalars['String']['input'];
};

export type MarkRecordWorkerInput = {
  dateRegister: Scalars['String']['input'];
  force?: InputMaybe<Scalars['Boolean']['input']>;
  imageKey: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type MinutesFormatter = {
  __typename?: 'MinutesFormatter';
  hours?: Maybe<Scalars['Int']['output']>;
  minutes?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  disassociateWorkerImages?: Maybe<Scalars['Boolean']['output']>;
  markRecordWorker?: Maybe<Worker>;
  putTemplatePayment?: Maybe<Scalars['Boolean']['output']>;
  putWorker?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationDisassociateWorkerImagesArgs = {
  props?: InputMaybe<DisassociateWorkerImagesInput>;
};


export type MutationMarkRecordWorkerArgs = {
  props?: InputMaybe<MarkRecordWorkerInput>;
};


export type MutationPutTemplatePaymentArgs = {
  props?: InputMaybe<TemplatePaymentInput>;
};


export type MutationPutWorkerArgs = {
  props?: InputMaybe<WorkerInput>;
};

export type PaymentValues = {
  __typename?: 'PaymentValues';
  paymentHoursBasic?: Maybe<Scalars['Float']['output']>;
  surcharges?: Maybe<PaymentValuesSurcharges>;
};

export type PaymentValuesSurcharges = {
  __typename?: 'PaymentValuesSurcharges';
  paymentHoursExtra?: Maybe<Scalars['Float']['output']>;
  paymentHoursNight?: Maybe<Scalars['Float']['output']>;
};

export type PaymentWorkerTime = {
  __typename?: 'PaymentWorkerTime';
  day?: Maybe<Scalars['String']['output']>;
  hoursNight?: Maybe<Scalars['Float']['output']>;
  hoursWorked?: Maybe<Scalars['Float']['output']>;
  hoursWorkedBasic?: Maybe<Scalars['Float']['output']>;
  hoursWorkedExtra?: Maybe<Scalars['Float']['output']>;
  payment?: Maybe<PaymentValues>;
};

export type PositionInterval = {
  __typename?: 'PositionInterval';
  height?: Maybe<Scalars['Float']['output']>;
  top?: Maybe<Scalars['Float']['output']>;
};

export type Query = {
  __typename?: 'Query';
  generateWorkerPayment?: Maybe<Array<Maybe<PaymentWorkerTime>>>;
  getDetailWorker?: Maybe<Worker>;
  getListWorker?: Maybe<Array<Maybe<Worker>>>;
  getListWorkerMarkTime?: Maybe<Array<Maybe<WorkerMarkTime>>>;
  getPaymentTemplate?: Maybe<TemplatePaymentType>;
  getWorkerImages?: Maybe<Array<Maybe<WorkerImage>>>;
  getWorkerIntervalsTime?: Maybe<Array<Maybe<IntervalWorkerTime>>>;
};


export type QueryGenerateWorkerPaymentArgs = {
  query: GenerateWorkerPaymentQueryInput;
};


export type QueryGetDetailWorkerArgs = {
  identification: Scalars['ID']['input'];
};


export type QueryGetListWorkerMarkTimeArgs = {
  query: WorkerMarkTimeQuery;
};


export type QueryGetWorkerImagesArgs = {
  identification: Scalars['ID']['input'];
};


export type QueryGetWorkerIntervalsTimeArgs = {
  query: IntervalWorkerTimeQueryInput;
};

export type TemplatePaymentInput = {
  baseHourDay?: InputMaybe<Scalars['Float']['input']>;
  baseHourHoliday?: InputMaybe<Scalars['Float']['input']>;
  extraHourHoliday?: InputMaybe<Scalars['Float']['input']>;
  extraHourNormalDay?: InputMaybe<Scalars['Float']['input']>;
  hoursMinimum?: InputMaybe<Scalars['Float']['input']>;
  intervalNonNight?: InputMaybe<IntervalNonNightInput>;
  nocturnHourHoliday?: InputMaybe<Scalars['Float']['input']>;
  nocturnHourNormalDay?: InputMaybe<Scalars['Float']['input']>;
};

export type TemplatePaymentType = {
  __typename?: 'TemplatePaymentType';
  baseHourDay?: Maybe<Scalars['Float']['output']>;
  baseHourHoliday?: Maybe<Scalars['Float']['output']>;
  extraHourHoliday?: Maybe<Scalars['Float']['output']>;
  extraHourNormalDay?: Maybe<Scalars['Float']['output']>;
  hoursMinimum?: Maybe<Scalars['Float']['output']>;
  intervalNonNight?: Maybe<IntervalNonNightType>;
  nocturnHourHoliday?: Maybe<Scalars['Float']['output']>;
  nocturnHourNormalDay?: Maybe<Scalars['Float']['output']>;
};

export type Worker = {
  __typename?: 'Worker';
  created?: Maybe<Scalars['String']['output']>;
  entity?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  identification?: Maybe<Scalars['ID']['output']>;
  modified?: Maybe<Scalars['String']['output']>;
  profilePath?: Maybe<Scalars['String']['output']>;
};

export type WorkerImage = {
  __typename?: 'WorkerImage';
  collectionId?: Maybe<Scalars['String']['output']>;
  created?: Maybe<Scalars['String']['output']>;
  entity?: Maybe<Scalars['String']['output']>;
  faceId?: Maybe<Scalars['String']['output']>;
  identification?: Maybe<Scalars['String']['output']>;
  modified?: Maybe<Scalars['String']['output']>;
  pathFaceInCollection?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type WorkerImagesKeys = {
  __typename?: 'WorkerImagesKeys';
  faceIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  identification: Scalars['ID']['output'];
};

export type WorkerInput = {
  fullName?: InputMaybe<Scalars['String']['input']>;
  identification: Scalars['ID']['input'];
  isPatch?: InputMaybe<Scalars['Boolean']['input']>;
  profilePath?: InputMaybe<Scalars['String']['input']>;
};

export type WorkerMarkTime = {
  __typename?: 'WorkerMarkTime';
  created?: Maybe<Scalars['String']['output']>;
  dateRegister?: Maybe<Scalars['String']['output']>;
  entity?: Maybe<Scalars['String']['output']>;
  identification?: Maybe<Scalars['String']['output']>;
  modified?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type WorkerMarkTimeQuery = {
  day?: InputMaybe<Scalars['String']['input']>;
  identification: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  month: Scalars['String']['input'];
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  year: Scalars['String']['input'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DisassociateWorkerImagesInput: DisassociateWorkerImagesInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GenerateWorkerPaymentQueryInput: GenerateWorkerPaymentQueryInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  IntervalNonNightInput: IntervalNonNightInput;
  IntervalNonNightType: ResolverTypeWrapper<IntervalNonNightType>;
  IntervalWorkerTime: ResolverTypeWrapper<IntervalWorkerTime>;
  IntervalWorkerTimeQueryInput: IntervalWorkerTimeQueryInput;
  MarkRecordWorkerInput: MarkRecordWorkerInput;
  MinutesFormatter: ResolverTypeWrapper<MinutesFormatter>;
  Mutation: ResolverTypeWrapper<{}>;
  PaymentValues: ResolverTypeWrapper<PaymentValues>;
  PaymentValuesSurcharges: ResolverTypeWrapper<PaymentValuesSurcharges>;
  PaymentWorkerTime: ResolverTypeWrapper<PaymentWorkerTime>;
  PositionInterval: ResolverTypeWrapper<PositionInterval>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TemplatePaymentInput: TemplatePaymentInput;
  TemplatePaymentType: ResolverTypeWrapper<TemplatePaymentType>;
  Worker: ResolverTypeWrapper<Worker>;
  WorkerImage: ResolverTypeWrapper<WorkerImage>;
  WorkerImagesKeys: ResolverTypeWrapper<WorkerImagesKeys>;
  WorkerInput: WorkerInput;
  WorkerMarkTime: ResolverTypeWrapper<WorkerMarkTime>;
  WorkerMarkTimeQuery: WorkerMarkTimeQuery;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  DisassociateWorkerImagesInput: DisassociateWorkerImagesInput;
  Float: Scalars['Float']['output'];
  GenerateWorkerPaymentQueryInput: GenerateWorkerPaymentQueryInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  IntervalNonNightInput: IntervalNonNightInput;
  IntervalNonNightType: IntervalNonNightType;
  IntervalWorkerTime: IntervalWorkerTime;
  IntervalWorkerTimeQueryInput: IntervalWorkerTimeQueryInput;
  MarkRecordWorkerInput: MarkRecordWorkerInput;
  MinutesFormatter: MinutesFormatter;
  Mutation: {};
  PaymentValues: PaymentValues;
  PaymentValuesSurcharges: PaymentValuesSurcharges;
  PaymentWorkerTime: PaymentWorkerTime;
  PositionInterval: PositionInterval;
  Query: {};
  String: Scalars['String']['output'];
  TemplatePaymentInput: TemplatePaymentInput;
  TemplatePaymentType: TemplatePaymentType;
  Worker: Worker;
  WorkerImage: WorkerImage;
  WorkerImagesKeys: WorkerImagesKeys;
  WorkerInput: WorkerInput;
  WorkerMarkTime: WorkerMarkTime;
  WorkerMarkTimeQuery: WorkerMarkTimeQuery;
};

export type Aws_Api_KeyDirectiveArgs = { };

export type Aws_Api_KeyDirectiveResolver<Result, Parent, ContextType = any, Args = Aws_Api_KeyDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Aws_AuthDirectiveArgs = {
  cognito_groups?: Maybe<Array<Maybe<Scalars['String']['input']>>>;
};

export type Aws_AuthDirectiveResolver<Result, Parent, ContextType = any, Args = Aws_AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Aws_Cognito_User_PoolsDirectiveArgs = {
  cognito_groups?: Maybe<Array<Maybe<Scalars['String']['input']>>>;
};

export type Aws_Cognito_User_PoolsDirectiveResolver<Result, Parent, ContextType = any, Args = Aws_Cognito_User_PoolsDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Aws_IamDirectiveArgs = { };

export type Aws_IamDirectiveResolver<Result, Parent, ContextType = any, Args = Aws_IamDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Aws_LambdaDirectiveArgs = { };

export type Aws_LambdaDirectiveResolver<Result, Parent, ContextType = any, Args = Aws_LambdaDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Aws_OidcDirectiveArgs = { };

export type Aws_OidcDirectiveResolver<Result, Parent, ContextType = any, Args = Aws_OidcDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Aws_PublishDirectiveArgs = {
  subscriptions?: Maybe<Array<Maybe<Scalars['String']['input']>>>;
};

export type Aws_PublishDirectiveResolver<Result, Parent, ContextType = any, Args = Aws_PublishDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Aws_SubscribeDirectiveArgs = {
  mutations?: Maybe<Array<Maybe<Scalars['String']['input']>>>;
};

export type Aws_SubscribeDirectiveResolver<Result, Parent, ContextType = any, Args = Aws_SubscribeDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type DeferDirectiveArgs = { };

export type DeferDirectiveResolver<Result, Parent, ContextType = any, Args = DeferDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IntervalNonNightTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['IntervalNonNightType'] = ResolversParentTypes['IntervalNonNightType']> = {
  since?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  until?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IntervalWorkerTimeResolvers<ContextType = any, ParentType extends ResolversParentTypes['IntervalWorkerTime'] = ResolversParentTypes['IntervalWorkerTime']> = {
  end?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  minutes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minutesFormatter?: Resolver<Maybe<ResolversTypes['MinutesFormatter']>, ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['PositionInterval']>, ParentType, ContextType>;
  start?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MinutesFormatterResolvers<ContextType = any, ParentType extends ResolversParentTypes['MinutesFormatter'] = ResolversParentTypes['MinutesFormatter']> = {
  hours?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minutes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  disassociateWorkerImages?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, Partial<MutationDisassociateWorkerImagesArgs>>;
  markRecordWorker?: Resolver<Maybe<ResolversTypes['Worker']>, ParentType, ContextType, Partial<MutationMarkRecordWorkerArgs>>;
  putTemplatePayment?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, Partial<MutationPutTemplatePaymentArgs>>;
  putWorker?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, Partial<MutationPutWorkerArgs>>;
};

export type PaymentValuesResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentValues'] = ResolversParentTypes['PaymentValues']> = {
  paymentHoursBasic?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  surcharges?: Resolver<Maybe<ResolversTypes['PaymentValuesSurcharges']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentValuesSurchargesResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentValuesSurcharges'] = ResolversParentTypes['PaymentValuesSurcharges']> = {
  paymentHoursExtra?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  paymentHoursNight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentWorkerTimeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentWorkerTime'] = ResolversParentTypes['PaymentWorkerTime']> = {
  day?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hoursNight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  hoursWorked?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  hoursWorkedBasic?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  hoursWorkedExtra?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  payment?: Resolver<Maybe<ResolversTypes['PaymentValues']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PositionIntervalResolvers<ContextType = any, ParentType extends ResolversParentTypes['PositionInterval'] = ResolversParentTypes['PositionInterval']> = {
  height?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  top?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  generateWorkerPayment?: Resolver<Maybe<Array<Maybe<ResolversTypes['PaymentWorkerTime']>>>, ParentType, ContextType, RequireFields<QueryGenerateWorkerPaymentArgs, 'query'>>;
  getDetailWorker?: Resolver<Maybe<ResolversTypes['Worker']>, ParentType, ContextType, RequireFields<QueryGetDetailWorkerArgs, 'identification'>>;
  getListWorker?: Resolver<Maybe<Array<Maybe<ResolversTypes['Worker']>>>, ParentType, ContextType>;
  getListWorkerMarkTime?: Resolver<Maybe<Array<Maybe<ResolversTypes['WorkerMarkTime']>>>, ParentType, ContextType, RequireFields<QueryGetListWorkerMarkTimeArgs, 'query'>>;
  getPaymentTemplate?: Resolver<Maybe<ResolversTypes['TemplatePaymentType']>, ParentType, ContextType>;
  getWorkerImages?: Resolver<Maybe<Array<Maybe<ResolversTypes['WorkerImage']>>>, ParentType, ContextType, RequireFields<QueryGetWorkerImagesArgs, 'identification'>>;
  getWorkerIntervalsTime?: Resolver<Maybe<Array<Maybe<ResolversTypes['IntervalWorkerTime']>>>, ParentType, ContextType, RequireFields<QueryGetWorkerIntervalsTimeArgs, 'query'>>;
};

export type TemplatePaymentTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TemplatePaymentType'] = ResolversParentTypes['TemplatePaymentType']> = {
  baseHourDay?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  baseHourHoliday?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  extraHourHoliday?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  extraHourNormalDay?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  hoursMinimum?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  intervalNonNight?: Resolver<Maybe<ResolversTypes['IntervalNonNightType']>, ParentType, ContextType>;
  nocturnHourHoliday?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  nocturnHourNormalDay?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Worker'] = ResolversParentTypes['Worker']> = {
  created?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  entity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  identification?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  modified?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profilePath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkerImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkerImage'] = ResolversParentTypes['WorkerImage']> = {
  collectionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  entity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  faceId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  identification?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  modified?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pathFaceInCollection?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkerImagesKeysResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkerImagesKeys'] = ResolversParentTypes['WorkerImagesKeys']> = {
  faceIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  identification?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkerMarkTimeResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkerMarkTime'] = ResolversParentTypes['WorkerMarkTime']> = {
  created?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dateRegister?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  entity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  identification?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  modified?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  IntervalNonNightType?: IntervalNonNightTypeResolvers<ContextType>;
  IntervalWorkerTime?: IntervalWorkerTimeResolvers<ContextType>;
  MinutesFormatter?: MinutesFormatterResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PaymentValues?: PaymentValuesResolvers<ContextType>;
  PaymentValuesSurcharges?: PaymentValuesSurchargesResolvers<ContextType>;
  PaymentWorkerTime?: PaymentWorkerTimeResolvers<ContextType>;
  PositionInterval?: PositionIntervalResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  TemplatePaymentType?: TemplatePaymentTypeResolvers<ContextType>;
  Worker?: WorkerResolvers<ContextType>;
  WorkerImage?: WorkerImageResolvers<ContextType>;
  WorkerImagesKeys?: WorkerImagesKeysResolvers<ContextType>;
  WorkerMarkTime?: WorkerMarkTimeResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  aws_api_key?: Aws_Api_KeyDirectiveResolver<any, any, ContextType>;
  aws_auth?: Aws_AuthDirectiveResolver<any, any, ContextType>;
  aws_cognito_user_pools?: Aws_Cognito_User_PoolsDirectiveResolver<any, any, ContextType>;
  aws_iam?: Aws_IamDirectiveResolver<any, any, ContextType>;
  aws_lambda?: Aws_LambdaDirectiveResolver<any, any, ContextType>;
  aws_oidc?: Aws_OidcDirectiveResolver<any, any, ContextType>;
  aws_publish?: Aws_PublishDirectiveResolver<any, any, ContextType>;
  aws_subscribe?: Aws_SubscribeDirectiveResolver<any, any, ContextType>;
  defer?: DeferDirectiveResolver<any, any, ContextType>;
};
