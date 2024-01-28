import { test, expect } from '@playwright/test';

const userName = 'Antonette';
const invalidUserName = 'InvalidUserName';

test(`should search for a username "${userName}" and unique username is in response`, async ({ request }) => {
  const userResponse = await request.get(`users?username=${userName}`, {
  });
  expect(userResponse).toBeOK();
  const userResponseBody = await userResponse.json();
  expect(userResponseBody, 
    `expected to find user "${userName}"`)
    .toContainEqual(expect.objectContaining({
      username: userName,
    }));
  /* Let's assume that username should be unique. Using soft assertion so it will continue with test execution,
  but will mark test as failed; just because it looks fancy to try */
  expect.soft(userResponseBody.length, 
    `expect to find only one userName = "${userName}", but got ${userResponseBody.length}`)
    .toEqual(1);
});

test(`should search for an invalid username "${invalidUserName}" and get empty responce`, async ({ request }) => {
  // might be some more negative tests if not all characters are allowed in userName or other fields
  // or request might be too long
  const userResponse = await request.get(`/users?username=${invalidUserName}`, {
  });
  expect(userResponse).toBeOK();
  const userResponseBody = await userResponse.json();
  expect(await userResponse.json(),
    `Found ${userResponseBody.length} users for user name "${invalidUserName}"`)
    .toBeEmpty;
});