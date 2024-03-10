import { BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { validate } from 'uuid';

export const validateId = (id: string) => {
  if (!validate(id))
    throw new BadRequestException(`Id ${id} is not valid UUID`);
};

export const serializeId = (users: User[]) =>
  users.map((user) => {
    const userCopy = { ...user };

    delete userCopy.password;

    return userCopy;
  });

export const throwNotFoundException = (id: string) => {
  throw new NotFoundException(`Record with id ${id} doesn't exist`);
};
