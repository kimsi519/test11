const POST_URL = "https://jsonplaceholder.typicode.com/posts";
// 게시글 타입 정의
interface Post {
  id: number;
  body: string;
}
// 댓글 타입 정의
interface Comment {
  postId: number;
  id: number;
  email: string;
  body: string;
}
// 게시글과 댓글을 포함한 타입 정의
interface Comments {
  postId: number;
  comments: Comment[];
}
export async function getPosts(userId: number | string): Promise<Comments[]> {
  try {
    // 사용자 게시글 가져오기
    const response = await fetch(`${POST_URL}?userId=${userId}`);
    const posts: Post[] = (await response.json()) as Post[];
    // 모든 댓글 가져오기
    const commentsData: Comments[] = await Promise.all(
      posts.map(async (post) => {
        const commentsResponse = await fetch(`${POST_URL}/${post.id}/comments`);
        const comments: Comment[] =
          (await commentsResponse.json()) as Comment[];
        console.log("Fetched comments:", comments); // 확인용
        // 결과에 댓글을 추가 (name 필드 제외)
        return {
          postId: post.id,
          title: post.title,
          comments: comments.map(({ postId, id, email, body }) => ({
            postId,
            id,
            email,
            body,
          })),
        };
      })
    );
    return commentsData;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}
