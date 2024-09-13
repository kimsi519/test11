interface Post {
    id: number;
    title: string;
  }
  
  interface Comment {
    postId: number;
    id: number;
    email: string;
    body: string;
  }
  
  const POST_URL = 'https://jsonplaceholder.typicode.com/posts';
  
  export async function getPosts(userId: number | string) {
    try {
      const postsResponse = await fetch(`${POST_URL}?userId=${userId}`);
      const posts: Post[] = await postsResponse.json(); 
  
      const postsWithComments = await Promise.all(
        posts.map(async (post) => {
          const commentsResponse = await fetch(`${POST_URL}/${post.id}/comments`);
          const comments: Comment[] = await commentsResponse.json(); // Comment 타입 명시
  
          return {
            postId: post.id,
            title: post.title,
            comments: comments.map((comment) => ({
              postId: comment.postId,
              id: comment.id,
              email: comment.email,
              body: comment.body,
            })),
          };
        })
      );
  
      return postsWithComments;
    } catch (error) {
      console.error('Error fetching posts or comments:', error);
      return [];
    }
  }
  