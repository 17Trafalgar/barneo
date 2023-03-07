import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { UrlDto } from './Dto/url.dto';
import * as xlsx from 'xlsx';
import axios from 'axios';
import { createWriteStream } from 'fs';
import { Transform } from 'stream';

@Injectable()
export class DownloadService {
  constructor(private readonly axios: HttpService) {}
  public async xlsx(urlDto: UrlDto) {
    const writer = createWriteStream('./target.json');
    return axios({
      method: 'get',
      url: urlDto.url,
      responseType: 'stream',
    }).then((response) => {
      return new Promise((resolve, reject) => {
        /* const stream = xlsx.stream.to_json(writer, { raw: true }); */
        const uppercase = new Transform({
          transform(chunk, encoding, callback) {
            callback(null);
          },
        });

        response.data.pipe(uppercase).pipe(writer);

        let error = null;

        writer.on('error', (err) => {
          error = err;
          writer.close();
          reject(err);
        });
        writer.on('close', () => {
          if (!error) {
            resolve(true);
          }
        });
      });
    });
  }

  //TODO:создать функцию
  /**
   * функция скачивает файл по урл и сохраняет локально в папку media и возвращает путь к файлу
   * @param urlDto
   */
  async getFileByUrl(urlDto: UrlDto): Promise<string>{
    return `PATH`
  }

  //TODO:создать функцию
  /**
   * функция читает файл локально переводит его из xlsx в json и возвращает JSON
   * @param path
   */
  async xlsxToJson(path: string): Promise<string>{
    return `PATH`
  }

  //TODO:создать функцию
  /**
   * временная функция для тестирования получает ссылку на файл из контроллера запускает функции
   * getFileByUrl и xlsxToJson и возвращает результат контроллеру
   * @param path
   */
  async main(urlDto: UrlDto): Promise<string>{
    const path = await this.getFileByUrl(urlDto);
    const json = await this.xlsxToJson(path);
    return json;
  }
}
