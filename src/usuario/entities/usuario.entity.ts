import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Categoria } from '../../Categoria/entities/categoria.entity';
import { Produto } from '../../produto/entities/produto.entity';


@Entity('tb_usuario')
export class Usuario {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column()
  telefone: number;

  @Column({ nullable: true })
  foto: string;

  @CreateDateColumn()
  data_cadastro: Date;

  @OneToMany(() => Produto, (produto) => produto.usuario)
  produto: Produto[]

  @OneToMany(() => Categoria, (categoria) => categoria.usuario)
  categoria: Categoria[];

}