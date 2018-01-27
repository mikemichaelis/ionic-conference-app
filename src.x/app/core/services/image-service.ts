import { Injectable } from '@angular/core';
//import { Storage } from '@ionic/storage';

//var b64 = require('base64-js');

@Injectable()
export class ImageService  {

  constructor() { //private storage: Storage) {

    // var b64str, arr, i, length
    // var big = new Uint8Array(64);
    // for (i = 0, length = big.length; i < length; ++i) {
    //   big[i] = i % 256
    // };
    // b64str = b64.fromByteArray(big);
    // arr = b64.toByteArray(b64str);
  }

  // public length(value: any): number {
  //   return b64.byteLength(value);
  // }

  // public async save(key: string, data: Uint8Array): Promise<any> {
  //   let value = b64.fromByteArray(data);
  //   await this.storage.set(key, value);
  // }

  // public async load(key: string): Promise<Uint8Array> {
  //   return b64.toByteArray(await this.storage.get(key));
  // }
}
