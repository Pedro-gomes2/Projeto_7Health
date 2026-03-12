import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Produto } from '../../produto/entities/produto.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('tb_categoria')
export class Categoria {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  descricao: string;

  // Uma categoria pode ter muitos produtos (1:N)
  @OneToMany(() => Produto, (produto) => produto.categoria)
  produto: Produto[];

  @ManyToOne(() => Usuario, (usuario) => usuario.categoria, {
    onDelete: 'CASCADE' // Se o usuário for deletado, as categorias dele também serão
  })
  usuario: Usuario;
}