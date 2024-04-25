import { Test, TestingModule } from '@nestjs/testing';
import { CreateFavoriteDTO } from '../dto/create-favorite.dto';
import { Favorite } from '../entity/favorite.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { validate } from 'class-validator';
import { FavoriteService } from '../favorite.service';
import { UserService } from '../../user/user.service';
import { BookService } from '../../book/book.service';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { CloudinaryModule } from '../../cloudinary/cloudinary.module';
import { AuthorModule } from '../../author/author.module';
import { AuthorService } from '../../author/author.service';

const mockFavoriteRepository = {
    exists: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
};

const mockUserRepository = {
    exists: jest.fn()
};

const mockBookRepository = {
    exists: jest.fn()
};

const mockAuthorRepository = {
    exists: jest.fn()
};

describe('FavoriteService', () => {
    let service: FavoriteService;
    let serviceUser: UserService;
    let serviceBook: BookService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FavoriteService,
                CloudinaryService,
                AuthorService,
                { provide: 'FavoriteRepository', useValue: mockFavoriteRepository },
                UserService,
                { provide: 'UserRepository', useValue: mockUserRepository },
                BookService,
                { provide: 'BookRepository', useValue: mockBookRepository },
                { provide: 'AuthorRepository', useValue: mockAuthorRepository },
            ],
        }).compile();

        service = module.get<FavoriteService>(FavoriteService);
        serviceUser = module.get<UserService>(UserService);
        serviceBook = module.get<BookService>(BookService);
    });

    // testes de DTO

    describe('DTO validation', () => {
        it('should pass validation with a valid data', async () => {
            const data = new CreateFavoriteDTO();
            data.user_id = 1;
            data.book_id = 1;

            const errors = await validate(data);

            expect(errors.length).toEqual(0);
        });

        it('should fail validation with a not valid data', async () => {
            const data = new CreateFavoriteDTO();
            data.user_id = null;
            data.book_id = null;

            const errors = await validate(data);

            expect(errors.length).toBeGreaterThan(0);
            expect(errors[0].constraints);
        });
    });

    // Testes do metodo create

    describe('create', () => {

        it('should create a new favorite', async () => {
            const data: CreateFavoriteDTO = { user_id: 1, book_id: 1 };
            const mockFavorite: Favorite = {
                id: 1, ...data, createdAt: "", updatedAt: "",
                user: {
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
                },
                book: {
                    id: 0,
                    title: '',
                    author_id: 0,
                    page: 0,
                    quantity: 0,
                    synopsis: '',
                    cover: '',
                    author: {
                        id: 0,
                        name: '',
                        books: [],
                        createdAt: '',
                        updatedAt: ''
                    },
                    rents: [],
                    favorites: [],
                    reviews: [],
                    createdAt: '',
                    updatedAt: ''
                }
            };

            mockFavoriteRepository.exists.mockResolvedValue(undefined);

            jest.spyOn(serviceUser, 'exist').mockResolvedValueOnce(undefined);
            jest.spyOn(serviceBook, 'exist').mockResolvedValueOnce(undefined);

            mockFavoriteRepository.create.mockReturnValueOnce(mockFavorite);
            mockFavoriteRepository.save.mockResolvedValueOnce(mockFavorite);

            const result = await service.create(data);

            expect(result).toEqual(mockFavorite);
        });

        it('should throw BadRequestException if the favorite already exists', async () => {
            const data: CreateFavoriteDTO = { book_id: 1, user_id: 1 };
        
            mockFavoriteRepository.exists.mockResolvedValue(true);
        
            await expect(service.create(data)).rejects.toThrow(NotFoundException);
        });
        
    });

    // Testes do metodo delete
    
    describe('delete', () => {

        it('should remove the favorite with the specified ID and return the deletion information', async () => {
            jest.spyOn(service, 'exist').mockResolvedValueOnce(undefined);

            const deleteInfo = true;

            mockFavoriteRepository.delete.mockResolvedValueOnce(deleteInfo);

            const result = await service.delete(1);
            expect(result).toEqual(deleteInfo);
        });

        it('should throw NotFoundException if author with the specified ID is not found', async () => {
            jest.spyOn(service, 'exist').mockRejectedValueOnce(new NotFoundException());

            const invalidId = 99999;

            await expect(service.delete(invalidId)).rejects.toThrow(NotFoundException);
        });

    });

    // Testes do metodo exist

    describe('exist', () => {

        it('should throw NotFoundException if author favorite not exist', async () => {
            const nonExistentFavoriteId = 9999;
            mockFavoriteRepository.exists.mockResolvedValue(false);
     
            await expect(service.exist(nonExistentFavoriteId)).rejects.toThrow(NotFoundException);
            expect(mockFavoriteRepository.exists).toHaveBeenCalledWith({
                where: { id: nonExistentFavoriteId }
            });
        });

        it('should not throw NotFoundException if favorite exists', async () => {
            const existingFavoriteId = 1;
            mockFavoriteRepository.exists.mockResolvedValue(true);

            await expect(service.exist(existingFavoriteId)).resolves.not.toThrow(NotFoundException);
            expect(mockFavoriteRepository.exists).toHaveBeenCalledWith({
                where: { id: existingFavoriteId }
            });
        });

    });

});