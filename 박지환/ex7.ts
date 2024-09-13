const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

export async function getPosts(userId: number | string) {
  try {
    // API에서 포스트 데이터를 가져오기
    const response = await fetch(`${POST_URL}?userId=${userId}`);
    const posts = await response.json();

    // 포스트에 대한 댓글 데이터 가져오기
    const commentsPromises = posts.map((post: { id: number }) =>
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`).then(res => res.json())
    );

    // 모든 댓글 데이터 가져오기
    const commentsArray = await Promise.all(commentsPromises);

    // 댓글에서 name 속성 제거 후 병합하여 반환
    return posts.map((post: { id: number, title: string }, index: number) => ({
      postId: post.id,
      title: post.title,
      comments: commentsArray[index].map(({ name, ...rest }: any) => rest) // name 속성 제거
    }));
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
}
