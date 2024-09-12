
const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

export async function getPosts(userId: number | string) {
  try {
    const postsResponse = await fetch(`${POST_URL}?userId=${userId}`);
    
    if (!postsResponse.ok) {
      throw new Error(`Failed to fetch posts: ${postsResponse.status}`);
    }
    
    const posts = await postsResponse.json();
    
    if (!Array.isArray(posts)) {
      throw new Error('Posts is not an array');
    }

    const postsWithComments = await Promise.all(
      posts.map(async (post: any) => {
        try {
          const commentsResponse = await fetch(`${POST_URL}/${post.id}/comments`);

          if (!commentsResponse.ok) {
            throw new Error(`Failed to fetch comments for post ${post.id}: ${commentsResponse.status}`);
          }

          const comments = await commentsResponse.json();

          if (!Array.isArray(comments)) {
            throw new Error('Comments is not an array');
          }

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
        } catch (error) {
          console.error(`Error fetching comments for post ${post.id}:`, error);
          return { postId: post.id, title: post.title, comments: [] }; 
        }
      })
    );

    return postsWithComments;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}
