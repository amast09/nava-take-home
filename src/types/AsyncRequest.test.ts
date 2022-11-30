import {
  asyncRequestCompleted,
  asyncRequestFailed,
  AsyncRequestKinds,
  asyncRequestLoading,
  asyncRequestNotStarted,
  voidAsyncRequestCompleted,
  voidAsyncRequestFailed,
} from "./AsyncRequest";

describe("AsyncRequest", () => {
  describe("asyncRequestNotStarted", () => {
    it("correctly constructs the data structure", () => {
      expect(asyncRequestNotStarted()).toEqual({
        kind: AsyncRequestKinds.NotStarted,
      });
    });
  });

  describe("asyncRequestLoading", () => {
    it("correctly constructs the data structure", () => {
      expect(asyncRequestLoading()).toEqual({
        kind: AsyncRequestKinds.Loading,
      });
    });
  });

  describe("asyncRequestFailed", () => {
    it("correctly constructs the data structure", () => {
      const expectedError = 100;

      expect(asyncRequestFailed(expectedError)).toEqual({
        kind: AsyncRequestKinds.Failed,
        error: expectedError,
      });
    });
  });

  describe("voidAsyncRequestFailed", () => {
    it("correctly constructs the data structure", () => {
      expect(voidAsyncRequestFailed()).toEqual({
        kind: AsyncRequestKinds.Failed,
        error: undefined,
      });
    });
  });

  describe("asyncRequestCompleted", () => {
    it("correctly constructs the data structure", () => {
      const expectedResult = "complete!";

      expect(asyncRequestCompleted(expectedResult)).toEqual({
        kind: AsyncRequestKinds.Completed,
        result: expectedResult,
      });
    });
  });

  describe("voidAsyncRequestCompleted", () => {
    it("correctly constructs the data structure", () => {
      expect(voidAsyncRequestCompleted()).toEqual({
        kind: AsyncRequestKinds.Completed,
        result: undefined,
      });
    });
  });
});
