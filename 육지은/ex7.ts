const POST_URL = 'https://jsonplaceholder.typicode.com/posts';
// 게시글 타입 정의
interface Post {
    userId: number,
    id: number;
    title: string;
    body: string;
}

// 댓글 타입 정의  
interface Comment {
    postId: number;
    id: number;
    email: string;
    body: string;
}

//반환할 인터페이스
interface Comments {
    postId: number;
    title: string;
    comments: {
        postId: number;
        id: number;
        email: string;
        body: string;
    }[];
}

export async function getPosts(userId: number | string): Promise<Comments[]> {
    try {
        // 사용자 게시글 가져오기
        const response = await fetch(`${POST_URL}?userId=${userId}`);
        const posts: Post[] = await response.json() as Post[];

        // 게시글 ID로 댓글을 비동기적으로 가져오기
        const fetchComments = async (post: Post): Promise<Comments> => {
            try {
                const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`);
                const comments: Comment[] = await commentsResponse.json() as Comment[];

                // 결과에 댓글을 추가 (name 필드 제외)
                return {
                    postId: post.id,
                    title: post.title,
                    comments: comments.map(({ postId, id, email, body }) => ({
                        postId,
                        id,
                        email,
                        body
                    }))
                };
            } catch (error) {
                console.error(`Error fetching comments for post ${post.id}:`, error);
                return { postId: post.id, title: post.title, comments: [] };
            }
        };

        const commentsData: Comments[] = await Promise.all(posts.map(post => fetchComments(post)));

        return commentsData;

    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
}