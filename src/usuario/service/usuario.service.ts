import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';



@Injectable()
export class UsuarioService {
  async findByUsuario(username: string): Promise<Usuario | null> {
  return this.usuarioRepository.findOne({
    where: { nome: username }
  });
}

  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  create(usuario: Usuario): Promise<Usuario> {
    return this.usuarioRepository.save(usuario);
  }

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {

    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return usuario;
  }

  async update(id: number, usuario: Usuario): Promise<Usuario> {

    const usuarioExistente = await this.findOne(id);

    usuarioExistente.nome = usuario.nome ?? usuarioExistente.nome;
    usuarioExistente.email = usuario.email ?? usuarioExistente.email;
    usuarioExistente.senha = usuario.senha ?? usuarioExistente.senha;
    usuarioExistente.telefone = usuario.telefone ?? usuarioExistente.telefone;

    return this.usuarioRepository.save(usuarioExistente);
  }

  async remove(id: number): Promise<void> {

    const usuario = await this.findOne(id);

    await this.usuarioRepository.remove(usuario);
  }
}