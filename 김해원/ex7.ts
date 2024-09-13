import axios from "axios";

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

type UserId = number | string;
type PostId = number | string;
type ReqPostURL = `?userId=${UserId}`;
type ReqCommentURL = `/${PostId}/comments`;

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

class ApiClient {
  static async fetch<T>(url: ReqPostURL | ReqCommentURL): Promise<T> {
    try {
      const { data } = await axios.get<T>(`${POST_URL}${url}`);
      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error(`API Request Failed: ${message}`);
      throw error;
    }
  }
}

const transformPost = async (post: PostResponse): Promise<Post> => {
  const { id: postId, title } = post;
  const reqCommentUrl: ReqCommentURL = `/${postId}/comments`;
  const commentsData = await ApiClient.fetch<CommentResponse[]>(reqCommentUrl);
  const comments = commentsData.map(transformComment);

  return { postId, title, comments };
};

const transformComment = (comment: CommentResponse): Comment => {
  const { name, ...rest } = comment;
  return rest;
};

export const getPosts = async (userId: number | string): Promise<Post[]> => {
  const reqPostUrl: ReqPostURL = `?userId=${userId}`;
  try {
    const postsData = await ApiClient.fetch<PostResponse[]>(reqPostUrl);
    return await Promise.all(postsData.map(transformPost));
  } catch (error) {
    console.error(`Failed to fetch posts: ${error}`);
    return [];
  }
};
