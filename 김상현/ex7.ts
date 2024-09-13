import { title } from "process";

const POST_URL = 'https://jsonplaceholder.typicode.com/posts';
export type CommentResponse = { // 반환해야 하는 타입
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
  }

export type Comment = { // 어떤 글의 한 댓글
  postId: number;
  id: number;
  email: string;
  body: string;
}

export type Post = { // 특정 글
  postId: number;
  title: string;
  comments: Comment[];
}

export type UserPost = { // 특정 user가 쓴 글 목록
  postId: number;
  id: number;
  title: string;
  body: string;
}

export async function getPosts(userId: number | string):Promise<Post[]> {
  const resList:UserPost[] = await fetch(`${POST_URL}?userId=${userId}`)
    .then((resp) => resp.json()) as UserPost[];
    // fetch해서 받아오고, 받아왔으면 response를 json으로 변환하고 그것을 또 UserPost로 변환
  
  const wantedresult: Post[] = []; // 결과는 여기에 저장, post 타입도 미리 만들어 놓았음
  for(const res of resList){
    const cmtres:CommentResponse[] = await fetch(`${POST_URL}/${res.id}/comments`)
      .then((response) => response.json()) as CommentResponse[];
      // 이번엔 댓글을 fetch해서 받아오고, 받아왔으면 response를 json으로 변환하고 그것을 CommentResponse로 변환
    
    const comments:Comment[] = cmtres.map((res)=>{return {
      postId: res.postId,
      id: res.id,
      email: res.email,
      body: res.body
    }})
    
    const post:Post = {
      postId: res.id,
      title: res.title,
      comments: comments, // 위에서 만든 comments 객체를 여기에
    }

    wantedresult.push(post); // 완성된 객체 push
  }

  return wantedresult; // push된 객체를 반환
}