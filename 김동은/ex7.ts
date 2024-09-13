import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

// 댓글에 대한 타입
type CommentType = {
  postId: number;
  id: number;
  email: string;
  body: string;
};

// 게시물에 대한 타입
type PostType = {
  postId: number;
  title: string;
  comments: CommentType[];
};

// 서버로부터의 게시물 Response 타입
type PostAPIResponse = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

// 서버로부터의 댓글 Response 타입
type CommentAPIResponse = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

// API 요청 클래스
class ApiService {
  // 제네릭 타입을 받아오는 fetch 메소드
  static async fetchData<T>(endpoint: string): Promise<T> {
    try {
      const { data } = await axios.get<T>(`${BASE_URL}${endpoint}`);
      return data;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      console.error(`API 요청 실패: ${errorMsg}`);
      throw error;
    }
  }
}

// Post 데이터 변환 함수
const mapPost = async (apiPost: PostAPIResponse): Promise<PostType> => {
  const { id: postId, title } = apiPost;

  // API에서 댓글 데이터 받아옴
  const commentData = await ApiService.fetchData<CommentAPIResponse[]>(`/${postId}/comments`);

  // 댓글 데이터를 변환
  const comments = commentData.map(mapComment);

  return { postId, title, comments };
};

// Comment 데이터를 변환
const mapComment = (apiComment: CommentAPIResponse): CommentType => {
  const { name, ...rest } = apiComment; // name 속성을 제외하고 나머지를 반환
  return rest;
};

// 사용자의 게시물을 받아오는 함수
export const getPosts = async (userId: number | string): Promise<PostType[]> => {
  try {
    // 특정 사용자 ID에 맞는 게시물 데이터를 받아옴
    const postData = await ApiService.fetchData<PostAPIResponse[]>(`?userId=${userId}`);
    // 모든 게시물을 변환하여 반환
    return await Promise.all(postData.map(mapPost));
  } catch (error) {
    console.error(`게시물 가져오기 실패: ${error}`);
    return [];
  }
};
