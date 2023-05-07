import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthJwtGuard } from 'src/auth/auth-jwt.guard';

@ApiTags('пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'создание пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'получение списка всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(AuthJwtGuard)
  @Get()
  list() {
    return this.usersService.listUsers();
  }

  @ApiOperation({ summary: 'получение роли по значение' })
  @ApiResponse({ status: 200, type: User })
  @Get('/:email')
  retrieve(@Param('email') email: string) {
    return this.usersService.retrieveUserByEmail(email);
  }
}
