import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth.service";

//validar usuario e senha
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    private _usernameField: string;
    private _passwordField: string;

    constructor(private readonly authService: AuthService) {
        super(); 
        this._usernameField = 'email';
        this._passwordField = 'senha';
    }

    async validate(email: string, senha: string): Promise<any> {
        const validaUsuario = await this.authService.validateUser(email, senha);
        if (!validaUsuario) {
            throw new UnauthorizedException("Email e/ou senha incorretos!");
        }
        return validaUsuario;
    }

}
