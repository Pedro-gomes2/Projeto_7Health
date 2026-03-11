import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../entities/usuario.entity';
import { JwtAuthGuard } from '../../auth/guard/jewt-auth.guard';

@Controller('/usuarios')
export class UsuarioController {

  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() usuario: Usuario) {
    return this.usuarioService.create(usuario);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  findAll() {
    return this.usuarioService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.usuarioService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  update(@Param('id') id: number, @Body() usuario: Usuario) {
    return this.usuarioService.update(id, usuario);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.usuarioService.remove(id);
  }

}