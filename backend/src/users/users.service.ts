/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserFilterDto } from './dto/userFilterDto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

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
  async findWithFilter(userFilterDto: UserFilterDto) {
    const { search, page } = userFilterDto;
    const take = 8;
    console.log(userFilterDto);

    const query = this.usersRepository.createQueryBuilder('user');

    if (search) {
      query.andWhere("user.email like :email", { email: `%${search}%` });
      query.andWhere('user.user_name like :username', { username: `%${search}%` });
    }

    const [listUsers, count] = await query.skip(((page - 1) * take)).take(take)
      .getManyAndCount();


    return {
      listUsers,
      meta: {
        count: count,
        page: page,
        take,
        lastPage: Math.ceil(count / take),
      }
    }

  }

  findOne(email) {
    return this.usersRepository.findOne({ where: { email } });
  }
  findOneById(id) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { pass, confirmPass } = updateUserDto
    if (pass) {
      if (pass === confirmPass) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(pass, salt);

        const user = {
          email: updateUserDto.email,
          user_name: updateUserDto.user_name,
          pass: hash,
          salt
        };
        return this.usersRepository.update(id, user);
      }
      else {
        throw new BadRequestException('password do not match')
      }
    } else {
      const user = { email: updateUserDto.email, user_name: updateUserDto.user_name }
      console.log('done');
      return this.usersRepository.update(id, user);
    }
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
function UseInterceptors(ClassSerializerInterceptor: any) {
  throw new Error('Function not implemented.');
}

