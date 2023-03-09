import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { UrlDto } from './Dto/url.dto';
import * as xlsx from 'xlsx';
import * as fs from 'fs/promises';

@Injectable()
export class DownloadService {
  constructor(private readonly axios: HttpService) {}

  public async getFileByUrl({ url }): Promise<any> {
    try {
      const response = await this.axios.axiosRef.get(url, {
        responseType: 'stream',
      });
      const buffer = [];
      return new Promise((resolve, reject) => {
        return response.data
          .on('data', (chunk) => {
            buffer.push(chunk);
          })
          .on('end', () => resolve(Buffer.concat(buffer)))
          .on('error', reject);
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  public async xlsxToJson(urlDto: UrlDto): Promise<any> {
    try {
      const buffer = await this.getFileByUrl(urlDto);
      const data = xlsx.read(buffer, { type: 'buffer' });
      const finalObject = {};
      data.SheetNames.forEach((sheetName) => {
        const listObject = xlsx.utils.sheet_to_json(data.Sheets[sheetName]);
        finalObject[sheetName] = listObject;
        console.log(finalObject);
      });
      await fs.writeFile(
        './uploadedFiles/price-list.json',
        JSON.stringify(finalObject),
      );
      return 'file upload';
    } catch (error) {
      throw new Error(error);
    }
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
