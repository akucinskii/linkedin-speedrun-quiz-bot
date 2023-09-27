import { Mock, describe, expect, it, mock } from "bun:test";
import loginToLinkedin from "./loginToLinkedin";
import { AnyFunction } from "bun";

interface Page {
  goto: AnyFunction;
  type: AnyFunction;
  click: AnyFunction;
  waitForNavigation: AnyFunction;
}

const mockedCredentials = {
  username: "USERNAME",
  password: "PASSWORD",
};

const page: Page = {
  goto: mock(() => {}),
  type: mock(() => {}),
  click: mock(() => {}),
  waitForNavigation: mock(() => {}),
};

describe("Login to Linkedin", () => {
  it("should login to linkedin", async () => {
    await loginToLinkedin(
      page as any,
      mockedCredentials.username,
      mockedCredentials.password
    );

    const gotoMock = page.goto as Mock<typeof page.goto>;
    expect(gotoMock.mock.calls[0][0]).toEqual("https://www.linkedin.com/login");
  });

  it("should type username", async () => {
    await loginToLinkedin(
      page as any,
      mockedCredentials.username,
      mockedCredentials.password
    );

    const typeMock = page.type as Mock<typeof page.type>;
    expect(typeMock.mock.calls[0][0]).toEqual("#username");
    expect(typeMock.mock.calls[0][1]).toEqual("USERNAME");
  });

  it("should type password", async () => {
    await loginToLinkedin(
      page as any,
      mockedCredentials.username,
      mockedCredentials.password
    );

    const typeMock = page.type as Mock<typeof page.type>;
    expect(typeMock.mock.calls[1][0]).toEqual("#password");
    expect(typeMock.mock.calls[1][1]).toEqual("PASSWORD");
  });

  it("should click on login button", async () => {
    await loginToLinkedin(
      page as any,
      mockedCredentials.username,
      mockedCredentials.password
    );

    const clickMock = page.click as Mock<typeof page.click>;
    expect(clickMock.mock.calls[0][0]).toEqual(".btn__primary--large");
  });
});
