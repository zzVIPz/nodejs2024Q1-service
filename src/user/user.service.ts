import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { throwNotFoundException, validateId } from 'src/utils/utils';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly db: Repository<User>,
  ) {}

  getAllUsers = async () =>
    await this.db.find({
      select: ['id', 'login', 'version', 'createdAt', 'updatedAt'],
    });

  getUserById = async (id: string) => {
    validateId(id);

    const user = await this.db.findOneBy({ id });

    if (!user) throwNotFoundException(id);

    const userCopy = { ...user };

    delete userCopy.password;

    return userCopy;
  };

  createUser = async (userDto: CreateUserDto) => {
    if (!userDto.login) throw new BadRequestException(`Login is required`);
    if (!userDto.password)
      throw new BadRequestException(`Password is required`);

    const user = await this.db.save(userDto);

    return await this.getUserById(user.id);
  };

  updateUserPassword = async (
    id: string,
    { oldPassword, newPassword }: UpdateUserPasswordDto,
  ) => {
    validateId(id);

    if (
      !newPassword ||
      !oldPassword ||
      typeof newPassword !== 'string' ||
      typeof newPassword !== 'string'
    )
      throw new BadRequestException('Password is wrong');

    const user = await this.db.findOneBy({ id });

    if (!user) throwNotFoundException(id);

    if (oldPassword !== user.password)
      throw new ForbiddenException('Password is wrong');

    await this.db.save({
      ...user,
      password: newPassword,
    });

    return await this.getUserById(id);
  };

  deleteUser = async (id: string) => {
    await this.getUserById(id);
    await this.db.delete(id);
  };
}
