/* 1.Авторизация на сайте
2.Формирование файла
3.Скачивание файла
4.Парсинг файлов */

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fetch from 'node-fetch';
import * as FormData from 'form-data';
import * as qs from 'qs';

@Injectable()
export class nezabudkaService {
  constructor(private readonly Axios: HttpService) {}

  public async authorization(): Promise<any> {
    try {
      /* const url = 'https://dc.rp.ru/site/login';

      const data = {
        username: 'chubenko',
        password: 'n5dgn#BD',
      };
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      const res = await axios.post(url, data, config);

      console.log(res);
      console.log(`Мои куки:${res.headers['set-cookie']}`);
      return res.headers['set-cookie']; */

      const data = qs.stringify({
        username: 'chubenko',
        password: 'n5dgn#BD',
      });

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://dc.rp.ru/site/login',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(response);
          /* console.log(JSON.stringify(response.data)); */
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }

  public async getFile(cookie: any) {
    try {
      const url = 'https://dc.rp.ru/price/price_xls';
      const data = {
        name: 'chubenko',
        value: 'n5dgn#BD',
      };
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      const file = await axios.post(url, data, config);
      return file;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }
}
