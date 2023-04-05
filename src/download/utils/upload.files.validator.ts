import { extname } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';

export const allFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(xlsx|xml|yml)$/)) {
    return callback(
      new HttpException(
        'Only xlsx or xml,yml files are allowed!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
};
export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  callback(null, `${name}${fileExtName}`);
};
