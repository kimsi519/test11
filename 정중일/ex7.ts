const POST_URL = "https://jsonplaceholder.typicode.com/posts";

export async function getPosts(userId: number | string) {
  const res = await fetch(POST_URL + `?userId=${userId}`);

  if (!res.ok) {
    throw new Error("can't reach post data!");
  }
  const posts = (await res.json()) as PostRes[];
  const comments = await Promise.allSettled(
    posts.map((p) => getComments(p.id))
  ).then((results) =>
    results.map((r) => {
      if (r.status === "fulfilled") {
        return r.value.map(
          (v): Comment => ({
            postId: v.postId,
            id: v.id,
            email: v.email,
            body: v.body,
          })
        );
      } else {
        return [];
      }
    })
  );
  return posts.map(
    (p): Post => ({
      comments: comments[p.id - 1],
      postId: p.id,
      title: p.title,
    })
  );
}

async function getComments(postId: number | string) {
  const res = await fetch(POST_URL + `/${postId}/comments`);
  if (!res.ok) {
    throw new Error("can't reach comment data!");
  }
  return (await res.json()) as CommentRes[];
}

interface CommentRes {
  postId: number;
  id: number;
  email: string;
  name: string;
  body: string;
}

interface PostRes {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  email: string;
  body: string;
}

interface Post {
  postId: number;
  title: string;
  comments: Comment[];
}
