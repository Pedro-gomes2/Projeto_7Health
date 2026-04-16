import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../entities/usuario.entity';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Usuario')
@Controller('/usuarios')
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) {}

    
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() usuario: Usuario) {
        return this.usuarioService.create(usuario);
    }

    
    @Get('/all')
    findAll() {
        return this.usuarioService.findAll();
    }


    @Get('/:id')
    findById(@Param('id') id: number) {
        return this.usuarioService.findById(id);
    }

    
    @Put('/atualizar')
    update(@Body() usuario: Usuario) {
        return this.usuarioService.update(usuario);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: number) {
        return this.usuarioService.remove(id);
    }
}