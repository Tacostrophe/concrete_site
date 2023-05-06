import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

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
  @Get()
  list() {
    return this.usersService.listUsers();
  }
}
