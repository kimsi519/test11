import axios from "axios";

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

type Comment = {
  postId: number;
  id: number;
  email: string;
  body: string;
};

type Post = {
  postId: number;
  title: string;
  comments: Comment[];
};

type PostResponse = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type CommentResponse = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

async function getComments(postId: number | string): Promise<Comment[]> {
  try {
    const { data } = await axios.get(`${POST_URL}/${postId}/comments`);
    const comments: Comment[] = data.map((comment: CommentResponse) => {
      const { name, ...rest } = comment;
      return rest;
    });
    return comments;
  } catch (error) {
    const message = error instanceof Error ? error.message : error;
    console.log(JSON.stringify(message));
    return [];
  }
}

export async function getPosts(userId: number | string): Promise<Post[]> {
  try {
    const { data } = await axios.get(`${POST_URL}?userId=${userId}`);
    const posts: Post[] = await Promise.all(
      data.map(async (post: PostResponse) => {
        const { id: postId, title } = post;
        const comments = await getComments(postId);
        return { postId, title, comments };
      })
    );
    return posts;
  } catch (error) {
    const message = error instanceof Error ? error.message : error;
    console.log(JSON.stringify(message));
    return [];
  }
}

// 결과를 출력하려면 `getPosts` 호출 시 await을 사용해야 합니다.
// getPosts(1)
//   .then((posts) => console.log(posts))
//   .catch((error) => console.error(error));
