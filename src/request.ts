import http from 'http';

export default class Request {
  public static get = <T>(url: string): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      let data: any = [];
      http
        .get(url, (res) => {
          if (res.statusCode! < 200 || res.statusCode! >= 300) {
            return reject(new Error('statusCode=' + res.statusCode));
          }

          res.on('data', (d) => {
            data.push(d);
          });
        })
        .on('error', (e) => {
          reject(e);
        })
        .on('close', () => {
          try {
            data = JSON.parse(Buffer.concat(data).toString());
          } catch (e) {
            reject(e);
          }
          resolve(data);
        });
    });
  };
}
