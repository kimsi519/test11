
const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

// 게시글과 댓글 인터페이스 정의
interface apiPost {
  postId: number;
  id: number;
  title: string;
  userId: number;
  body: string;
}

interface PostAndComments {
    postId: number;
    title: string;
    comments: apiComment[];
  }

interface apiComment {
  postId: number;
  id: number;
  email: string;
  body: string;
}


export async function getPosts(userId: number | string) {
  
    // 댓글을 제외한 게시글 목록 반환
    const postsResponse = await fetch(`${POST_URL}?userId=${userId}`);
    const apipo = await postsResponse.json() as apiPost[];

    // 원하는 값만 객체에 할당
    const post: PostAndComments[] = apipo.map(post => ({
        postId: post.id,
        title: post.title,
        comments:[]
      }));

    // 각 포스트의 댓글을 가져와서 채우기
    for (const p of post) {
        const commentResponse = await fetch(`${POST_URL}/${p.postId}/comments`);
        const apico = await commentResponse.json() as apiComment[];

         // 원하는 값만 객체에 할당
        const com : apiComment[] = apico.map(com => ({
            postId: com.postId, // id를 postId로 매핑
            id: com.id,
            email:com.email,
            body: com.body
          }));

     
        p.comments = com;
        //console.log("comment 출력 : ", p.comments);
      }

      return post;
}

