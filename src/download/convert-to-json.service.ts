import * as xlsx from 'xlsx';
import * as FS from 'fs';
import * as convert from 'xml-js';
import * as csvjson from 'csvjson';
import * as encoding from 'encoding';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConvertToJsonService {
  constructor() {}

  async xlsToJson(path: string): Promise<any> {
    try {
      const file = FS.readFileSync(path);
      const data = xlsx.read(file, { type: 'buffer' });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async xlsxToJson(path: string): Promise<any> {
    try {
      const file = FS.readFileSync(path);
      const data = xlsx.read(file, { type: 'buffer' });
      const finalObject = {};
      data.SheetNames.forEach((sheetName) => {
        const rowObject = xlsx.utils.sheet_to_json(data.Sheets[sheetName]);
        finalObject[sheetName] = rowObject;
      });
      return finalObject;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async xmlToJson(path: string, encod?: string): Promise<any> {
    try {
      const file = FS.readFileSync(path);
      if (encod === 'UTF-8') {
        const text = encoding.convert(file, 'UTF-8');
        const options = { compact: true, ignoreComment: true, spaces: 4 };
        const data = convert.xml2json(text, options);
        return JSON.parse(data);
      } else if ((encod = 'WINDOWS-1251')) {
        const text = encoding.convert(file, 'UTF-8', 'WINDOWS-1251');
        const options = { compact: true, ignoreComment: true, spaces: 4 };
        const data = convert.xml2json(text, options);
        return JSON.parse(data);
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async ymlToJson(path: string, encod?: string): Promise<any> {
    try {
      const file = FS.readFileSync(path);
      if (encod === 'UTF-8') {
        const text = encoding.convert(file, 'UTF-8');
        const options = { compact: true, ignoreComment: true, spaces: 4 };
        const data = convert.xml2json(text, options);
        return JSON.parse(data);
      } else if ((encod = 'WINDOWS-1251')) {
        const text = encoding.convert(file, 'UTF-8', 'WINDOWS-1251');
        const options = { compact: true, ignoreComment: true, spaces: 4 };
        const data = convert.xml2json(text, options);
        return JSON.parse(data);
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async csvToJson(path: string): Promise<any> {
    try {
      const file = FS.readFileSync(path, 'utf-8');
      const options = { delimiter: ',', quote: '"' };
      const data = await csvjson.stream.toObject(JSON.stringify(file), options);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
