

// 게시물 및 댓글의 타입 정의
interface Comment {
    postId: number;
    id: number;
    email: string;
    body: string;
  }

  interface Post {
    userId: number;
    id : number;
    title : string;
    body : string;
  }
  
  interface PostAndComment {
    postId : number;
    title: string;
    comments?: Comment[]; // 댓글은 선택적 속성
  }
  
  export async function getPosts(userId: number | string): Promise<PostAndComment[]> {
    // 게시물 가져오기
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    
    // 응답을 Post[] 타입으로 단언
    const posts: Post[] = (await response.json()) as Post[];
  
  
    // 댓글 가져오기
    const commentsPromises = posts.map(async post => {
      const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/post/${post.id}/comments`);
      
      // 댓글 응답을 Comment[] 타입으로 단언
      const commentsJson: Comment[] = await commentsResponse.json() as Comment[];

      //name을 제외하기 위해 새로 맵핑
      const comments = commentsJson.map((comment) => ({
        postId: comment.postId,
        id: comment.id,
        email: comment.email,
        body: comment.body,
      }));
      
      return {
        postId : post.id,
        title : post.title,

        comments, // 댓글 추가
      };
    });
  
    // 모든 댓글을 포함한 게시물 배열 반환
    return Promise.all(commentsPromises);
  }