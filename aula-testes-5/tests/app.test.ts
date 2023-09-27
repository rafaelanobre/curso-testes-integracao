import supertest from "supertest";

import app from "./../src/app";

const api = supertest(app);

describe("API test", () => {
  it("should return 200 when ask /health", async () => {
    const { status, text } = await api.get("/health");
    expect(status).toBe(200);
    expect(text).toBe("OK!");
  })
})

describe("Fibonacci test", () => {
  it("should return 200 when ask /fibonacci", async () => {
    const { status, body } = await api.get("/fibonacci?elements=3");
    expect(status).toBe(200);
    expect(body).toEqual(expect.arrayContaining([0,1]));
  })
})