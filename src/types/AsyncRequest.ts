export enum AsyncRequestKinds {
  NotStarted = "NotStarted",
  Loading = "Loading",
  Completed = "Completed",
  Failed = "Failed",
}

interface NotStarted {
  readonly kind: AsyncRequestKinds.NotStarted;
}

interface Loading {
  readonly kind: AsyncRequestKinds.Loading;
}

interface Completed<R> {
  readonly kind: AsyncRequestKinds.Completed;
  readonly result: R;
}

interface Failed<E> {
  readonly kind: AsyncRequestKinds.Failed;
  readonly error: E;
}

type AsyncRequest<R = void, E = void> =
  | Completed<R>
  | Failed<E>
  | Loading
  | NotStarted;

export function asyncRequestNotStarted(): NotStarted {
  return {
    kind: AsyncRequestKinds.NotStarted,
  };
}

export function asyncRequestLoading(): Loading {
  return {
    kind: AsyncRequestKinds.Loading,
  };
}

export function asyncRequestFailed<E>(error: E): Failed<E> {
  return {
    kind: AsyncRequestKinds.Failed,
    error,
  };
}

export function voidAsyncRequestFailed(): Failed<void> {
  return {
    kind: AsyncRequestKinds.Failed,
    error: undefined,
  };
}

export function asyncRequestCompleted<R>(result: R): Completed<R> {
  return {
    kind: AsyncRequestKinds.Completed,
    result,
  };
}

export function voidAsyncRequestCompleted(): Completed<void> {
  return {
    kind: AsyncRequestKinds.Completed,
    result: undefined,
  };
}

export default AsyncRequest;
