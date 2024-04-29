import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { CreateUserDTO } from '../inputs/create-user.dto';
import { User } from '../types/user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { validate } from 'class-validator';
import { AuthorService } from '../../author/author.service';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { AuthorModule } from '../../author/author.module';
import { CloudinaryModule } from '../../cloudinary/cloudinary.module';

const mockUserRepository = {
    exists: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

// const mockAuthorRepository = {
//     exists: jest.fn()
// };

describe('Userservice', () => {
    let service: UserService;
    // let serviceAuthor: AuthorService;
    // let serviceCloudinary: CloudinaryService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                { provide: 'UserRepository', useValue: mockUserRepository },
                // AuthorService,
                // { provide: 'AuthorRepository', useValue: mockAuthorRepository },
                CloudinaryService,
                // { provide: 'CloudinaryRepository'},
            ]
        }).compile();

        service = module.get<UserService>(UserService);
        // serviceAuthor = module.get<AuthorService>(AuthorService);
        // serviceCloudinary = module.get<CloudinaryService>(CloudinaryService);
    });

    // testes de DTO

    describe('DTO validation', () => {
        it('should pass validation with a valid User', async () => {
            const data = new CreateUserDTO();
            data.complete_name = 'Livro';
            data.phone = '(14)991234567';
            data.address = 'rua teste';
            data.username = 'teste';
            data.email = 'email@mail.com';
            data.password = 'senha123';


            const errors = await validate(data);

            expect(errors.length).toEqual(0);
        });

        it('should fail validation with an empty User', async () => {
            const data = new CreateUserDTO();

            const errors = await validate(data);

            expect(errors.length).toBeGreaterThan(0);
            expect(errors[0].constraints)
        });

    });

    // Testes do metodo create

    describe('create', () => {

        it('should create a new user', async () => {
            const data: CreateUserDTO = {
                complete_name: '',
                phone: '',
                address: '',
                username: '',
                email: '',
                password: '',
                image: '',
                details: ''
            };
            const mockUser: User = {
                id: 1, ...data, createdAt: "", updatedAt: "",
                is_admin: 0,
                rents: [],
                reviews: [],
                favorites: []
            };

            // jest.spyOn(service, 'exists').mockResolvedValueOnce(undefined);// Simula que o usuario existe
            mockUserRepository.exists.mockReturnValueOnce(undefined);

            mockUserRepository.create.mockReturnValueOnce(mockUser);

            mockUserRepository.save.mockResolvedValueOnce(mockUser);

            const result = await service.create(data);

            expect(result).toEqual(mockUser);
        });

        it('should throw BadRequestException if title already exists', async () => {
            const data: CreateUserDTO = {
                complete_name: '',
                phone: '',
                address: '',
                username: '',
                email: '',
                password: '',
                image: '',
                details: ''
            };

            mockUserRepository.exists.mockResolvedValue(true)

            await expect(service.create(data)).rejects.toThrow(BadRequestException);
        });

    });

    // Testes do metodo list

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

    // Testes do metodo show

    describe('show', () => {

        it('Should return one user', async () => {
            const mockUser: User = {
                id: 0,
                complete_name: '',
                phone: '',
                address: '',
                username: '',
                email: '',
                password: '',
                image: '',
                details: '',
                is_admin: 0,
                rents: [],
                reviews: [],
                favorites: [],
                createdAt: '',
                updatedAt: ''
            }

            jest.spyOn(service, 'exist').mockResolvedValueOnce(undefined);

            mockUserRepository.findOne.mockResolvedValue(mockUser)

            const result = await service.show(1);

            expect(result).toEqual(mockUser);

        })
        it('should throw NotFoundException if the user with the specified ID is not found', async () => {
            jest.spyOn(service, 'exist').mockRejectedValueOnce(new NotFoundException());

            mockUserRepository.findOne.mockResolvedValueOnce(null);

            const invalidId = 999;
            await expect(service.show(invalidId)).rejects.toThrow(NotFoundException);

        });

    });

    // Testes do metodo updatePartial

    describe('updatePartial', () => {
        it('should update the User with the specified ID and return the updated book', async () => {
            const updatedUser: User = {
                id: 1,
                complete_name: '',
                phone: '',
                address: '',
                username: '',
                email: '',
                password: '',
                image: '',
                details: '',
                is_admin: 0,
                rents: [],
                reviews: [],
                favorites: [],
                createdAt: '',
                updatedAt: ''
            };

            jest.spyOn(service, 'show').mockResolvedValueOnce(undefined);

            mockUserRepository.update.mockResolvedValueOnce({});

            jest.spyOn(service, 'show').mockResolvedValueOnce(updatedUser);

            const result = await service.updatePartial(1, { complete_name: 'teste' });

            expect(result).toEqual(updatedUser);
        });

        it('should throw NotFoundException if the user with the specified ID is not found', async () => {
            jest.spyOn(service, 'exist').mockRejectedValueOnce(new NotFoundException());

            const invalidId = 999;

            await expect(service.updatePartial(invalidId, { complete_name: 'testeste' })).rejects.toThrow(NotFoundException);
        });
    });

    // Testes do metodo delete

    describe('delete', () => {

        it('should remove the user with the specified ID and return the deletion information', async () => {
            jest.spyOn(service, 'exist').mockResolvedValueOnce(undefined);

            const deleteInfo = true;

            mockUserRepository.delete.mockResolvedValueOnce(deleteInfo);

            const result = await service.delete(1);

            expect(result).toEqual(deleteInfo);
        });

        it('should throw NotFoundException if the user with the specified ID is not found', async () => {
            jest.spyOn(service, 'exist').mockRejectedValueOnce(new NotFoundException());

            const invalidId = 99999;

            await expect(service.delete(invalidId)).rejects.toThrow(NotFoundException);
        });

    });

    // Testes do metodo exist

    describe('exist', () => {

        it('should throw NotFoundException if the user does not exist', async () => {
            const nonExistentUserId = 999;
            mockUserRepository.exists.mockResolvedValue(false);

            await expect(service.exist(nonExistentUserId)).rejects.toThrow(NotFoundException);
            expect(mockUserRepository.exists).toHaveBeenCalledWith({
                where: { id: nonExistentUserId }
            });
        });

        it('should not throw NotFoundException if User exists', async () => {
            const existingUserId = 1;
            mockUserRepository.exists.mockResolvedValue(true);

            await expect(service.exist(existingUserId)).resolves.not.toThrow(NotFoundException);
            expect(mockUserRepository.exists).toHaveBeenCalledWith({
                where: { id: existingUserId }
            });
        });

    });

});