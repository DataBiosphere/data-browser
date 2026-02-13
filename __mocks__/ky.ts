/**
 * Mock implementation of ky HTTP client for testing.
 *
 * This mock provides the minimal structure needed to allow imports to resolve.
 * The tests don't make actual HTTP calls - they test view model builder functions.
 * @returns Mock ky instance.
 */
const mockKyInstance = {
  get: jest.fn().mockReturnValue({
    json: jest.fn().mockResolvedValue({}),
    text: jest.fn().mockResolvedValue(""),
  }),
  post: jest.fn().mockReturnValue({
    json: jest.fn().mockResolvedValue({}),
    text: jest.fn().mockResolvedValue(""),
  }),
};

const mockKy = Object.assign(
  jest.fn().mockReturnValue({
    json: jest.fn().mockResolvedValue({}),
    text: jest.fn().mockResolvedValue(""),
  }),
  {
    create: jest.fn().mockReturnValue(mockKyInstance),
    get: mockKyInstance.get,
    post: mockKyInstance.post,
  }
);

export default mockKy;
