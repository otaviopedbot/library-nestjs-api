import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entity/user.entity";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { AuthRegisterDTO } from "./dto/auth-register.dto";

@Injectable()
export class AuthService {
    // private issuer = 'login';
    // private audience = 'users';

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    createToken(user: User) {
        return this.jwtService.sign(
            {
              id: user.id,
            },
            {
              expiresIn: '7 days',
            }
          )
    }

    // checkToken(token: string) {
    //     try {
    //         const data = this.jwtService.verify(token, {
    //             issuer: this.issuer,
    //             audience: this.audience,
    //         });

    //         return data;
    //     } catch (e) {
    //         throw new BadRequestException(e);
    //     }
    // }

    async login(email: string, password: string) {
        const user = await this.usersRepository.findOne({
           where:{email: email},
           relations: ["favorites.book"]
        });

        if (!user) {
            throw new UnauthorizedException('E-mail or password incorrect');
        }

        if (!(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('E-mail or password incorrect');
        }

        const token = this.createToken(user)

        return { token, user };
    }

    async register(data: AuthRegisterDTO) {

        const user = await this.userService.create(data);

        const token = this.createToken(user)

        return { token, user };
    }

}