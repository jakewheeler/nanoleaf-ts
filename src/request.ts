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

  public static put = <T>(url: string, body?: object): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      const bodyStr = JSON.stringify(body);
      const parsedUrl = new URL(url);

      const options: http.RequestOptions = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port,
        path: parsedUrl.pathname,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': bodyStr?.length ?? 0,
        },
      };

      let data: any = [];
      http
        .request(options, (res) => {
          if (Request.statusCodeOutOfRange(res.statusCode!)) {
            return reject(new Error(`statusCode= + ${res.statusCode}`));
          }

          res.on('data', (d) => {
            data.push(d);
          });

          res.on('end', () => {
            try {
              if (data?.length)
                data = JSON.parse(Buffer.concat(data).toString());
            } catch (e) {
              reject(e);
            }
            resolve(data);
          });
        })
        .on('error', (e) => {
          reject(e);
        })
        .write(bodyStr || '');
    });
  };

  private static statusCodeOutOfRange = (statusCode: number): boolean => {
    return statusCode! < 200 || statusCode! >= 300 ? true : false;
  };
}
