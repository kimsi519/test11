const POST_URL = 'https://jsonplaceholder.typicode.com/posts';
const COMMENT_URL = 'https://jsonplaceholder.typicode.com/comments';

interface Comment {
  postId: number;
  id: number;
  email: string;
  body: string;
}

interface Post {
  postId: number;
  title: string;
  comments?: Comment[];
}

export async function getPosts(userId: number | string): Promise<Post[]> {
  try {
    //게시글 불러옴
    const postsResponse = await fetch(`${POST_URL}?userId=${userId}`);
    const postsData = await postsResponse.json();

    //게시글 10개까지 처리
    const limitedPosts = postsData.slice(0, 10);

    //게시글의 댓글
    const postsWithComments = await Promise.all(
      limitedPosts.map(async (post: { id: number; title: string }) => {
        
        const commentsResponse = await fetch(`${COMMENT_URL}?postId=${post.id}`);
        const comments = await commentsResponse.json();

        return {
          postId: post.id,
          title: post.title,
          comments: comments.slice(0, 5), //댓글 5개까지 포함
        };
      })
    );

    return postsWithComments;
  } catch (error) {
    console.error('Error fetching posts or comments:', error);
    return [];
  }
}
