import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './roles.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@ApiTags('роли')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'создание роли' })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  create(@Body() jobTitleDto: CreateRoleDto) {
    return this.rolesService.createRole(jobTitleDto);
  }

  @ApiOperation({ summary: 'получение списка всех ролей' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get()
  list() {
    return this.rolesService.listRoles();
  }

  @ApiOperation({ summary: 'получение роли по значение' })
  @ApiResponse({ status: 200, type: Role })
  @Get('/:value')
  retrieve(@Param('value') value: string) {
    return this.rolesService.retrieveRoleByValue(value);
  }
}
