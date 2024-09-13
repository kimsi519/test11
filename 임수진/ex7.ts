const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

interface Post {
    userId: number;
    id: number;
    title: String;
    body: String;
}

interface Comment {
    postId: number;
    id: number;
    email: String;
    body: String;
}

interface CommentResponse extends Comment {
    name: String;
}

interface PostComment {
    postId: number;
    title: String;
    comments: Comment[];
}

export async function getPosts(userId: number | string): Promise<PostComment[]> {
    try {
        // userId로 게시글 조회
        const postResponse = await fetch(`${POST_URL}?userId=${userId}`);
        const posts: Post[] = (await postResponse.json()) as Post[];

        // 결과 반환할 객체 배열
        const postComments: PostComment[] = await Promise.all(
            posts.map(async (post: Post) => {
                const commentResponse = await fetch(`${POST_URL}/${post.id}/comments`);
                const comments: CommentResponse[] =
                (await commentResponse.json()) as CommentResponse[];

                // 결과 반환할 객체
                let postComment: PostComment = {
                postId: post.id,
                title: post.title,
                comments: [],
                };

                comments.forEach((comment: Comment) => {
                    postComment.comments.push({
                        postId: comment.postId,
                        id: comment.id,
                        email: comment.email,
                        body: comment.body,
                    });
                });
                return postComment;
            })
        );
        return postComments;
    } catch (error) {
        console.error('에러 나요ㅠ.ㅠ:', error);
        return [];
    }
}