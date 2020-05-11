/*
    These tests are testing errors thrown by the Request class.
    Take a look at __tests__/manual/nanoleaf.test.ts for integration tests.
*/

import Request from '../request';

describe('Request.get errors', () => {
  test('GET hould throw error when called with https', async () => {
    let httpsUrl = 'https://test.com';
    await expect(Request.get(httpsUrl)).rejects.toThrow();
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

describe('Request.put errors', () => {
  let exampleBody = {
    id: 1,
    title: 'my post',
    body: 'example body',
    userId: 1,
  };

  test('PUT should throw error when called with https', async () => {
    let httpsUrl = 'https://test.com';
    await expect(Request.put(httpsUrl, exampleBody)).rejects.toThrow();
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
});

describe('Request.post errors', () => {
  let exampleBody = {
    id: 1,
    title: 'my post',
    body: 'example body',
    userId: 1,
  };

  test('POST should throw error when called with https', async () => {
    let httpsUrl = 'https://test.com';
    await expect(Request.post(httpsUrl, exampleBody)).rejects.toThrow();
  });

  test('Should throw an error on an invalid status code', async () => {
    // make up a url
    let fakeBody = { idk: 1, someProp: 'hello' };
    let fakeUrl = 'http://www.garge2123.com';
    await expect(Request.post(fakeUrl, fakeBody)).rejects.toThrow();
  });

  test('Should throw error on empty URL', async () => {
    let emptyUrl = '';
    await expect(Request.post(emptyUrl)).rejects.toThrow();
  });
});
