import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/auth/auth.service';
import { AuthController } from 'src/auth/auth.controller';
import { getModelToken } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Token } from 'src/schemas/token.schema';
import { JwtService } from '@nestjs/jwt';
import { Response, response } from 'express';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { AuthUserDto } from 'src/dto/auth-user.dto';


describe('AuthController', () => {
  let controller: AuthController;

  const spiedBcryptCompareMethod = jest.spyOn(bcrypt, 'compare')
    .mockImplementation((pass, newPass) => true);

  const spiedResponceMethod = jest.spyOn(response, 'cookie')
    .mockImplementation((a, b) => b);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService,
        {
          provide: getModelToken(User.name), useValue: {
            findOne: jest.fn((x) => {
              if (x.email === "email@gmail.com") {
                return null
              } else {
                return {
                  _id: 'qwer',
                  ...x
                }
              }
            }),
            create: jest.fn((x) => x),
          }
        },
        {
          provide: getModelToken(Token.name), useValue:
          {
            findOne: jest.fn((x: Object) => {
              save: jest.fn();
            }),
            create: jest.fn((x) => x)
          }
        },
        JwtService]
    })
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should be dcreated new user', async () => {
    const createUserDto: CreateUserDto = {
      email: "email@gmail.com",
      firstName: "Jhon",
      lastName: "Smidt",
      position: "engineer",
      password: "123",
      role: "admin"
    }

    const createUserResult = await controller.signup(createUserDto, response);
    expect(spiedResponceMethod).toBeCalled();
    expect(createUserResult).toEqual({
      accessToken: expect.any(String),
      refreshToken: expect.any(String)
    });
  });

  it('should be authorized', async () => {
    const authUserDto: AuthUserDto = {
      email: "em@gmail.com",
      password: "123",
    }

    const authUserResult = await controller.signIn(authUserDto, response);

    expect(spiedBcryptCompareMethod).toBeCalled();
    expect(spiedResponceMethod).toBeCalled();
    expect(authUserResult).toEqual({
      accessToken: expect.any(String),
      refreshToken: expect.any(String)
    });
  })

});
