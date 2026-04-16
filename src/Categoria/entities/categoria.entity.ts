import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Produto } from '../../produto/entities/produto.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tb_categoria')
export class Categoria {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 255, nullable: false })
  descricao: string;

  // Uma categoria pode ter muitos produtos (1:N)
  @ApiProperty({ type: () => Produto, isArray: true })
  @OneToMany(() => Produto, (produto) => produto.categoria)
  produto: Produto[];

  @ApiProperty({ type: () => Usuario })
  @ManyToOne(() => Usuario, (usuario) => usuario.categoria, {
    onDelete: 'CASCADE' // Se o usuário for deletado, as categorias dele também serão
  })
  usuario: Usuario;
}