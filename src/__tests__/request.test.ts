import Request from '../request';

describe('Request.get', () => {
  test('GET should throw error when called with https', async () => {
    let httpsUrl = 'https://jsonplaceholder.typicode.com/todos/1';
    await expect(Request.get(httpsUrl)).rejects.toThrow();
  });

  test('Should complete successful GET request', async () => {
    let httpUrl = 'http://jsonplaceholder.typicode.com/todos/1';
    let shouldReturn = {
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    };

    let returnedValue = await Request.get(httpUrl);

    expect(returnedValue).toEqual(shouldReturn);
  });
});

describe('Request.put', () => {
  let exampleBody = {
    id: 1,
    title: 'my post',
    body: 'example body',
    userId: 1,
  };

  test('PUT should throw error when called with https', async () => {
    let httpsUrl = 'https://jsonplaceholder.typicode.com/posts/1';
    await expect(Request.put(httpsUrl, exampleBody)).rejects.toThrow();
  });

  test('Should complete successful PUT request', async () => {
    let httpUrl = 'http://jsonplaceholder.typicode.com/posts/1';
    let returnedValue = await Request.put(httpUrl, exampleBody);
    expect(returnedValue).toEqual(exampleBody);
  });
});
