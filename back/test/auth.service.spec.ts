import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/auth/auth.service';
import { AuthController } from 'src/auth/auth.controller';
import { getModelToken } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Token } from 'src/schemas/token.schema';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dto/create-user.dto';


describe('AuthService', () => {
  let authService: AuthService;

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

    authService = module.get<AuthService>(AuthService);
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      email: "email@gmail.com",
      firstName: "Jhon",
      lastName: "Smidt",
      position: "engineer",
      password: "123",
      role: "admin"
    }
    const createUserResult = await authService.signup(createUserDto);
    expect(createUserResult).toEqual({
      accessToken: expect.any(String),
      refreshToken: expect.any(String)
    });
  })

 // it('should ')


});






//const spiedBcryptHashMethod = jest.spyOn(bcrypt, 'hash')
    //.mockImplementation((pass, salt) => pass);
    //expect(spiedBcryptHashMethod).toHaveBeenCalled();
    // expect(createUserResult).toEqual({
    //   accessToken: expect.any(String),
    //   refreshToken: expect.any(String)
    // });