import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pedido } from '../../Pedido/entities/pedido.entity';


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

  @OneToMany(() => Pedido, (pedido) => pedido.produto)
  pedidos: Pedido[];

}