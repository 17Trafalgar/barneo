import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class сlientService {
  constructor(private readonly Axios: HttpService) {}
  username = 'info@barneo.ru';
  password = '12345678';
  baseUrl = 'https://api.pbd.complexbar.ru';

  getHeaders() {
    return {
      Authorization:
        'Basic ' +
        Buffer.from(this.username + ':' + this.password).toString('base64'),
    };
  }

  getUrl(apiName: string) {
    return decodeURI(this.baseUrl + apiName);
  }

  async getStock(): Promise<any> {
    try {
      const response = await this.Axios.axiosRef.get(this.getUrl('/stocks'), {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getPrice(): Promise<any> {
    try {
      const response = await this.Axios.axiosRef.get(this.getUrl('/prices'), {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
