import { JwtService } from '@nestjs/jwt';

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Bcrypt } from '../bcrypt/bcript';
import { UsuarioLogin } from '../entities/usuariologin.entities';
import { UsuarioService } from '../../usuario/service/usuario.service';



@Injectable()
export class AuthService{
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ){ }

    async validateUser(email: string, senha: string): Promise<any>{

        const buscaUsuario = await this.usuarioService.findByEmail(email)

        if(!buscaUsuario)
            throw null

        const matchPassword = await this.bcrypt.compararSenhas(senha, buscaUsuario.senha)

        if(buscaUsuario && matchPassword){
            const { senha, ...resposta } = buscaUsuario
            return resposta
        }

        return null

    }

    async login(usuarioLogin: UsuarioLogin){

        const payload = { sub: usuarioLogin.email }

        const buscaUsuario = await this.usuarioService.findByEmail(usuarioLogin.email)

        if(!buscaUsuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return{
            id: buscaUsuario.id,
            nome: buscaUsuario.nome,
            usuario: usuarioLogin.email,
            senha: '',
            foto: buscaUsuario.foto,
            token: `Bearer ${this.jwtService.sign(payload)}`,
        }

    }
}