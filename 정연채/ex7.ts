// const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

// export async function getPosts(userId: number | string) {}

const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

interface Comment {
  postId: number;
  id: number;
  email: string;
  body: string;
}

interface Post {
  postId: number;
  title: string;
  comments: Comment[];
}

export async function getPosts(userId: number | string) {
  try {
    // 1. 특정 userId의 게시글 목록을 가져옵니다.
    const postsResponse = await fetch(`${POST_URL}?userId=${userId}`);
    const postsData = (await postsResponse.json()) as { id: number; title: string }[];

    // 2. 각 게시글의 댓글 목록을 가져와서 posts 배열에 추가합니다.
    const postsWithComments: Post[] = await Promise.all(
      postsData.map(async (post) => {
        const commentsResponse = await fetch(`${POST_URL}/${post.id}/comments`);
        const commentsData = (await commentsResponse.json()) as any[];

        // 'name' 필드를 제거하고 새로운 Comment 객체 배열을 생성합니다.
        const sanitizedCommentsData: Comment[] = commentsData.map(({ postId, id, email, body }) => ({
          postId,
          id,
          email,
          body,
        }));

        return {
          postId: post.id,
          title: post.title,
          comments: sanitizedCommentsData,
        };
      })
    );

    return postsWithComments;
  } catch (error) {
    console.error('오류1', error);
    throw new Error('오류2');
  }
}
