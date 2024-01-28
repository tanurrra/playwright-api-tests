import { test, expect } from '@playwright/test';

const userName = 'Antonette';

test(`should search for a posts by user="${userName}"`, async ({ request }) => {
  const userResponse = await request.get(`users?username=${userName}`, {
  });
  expect(userResponse).toBeOK();
  const userResponseBody = await userResponse.json();
  expect(userResponseBody, `expected to find user "${userName}"`)
    .toContainEqual(expect.objectContaining({
      username: userName,
    }));
  // TODO assume only one usename found; otherwise need to iterate throuth array
  if (userResponseBody.length > 1) {
    console.log(`WARN Found ${userResponseBody.length} users for user name "${userName}". Will use the first one.`);
  }
  let userId:string = userResponseBody[0].id;
  const postsResponse = await request.get(`posts?userId=${userId}`, {
  });
  expect(postsResponse).toBeOK();
  const postsResponseBody = await postsResponse.json();
  console.log(`Found ${postsResponseBody.length} posts for user "${userName}" with userId = ${userId}`);
  expect(postsResponseBody.length).toBeGreaterThan(0);
});