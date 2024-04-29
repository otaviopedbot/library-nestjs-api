import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user/user.service';
import { UnauthorizedException } from '@nestjs/common';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import { CreateUserDTO } from '../../user/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

const mockUserRepository = {
    exists: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

describe('Authservice', () => {
    let service: AuthService;
    let serviceUser: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                JwtService,
                UserService,
                { provide: 'UserRepository', useValue: mockUserRepository },
                AuthService,
                CloudinaryService,
            ]
        }).compile();

        service = module.get<AuthService>(AuthService);
        serviceUser = module.get<UserService>(UserService);
    });

    // Testes do metodo login

    // describe('login', () => {
    //     it('should return a token when email and password are correct', async () => {
    //         const mockUser = {
    //             id: 1,
    //             email: 'mail@mail.com',
    //             password: await bcrypt.hash('password', 10)
    //         };
    
    //         mockUserRepository.findOne.mockResolvedValueOnce(mockUser);
    
    //         const result = await service.login('mail@mail.com', 'password');
    
    //         expect(result).toHaveProperty('token');
    //     });
    
    //     it('should throw UnauthorizedException when username is correct but password is incorrect', async () => {
    //         const mockUser = {
    //             id: 1,
    //             username: 'testuser',
    //             password: await bcrypt.hash('password', 10)
    //         };
    
    //         mockUserRepository.findOne.mockResolvedValueOnce(mockUser);

    //         await expect(service.login('testuser', 'wrongpassword')).rejects.toThrow(UnauthorizedException);
    //     });
    
    //     it('should throw UnauthorizedException when username is not found', async () => {
    //         mockUserRepository.findOne.mockResolvedValueOnce(null);
    
    //         await expect(service.login('nonexistentuser', 'password')).rejects.toThrow(UnauthorizedException);
    //     });
    // });

    // Testes do metodo register

    describe('register', () => {
        it('should create a new user', async () => {
            const data = new CreateUserDTO();
            data.username = 'user';
            data.email = 'user@mail.com';
            data.password = '123';

            mockUserRepository.exists.mockResolvedValueOnce(false);
            mockUserRepository.save.mockResolvedValueOnce({
                id: 1,
                ...data,
                type: 'user',
                comments: [],
                rents: [],
                book: null,
                favorite_book: null
            });

            const result = await service.register(data);

            const decodedToken = JSON.parse(atob(result.token.split('.')[1]));
            expect(decodedToken).toHaveProperty('id', result.user.id);
        });

    });

});