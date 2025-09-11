type ResultState = 'success' | 'success-cached' | 'temporary-failure' | 'critical-failure';
type APIResult<T> = {
  state: ResultState;
  data?: T;
  message?: string;
};

export type { ResultState, APIResult, };
