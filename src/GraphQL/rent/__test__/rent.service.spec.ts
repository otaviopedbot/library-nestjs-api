import { Test, TestingModule } from '@nestjs/testing';
import { RentService } from '../rent.service';
import { CreateRentDTO } from '../inputs/create-rent.input';
import { Rent } from '../entity/rent.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { validate } from 'class-validator';
import { AuthorService } from '../../author/author.service';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
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

    // Testes do metodo create

    describe('create', () => {

        it('should create a new rent if quantiti-y >= 1', async () => {
            const data: CreateRentDTO = {
                user_id: 1,
                book_id: 1
            };
            const mockRent: Rent = {
                id: 1,
                ...data,
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
                    quantity: 1,
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
                },
                createdAt: '',
                updatedAt: ''
            };

            jest.spyOn(serviceBook, 'exist').mockResolvedValueOnce(undefined); // Simula que o livro existe

            // Simula que o livro com ID 1 existe ao chamar BookService.show
            jest.spyOn(serviceBook, 'show').mockResolvedValueOnce(mockRent.book);

            jest.spyOn(serviceUser, 'exist').mockResolvedValueOnce(undefined); // Simula que o usuário existe

            mockRentRepository.create.mockReturnValueOnce(mockRent);

            jest.spyOn(service, 'show').mockResolvedValueOnce(undefined); // Simula que o livro foi mostrado

            jest.spyOn(serviceBook, 'removeBookQuantity').mockResolvedValueOnce(undefined); // Simula que a quantidade foi reduzida

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

    // Testes do metodo list

    describe('List', () => {
        it('Should return all Rents', async () => {
            const mockRent = [
                {
                    id: 1,
                    user_id: 0,
                    book_id: 1,
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
                    },
                    createdAt: '',
                    updatedAt: ''
                },
                {
                    id: 2,
                    user_id: 0,
                    book_id: 1,
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
                    },
                    createdAt: '',
                    updatedAt: ''
                }
            ]

            mockRentRepository.find.mockResolvedValueOnce(mockRent)

            const result = await service.list();

            expect(result).toEqual(mockRent);
        })
    })

    // Testes do metodo show

    describe('show', () => {

        it('Should return one Rent', async () => {
            const mockRent: Rent = {
                id: 0,
                user_id: 0,
                book_id: 0,
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
                },
                createdAt: '',
                updatedAt: ''
            }

            jest.spyOn(service, 'exist').mockResolvedValueOnce(undefined);

            mockRentRepository.findOne.mockResolvedValue(mockRent)

            const result = await service.show(1);

            expect(result).toEqual(mockRent);

        })

        it('should throw NotFoundException if the rent with the specified ID is not found', async () => {
            jest.spyOn(service, 'exist').mockRejectedValueOnce(new NotFoundException());

            mockRentRepository.findOne.mockResolvedValueOnce(null);

            const invalidId = 999;
            await expect(service.show(invalidId)).rejects.toThrow(NotFoundException);

        });

    });

    // Testes do metodo updatePartial

    describe('updatePartial', () => {
        it('should update the Rent with the specified ID and return the updated Rent', async () => {
            const updatedRent: Rent = {
                id: 0,
                user_id: 0,
                book_id: 0,
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
                },
                createdAt: '',
                updatedAt: ''
            };

            jest.spyOn(service, 'exist').mockResolvedValueOnce(undefined);// Simula que o livro existe

            jest.spyOn(serviceUser, 'exist').mockResolvedValueOnce(undefined);// Simula que o autor existe

            jest.spyOn(serviceBook, 'exist').mockResolvedValueOnce(undefined);// Simula que o autor existe


            mockRentRepository.update.mockResolvedValueOnce({});

            jest.spyOn(service, 'show').mockResolvedValueOnce(updatedRent);

            const result = await service.updatePartial(1, { user_id: 2 });

            expect(result).toEqual(updatedRent);
        });

        it('should throw NotFoundException if book with the specified ID is not found', async () => {
            jest.spyOn(service, 'exist').mockRejectedValueOnce(new NotFoundException());

            const invalidId = 999;

            await expect(service.updatePartial(invalidId, { user_id: 2 })).rejects.toThrow(NotFoundException);
        });
    });

    // Testes do metodo finish

    describe('finish', () => {

        it('should finish the rent with the specified ID', async () => {
            const mockRent: Rent = {
                id: 1,
                user_id: 1,
                book_id: 1,
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
                },
                createdAt: '',
                updatedAt: ''
            };

            jest.spyOn(service, 'show').mockResolvedValueOnce(undefined);

            jest.spyOn(serviceBook, 'addBookQuantity').mockResolvedValueOnce(undefined);

            jest.spyOn(mockRentRepository, 'update').mockResolvedValueOnce(mockRent);

            const result = await service.finish(1);

            expect(result).toEqual(mockRent);
        });



        // describe('returnBook', () => {
        //     it('should return the rent with the specified ID and return the saved information', async () => {
        //         const date = new Date();
        //         date.setDate(date.getDate() + 5);
        //         const mockBook: Books = {
        //             id: 1,
        //             title: '',
        //             author_id: 1,
        //             qty_available: 5,
        //             release_date: '',
        //             description: null,
        //             image: '',
        //             author: {
        //                 id: 1,
        //                 name: '',
        //                 books: [],
        //                 image: null,
        //                 description: null
        //             },
        //             rents: [],
        //             favorite: [],
        //             comments: [],
        //         };

        //         const mockRent: Rents = {
        //             id: 1,
        //             user_id: 1,
        //             book_id: 1,
        //             status: 'active',
        //             date_rented: new Date().toISOString(),
        //             date_for_return: date.toISOString(),
        //             date_returned: null,
        //             user: {
        //                 id: 1,
        //                 username: '',
        //                 email: '',
        //                 password: '',
        //                 image: '',
        //                 type: 'user',
        //                 description: '',
        //                 favorite_book: null,
        //                 rents: [],
        //                 comments: [],
        //                 book: null
        //             },
        //             book: mockBook
        //         };

        //         jest.spyOn(mockRentRepository, 'findOne').mockResolvedValueOnce(mockRent);
        //         jest.spyOn(bookService, 'show').mockResolvedValueOnce(mockBook);
        //         jest.spyOn(bookService, 'updatePartial').mockResolvedValueOnce(mockBook);

        //         const updatedRent = { ...mockRent, status: 'returned', date_returned: new Date().toISOString().split('T')[0] };
        //         jest.spyOn(mockRentRepository, 'save').mockResolvedValueOnce(updatedRent);

        //         const result = await rentsService.returnBook(1);

        //         expect(mockRentRepository.save).toHaveBeenCalledWith(updatedRent);
        //         expect(result).toEqual(updatedRent);
        //     });

        //     it('should throw NotFoundException if book with the specified ID is not found', async () => {
        //         jest.spyOn(rentsService, 'exists').mockRejectedValueOnce(new NotFoundException());

        //         await expect(rentsService.exists(99999)).rejects.toThrow(NotFoundException);
        //     });
        // });








        it('should throw NotFoundException if book with the specified ID is not found', async () => {
            jest.spyOn(service, 'exist').mockRejectedValueOnce(new NotFoundException());

            const invalidId = 99999;

            await expect(service.finish(invalidId)).rejects.toThrow(NotFoundException);
        });

    });

    // Testes do metodo exist

    describe('exist', () => {

        it('should throw NotFoundException if rent does not exist', async () => {
            const nonExistentRentId = 999;
            mockRentRepository.exists.mockResolvedValue(false);

            await expect(service.exist(nonExistentRentId)).rejects.toThrow(NotFoundException);
            expect(mockRentRepository.exists).toHaveBeenCalledWith({
                where: { id: nonExistentRentId }
            });
        });

        it('should not throw NotFoundException if rent exists', async () => {
            const existingRentId = 1;
            mockRentRepository.exists.mockResolvedValue(true);

            await expect(service.exist(existingRentId)).resolves.not.toThrow(NotFoundException);
            expect(mockRentRepository.exists).toHaveBeenCalledWith({
                where: { id: existingRentId }
            });
        });

    });

});