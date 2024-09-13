import assert from 'assert';
import { getPosts } from './ex7';

async function test(userId: string | number) {
  const posts = await getPosts(userId);

  assert.strictEqual(posts?.length, 10);
  assert.strictEqual(posts?.at(-1)?.comments?.length, 5);
  assert.deepStrictEqual(posts[0], {
    postId: 1,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    comments: [
      {
        postId: 1,
        id: 1,
        email: 'Eliseo@gardner.biz',
        body:
          'laudantium enim quasi est quidem magnam voluptate ipsam eos\n' +
          'tempora quo necessitatibus\n' +
          'dolor quam autem quasi\n' +
          'reiciendis et nam sapiente accusantium',
      },
      {
        postId: 1,
        id: 2,
        email: 'Jayne_Kuhic@sydney.com',
        body:
          'est natus enim nihil est dolore omnis voluptatem numquam\n' +
          'et omnis occaecati quod ullam at\n' +
          'voluptatem error expedita pariatur\n' +
          'nihil sint nostrum voluptatem reiciendis et',
      },
      {
        postId: 1,
        id: 3,
        email: 'Nikita@garfield.biz',
        body:
          'quia molestiae reprehenderit quasi aspernatur\n' +
          'aut expedita occaecati aliquam eveniet laudantium\n' +
          'omnis quibusdam delectus saepe quia accusamus maiores nam est\n' +
          'cum et ducimus et vero voluptates excepturi deleniti ratione',
      },
      {
        postId: 1,
        id: 4,
        email: 'Lew@alysha.tv',
        body:
          'non et atque\n' +
          'occaecati deserunt quas accusantium unde odit nobis qui voluptatem\n' +
          'quia voluptas consequuntur itaque dolor\n' +
          'et qui rerum deleniti ut occaecati',
      },
      {
        postId: 1,
        id: 5,
        email: 'Hayden@althea.biz',
        body:
          'harum non quasi et ratione\n' +
          'tempore iure ex voluptates in ratione\n' +
          'harum architecto fugit inventore cupiditate\n' +
          'voluptates magni quo et',
      },
    ],
  });

  // 추가 테스트 코드
  assert.strictEqual(posts?.at(0)?.title, 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit');
  assert.strictEqual(posts?.at(2)?.comments[2].email,'Kariane@jadyn.tv');
  assert.deepStrictEqual(posts[3].comments, [
    {
        postId: 4,
        id: 16,
        email: 'Christine@ayana.info',
        body: 'iste ut laborum aliquid velit facere itaque\n' +
          'quo ut soluta dicta voluptate\n' +
          'error tempore aut et\n' +
          'sequi reiciendis dignissimos expedita consequuntur libero sed fugiat facilis'
      },
      {
        postId: 4,
        id: 17,
        email: 'Preston_Hudson@blaise.tv',
        body: 'consequatur necessitatibus totam sed sit dolorum\n' +
          'recusandae quae odio excepturi voluptatum harum voluptas\n' +
          'quisquam sit ad eveniet delectus\n' +
          'doloribus odio qui non labore'
      },
      {
        postId: 4,
        id: 18,
        email: 'Vincenza_Klocko@albertha.name',
        body: 'veritatis voluptates necessitatibus maiores corrupti\n' +
          'neque et exercitationem amet sit et\n' +
          'ullam velit sit magnam laborum\n' +
          'magni ut molestias'
      },
      {
        postId: 4,
        id: 19,
        email: 'Madelynn.Gorczany@darion.biz',
        body: 'doloribus est illo sed minima aperiam\n' +
          'ut dignissimos accusantium tempore atque et aut molestiae\n' +
          'magni ut accusamus voluptatem quos ut voluptates\n' +
          'quisquam porro sed architecto ut'
      },
      {
        postId: 4,
        id: 20,
        email: 'Mariana_Orn@preston.org',
        body: 'qui harum consequatur fugiat\n' +
          'et eligendi perferendis at molestiae commodi ducimus\n' +
          'doloremque asperiores numquam qui\n' +
          'ut sit dignissimos reprehenderit tempore'
      }
  ]);
}

test(1);