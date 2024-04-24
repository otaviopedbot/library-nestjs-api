import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from '../book.service';
import { CreateBookDTO } from '../dto/create-book.dto';
import { Book } from '../entity/book.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { validate } from 'class-validator';
import { AuthorService } from '../../author/author.service';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { AuthorModule } from '../../author/author.module';
import { CloudinaryModule } from '../../cloudinary/cloudinary.module';

const mockBookRepository = {
    exists: jest.fn().mockImplementation((id) => {
        if (id.where.id == 1) {
            return Promise.resolve(true)
        }
        return false
    }),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

const mockAuthorRepository = {
    exists: jest.fn().mockImplementation((id) => {
        console.log(id + "aaaaaaaaaaaaaaa")
        if (id.where.id == 1) {
            return Promise.resolve(true)
        }
        return false
    }),
};

describe('BookService', () => {
    let service: BookService;
    let serviceAuthor: AuthorService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BookService,
                { provide: 'BookRepository', useValue: mockBookRepository },
                AuthorService,
                { provide: 'AuthorRepository', useValue: mockAuthorRepository },
                CloudinaryService
            ]
        }).compile();

        serviceAuthor = module.get<AuthorService>(AuthorService);
        service = module.get<BookService>(BookService);
    });

    // testes de DTO

    // describe('DTO validation', () => {
    //     it('should pass validation with a valid name', async () => {
    //         const data = new CreateAuthorDTO();
    //         data.name = 'John';

    //         const errors = await validate(data);

    //         expect(errors.length).toEqual(0);
    //     });

    //     it('should fail validation with an empty name', async () => {
    //         const data = new CreateAuthorDTO();
    //         data.name = '';

    //         const errors = await validate(data);

    //         expect(errors.length).toBeGreaterThan(0);
    //         expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    //     });

    // });

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

            mockBookRepository.create.mockReturnValueOnce(mockBook);

            mockBookRepository.save.mockResolvedValueOnce(mockBook);

            const result = await service.create(data);

            expect(result).toEqual(mockBook);
        });

        // it('should throw BadRequestException if title already exists', async () => {
        //     const data: CreateBookDTO = { title: 'teste', page: 1, quantity: 1, author_id: 1, synopsis: "", cover: "" };;

        //     const result = await service.create(data);

        //     await expect(result).rejects.toThrow(BadRequestException);
        // });

    });

    //Testes do metodo list

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
            const mockBook: Book = { id: 1, title: 'Livro', page: 1, quantity: 1, author_id: 1, synopsis: "", cover: "", createdAt: "", updatedAt: "", rents: [], favorites: [], reviews: [], author: {
                id: 1,
                name: '',
                books: [],
                createdAt: '',
                updatedAt: ''
            } }

            mockBookRepository.findOne.mockResolvedValue(mockBook)

            const result = await service.show(1);

            expect(result).toEqual(mockBook);

        })
        it('should throw NotFoundException if book with the specified ID is not found', async () => {
            mockBookRepository.findOne.mockResolvedValueOnce(null);

            const invalidId = 999;
            await expect(service.show(invalidId)).rejects.toThrow(NotFoundException);

        });

    });

    // Testes do metodo updatePartial

    describe('updatePartial', () => {
        it('should update the book with the specified ID and return the updated book', async () => {
            const oldBook = { id: 1, title: 'a', page: 1, quantity: 1, author_id: 1, synopsis: "", cover: "", createdAt: "", updatedAt: "" };
            const updatedBook = { id: 1, title: 'Livro', page: 1, quantity: 1, author_id: 1, synopsis: "", cover: "", createdAt: "", updatedAt: "" };

          //  mockBookRepository.exists.mockResolvedValueOnce(oldBook);
            mockBookRepository.update.mockResolvedValueOnce({});

           // mockBookRepository.show.mockResolvedValueOnce(updatedBook);

            const result = await service.updatePartial(1, { title: 'Livro' });

            expect(result).toEqual(updatedBook);
        });

        // it('should throw NotFoundException if book with the specified ID is not found', async () => {
        //     jest.spyOn(service, 'exist').mockRejectedValueOnce(new NotFoundException()); //Simula que o autor não existe

        //     const invalidId = 999;

        //     await expect(service.updatePartial(invalidId, { name: 'Jane Doe' })).rejects.toThrow(NotFoundException);
        // });
    });

    // // Testes do metodo delete

    // describe('delete', () => {

    //     it('should remove the author with the specified ID and return the deletion information', async () => {
    //         jest.spyOn(service, 'exist').mockResolvedValueOnce(undefined);

    //         const deleteInfo = true;

    //         mockAuthorRepository.delete.mockResolvedValueOnce(deleteInfo);

    //         const result = await service.delete(1);
    //         expect(result).toEqual(deleteInfo);
    //     });

    //     it('should throw NotFoundException if author with the specified ID is not found', async () => {
    //         jest.spyOn(service, 'exist').mockRejectedValueOnce(new NotFoundException());

    //         const invalidId = 99999;

    //         await expect(service.delete(invalidId)).rejects.toThrow(NotFoundException);
    //     });

    // });

    // // Testes do metodo exist

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