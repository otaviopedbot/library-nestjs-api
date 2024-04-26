import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user/user.service';
import { User } from '../../user/entity/user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { validate } from 'class-validator';
import { AuthorService } from '../../author/author.service';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { AuthorModule } from '../../author/author.module';
import { CloudinaryModule } from '../../cloudinary/cloudinary.module';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import { CreateUserDTO } from '../../user/dto/create-user.dto';
import { json } from 'stream/consumers';
import { AuthRegisterDTO } from '../dto/auth-register.dto';

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
                // { provide: 'CloudinaryRepository'},
            ]
        }).compile();

        service = module.get<AuthService>(AuthService);
        serviceUser = module.get<UserService>(UserService);
        // serviceCloudinary = module.get<CloudinaryService>(CloudinaryService);
    });

    // Testes do metodo login

    describe('List', () => {
        it('Should return all users', async () => {
            const mockUser = [
                {
                    id: 1,
                    complete_name: '',
                    phone: '',
                    address: '',
                    username: '',
                    email: '',
                    password: '',
                    image: '',
                    details: '',
                    createdAt: "",
                    updatedAt: "",
                    is_admin: 0,
                    rents: [],
                    reviews: [],
                    favorites: []
                },
                {
                    id: 2,
                    complete_name: '',
                    phone: '',
                    address: '',
                    username: '',
                    email: '',
                    password: '',
                    image: '',
                    details: '',
                    createdAt: "",
                    updatedAt: "",
                    is_admin: 0,
                    rents: [],
                    reviews: [],
                    favorites: []
                },
            ]

            mockUserRepository.find.mockResolvedValueOnce(mockUser)

            const result = await service.list();

            expect(result).toEqual(mockUser);
        })
    })

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