import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Categoria } from '../../Categoria/entities/categoria.entity';
import { Produto } from '../../produto/entities/produto.entity';
  


@Entity('tb_usuario')
export class Usuario {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  nome: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Column({ unique: true })
  usuario: string;

  @ApiProperty()
  @Column()
  senha: string;

  @ApiProperty()
  @Column()
  telefone: number;

  @ApiProperty()
  @Column({ nullable: true })
  foto: string;

  @ApiProperty()
  @CreateDateColumn()
  data_cadastro: Date;

  @ApiProperty({ type: () => Produto, isArray: true })
  @OneToMany(() => Produto, (produto) => produto.usuario)
  produto: Produto[]

  @ApiProperty({ type: () => Categoria, isArray: true })
 @OneToMany(() => Categoria, (categoria) => categoria.usuario)
categoria: Categoria[];

}