const fetchUser1 = fetch('https://jsonplaceholder.typicode.com/users/1');
const fetchUser2 = fetch('https://jsonplaceholder.typicode.com/users/2');
const fetchUser3 = fetch('https://jsonplaceholder.typicode.com/users/3');

const promises = [fetchUser3];

Promise.all(promises)
  .then(responses => Promise.all(responses.map(response => response.json())))
  .then(users => {
    console.log(users); // 모든 프로미스의 JSON 결과가 배열로 반환됨
    console.log(typeof users)
  })
  .catch(error => {
    console.error('Error fetching users:', error);
  });