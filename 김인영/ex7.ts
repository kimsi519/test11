const POST_URL = 'https://jsonplaceholder.typicode.com/posts';
const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export async function getPosts(userId: number | string) {
  // 1: 받은 userId로 POST_URL에서 해당 사용자의 모든 포스트 가져오기
  const postResponse = await fetch(`${POST_URL}?userId=${userId}`);
  const posts = await postResponse.json();

  // 2: 각 포스트에 대해 해당 포스트의 댓글 가져오기
  const postsWithComments = await Promise.all(
    posts.map(async (post: any) => {
      // 각 포스트의 댓글 가져오기
      const commentResponse = await fetch(`${COMMENTS_URL}/${post.id}/comments`);
      const comments = await commentResponse.json();

      return {
        postId: post.id,
        title: post.title,
        comments: comments.map((comment: any) => ({
          postId: comment.postId,
          id: comment.id,
          email: comment.email,
          body: comment.body,
        })),
      };
    })
  );

  return postsWithComments;
}
