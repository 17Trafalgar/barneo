import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { UrlDto } from './Dto/url.dto';
import * as xlsx from 'xlsx';
import * as fs from 'fs/promises';
import * as csvtojson from 'csvtojson';

@Injectable()
export class DownloadService {
  constructor(private readonly axios: HttpService) {}
  public async csvToJson(urlDto: UrlDto) {
    const file = await this.axios.axiosRef.get(urlDto.url);
    console.log(typeof file.data);
    const data = xlsx.read(file.data, { type: 'buffer' });
    console.log(data);
    const finalObject = {};
    data.SheetNames.forEach((sheetName) => {
      const rowObject = xlsx.utils.sheet_to_json(data.Sheets[sheetName]);
      finalObject[sheetName] = rowObject;
    });
    console.log({ finalObject });
    await fs.writeFile('./target.json', JSON.stringify(finalObject));
    console.log(finalObject);
  }
}
/* }); */
/* csvtojson()
      .fromString(file.data)
      .then(async (jsonObj) => {
        console.log(jsonObj);
        const finalObject = {};
         data.SheetNames.forEach((sheetName) => {
          const rowObject = xlsx.utils.sheet(data.Sheets[sheetName]);
          console.log(rowObject);
          finalObject[sheetName] = rowObject;
        }); 
        fs.writeFile('./target.json', JSON.stringify(jsonObj));
        console.log(finalObject); */
