import { get } from "http";

const POST_URL = 'https://jsonplaceholder.typicode.com/posts';
export type Comment_input = {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}
export type Post_input = {
    postId: number;
    id: number;
    title: string;
    body: string;
}   
export type Comment_output = {
    postId: number;
    id: number;
    email: string;
    body: string;
}

export type Post_output = {
    postId: number;
    title: string;
    comments: Comment_output[];
}

export async function getPosts(userId: string | number):Promise<Post_output[]> {
    
    const post_result:Post_input[] = await fetch(`${POST_URL}?userId=${userId}`, {method: "GET"}).then((response) => response.json()) as Post_input[];
    const postsByUserID: Post_output[] = await Promise.all(post_result.map(async (post) => {
        const comment_result: Comment_input[] = await fetch(`${POST_URL}/${post.id}/comments`, { method: "GET" }).then(response => response.json()) as Comment_input[];
        const comments: Comment_output[] = comment_result.map((comment) => ({
            postId: comment.postId,
            id: comment.id,
            email: comment.email,
            body: comment.body
        }));

        return {
            postId: post.id,
            title: post.title,
            comments: comments,
        } as Post_output;
    }));

    return postsByUserID;
}
async function test(userId: string | number) {
    const posts = await getPosts(userId);
    console.log(posts);
}

console.log(test(1));