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

  public static put = <T>(url: string, body: object): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      const jsonBody = JSON.stringify(body);
      const urlObj = new URL(url);
      const options: http.RequestOptions = {
        hostname: urlObj.hostname,
        port: urlObj.port,
        path: urlObj.pathname,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': jsonBody.length,
        },
      };

      let data: any = [];
      http
        .request(options, (res) => {
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
        .on('end', () => {
          try {
            data = JSON.parse(Buffer.concat(data).toString());
          } catch (e) {
            reject(e);
          }
          resolve(data);
        })
        .write(jsonBody);
    });
  };
}
