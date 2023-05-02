import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ComplexbarService {
  constructor(private readonly Axios: HttpService) {}

  _authBasic = {
    Authorization:
      'Basic ' +
      Buffer.from('info@barneo.ru' + ':' + '12345678').toString('base64'),
  };
  _domen = 'https://api.pbd.complexbar.ru';

  async getStock(): Promise<any> {
    const url = decodeURI(this._domen + '/stocks');
    const response = await this.Axios.axiosRef.get(url, {
      headers: this._authBasic,
    });
    console.log(response.data);
    response.data;
  }

  async getPrice(): Promise<any> {
    const url = decodeURI(this._domen + '/prices');
    const response = await this.Axios.axiosRef.get(url, {
      headers: this._authBasic,
    });
    console.log(response.data);
    response.data;
  }
}
