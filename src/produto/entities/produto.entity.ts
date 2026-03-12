import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Categoria } from '../../Categoria/entities/categoria.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';


@Entity('tb_produtos')
export class Produto {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column('decimal', { precision: 10, scale: 2 })
  preco: number;

  @Column()
  calorias: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
    onDelete: 'CASCADE'
  })
  categoria: Categoria;

  // Muitos produtos são cadastrados por um usuário (N:1)
  @ManyToOne(() => Usuario, (usuario) => usuario.produto, {
    onDelete: 'CASCADE'
  })
  usuario: Usuario;



}
