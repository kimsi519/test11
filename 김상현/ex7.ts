const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

// Post 인터페이스를 정의합니다. 실제 API 응답에 따라 수정 필요.
interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }
  
  export async function getPosts(userId: number | string): Promise<void> {
    try {
      // API 요청 및 응답 처리
      const response = await fetch(`${POST_URL}?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      let postres : Post[];
     
       let smth = await response.json(); // 응답 본문을 JSON으로 변환
       
  
      console.log('Type of postres:', typeof postres);
      console.log('Raw postres:', postres);
      
      // 필터링 처리
      const filteredPosts = postres.filter(post => post.userId === 1);
      console.log('Filtered posts:', filteredPosts);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  }

getPosts(1);
