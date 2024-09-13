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

  // 추가 테스트 코드를 작성하시오.
  assert.deepStrictEqual(posts[1], {
    postId: 2,
    title: 'qui est esse',
    comments: [
      {
        postId: 2,
        id: 6,
        email: 'Presley.Mueller@myrl.com',
        body:
          'doloribus at sed quis culpa deserunt consectetur qui praesentium\n' +
          'accusamus fugiat dicta\n' +
          'voluptatem rerum ut voluptate autem\n' +
          'voluptatem repellendus aspernatur dolorem in',
      },
      {
        postId: 2,
        id: 7,
        email: 'Dallas@ole.me',
        body:
          'maiores sed dolores similique labore et inventore et\n' +
          'quasi temporibus esse sunt id et\n' +
          'eos voluptatem aliquam\n' +
          'aliquid ratione corporis molestiae mollitia quia et magnam dolor',
      },
      {
        postId: 2,
        id: 8,
        email: 'Mallory_Kunze@marie.org',
        body:
          'ut voluptatem corrupti velit\n' +
          'ad voluptatem maiores\n' +
          'et nisi velit vero accusamus maiores\n' +
          'voluptates quia aliquid ullam eaque',
      },
      {
        postId: 2,
        id: 9,
        email: 'Meghan_Littel@rene.us',
        body:
          'sapiente assumenda molestiae atque\n' +
          'adipisci laborum distinctio aperiam et ab ut omnis\n' +
          'et occaecati aspernatur odit sit rem expedita\n' +
          'quas enim ipsam minus',
      },
      {
        postId: 2,
        id: 10,
        email: 'Carmen_Keeling@caroline.name',
        body:
          'voluptate iusto quis nobis reprehenderit ipsum amet nulla\n' +
          'quia quas dolores velit et non\n' +
          'aut quia necessitatibus\n' +
          'nostrum quaerat nulla et accusamus nisi facilis',
      },
    ],
  });
}

test(1);
