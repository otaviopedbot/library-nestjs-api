import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from '../review.service';
import { CreateReviewInput } from '../../GraphQL/review/inputs/create-review.input';
import { Review } from '../entity/review.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { validate } from 'class-validator';
import { BookService } from '../../book/book.service';
import { UserService } from '../../user/user.service';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { AuthorService } from '../../author/author.service';

const mockReviewRepository = {
    exists: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
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

describe('AuthorService', () => {
    let service: ReviewService;
    let serviceUser: UserService;
    let serviceBook: BookService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ReviewService,
                CloudinaryService,
                AuthorService,
                { provide: 'ReviewRepository', useValue: mockReviewRepository },
                UserService,
                { provide: 'UserRepository', useValue: mockUserRepository },
                BookService,
                { provide: 'BookRepository', useValue: mockBookRepository },
                { provide: 'AuthorRepository', useValue: mockAuthorRepository },
            ],
        }).compile();

        service = module.get<ReviewService>(ReviewService);
        serviceUser = module.get<UserService>(UserService);
        serviceBook = module.get<BookService>(BookService);
    });

    // testes de DTO

    describe('DTO validation', () => {
        it('should pass validation with a valid review data', async () => {
            const data = new CreateReviewInput();
            data.rating = 5;
            data.body = "review";
            data.user_id = 1;
            data.book_id = 1;

            const errors = await validate(data);

            expect(errors.length).toEqual(0);
        });

        it('should fail validation with a invalid review data', async () => {
            const data = new CreateReviewInput();
            data.rating = -5;
            data.body = "review";
            data.user_id = null;
            data.book_id = null;

            const errors = await validate(data);

            expect(errors.length).toBeGreaterThan(0);
            expect(errors[0].constraints)
        });
    });

    // Testes do metodo create

    describe('create', () => {

        it('should create a new review', async () => {
            const data: CreateReviewInput = { rating: 5, body: "test review", user_id: 1, book_id: 1 };
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
            const data: CreateReviewInput = { rating: 5, body: "test review", user_id: 1, book_id: 1 };

            mockReviewRepository.findOne.mockResolvedValue(true);

            await expect(service.create(data)).rejects.toThrow(BadRequestException);
        });

    });

    // Testes do metodo delete

    describe('delete', () => {

        it('should remove the review with the specified ID and return the deletion information', async () => {
            jest.spyOn(service, 'exist').mockResolvedValueOnce(undefined);

            const deleteInfo = true;

            mockReviewRepository.delete.mockResolvedValueOnce(deleteInfo);

            const result = await service.delete(1);
            expect(result).toEqual(deleteInfo);
        });

        it('should throw NotFoundException if the review with the specified ID is not found', async () => {
            jest.spyOn(service, 'exist').mockRejectedValueOnce(new NotFoundException());

            const invalidId = 99999;

            await expect(service.delete(invalidId)).rejects.toThrow(NotFoundException);
        });

    });

    // Testes do metodo exist

    describe('exist', () => {

        it('should throw NotFoundException if the Review does not exist', async () => {
            const nonExistentReviewId = 999;
            mockReviewRepository.exists.mockResolvedValue(false);

            await expect(service.exist(nonExistentReviewId)).rejects.toThrow(NotFoundException);
            expect(mockReviewRepository.exists).toHaveBeenCalledWith({
                where: { id: nonExistentReviewId }
            });
        });

        it('should not throw NotFoundException if the review exists', async () => {
            const existingReviewId = 1;
            mockReviewRepository.exists.mockResolvedValue(true);

            await expect(service.exist(existingReviewId)).resolves.not.toThrow(NotFoundException);
            expect(mockReviewRepository.exists).toHaveBeenCalledWith({
                where: { id: existingReviewId }
            });
        });

    });

});