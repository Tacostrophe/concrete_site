import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'авторизация пользователя' })
  @ApiResponse({ status: 200 })
  @Post('/signin')
  signIn(@Body() userDto: CreateUserDto) {
    return this.authService.signIn(userDto);
  }

  @ApiOperation({ summary: 'регистрация пользователя' })
  @ApiResponse({ status: 200 })
  @Post('/signup')
  signUp(@Body() userDto: CreateUserDto) {
    return this.authService.signUp(userDto);
  }
}
