

const POST_URL = 'https://jsonplaceholder.typicode.com/posts';
const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

// export async function getPosts(userId: number | string) {}
interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface Comments {
    postId: number;
    id: number;
    name: string; // 결과 반환할 때는 필요 없음
    email: string;
    body: string;
}

interface ResultComment {
    postId: number;
    id: number;
    email: string;
    body: string;
}

interface PostWithComments {
    postId: number;
    title: string;
    comments: ResultComment[];
}

export async function getPosts(userId: number | string): Promise<PostWithComments[]> {
    // userId 유저의 글 목록
    const postsResponse = await fetch(`${POST_URL}?userId=${Number(userId)}`);
    if (!postsResponse.ok) {
        throw new Error('Failed to fetch posts');
    }
    const posts: Post[] = await postsResponse.json() as Post[]; // type assertion 안 하면 unknown 에러남

    // userId 유저의 댓글이 담긴 게시글 목록
    const userComments = new Array();
    for (let p of posts) {
        const commentsRes = await fetch(`${POST_URL}/${p.id}/comments`);
        if (!commentsRes.ok) {
            throw new Error('Failed to fetch comments');
        }
        const res: Comments[] = await commentsRes.json() as Comments[]; // type assertion 안 하면 unknown 에러남
        userComments.push(res);
    }

    const comments: Comments[] = new Array();
    for (let uc of userComments) {
        comments.push(...uc);
    }

    const result: PostWithComments[] = posts.map(post => {
        const postComments = comments.filter(comment => comment.postId === post.id);
        const postCommentsFiltered = new Array();
        for (let postcomment of postComments) {
            const {postId, id, email, body, ...etc} = postcomment;
            postCommentsFiltered.push({
                postId: postId,
                id: id,
                email: email,
                body: body
            });
        }
        return {
            postId: post.id,
            title: post.title,
            comments: postCommentsFiltered
        };
    });

    return result;
}
