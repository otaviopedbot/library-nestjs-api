import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from '../book.service';
import { CreateBookDTO } from '../inputs/create-book.input';
import { Book } from '../types/book.type';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { validate } from 'class-validator';
import { AuthorService } from '../../author/author.service';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { AuthorModule } from '../../author/author.module';
import { CloudinaryModule } from '../../cloudinary/cloudinary.module';

const mockBookRepository = {
    exists: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

const mockAuthorRepository = {
    exists: jest.fn()
};

describe('BookService', () => {
    let service: BookService;
    let serviceAuthor: AuthorService;
    let serviceCloudinary: CloudinaryService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BookService,
                { provide: 'BookRepository', useValue: mockBookRepository },
                AuthorService,
                { provide: 'AuthorRepository', useValue: mockAuthorRepository },
                CloudinaryService,
                // { provide: 'CloudinaryRepository'},
            ]
        }).compile();

        service = module.get<BookService>(BookService);
        serviceAuthor = module.get<AuthorService>(AuthorService);
        serviceCloudinary = module.get<CloudinaryService>(CloudinaryService);
    });

    // testes de DTO

    describe('DTO validation', () => {
        it('should pass validation with a valid book', async () => {
            const data = new CreateBookDTO();
            data.title = 'Livro';
            data.page = 1;
            data.quantity = 1;
            data.author_id = 1;

            const errors = await validate(data);

            expect(errors.length).toEqual(0);
        });

        it('should fail validation with an empty book', async () => {
            const data = new CreateBookDTO();

            const errors = await validate(data);

            expect(errors.length).toBeGreaterThan(0);
            expect(errors[0].constraints)
        });

    });

    // Testes do metodo create

    describe('create', () => {

        it('should create a new book', async () => {
            const data: CreateBookDTO = { title: 'livro', page: 1, quantity: 1, author_id: 1, synopsis: "", cover: "" };
            const mockBook: Book = {
                id: 1, ...data, rents: [], favorites: [], reviews: [], author: {
                    id: 1,
                    name: '',
                    books: [],
                    createdAt: '',
                    updatedAt: ''
                }, createdAt: "", updatedAt: ""
            };

            jest.spyOn(serviceAuthor, 'exist').mockResolvedValueOnce(undefined); // Simula que o autor existe

            mockBookRepository.create.mockReturnValueOnce(mockBook);

            mockBookRepository.save.mockResolvedValueOnce(mockBook);

            const result = await service.create(data);

            expect(result).toEqual(mockBook);
        });

        it('should throw BadRequestException if title already exists', async () => {
            const data: CreateBookDTO = { title: 'teste', page: 1, quantity: 1, author_id: 1, synopsis: "", cover: "" };;

            mockBookRepository.exists.mockResolvedValue(true)

            await expect(service.create(data)).rejects.toThrow(BadRequestException);
        });

    });

    // Testes do metodo list

    describe('List', () => {
        it('Should return all books', async () => {
            const mockBook = [
                { id: 1, title: 'Livro', page: 1, quantity: 1, author_id: 1, synopsis: "", cover: "" },
                { id: 2, title: 'Livro', page: 1, quantity: 1, author_id: 1, synopsis: "", cover: "" },
            ]

            mockBookRepository.find.mockResolvedValueOnce(mockBook)

            const result = await service.list();

            expect(result).toEqual(mockBook);
        })
    })

    // Testes do metodo show

    describe('show', () => {

        it('Should return one Book', async () => {
            const mockBook: Book = {
                id: 1, title: 'Livro', page: 1, quantity: 1, author_id: 1, synopsis: "", cover: "", createdAt: "", updatedAt: "", rents: [], favorites: [], reviews: [], author: {
                    id: 1,
                    name: '',
                    books: [],
                    createdAt: '',
                    updatedAt: ''
                }
            }

            jest.spyOn(service, 'exist').mockResolvedValueOnce(undefined);

            mockBookRepository.findOne.mockResolvedValue(mockBook)

            const result = await service.show(1);

            expect(result).toEqual(mockBook);

        })
        it('should throw NotFoundException if book with the specified ID is not found', async () => {
            jest.spyOn(service, 'exist').mockRejectedValueOnce(new NotFoundException());

            mockBookRepository.findOne.mockResolvedValueOnce(null);

            const invalidId = 999;
            await expect(service.show(invalidId)).rejects.toThrow(NotFoundException);

        });

    });

    // Testes do metodo updatePartial

    describe('updatePartial', () => {
        it('should update the book with the specified ID and return the updated book', async () => {
            const updatedBook: Book = {
                id: 1, title: 'Livro', page: 1, quantity: 1, author_id: 1, synopsis: "", cover: "", createdAt: "", updatedAt: "",
                author: {
                    id: 0,
                    name: '',
                    books: [],
                    createdAt: '',
                    updatedAt: ''
                },
                rents: [],
                favorites: [],
                reviews: []
            };

            jest.spyOn(service, 'exist').mockResolvedValueOnce(undefined); // Simula que o livro existe

            jest.spyOn(serviceAuthor, 'exist').mockResolvedValueOnce(undefined); // Simula que o autor existe

            mockBookRepository.update.mockResolvedValueOnce({});

            jest.spyOn(service, 'show').mockResolvedValueOnce(updatedBook);

            const result = await service.updatePartial(1, { title: 'Livro' });

            expect(result).toEqual(updatedBook);
        });

        it('should throw NotFoundException if book with the specified ID is not found', async () => {
            jest.spyOn(service, 'exist').mockRejectedValueOnce(new NotFoundException());

            const invalidId = 999;

            await expect(service.updatePartial(invalidId, { title: 'testeste' })).rejects.toThrow(NotFoundException);
        });
    });

    // Testes do metodo delete

    describe('delete', () => {

        it('should remove the book with the specified ID and return the deletion information', async () => {
            jest.spyOn(service, 'exist').mockResolvedValueOnce(undefined);

            const deleteInfo = true;

            mockBookRepository.delete.mockResolvedValueOnce(deleteInfo);

            const result = await service.delete(1);

            expect(result).toEqual(deleteInfo);
        });

        it('should throw NotFoundException if book with the specified ID is not found', async () => {
            jest.spyOn(service, 'exist').mockRejectedValueOnce(new NotFoundException());

            const invalidId = 99999;

            await expect(service.delete(invalidId)).rejects.toThrow(NotFoundException);
        });

    });

    // Testes do metodo exist

    describe('exist', () => {

        it('should throw NotFoundException if book does not exist', async () => {
            const nonExistentBookId = 999;
            mockBookRepository.exists.mockResolvedValue(false);

            await expect(service.exist(nonExistentBookId)).rejects.toThrow(NotFoundException);
            expect(mockBookRepository.exists).toHaveBeenCalledWith({
                where: { id: nonExistentBookId }
            });
        });

        it('should not throw NotFoundException if book exists', async () => {
            const existingBookId = 1;
            mockBookRepository.exists.mockResolvedValue(true);

            await expect(service.exist(existingBookId)).resolves.not.toThrow(NotFoundException);
            expect(mockBookRepository.exists).toHaveBeenCalledWith({
                where: { id: existingBookId }
            });
        });

    });

    // Testes do metodo addBookQuantity

    describe('addBookQuantity', () => {

        it('should add +1 to the book with the specified ID quantity and return the book information', async () => {

            const oldBook: Book = {
                id: 1,
                title: '',
                author_id: 0,
                page: 0,
                quantity: 9,
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

            const updatedBook: Book = {
                id: 1,
                title: '',
                author_id: 0,
                page: 0,
                quantity: 10, // Incrementado a quantidade
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

            jest.spyOn(service, 'exist').mockResolvedValueOnce(undefined);

            mockBookRepository.findOne.mockReturnValueOnce(oldBook)

            mockBookRepository.update.mockResolvedValueOnce(updatedBook);

            await expect(service.addBookQuantity(1)).resolves.not.toThrow(NotFoundException); // Verifica se não lança NotFoundException

            expect(mockBookRepository.update).toHaveBeenCalledWith(1, { quantity: 10 }); // Verifica se a quantidade foi atualizada corretamente
        });


        it('should throw NotFoundException if book with the specified ID is not found', async () => {
            jest.spyOn(service, 'exist').mockRejectedValueOnce(new NotFoundException());

            const invalidId = 99999;

            await expect(service.addBookQuantity(invalidId)).rejects.toThrow(NotFoundException);
        });

    });

    // Testes do metodo removeBookQuantity

    describe('removeBookQuantity', () => {

        it('should subtract -1 from the book with the specified ID quantity and return the book information', async () => {

            const oldBook: Book = {
                id: 1,
                title: '',
                author_id: 0,
                page: 0,
                quantity: 10, // Quantidade inicial
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

            const updatedBook: Book = {
                id: 1,
                title: '',
                author_id: 0,
                page: 0,
                quantity: 9, // Quantidade após remoção
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

            jest.spyOn(service, 'exist').mockResolvedValueOnce(undefined);

            mockBookRepository.findOne.mockReturnValueOnce(oldBook)

            mockBookRepository.update.mockResolvedValueOnce(updatedBook);

            await expect(service.removeBookQuantity(1)).resolves.not.toThrow(NotFoundException); // Verifica se não lança NotFoundException

            expect(mockBookRepository.update).toHaveBeenCalledWith(1, { quantity: 9 }); // Verifica se a quantidade foi atualizada corretamente
        });


        it('should throw NotFoundException if book with the specified ID is not found', async () => {
            jest.spyOn(service, 'exist').mockRejectedValueOnce(new NotFoundException());

            const invalidId = 99999;

            await expect(service.addBookQuantity(invalidId)).rejects.toThrow(NotFoundException);
        });

    });

});