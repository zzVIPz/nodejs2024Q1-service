import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DataService } from 'src/data/data.service';
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
  constructor(private readonly db: DataService) {}

  getAllUsers = () => serializeId(Object.values(this.db.getAllUsers()));

  getUserById = (id: string) => {
    validateId(id);

    const user = this.db.getUserById(id);

    if (!user) throwNotFoundException(id);

    const userCopy = { ...user };

    delete userCopy.password;

    return userCopy;
  };

  createUser = ({ login, password }: CreateUserDto) => {
    if (!login) throw new BadRequestException(`Login is required`);
    if (!password) throw new BadRequestException(`Password is required`);

    const user = new User({
      id: uuidv4(),
      login,
      password,
    });

    this.db.createUser(user.id, user);

    return this.getUserById(user.id);
  };

  updateUserPassword = (
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

    const user = this.db.getUserById(id);

    if (!user) throwNotFoundException(id);

    if (oldPassword !== user.password)
      throw new ForbiddenException('Password is wrong');

    this.db.createUser(id, {
      ...user,
      password: newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    });

    return this.getUserById(user.id);
  };

  deleteUser = (id: string) => {
    validateId(id);

    const user = this.db.getUserById(id);

    if (!user) throwNotFoundException(id);

    this.db.deleteUser(id);
  };
}
