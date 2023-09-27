import supertest from "supertest";

import app from "./../src/app";
import prisma from "../src/database";

const api = supertest(app);

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("POST /users tests", () => {
  it("should create a user", async () => {
    const newUser = {
      email: "test@example.com",
      password: "password123",
    };

    const response = await api.post("/users").send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.email).toBe(newUser.email);
  });

  it("should receive 409 when trying to create two users with same e-mail", async () => {
    const newUser = {
      email: "test@example.com",
      password: "password123",
    };

    await api.post("/users").send(newUser);
    const response = await api.post("/users").send(newUser);

    expect(response.status).toBe(409);
  });

});

describe("GET /users tests", () => {
  it("should return a single user", async () => {
    const newUser = {
      email: "test@example.com",
      password: "password123",
    };

    const createResponse = await api.post("/users").send(newUser);

    const response = await api.get(`/users/${createResponse.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.email).toBe(newUser.email);
  });

  it("should return 404 when can't find a user by id", async () => {
    const response = await api.get("/users/12345");

    expect(response.status).toBe(404);
  });

  it("should return all users", async () => {
    const newUser1 = {
      email: "user1@example.com",
      password: "password123",
    };

    const newUser2 = {
      email: "user2@example.com",
      password: "password123",
    };

    await api.post("/users").send(newUser1);
    await api.post("/users").send(newUser2);

    const response = await api.get("/users");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

})