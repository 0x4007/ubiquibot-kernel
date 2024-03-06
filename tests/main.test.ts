// import { mainModule } from "../static/main";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "@jest/globals";
import { db } from "./__mocks__/db";
import { server } from "./__mocks__/node";
import usersGet from "./__mocks__/users-get.json";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("User tests", () => {
  beforeEach(() => {
    for (const item of usersGet) {
      db.users.create(item);
    }
  });

  it("Should fetch all the users", async () => {
    const res = await fetch("https://api.ubiquity.com/users");
    const data = await res.json();
    expect(data).toMatchObject(usersGet);
    // expect(async () => await mainModule()).not.toThrow();
  });
});
