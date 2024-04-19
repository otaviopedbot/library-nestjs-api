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
    private issuer = 'login';
    private audience = 'users';

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        //private readonly mailer: MailerService,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async createToken(user: User) {
        return {
            accessToken: this.jwtService.sign(
                {
                    id: user.id,
                    name: user.complete_name,
                    email: user.email,
                    is_admin: user.is_admin
                },
                {
                    expiresIn: '7 days',
                    subject: String(user.id),
                    issuer: this.issuer,
                    audience: this.audience,
                },
            ),
        };
    }

    isValidToken(token: string) {
        try {
            this.checkToken(token);
            return true;
        } catch (e) {
            return false;
        }
    }

    checkToken(token: string) {
        try {
            const data = this.jwtService.verify(token, {
                issuer: this.issuer,
                audience: this.audience,
            });

            return data;
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    async login(email: string, password: string) {
        const user = await this.usersRepository.findOneBy({
            email,
        });

        if (!user) {
            throw new UnauthorizedException('E-mail or password incorrect');
        }

        if (!(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('E-mail or password incorrect');
        }

        return this.createToken(user);
    }

    async forget(email: string) {
        const user = await this.usersRepository.findOneBy({
            email,
        });

        if (!user) {
            throw new UnauthorizedException('email incorrect');
        }

        const token = this.jwtService.sign(
            {
                id: user.id,
            },
            {
                expiresIn: '30 minutes',
                subject: String(user.id),
                issuer: 'forget',
                audience: 'users',
            },
        );

        // await this.mailer.sendMail({
        //     subject: 'Recuperação de Senha',
        //     to: 'joao@hcode.com.br',
        //     template: 'forget',
        //     context: {
        //         name: user.name,
        //         token,
        //     },
        // });

        return { success: true };
    }

    async reset(password: string, token: string) {
        try {
            const data: any = this.jwtService.verify(token, {
                issuer: 'forget',
                audience: 'users',
            });

            if (isNaN(Number(data.id))) {
                throw new BadRequestException('invalid token');
            }

            const salt = await bcrypt.genSalt();
            password = await bcrypt.hash(password, salt);

            await this.usersRepository.update(Number(data.id), {
                password,
            });

            const user = await this.userService.show(Number(data.id));

            return this.createToken(user);
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    async register(data: AuthRegisterDTO) {
        // delete data.role;

        const user = await this.userService.create(data);

        return this.createToken(user);
    }

}