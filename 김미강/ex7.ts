// 게시글과 댓글에 대한 타입 정의
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

const POST_URL = "https://jsonplaceholder.typicode.com/posts";
const COMMENT_URL = (postId: number) =>
  `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;

// Helper function to fetch comments for a post
async function fetchComments(postId: number): Promise<Comment[]> {
  const response = await fetch(COMMENT_URL(postId));
  if (!response.ok) {
    throw new Error(`Failed to fetch comments for postId: ${postId}`);
  }
  return (await response.json()) as Comment[]; // 타입 캐스팅
}

// Main function to fetch posts and comments
export async function getPosts(
  userId: number | string
): Promise<{ postId: number; title: string; comments: Comment[] }[]> {
  const response = await fetch(`${POST_URL}?userId=${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  // posts의 타입을 명시적으로 Post[]로 캐스팅
  const posts = (await response.json()) as Post[];

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
