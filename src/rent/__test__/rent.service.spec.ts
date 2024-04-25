import { Test, TestingModule } from '@nestjs/testing';
import { RentService } from '../rent.service';
import { CreateRentDTO } from '../dto/create-rent.dto';
import { Rent } from '../entity/rent.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { validate } from 'class-validator';
import { AuthorService } from '../../author/author.service';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { AuthorModule } from '../../author/author.module';
import { CloudinaryModule } from '../../cloudinary/cloudinary.module';
import { UserService } from '../../user/user.service';
import { BookService } from '../../book/book.service';


const mockRentRepository = {
    exists: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
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

describe('BookService', () => {
    let service: RentService;
    let serviceBook: BookService;
    let serviceUser: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                { provide: 'UserRepository', useValue: mockUserRepository },
                RentService,
                { provide: 'RentRepository', useValue: mockRentRepository },
                AuthorService,
                { provide: 'AuthorRepository', useValue: mockAuthorRepository },
                CloudinaryService,
                BookService,
                { provide: 'BookRepository', useValue: mockBookRepository },
                // { provide: 'CloudinaryRepository'},
            ]
        }).compile();

        service = module.get<RentService>(RentService);
        serviceBook = module.get<BookService>(BookService);
        serviceUser = module.get<UserService>(UserService);
    });

    // testes de DTO

    describe('DTO validation', () => {
        it('should pass validation with a valid book', async () => {
            const data = new CreateRentDTO();
            data.user_id = 1;
            data.book_id = 1;

            const errors = await validate(data);

            expect(errors.length).toEqual(0);
        });

        it('should fail validation with an empty book', async () => {
            const data = new CreateRentDTO();

            const errors = await validate(data);

            expect(errors.length).toBeGreaterThan(0);
            expect(errors[0].constraints)
        });

    });

    // // Testes do metodo create

    describe('create', () => {

        it('should create a new rent', async () => {
            const data: CreateRentDTO = {
                user_id: 0,
                book_id: 1
            };
            const mockRent: Rent = {
                id: 1, ...data,
                finished_in: '',
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
                    id: 1,
                    title: '',
                    author_id: 0,
                    page: 0,
                    quantity: 0,
                    synopsis: '',
                    cover: '',
                    author:{
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
                },
                createdAt: '',
                updatedAt: ''
            }

            jest.spyOn(serviceBook, 'exist').mockResolvedValueOnce(undefined); //Simula que o livro existe
            jest.spyOn(serviceUser, 'exist').mockResolvedValueOnce(undefined); //Simula que o usuario existe

            mockRentRepository.create.mockReturnValueOnce(mockRent);

            jest.spyOn(service, 'show').mockResolvedValueOnce(undefined); //Simula que o livro foi mostrado

            jest.spyOn(serviceBook, 'removeBookQuantity').mockResolvedValueOnce(undefined); //Simula que a quantidade foi reduzida

            mockRentRepository.save.mockResolvedValueOnce(mockRent);

            const result = await service.create(data);

            expect(result).toEqual(mockRent);
        });

        it('should throw BadRequestException if title already exists', async () => {
            const data: CreateRentDTO = {
                user_id: 0,
                book_id: 0
            };;

            mockRentRepository.exists.mockResolvedValue(true)

            await expect(service.create(data)).rejects.toThrow(BadRequestException);
        });

    });

    // // Testes do metodo list

    // describe('List', () => {
    //     it('Should return all Rents', async () => {
    //         const mockBook = [
    //             { id: 1, title: 'Livro', page: 1, quantity: 1, author_id: 1, synopsis: "", cover: "" },
    //             { id: 2, title: 'Livro', page: 1, quantity: 1, author_id: 1, synopsis: "", cover: "" },
    //         ]

    //         mockBookRepository.find.mockResolvedValueOnce(mockBook)

    //         const result = await service.list();

    //         expect(result).toEqual(mockBook);
    //     })
    // })

    // // Testes do metodo show

    // describe('show', () => {

    //     it('Should return one Book', async () => {
    //         const mockBook: Book = {
    //             id: 1, title: 'Livro', page: 1, quantity: 1, author_id: 1, synopsis: "", cover: "", createdAt: "", updatedAt: "", rents: [], favorites: [], reviews: [], author: {
    //                 id: 1,
    //                 name: '',
    //                 books: [],
    //                 createdAt: '',
    //                 updatedAt: ''
    //             }
    //         }

    //         jest.spyOn(service, 'exist').mockResolvedValueOnce(undefined);

    //         mockBookRepository.findOne.mockResolvedValue(mockBook)

    //         const result = await service.show(1);

    //         expect(result).toEqual(mockBook);

    //     })
    //     it('should throw NotFoundException if book with the specified ID is not found', async () => {
    //         jest.spyOn(service, 'exist').mockRejectedValueOnce(new NotFoundException());

    //         mockBookRepository.findOne.mockResolvedValueOnce(null);

    //         const invalidId = 999;
    //         await expect(service.show(invalidId)).rejects.toThrow(NotFoundException);

    //     });

    // });

    // // Testes do metodo updatePartial

    // describe('updatePartial', () => {
    //     it('should update the book with the specified ID and return the updated book', async () => {
    //         const updatedBook: Book = {
    //             id: 1, title: 'Livro', page: 1, quantity: 1, author_id: 1, synopsis: "", cover: "", createdAt: "", updatedAt: "",
    //             author: {
    //                 id: 0,
    //                 name: '',
    //                 books: [],
    //                 createdAt: '',
    //                 updatedAt: ''
    //             },
    //             rents: [],
    //             favorites: [],
    //             reviews: []
    //         };

    //         jest.spyOn(service, 'exist').mockResolvedValueOnce(undefined); // Simula que o livro existe

    //         jest.spyOn(serviceAuthor, 'exist').mockResolvedValueOnce(undefined); // Simula que o autor existe

    //         mockBookRepository.update.mockResolvedValueOnce({});

    //         jest.spyOn(service, 'show').mockResolvedValueOnce(updatedBook);

    //         const result = await service.updatePartial(1, { title: 'Livro' });

    //         expect(result).toEqual(updatedBook);
    //     });

    //     it('should throw NotFoundException if book with the specified ID is not found', async () => {
    //         jest.spyOn(service, 'exist').mockRejectedValueOnce(new NotFoundException());

    //         const invalidId = 999;

    //         await expect(service.updatePartial(invalidId, { title: 'testeste' })).rejects.toThrow(NotFoundException);
    //     });
    // });

    // // Testes do metodo finish

    // describe('delete', () => {

    //     it('should remove the book with the specified ID and return the deletion information', async () => {
    //         jest.spyOn(service, 'exist').mockResolvedValueOnce(undefined);

    //         const deleteInfo = true;

    //         mockBookRepository.delete.mockResolvedValueOnce(deleteInfo);

    //         const result = await service.delete(1);

    //         expect(result).toEqual(deleteInfo);
    //     });

    //     it('should throw NotFoundException if book with the specified ID is not found', async () => {
    //         jest.spyOn(service, 'exist').mockRejectedValueOnce(new NotFoundException());

    //         const invalidId = 99999;

    //         await expect(service.delete(invalidId)).rejects.toThrow(NotFoundException);
    //     });

    // });

    // // Testes do metodo exist

    // describe('exist', () => {

    //     it('should throw NotFoundException if book does not exist', async () => {
    //         const nonExistentBookId = 999;
    //         mockBookRepository.exists.mockResolvedValue(false);

    //         await expect(service.exist(nonExistentBookId)).rejects.toThrow(NotFoundException);
    //         expect(mockBookRepository.exists).toHaveBeenCalledWith({
    //             where: { id: nonExistentBookId }
    //         });
    //     });

    //     it('should not throw NotFoundException if book exists', async () => {
    //         const existingBookId = 1;
    //         mockBookRepository.exists.mockResolvedValue(true);

    //         await expect(service.exist(existingBookId)).resolves.not.toThrow(NotFoundException);
    //         expect(mockBookRepository.exists).toHaveBeenCalledWith({
    //             where: { id: existingBookId }
    //         });
    //     });

    // });

});