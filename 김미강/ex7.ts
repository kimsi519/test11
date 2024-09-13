const POST_URL = "https://jsonplaceholder.typicode.com/posts";
const COMMENT_URL = (postId: number) =>
  `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;

// 게시글과 댓글 타입
interface Comment {
  postId: number;
  id: number;
  email: string;
  body: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

//comment
async function fetchComments(postId: number): Promise<Comment[]> {
  const commentRes = await fetch(COMMENT_URL(postId));
  if (!commentRes.ok) {
    throw new Error(`Failed to fetch comments for postId: ${postId}`);
  }
  return (await commentRes.json()) as Comment[]; // 타입 캐스팅
}

//getpost
export async function getPosts(
  userId: number | string
): Promise<{ postId: number; title: string; comments: Comment[] }[]> {
  const postRes = await fetch(`${POST_URL}?userId=${userId}`);
  if (!postRes.ok) {
    throw new Error("Failed to fetch posts");
  }

  const posts = (await postRes.json()) as Post[]; //타입 캐스팅

  const postsWithComments = await Promise.all(
    posts.map(async (post: Post) => {
      const comments = await fetchComments(post.id);
      return {
        postId: post.id,
        title: post.title,
        comments: comments.map((comment: Comment) => ({
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
