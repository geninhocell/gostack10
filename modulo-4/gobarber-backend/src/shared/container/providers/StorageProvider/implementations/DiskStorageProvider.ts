import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    // Mover de uma pasta para outra
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    // Montar caminho completo do arquivo
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      // Tenta ler arquivo, caso não exista, retorna erro
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    // Deletar arquivo
    await fs.promises.unlink(filePath);
  }
}
