import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { OpenAPIObject } from '@nestjs/swagger';
import { validate } from 'uuid';
import { load } from 'js-yaml';
// import { User } from 'src/user/entities/user.entity';

export const validateId = (id: string) => {
  if (!validate(id))
    throw new BadRequestException(`Id ${id} is not valid UUID`);
};

export const throwNotFoundException = (id: string) => {
  throw new NotFoundException(`Record with id ${id} doesn't exist`);
};

export const loadApiDocs = async () => {
  const content = await readFile(
    resolve(__dirname, '../../doc/api.yaml'),
    'utf8',
  );
  const apiDocs: OpenAPIObject = await load(content);

  return apiDocs;
};
