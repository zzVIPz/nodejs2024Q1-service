import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity';
import {
  serializeId,
  throwNotFoundException,
  validateId,
} from 'src/utils/utils';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly db: Repository<User>,
  ) {}

  getAllUsers = async () =>
    serializeId(
      Object.values(
        await this.db.find({
          select: ['id', 'login', 'version', 'createdAt', 'updatedAt'],
        }),
      ),
    );

  getUserById = async (id: string) => {
    validateId(id);

    const user = await this.db.findOneBy({ id });

    if (!user) throwNotFoundException(id);

    const userCopy = { ...user };

    delete userCopy.password;

    return userCopy;
  };

  createUser = async ({ login, password }: CreateUserDto) => {
    if (!login) throw new BadRequestException(`Login is required`);
    if (!password) throw new BadRequestException(`Password is required`);

    const user = new User({
      id: uuidv4(),
      login,
      password,
    });

    await this.db.create(user);

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

    this.db.update(id, {
      ...user,
      password: newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    });

    return this.getUserById(user.id);
  };

  deleteUser = (id: string) => {
    this.getUserById(id);
    this.db.delete(id);
  };
}
