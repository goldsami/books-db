import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginUserDto, UserCreateDTO } from 'src/users/dto/user.dto';
import { AuthService, LoginStatus, RegistrationStatus } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  public async register(
    @Body() createUserDto: UserCreateDTO,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(
      createUserDto,
    );
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
    return this.authService.login(loginUserDto);
  }
}
