const POST_URL = "https://jsonplaceholder.typicode.com/posts";
const COMMENTS_URL = "https://jsonplaceholder.typicode.com/comments"; // 댓글 get url

// 글 인터페이스
interface Post {
  postId: number;
  title: string;
  comments: Comment[];
}

// 댓글 인터페이스
interface Comment {
  postId: number;
  id: number;
  email: string;
  body: string;
}

export async function getPosts(userId: number | string): Promise<Post[]> {
  // postsResponse의 타입 지정
  const postsResponse = await fetch(`${POST_URL}?userId=${userId}`); // userId가 쓴 글
  const posts = (await postsResponse.json()) as { id: number; title: string }[]; // 'as'로 타입 변환

  const postsWithComments: Post[] = await Promise.all(
    posts.map(async (post) => {
      // commentsResponse 타입 지정
      const commentsResponse = await fetch(`${COMMENTS_URL}?postId=${post.id}`);
      const comments = (await commentsResponse.json()) as Comment[];

      // 인터페이스에 있는 선택해서 반환
      const filteredComments: Comment[] = comments.map((comment) => ({
        postId: comment.postId,
        id: comment.id,
        email: comment.email,
        body: comment.body,
      }));

      return {
        postId: post.id,
        title: post.title,
        comments: filteredComments,
      };
    })
  );

  return postsWithComments;
}
