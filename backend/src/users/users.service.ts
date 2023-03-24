/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserFilterDto } from './dto/userFilterDto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) { }

  create(user): Promise<User> {
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }
  async findWithFilter(userFilterDto: UserFilterDto): Promise<User[]> {
    const { email, user_name } = userFilterDto;

    const query = this.usersRepository.createQueryBuilder('user');

    if (email) {
      query.andWhere("user.email like :email", { email: `%${email}%` });
    }

    if (user_name) {
      query.andWhere('user.user_name like :username', { username: `%${user_name}%` });
    }

    const result = await query.getMany();

    return result;

  }

  findOne(email) {
    return this.usersRepository.findOne({ where: { email } });
  }
  findOneById(id) {
    return this.usersRepository.findOne({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
