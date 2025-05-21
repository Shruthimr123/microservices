import { Injectable, ConflictException, UnauthorizedException, Inject } from '@nestjs/common';// Import necessary decorators and exceptions from NestJS
import { UserService } from 'apps/user/src/user.service'; // Import UserService to interact with user-related operations (DB actions)
import { RegisterDto } from './dto/register.dto'; // Import the RegisterDto class that defines the structure of register data
import * as bcrypt from 'bcrypt'; // Import bcrypt library to securely hash passwords
import { LoginDto } from './dto/login.dto'; // Import the LoginDto class that defines the structure of login data
import { JwtService } from '@nestjs/jwt'; // Import JwtService to generate JWT tokens during login
import { userDocument } from 'apps/user/src/schemas/user.schema'; // Import the user document schema type (for type checking)
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class AuthService {

  constructor(@Inject('USER_SERVICE') private readonly userClient: ClientProxy, private jwtService: JwtService) { }

  async register(registerDto: RegisterDto) {
    const { name, username, email, password, phone, role } = registerDto
    //const existingUser = await this.userService.findByEmail(email)
    const existingUser = await firstValueFrom(
      this.userClient.send(
        { cmd: 'find-by-email' }, 
        email
      )
    );
    if (existingUser) {
      throw new ConflictException('Email already registered')
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await firstValueFrom(
      this.userClient.send({
        cmd: 'create'
      }, {
        name,
        username,
        email,
        password: hashedPassword,
        phone,
        role
      })
    )

    return {
      message: "user regestered successfully",
      user: {
        // id:user._id,
        username: user.username,
        email: user.email
      }
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto
    const user = await firstValueFrom(
      this.userClient.send(
        { cmd: 'find-by-email' }, // fixed
        email
      )
    );
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials')
    }

    const isMatch = await bcrypt.compare(password, user!.password)

    if (!isMatch) {
      throw new UnauthorizedException('Invalid Password')
    }

    const payload = {
      email: user?.email,
      role: user?.role,
    }

    const token = this.jwtService.sign(payload)

    return {
      message: "user Login successfully",
      accessToken: token,
      user: {
        name: user.name,
        email: user.email
      }
    }
  }
}
