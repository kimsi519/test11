import assert from "assert";
import { getPosts } from "./ex7";

async function test(userId: string | number) {
  const posts = await getPosts(userId);

  // 기본 테스트: posts의 길이와 마지막 posts의 댓글 수
  assert.strictEqual(posts?.length, 10, "Expected 10 posts");
  assert.strictEqual(
    posts?.at(-1)?.comments?.length,
    5,
    "Expected last post to have 5 comments"
  );

  // 첫 번째 포스트가 예상과 일치하는지 검사
  assert.deepStrictEqual(posts[0], {
    postId: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    comments: [
      {
        postId: 1,
        id: 1,
        email: "Eliseo@gardner.biz",
        body:
          "laudantium enim quasi est quidem magnam voluptate ipsam eos\n" +
          "tempora quo necessitatibus\n" +
          "dolor quam autem quasi\n" +
          "reiciendis et nam sapiente accusantium",
      },
      {
        postId: 1,
        id: 2,
        email: "Jayne_Kuhic@sydney.com",
        body:
          "est natus enim nihil est dolore omnis voluptatem numquam\n" +
          "et omnis occaecati quod ullam at\n" +
          "voluptatem error expedita pariatur\n" +
          "nihil sint nostrum voluptatem reiciendis et",
      },
      {
        postId: 1,
        id: 3,
        email: "Nikita@garfield.biz",
        body:
          "quia molestiae reprehenderit quasi aspernatur\n" +
          "aut expedita occaecati aliquam eveniet laudantium\n" +
          "omnis quibusdam delectus saepe quia accusamus maiores nam est\n" +
          "cum et ducimus et vero voluptates excepturi deleniti ratione",
      },
      {
        postId: 1,
        id: 4,
        email: "Lew@alysha.tv",
        body:
          "non et atque\n" +
          "occaecati deserunt quas accusantium unde odit nobis qui voluptatem\n" +
          "quia voluptas consequuntur itaque dolor\n" +
          "et qui rerum deleniti ut occaecati",
      },
      {
        postId: 1,
        id: 5,
        email: "Hayden@althea.biz",
        body:
          "harum non quasi et ratione\n" +
          "tempore iure ex voluptates in ratione\n" +
          "harum architecto fugit inventore cupiditate\n" +
          "voluptates magni quo et",
      },
    ],
  });

  // 추가 테스트: 게시물이 비어있는 경우
  const emptyPosts = await getPosts(99999); // 존재하지 않는 userId
  assert.strictEqual(
    emptyPosts.length,
    0,
    "Expected no posts for a non-existing user"
  );

  // 각 게시물에 적어도 하나의 댓글이 있는지 검사
  posts.forEach((post) => {
    assert.ok(
      post.comments.length > 0,
      `Expected post ${post.postId} to have at least one comment`
    );
  });

  // 댓글의 이메일 주소가 유효한 형식인지 확인하는 테스트
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  posts.forEach((post) => {
    post.comments.forEach((comment) => {
      assert.ok(
        emailRegex.test(comment.email),
        `Invalid email format for comment ID: ${comment.id}`
      );
    });
  });

  // 특정 게시물의 제목이 예상과 일치하는지 검사 (예시로 5번째 게시물 확인)
  assert.strictEqual(
    posts[4].title,
    "nesciunt quas odio",
    'Expected post title to be "nesciunt quas odio" for post ID 5'
  );

  //console.log("All tests passed!");
}

// 테스트 실행
test(1);
