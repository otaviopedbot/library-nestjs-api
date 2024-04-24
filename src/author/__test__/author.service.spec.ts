import { Test, TestingModule } from '@nestjs/testing';
import { AuthorService } from '../author.service';
import { CreateAuthorDTO } from '../dto/create-author.dto';
import { Author } from '../entity/author.entity';
import { mock } from 'node:test';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { validate } from 'class-validator';

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

    // testes de DTO

    describe('DTO validation', () => {
        it('should pass validation with a valid name', async () => {
            const data = new CreateAuthorDTO();
            data.name = 'John';

            const errors = await validate(data);

            expect(errors.length).toEqual(0);
        });

        it('should fail validation with an empty name', async () => {
            const data = new CreateAuthorDTO();
            data.name = '';

            const errors = await validate(data);

            expect(errors.length).toBeGreaterThan(0);
            expect(errors[0].constraints).toHaveProperty('isNotEmpty');
        });

        // it('should fail validation if name is not a string', async () => {
        //     const createAuthorDTO = new CreateAuthorDTO();
        //     createAuthorDTO.name = 123; // Set the name to a non-string value

        //     const errors = await validate(createAuthorDTO);

        //     expect(errors.length).toBeGreaterThan(0);
        //     expect(errors[0].constraints).toHaveProperty('isString');
        // });
    });


    // Testes do metodo create

    describe('create', () => {

        it('should create a new author', async () => {
            const data: CreateAuthorDTO = { name: 'John Doe' };
            const mockAuthor: Author = { id: 1, ...data, books: [], createdAt: "", updatedAt: "" };

            mockAuthorRepository.exists.mockResolvedValueOnce(null);
            mockAuthorRepository.create.mockReturnValueOnce(mockAuthor);
            mockAuthorRepository.save.mockResolvedValueOnce(mockAuthor);

            const result = await service.create(data);


            expect(result).toEqual(mockAuthor);
        });

        it('should throw BadRequestException if name already exists', async () => {
            const data: CreateAuthorDTO = { name: 'John' };
        
            mockAuthorRepository.exists.mockResolvedValue(true);
        
            await expect(service.create(data)).rejects.toThrow(BadRequestException);
        });
        
    });

    describe('List', () => {
        it('Should return all authors', async () => {
            const mockAuthor: Author[] = [
                { id: 1, name: 'Author 1', books: [], createdAt: "", updatedAt: "" },
                { id: 2, name: 'Author 2', books: [], createdAt: "", updatedAt: "" },
            ]

            mockAuthorRepository.find.mockResolvedValueOnce(mockAuthor)

            const result = await service.list();

            expect(result).toEqual(mockAuthor);
        })
    })

    describe('show', () => {
        
        it('Should return one Author', async () => {
            const mockAuthor: Author = { id: 1, name: 'Author 1', books: [], createdAt: "", updatedAt: "" }

            jest.spyOn(service, 'exist').mockResolvedValueOnce(undefined);

            mockAuthorRepository.findOne.mockResolvedValue(mockAuthor)

            const result = await service.show(1);

            expect(result).toEqual(mockAuthor);

        })
        it('should throw NotFoundException if author with the specified ID is not found', async () => {
            mockAuthorRepository.findOne.mockResolvedValueOnce(null);
            const invalidId = 999;
            await expect(service.show(invalidId)).rejects.toThrow(NotFoundException);
        });

    });

    describe('updatePartial', () => {
        it('should update the author with the specified ID and return the updated author', async () => {
            const updatedAuthor: Author = { id: 1, name: 'Jane Doe', books: [], createdAt: "", updatedAt: "" };
    
            jest.spyOn(service, 'exist').mockResolvedValueOnce(undefined); // Simula que o autor existe

            mockAuthorRepository.update.mockResolvedValueOnce({}); // Simula a atualização do autor

            jest.spyOn(service, 'show').mockResolvedValueOnce(updatedAuthor); // Simula a exibição do autor atualizado
    
            const result = await service.updatePartial(1, { name: 'Jane Doe' });
    
            expect(result).toEqual(updatedAuthor);
            expect(service.exist).toHaveBeenCalledWith(1); // Verifica se exist foi chamado com o ID correto
        });
    
        it('should throw NotFoundException if author with the specified ID is not found', async () => {

            jest.spyOn(service, 'exist').mockRejectedValueOnce(new NotFoundException()); // Simula que o autor não existe

            const invalidId = 999;
    
            await expect(service.updatePartial(invalidId, { name: 'Jane Doe' })).rejects.toThrow(NotFoundException);
        });
    });
    

    //describe('delete', () => {

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


    // describe('exist', () => {

    //     it('should throw NotFoundException if author does not exist', async () => {
    
    //         const nonExistentAuthorId = 999;
    //         mockAuthorRepository.exists.mockResolvedValue(false); // Simula que o autor não existe no banco de dados

     
    //         await expect(AuthorService.exist(nonExistentAuthorId)).rejects.toThrowError(NotFoundException);
    //         expect(mockAuthorRepository.exists).toHaveBeenCalledWith({
    //             where: { id: nonExistentAuthorId }
    //         });
    //     });

    //     it('should not throw NotFoundException if author exists', async () => {

    //         const existingAuthorId = 1;
    //         mockAuthorRepository.exists.mockResolvedValue(true); // Simula que o autor existe no banco de dados

  
    //         await expect(AuthorService.exist(existingAuthorId)).resolves.not.toThrowError(NotFoundException);
    //         expect(mockAuthorRepository.exists).toHaveBeenCalledWith({
    //             where: { id: existingAuthorId }
    //         });
    //     });

    // });

});