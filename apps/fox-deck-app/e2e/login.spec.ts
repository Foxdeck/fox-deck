import { test } from "@playwright/test";
import { LoginPage } from "./pages/login.page";

test("login should fail, because email and password does not match.", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  await loginPage.typeEmail("fail@testmail.com");
  await loginPage.typePassword("fail");

  await loginPage.clickLogin();

  await loginPage.expectToBeOnLoginPage();
  await loginPage.expectLoginError();
});
