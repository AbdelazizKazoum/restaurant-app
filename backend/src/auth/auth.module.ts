/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';


@Module({
  controllers: [AuthController],
  imports: [UsersModule,
      JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30000s' },
    }),

  ],
})
export class AuthModule { }
