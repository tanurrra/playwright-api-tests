import { test, expect } from '@playwright/test';

const userName = 'Antonette';
const emailRegex = /\S+@\S+\.\S+/; // simple format; might be adjusted according to requirements

test(`all comments for posts by user="${userName}" should have correct email format`, async ({ request }) => {
  // get userID by userName
  const userResponse = await request.get(`users?username=${userName}`, {
  });
  expect(userResponse).toBeOK();
  const userResponseBody = await userResponse.json();
  expect(userResponseBody, `expected to find user "${userName}"`)
    .toContainEqual(expect.objectContaining({
      username: userName,
    }));
  // assume only one usename found; otherwise need to iterate throuth array
  if (userResponseBody.length > 1) {
    console.log(`WARN Found ${userResponseBody.length} users for user name "${userName}". Will use the first one.`);
  }
  let userId: string = userResponseBody[0].id;
  // get posts written by userID
  const postSearchRes = await request.get(`posts?userId=${userId}`, {
  });
  expect(postSearchRes).toBeOK();
  const postResponseBody = await postSearchRes.json();
  expect(postResponseBody.length).toBeGreaterThan(0);
  let postIds: Array<number> = [];
  for (let i = 0; i < postResponseBody.length; i++) {
    postIds[i] = postResponseBody[i].id;
  }
  //for each post get all comments
  // TODO discuss the purpose of this test, could cause a bad performance on real data
  let commentsSearchRes;
  for (let postIndex = 0; postIndex <= postIds.length - 1; postIndex++) {
    // find all comments for post=postID
    commentsSearchRes = await request.get(`comments?postId=${postIds[postIndex]}`, {
    });
    expect(commentsSearchRes).toBeOK();
    const commentResponseBody = await commentsSearchRes.json();
    for (let commentIndex = 0; commentIndex <= commentResponseBody.length - 1; commentIndex++) {
      // check format of email in each comment with regexp
      expect(emailRegex.test(String(commentResponseBody[commentIndex].email))).toBeTruthy;
    }
  }
});