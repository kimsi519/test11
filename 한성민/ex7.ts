const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

export type CommentResponse = {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
};

export type Comment = {
    postId: number;
    id: number;
    email: string;
    body: string;
};

export type Post = {
    postId: number;
    title: string;
    comments?: Comment[];
};

export type UserPost = {
    postId: number;
    id: number;
    title: string;
    body: string;
};

// fetch 함수 분리
async function fetchJson<T>(url: string): Promise<T> {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
        throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
    }
    return await response.json() as T;
}

export async function getPosts(userId: number | string): Promise<Post[]> {
    const resList = await fetchJson<UserPost[]>(`${POST_URL}?userId=${userId}`);

    // 각 게시글에 대한 댓글을 가져오고, Post 객체를 생성하는 작업
    const postsByUserID = await Promise.all(
        resList.map(async (res) => {
            const commentSeries = await fetchJson<CommentResponse[]>(`${POST_URL}/${res.id}/comments`);

            // 댓글 데이터를 Comment로 변환
            const comments = commentSeries.map((comment) => ({
                postId: comment.postId,
                id: comment.id,
                email: comment.email,
                body: comment.body
            }));

            // Post 객체 생성
            return {
                postId: res.id,
                title: res.title,
                comments: comments,
            } as Post;
        })
    );

    return postsByUserID;
}