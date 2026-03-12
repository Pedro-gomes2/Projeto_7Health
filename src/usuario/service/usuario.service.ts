import { Injectable, NotFoundException } from '@nestjs/common';
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
  ) {}


  //Buscar por Usuario
  async findByEmail(email: string): Promise<Usuario | null> {
  // Ajustado para buscar na coluna 'email' da sua entidade
  return await this.usuarioRepository.findOne({
    where: { email: email }
  });
}

  //Buscar Todos
  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async create(usuario: Usuario): Promise<Usuario> {
    usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);
    return this.usuarioRepository.save(usuario);
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
    usuarioExistente.telefone = usuario.telefone ?? usuarioExistente.telefone;

    return this.usuarioRepository.save(usuarioExistente);
  }

  async remove(id: number): Promise<void> {

    const usuario = await this.findOne(id);

    await this.usuarioRepository.remove(usuario);
  }
}