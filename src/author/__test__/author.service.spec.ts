import { Test, TestingModule } from '@nestjs/testing';
import { AuthorService } from '../author.service';
import { CreateAuthorDTO } from '../dto/create-author.dto';
import { Author } from '../entity/author.entity';
import { mock } from 'node:test';
import { NotFoundException } from '@nestjs/common';

const mockAuthorRepository = {
    exists: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

describe('AuthorService', () => {
    let service: AuthorService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthorService,
                { provide: 'AuthorRepository', useValue: mockAuthorRepository },
            ],
        }).compile();

        service = module.get<AuthorService>(AuthorService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {

        it('should create a new author', async () => {
            const createAuthorDto: CreateAuthorDTO = { name: 'John Doe' };
            const mockAuthor: Author = { id: 1, ...createAuthorDto };

            mockAuthorRepository.findOne.mockResolvedValueOnce(null);
            mockAuthorRepository.create.mockReturnValueOnce(mockAuthor);
            mockAuthorRepository.save.mockResolvedValueOnce(mockAuthor);

            const result = await service.create(createAuthorDto);

            expect(result).toEqual(mockAuthor);
        });

        it('should return "Exist the author" if author already exists', async () => {
            const createAuthorDto: CreateAuthorDto = { name: 'John Doe' };

            mockAuthorRepository.findOne.mockResolvedValueOnce({});

            const result = await service.create(createAuthorDto);

            expect(result).toEqual('Exist the author');
        });
        
    });

    
    // describe('findAll', () => {
    //     it('Should return all authors', async () => {
    //         const mockAuthor: AuthorEntity[] = [
    //             { id: 1, name: 'Author 1' },
    //             { id: 2, name: 'Author 2' },
    //         ]

    //         mockAuthorRepository.find.mockResolvedValueOnce(mockAuthor)

    //         const result = await service.findAll();

    //         expect(result).toEqual(mockAuthor);
    //     })
    // })

    // describe('findOne', () => {
    //     it('Should return one Author', async () => {
    //         const mockAuthor: AuthorEntity = { id: 1, name: 'Author 1' }

    //         mockAuthorRepository.findOne.mockResolvedValue(mockAuthor)

    //         const result = await service.findOne(1);

    //         expect(result).toEqual(mockAuthor);

    //     })
    //     it('should throw NotFoundException if author with the specified ID is not found', async () => {
    //         mockAuthorRepository.findOne.mockResolvedValueOnce(null);
    //         const invalidId = 999;
    //         await expect(service.findOne(invalidId)).rejects.toThrow(NotFoundException);
    //     });

    //     describe('update', () => {
    //         it('should update the author with the specified ID and return the updated author', async () => {
    //             const existingAuthor: AuthorEntity = { id: 1, name: 'John Doe' };

    //             const updatedAuthor: AuthorEntity = { id: 1, name: 'Jane Doe' };

    //             mockAuthorRepository.findOne.mockResolvedValueOnce(existingAuthor);

    //             mockAuthorRepository.update.mockResolvedValueOnce({});

    //             mockAuthorRepository.findOne.mockResolvedValueOnce(updatedAuthor);

    //             const result = await service.update(1, { name: 'Jane Doe' });

    //             expect(result).toEqual(updatedAuthor);
    //         });

    //         it('should throw NotFoundException if author with the specified ID is not found', async () => {
    //             mockAuthorRepository.findOne.mockResolvedValueOnce(null);

    //             const invalidId = 999;

    //             await expect(service.update(invalidId, { name: 'Jane Doe' })).rejects.toThrow(NotFoundException);
    //         });
    //     });

    //     describe('remove', () => {
    //         it('should remove the author with the specified ID and return the deletion information', async () => {
    //             // Mocking the existing author to be returned by the repository
    //             const existingAuthor: AuthorEntity = { id: 1, name: 'John Doe' };

    //             // Mocking the deletion information
    //             const deleteInfo = { affected: 1 }; // Assuming one record is affected

    //             // Mocking the repository method to return the existing author
    //             mockAuthorRepository.findOne.mockResolvedValueOnce(existingAuthor);

    //             // Mocking the repository method to delete the author
    //             mockAuthorRepository.delete.mockResolvedValueOnce(deleteInfo);
    //             const result = await service.remove(1);
    //             expect(result).toEqual(deleteInfo);
    //         });

    //         it('should throw NotFoundException if author with the specified ID is not found', async () => {
    //             mockAuthorRepository.findOne.mockResolvedValueOnce(null);


    //             const invalidId = 999;

    //             await expect(service.remove(invalidId)).rejects.toThrow(NotFoundException);
    //         });
    //     });


    // })
});