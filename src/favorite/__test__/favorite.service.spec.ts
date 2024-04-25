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

describe('FavoriteService', () => {
    let service: FavoriteService;
    let serviceUser: UserService;
    let serviceBook: BookService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports:[CloudinaryModule, AuthorModule],
            providers: [
                FavoriteService,
                { provide: 'FavoriteRepository', useValue: mockFavoriteRepository },
                UserService,
                { provide: 'UserRepository', useValue: mockUserRepository },
                BookService,
                { provide: 'BookRepository', useValue: mockBookRepository },
            ],
        }).compile();

        service = module.get<FavoriteService>(FavoriteService);
        serviceUser = module.get<UserService>(UserService);
        serviceBook = module.get<BookService>(BookService);
    });

    // testes de DTO

    // describe('DTO validation', () => {
        // it('should pass validation with a valid name', async () => {
        //     const data = new CreateAuthorDTO();
        //     data.name = 'John';

        //     const errors = await validate(data);

        //     expect(errors.length).toEqual(0);
        // });

        // it('should fail validation with an empty name', async () => {
        //     const data = new CreateAuthorDTO();
        //     data.name = '';

        //     const errors = await validate(data);

        //     expect(errors.length).toBeGreaterThan(0);
        //     expect(errors[0].constraints).toHaveProperty('isNotEmpty');
        // });

        // it('should fail validation if name is not a string', async () => {
        //     const createAuthorDTO = new CreateAuthorDTO();
        //     createAuthorDTO.name = 123; // Set the name to a non-string value

        //     const errors = await validate(createAuthorDTO);

        //     expect(errors.length).toBeGreaterThan(0);
        //     expect(errors[0].constraints).toHaveProperty('isString');
        // });
    // });

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
        
            await expect(service.create(data)).rejects.toThrow(BadRequestException);
        });
        
    });

    // Testes do metodo delete
    
    // describe('delete', () => {

    //     it('should remove the favorite with the specified ID and return the deletion information', async () => {
    //         jest.spyOn(service, 'exist').mockResolvedValueOnce(undefined);

    //         const deleteInfo = true;

    //         mockFavoriteRepository.delete.mockResolvedValueOnce(deleteInfo);

    //         const result = await service.delete(1);
    //         expect(result).toEqual(deleteInfo);
    //     });

    //     it('should throw NotFoundException if author with the specified ID is not found', async () => {
    //         jest.spyOn(service, 'exist').mockRejectedValueOnce(new NotFoundException());

    //         const invalidId = 99999;

    //         await expect(service.delete(invalidId)).rejects.toThrow(NotFoundException);
    //     });

    // });

    // Testes do metodo exist

    // describe('exist', () => {

    //     it('should throw NotFoundException if author does not exist', async () => {
    //         const nonExistentAuthorId = 999;
    //         mockAuthorRepository.exists.mockResolvedValue(false);
     
    //         await expect(service.exist(nonExistentAuthorId)).rejects.toThrowError(NotFoundException);
    //         expect(mockAuthorRepository.exists).toHaveBeenCalledWith({
    //             where: { id: nonExistentAuthorId }
    //         });
    //     });

    //     it('should not throw NotFoundException if author exists', async () => {
    //         const existingAuthorId = 1;
    //         mockAuthorRepository.exists.mockResolvedValue(true);

    //         await expect(service.exist(existingAuthorId)).resolves.not.toThrowError(NotFoundException);
    //         expect(mockAuthorRepository.exists).toHaveBeenCalledWith({
    //             where: { id: existingAuthorId }
    //         });
    //     });

    // });

});