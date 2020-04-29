/*
    Request class integration tests 👍
*/

import Request from '../../request';

describe('Request.get', () => {
  test('Should throw error when called with https', async () => {
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

  test('Should throw error on empty URL', async () => {
    let emptyUrl = '';
    await expect(Request.get(emptyUrl)).rejects.toThrow();
  });

  test('Should throw an error on an invalid status code', async () => {
    // make up a url
    let fakeUrl = 'http://www.garge2123.com';
    await expect(Request.get(fakeUrl)).rejects.toThrow();
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

  test('Should throw an error on an invalid status code', async () => {
    // make up a url
    let fakeBody = { idk: 1, someProp: 'hello' };
    let fakeUrl = 'http://www.garge2123.com';
    await expect(Request.put(fakeUrl, fakeBody)).rejects.toThrow();
  });

  test('Should throw error on empty URL', async () => {
    let emptyUrl = '';
    await expect(Request.put(emptyUrl)).rejects.toThrow();
  });

  test('Should accept no body', async () => {
    let httpUrl = 'http://jsonplaceholder.typicode.com/posts/1';
    let { id } = await Request.put(httpUrl);
    expect(id).toEqual(1);
  });
});
