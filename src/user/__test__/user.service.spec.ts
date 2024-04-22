import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "../user.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../entity/user.entity";
import { Repository } from "typeorm";


describe("UserService", ()=>{

    let userService: UserService
    let userRepository: Repository<User>;

    beforeEach(async()=>{
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: {     
                        exist: jest.fn(),
                        create: jest.fn(),
                        save: jest.fn(),
                        find: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn(),
                    }
                }
            ],

        }).compile();

        userService = module.get<UserService>(UserService)
    })

    test("Validar a definição", ()=>{
        expect(userService).toBeDefined()
    })




})