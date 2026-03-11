import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Produto } from '../../produto/entities/produto.entity';

@Entity('tb_pedido')
export class Pedido {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantidade: number;

  @Column('decimal', { precision: 10, scale: 2 })
  valor_total: number;

  @CreateDateColumn()
  data_pedido: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.pedidos)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @ManyToOne(() => Produto, (produto) => produto.pedidos)
  @JoinColumn({ name: 'produto_id' })
  produto: Produto;

}