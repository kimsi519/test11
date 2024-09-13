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

export async function getPosts(userId: number | string): Promise<Post[]> {
    const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`); //비동기 패치
    const posts = await postRes.json();

    const postsWithComments = await Promise.all(
        posts.map(async (post: { id: number; title: string }) => {
            const commentRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`); //id에 알맞게 comments 데이터 fetch
            const comments = await commentRes.json();

            // comments 배열에서 불필요한 필드를 제거
            const filteredComments = comments.map((comment: any) => ({
                postId: comment.postId,
                id: comment.id,
                email: comment.email,
                body: comment.body
            }));

            return {
                postId: post.id,
                title: post.title,
                comments: filteredComments
            };
        })
    );

    return postsWithComments;
}