import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

export default class FakeStorageProvider implements IStorageProvider {
  private storages: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storages.push(file);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.storages.findIndex(storage => storage === file);

    this.storages.splice(findIndex, 1);
  }
}
