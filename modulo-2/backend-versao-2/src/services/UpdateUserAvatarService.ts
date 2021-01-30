import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';

import AppError from '../errors/AppError';

import uploadConfig from '../config/upload';

interface RequestDTO {
  user_id: string;
  avatar_filename: string;
}

export default class UpdateUserAvatarService {
  public async execute({
    user_id,
    avatar_filename,
  }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticate users can change avatar.', 401);
    }

    if (user.avatar) {
      const userAvatarFilePatch = path.join(
        uploadConfig.directory,
        user.avatar,
      );

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePatch);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePatch);
      }
    }

    user.avatar = avatar_filename;

    await usersRepository.save(user);

    return user;
  }
}
