import * as ftp from 'basic-ftp';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FtpService {
  constructor() {}

  async ftpDownloadFile(localPath: string, remotePath: string): Promise<any> {
    /*  const client = new Client();
    await client.on('ready', function () {
      client.get('ÂûãðóçêàYML_03042023151015.xml', function (err, stream) {
        if (err) throw err;
        stream.once('close', function () {
          client.end();
        });
        stream.pipe(
          FS.createWriteStream('./uploadedFiles/foo.local-copy.xml', 'utf-8'),
        );
      });
    });

    /* await client.connect({
      host: 'ftp.klen-net.ru',
      user: 'klen',
      password: '46ryfhVN',
    }); */

    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
      await client.access({
        host: 'ftp.klen-net.ru',
        user: 'klen',
        password: '46ryfhVN',
        secure: true,
      });
      const list = (await client.list())[0].name;
      console.log({ list });
      await client.downloadTo(process.cwd() + '1.xml', list);
    } catch (err) {
      console.log(err);
      client.close();
    }
  }
}
