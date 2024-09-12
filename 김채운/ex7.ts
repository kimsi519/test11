const POST_URL = 'https://jsonplaceholder.typicode.com/posts';
const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

interface Comment {
  postId: number;
  id: number;
  email: string;
  body: string;
  name?: string;
}

interface Post {
  postId: number;
  title: string;
  comments: Comment[];
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }
  // Explicitly cast to type T to ensure type safety
  return response.json() as Promise<T>;
}

export async function getPosts(userId: number | string): Promise<Post[]> {
    // 게시글 목록을 가져옵니다.
    const posts = await fetchJson<{ userId: number; id: number; title: string }[]>(`${POST_URL}?userId=${userId}`);
  
    // 각 게시글에 대한 댓글을 가져옵니다.
    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        // 댓글 URL을 올바르게 설정하여 각 게시글의 댓글을 가져옵니다.
        const comments = await fetchJson<Comment[]>(`${COMMENTS_URL}?postId=${post.id}`);
        return {
          postId: post.id,
          title: post.title,
          comments: comments.map(({ name, ...comment }) => comment) // name 필드를 제거하거나 필요한 데이터만 반환
        };
      })
    );
  
    return postsWithComments;
  }
  