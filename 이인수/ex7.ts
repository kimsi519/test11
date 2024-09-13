const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

interface Post {
  postId: number;
  title: string;
  comments: Comment[];
}

interface Comment {
  postId: number;
  id: number;
  email: string;
  body: string;
}

interface PostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface CommentData extends Comment {
  name: string;
}

export async function getPosts(userId: number | string): Promise<Post[]> {
  // userId를 통해 게시글 목록
  const postsResponse = await fetch(`${POST_URL}?userId=${userId}`);
  const postsData: PostData[] = (await postsResponse.json()) as PostData[];

  // 각 게시글의 댓글 목록
  const postsWithComments = await Promise.all(
    postsData.map(async (post: PostData) => {
      const commentsResponse = await fetch(`${POST_URL}/${post.id}/comments`);
      const commentsData: CommentData[] =
        (await commentsResponse.json()) as CommentData[];

      return {
        postId: post.id,
        title: post.title,
        comments: commentsData.map((comment: Comment) => ({
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
