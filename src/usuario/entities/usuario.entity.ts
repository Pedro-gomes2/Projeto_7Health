import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Pedido } from '../../Pedido/entities/pedido.entity';


@Entity('tb_usuario')
export class Usuario {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column()
  telefone: number;

  @CreateDateColumn()
  data_cadastro: Date;

  @OneToMany(() => Pedido, (pedido) => pedido.usuario)
  pedidos: Pedido[];

}