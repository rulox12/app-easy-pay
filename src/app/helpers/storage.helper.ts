import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})

export class StorageHelper {
  private storage: Storage | null = null;

  constructor(private storageClient: Storage) {
    this.init();
  }

  async init() {
    this.storage = await this.storageClient.create();
  }

  public set(key: string, value: any) {
    this.storage?.set(key, value);
  }

  public async get(key: string): Promise<boolean> {
    return await this.storageClient.get(key);
  }

  public async remove(key: string): Promise<boolean> {
    return await this.storageClient.remove(key);
  }
}
