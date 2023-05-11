import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthJwtGuard } from 'src/auth/auth-jwt.guard';
import { Roles } from 'src/auth/auth-roles.decorator';
import { RolesGuard } from 'src/auth/auth-roles.guard';
import { AddRoleDto } from './dto/add-role.dto';

@ApiTags('пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'создание пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Roles('admin')
  @UseGuards(RolesGuard)
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

  @ApiOperation({ summary: 'получение информации о себе' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(AuthJwtGuard)
  @Get('/me')
  me(@Headers('authorization') authorization: string) {
    return this.usersService.retrieveMe(authorization);
  }

  @ApiOperation({ summary: 'добавление роли' })
  @ApiResponse({ status: 200 })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() roleDto: AddRoleDto) {
    return this.usersService.addRole(roleDto);
  }

  @ApiOperation({
    summary: 'получение пользователя по значению электронной почты',
  })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(AuthJwtGuard)
  @Get('/:email')
  retrieve(@Param('email') email: string) {
    return this.usersService.retrieveUserByEmail(email);
  }

  @ApiOperation({ summary: 'изъятие роли у пользователя' })
  @ApiResponse({ status: 200 })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Delete('/role')
  deleteRole(@Body() roleDto: AddRoleDto) {
    return this.usersService.deleteRoleByValue(roleDto);
  }

  @ApiOperation({ summary: 'удаление пользователя' })
  @ApiResponse({ status: 200 })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Delete('/:pk')
  delete(@Param('pk') pk: number) {
    return this.usersService.deleteUserByPk(pk);
  }
}
