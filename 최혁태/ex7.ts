const POST_URL = "https://jsonplaceholder.typicode.com/posts";

interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
}

interface Comment {
	postId: number;
	id: number;
	name: string;
	email: string;
	body: string;
}

interface PostWithComments {
	postId: number;
	title: string;
	comments: Omit<Comment, "name">[];
}

export async function getPosts(
	userId: number | string
): Promise<PostWithComments[]> {
	const postsResponse = await fetch(`${POST_URL}?userId=${userId}`);
	const posts: Post[] = await postsResponse.json();

	const postsWithComments = await Promise.all(
		posts.map(async (post): Promise<PostWithComments> => {
			const commentsResponse = await fetch(
				`${POST_URL}/${post.id}/comments`
			);
			const comments: Comment[] = await commentsResponse.json();

			return {
				postId: post.id,
				title: post.title,
				comments: comments.map(({ name, ...rest }) => rest),
			};
		})
	);

	return postsWithComments;
}
