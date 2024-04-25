import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from '../review.service';
import { CreateReviewDTO } from '../dto/create-review.dto';
import { Review } from '../entity/review.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { validate } from 'class-validator';
import { BookService } from '../../book/book.service';
import { UserService } from '../../user/user.service';
import { CloudinaryModule } from '../../cloudinary/cloudinary.module';
import { AuthorModule } from '../../author/author.module';

const mockReviewRepository = {
    exists: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

const mockUserRepository = {
    exists: jest.fn(),
}

const mockBookRepository = {
    exists: jest.fn(),
}

describe('AuthorService', () => {
    let service: ReviewService;
    let serviceUser: UserService;
    let serviceBook: BookService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [CloudinaryModule],
            providers: [
                ReviewService,
                { provide: 'ReviewRepository', useValue: mockReviewRepository },
                UserService,
                { provide: 'UserRepository', useValue: mockUserRepository },
                BookService,
                { provide: 'BookRepository', useValue: mockBookRepository },
            ],
        }).compile();

        service = module.get<ReviewService>(ReviewService);
        serviceUser = module.get<UserService>(UserService);
        serviceBook = module.get<BookService>(BookService);
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

    //     // it('should fail validation if name is not a string', async () => {
    //     //     const createAuthorDTO = new CreateAuthorDTO();
    //     //     createAuthorDTO.name = 123; // Set the name to a non-string value

    //     //     const errors = await validate(createAuthorDTO);

    //     //     expect(errors.length).toBeGreaterThan(0);
    //     //     expect(errors[0].constraints).toHaveProperty('isString');
    //     // });
    // });

    // Testes do metodo create

    describe('create', () => {

        it('should create a new review', async () => {
            const data: CreateReviewDTO = { rating: 5, body:"test review", user_id: 1, book_id: 1 };
            const mockReview: Review = {
                id: 1, ...data, createdAt: "", updatedAt: "",
                user: [],
                book: []
            };

            mockReviewRepository.findOne.mockResolvedValueOnce(null);
            
            jest.spyOn(serviceBook, 'exist').mockResolvedValueOnce(undefined);
            jest.spyOn(serviceUser, 'exist').mockResolvedValueOnce(undefined);

            mockReviewRepository.create.mockReturnValueOnce(mockReview);
            mockReviewRepository.save.mockResolvedValueOnce(mockReview);

            const result = await service.create(data);


            expect(result).toEqual(mockReview);
        });

        it('should throw BadRequestException if name already exists', async () => {
            const data: CreateReviewDTO = { rating: 5, body:"test review", user_id: 1, book_id: 1 };

            mockReviewRepository.findOne.mockResolvedValue(true);

            await expect(service.create(data)).rejects.toThrow(BadRequestException);
        });

    });

    // Testes do metodo updatePartial

    // describe('updatePartial', () => {
    //     it('should update the author with the specified ID and return the updated author', async () => {
    //         const updatedAuthor: Author = { id: 1, name: 'Jane Doe', books: [], createdAt: "", updatedAt: "" };

    //         jest.spyOn(service, 'exist').mockResolvedValueOnce(undefined); // Simula que o autor existe

    //         mockAuthorRepository.update.mockResolvedValueOnce({}); // Simula a atualização do autor

    //         jest.spyOn(service, 'show').mockResolvedValueOnce(updatedAuthor); // Simula a exibição do autor atualizado

    //         const result = await service.updatePartial(1, { name: 'Jane Doe' });

    //         expect(result).toEqual(updatedAuthor);
    //         expect(service.exist).toHaveBeenCalledWith(1); // Verifica se exist foi chamado com o ID correto
    //     });

    //     it('should throw NotFoundException if author with the specified ID is not found', async () => {
    //         jest.spyOn(service, 'exist').mockRejectedValueOnce(new NotFoundException()); // Simula que o autor não existe

    //         const invalidId = 999;

    //         await expect(service.updatePartial(invalidId, { name: 'Jane Doe' })).rejects.toThrow(NotFoundException);
    //     });
    // });

    // Testes do metodo delete

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