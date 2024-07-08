import { expect, it, vi } from "vitest";
import { addSleepEntry } from "../controllers/sleepEntry.controller";
import { describe } from "node:test";

const { mockedInsertOne } = vi.hoisted(() => {
  return {
    mockedInsertOne: vi.fn(),
  };
});

vi.mock("../services/sleepEntry.service", async () => {
  return {
    default: {
      insertOne: mockedInsertOne,
    },
  };
});

describe("addSleepEntry", () => {
  it("should add a sleep entry", async () => {
    mockedInsertOne.mockResolvedValueOnce({ insertedId: "mocked-id" });
    const fellAsleepAt = "2021-01-01T00:00:00Z";
    const wokeUpAt = "2021-01-01T08:00:00Z";

    const result = await addSleepEntry(fellAsleepAt, wokeUpAt);

    expect(result.status).toBe(201);
    expect(result.data).toBe("mocked-id");
  });

  it("should return 400 if missing wokeUpAt", async () => {
    const fellAsleepAt = "2021-01-01T00:00:00Z";

    const result = await addSleepEntry(fellAsleepAt, "");

    expect(result.status).toBe(400);
    expect(result.data).toBe("Missing required fields");
  });

  it("should return 400 if missing fellAsleepAt", async () => {
    const wokeUpAt = "2021-01-01T08:00:00Z";

    const result = await addSleepEntry("", wokeUpAt);

    expect(result.status).toBe(400);
    expect(result.data).toBe("Missing required fields");
  });

  it("should return 400 if date parsing fails", async () => {
    const fellAsleepAt = "invalid-date";
    const wokeUpAt = "2021-01-01T08:00:00Z";

    const result = await addSleepEntry(fellAsleepAt, wokeUpAt);

    expect(result.status).toBe(400);
    expect(result.data).toBe("Invalid date format");
  });

  it("should throw an error if an unexpected error occurs", async () => {
    const errorMessage = "Unexpected error";
    mockedInsertOne.mockRejectedValueOnce(new Error(errorMessage));
    const fellAsleepAt = "2021-01-01T00:00:00Z";
    const wokeUpAt = "2021-01-01T08:00:00Z";

    await expect(addSleepEntry(fellAsleepAt, wokeUpAt)).rejects.toThrow(
      errorMessage
    );
  });
});