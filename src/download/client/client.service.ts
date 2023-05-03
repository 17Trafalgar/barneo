import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientService {
  constructor(private readonly Axios: HttpService) {}
  username = 'info@barneo.ru';
  password = '12345678';

  authBasic = {
    Authorization:
      'Basic ' +
      Buffer.from(this.username + ':' + this.password).toString('base64'),
  };
  domen = 'https://api.pbd.complexbar.ru';

  async getUrl(uri: string): Promise<string> {
    try {
      const url = decodeURI(this.domen + uri);
      return url;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getStock(): Promise<any> {
    try {
      const response = await this.Axios.axiosRef.get(
        await this.getUrl('/stocks'),
        {
          headers: this.authBasic,
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getPrice(): Promise<any> {
    try {
      const response = await this.Axios.axiosRef.get(
        await this.getUrl('/prices'),
        {
          headers: this.authBasic,
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
