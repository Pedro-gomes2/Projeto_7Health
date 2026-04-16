import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Categoria } from '../../Categoria/entities/categoria.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';


@Entity('tb_produtos')
export class Produto {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  nome: string;

  @ApiProperty()
  @Column()
  descricao: string;

  @ApiProperty()
  @Column('decimal', { precision: 10, scale: 2 })
  preco: number;

  @ApiProperty()
  @Column()
  calorias: number;

  @ApiProperty({ type: () => Categoria })
  @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
    onDelete: 'CASCADE'
  })
  categoria: Categoria;

  // Muitos produtos são cadastrados por um usuário (N:1)
  @ApiProperty({ type: () => Usuario })
  @ManyToOne(() => Usuario, (usuario) => usuario.produto, {
    onDelete: 'CASCADE'
  })
  usuario: Usuario;



}
