import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Bcrypt } from '../../auth/bcrypt/bcript';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ) { }

    // Método crucial para o Login e para validação de duplicidade
    async findByUsuario(usuario: string): Promise<Usuario | null> {
        return await this.usuarioRepository.findOne({
            where: { usuario: usuario },
            relations: { produto: true }
        });
    }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            relations: { produto: true }
        });
    }

    async findById(id: number): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({
            where: { id },
            relations: { produto: true }
        });

        if (!usuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;
    }

    async create(usuario: Usuario): Promise<Usuario> {
        // Valida se o e-mail/usuário já existe
        const buscaUsuario = await this.findByUsuario(usuario.usuario);

        if (buscaUsuario)
            throw new HttpException("O Usuário já existe!", HttpStatus.BAD_REQUEST);

        // Criptografia antes de salvar
        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);
        return await this.usuarioRepository.save(usuario);
    }


async update(usuario: Usuario): Promise<Usuario> {
    const usuarioExistente = await this.findById(usuario.id);

   
    const buscaUsuario = await this.findByUsuario(usuario.usuario);
    if (buscaUsuario && buscaUsuario.id !== usuario.id)
        throw new HttpException('Este e-mail já está em uso!', HttpStatus.BAD_REQUEST);

    
    if (usuario.senha) {
        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);
    } else {
        usuario.senha = usuarioExistente.senha; 
    }

    return await this.usuarioRepository.save(usuario);
}








    async remove(id: number): Promise<void> {
        const usuario = await this.findById(id);
        await this.usuarioRepository.remove(usuario);
    }
}