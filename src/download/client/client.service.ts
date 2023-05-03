import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientService {
  constructor(private readonly Axios: HttpService) {}

  authBasic = {
    Authorization:
      'Basic ' +
      Buffer.from('info@barneo.ru' + ':' + '12345678').toString('base64'),
  };
  domen = 'https://api.pbd.complexbar.ru';

  async getStock(): Promise<any> {
    const url = decodeURI(this.domen + '/stocks');
    const response = await this.Axios.axiosRef.get(url, {
      headers: this.authBasic,
    });
    return response.data;
  }

  async getPrice(): Promise<any> {
    const url = decodeURI(this.domen + '/prices');
    const response = await this.Axios.axiosRef.get(url, {
      headers: this.authBasic,
    });
    return response.data;
  }
}
