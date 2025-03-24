export type PickSome<T, K extends keyof T> = {
  [P in K]: T[P];
};
