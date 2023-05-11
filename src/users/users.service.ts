import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { UserRole } from './user-role.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(UserRole) private userRoleRepository: typeof UserRole,
    private rolesService: RolesService,
    private jwtService: JwtService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.rolesService.retrieveRoleByValue('engineer');
    if (role) {
      await user.$set('roles', [role.id]);
      user.roles = [role];
    }
    return user;
  }

  async listUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async retrieveUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async retrieveMe(authorization: string) {
    const [, token] = authorization.split(' ');
    const userFromToken = this.jwtService.verify(token);
    const user = await this.userRepository.findByPk(userFromToken.id, {
      include: { all: true },
    });
    return user;
  }

  async deleteUserByPk(id: number) {
    const user = this.userRepository.findByPk(id);
    if (!user) {
      throw new HttpException(
        'Пользователя с таким id не существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    await User.destroy({ where: { id } });
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findOne({
      where: { id: dto.userId },
      include: { all: true },
    });
    if (!user) {
      throw new HttpException(
        'Пользователя с таким id не существует',
        HttpStatus.BAD_REQUEST,
      );
    } else if (user.roles.find((role) => role.value === dto.value)) {
      throw new HttpException(
        `Пользователь уже ${dto.value}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const role = await this.rolesService.retrieveRoleByValue(dto.value);
    if (!role) {
      throw new HttpException(
        'Такой роли не существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    await user.$add('roles', role.id);
    return dto;
  }

  async deleteRoleByValue(dto: AddRoleDto) {
    const role = await this.rolesService.retrieveRoleByValue(dto.value);
    if (!role) {
      throw new HttpException(
        'Такой роли не существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    console.log(role);
    const user = await this.userRepository.findOne({
      where: { id: dto.userId },
      include: { all: true },
    });
    if (!user) {
      throw new HttpException(
        'Такого пользователя не существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    console.log(user);
    const userRole = await this.userRoleRepository.findOne({
      where: {
        userId: dto.userId,
        roleId: role.id,
      },
    });
    if (!userRole) {
      throw new HttpException(
        'Данный пользователь не существует или не обладает такой ролью',
        HttpStatus.BAD_REQUEST,
      );
    }
    console.log(userRole);
    await UserRole.destroy({
      where: {
        roleId: role.id,
        userId: user.id,
      },
    });
  }
}
