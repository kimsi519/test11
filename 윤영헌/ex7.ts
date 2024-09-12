const POST_URL = 'https://jsonplaceholder.typicode.com/posts';
export type CommentResponse = {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
  }

export type Comment = {
  postId: number;
  id: number;
  email: string;
  body: string;
}

export type Post = {
  postId: number;
  title: string;
  comments: Comment[];
}

export type UserPost = {
  postId: number;
  id: number;
  title: string;
  body: string;
}

export async function getPosts(userId: number | string):Promise<Post[]> {
  const resList:UserPost[] = await fetch(`${POST_URL}?userId=${userId}`, {method: "GET"})
    .then((response) => response.json()) as UserPost[];
  
  const postsByUserID: Post[] = [];
  for(const res of resList){
    const commentsres:CommentResponse[] = await fetch(`${POST_URL}/${res.postId}/comments`, {method: "GET"})
      .then((response) => response.json()) as CommentResponse[];
    
    const comments:Comment[] = commentsres.map((res)=>{return {
      postId: res.postId,
      id: res.id,
      email: res.email,
      body: res.body
    }})
    
    const post:Post = {
      postId: res.id,
      title: res.title,
      comments: comments,
    }

    postsByUserID.push(post);
  }

  return postsByUserID;
}

// test
const userId = 1;
async function print(){
const posts = await getPosts(userId);
  console.log(posts.length);
  console.log(posts?.at(-1)?.comments?.length);
  console.log(posts[0]);
};

// print();
