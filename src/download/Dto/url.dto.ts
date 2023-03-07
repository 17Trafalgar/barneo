import { IsString } from 'class-validator';

export class UrlDto {
  /* @IsUrl() */
  @IsString()
  url: string;
}
