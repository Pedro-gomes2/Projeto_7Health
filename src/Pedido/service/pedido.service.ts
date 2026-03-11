import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from '../entities/pedido.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Produto } from '../../produto/entities/produto.entity';

@Injectable()
export class PedidoService {

  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,

    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,

    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) { }

  async create(pedido: Pedido): Promise<Pedido> {

    const usuario = await this.usuarioRepository.findOneBy({ id: pedido.usuario.id });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const produto = await this.produtoRepository.findOneBy({ id: pedido.produto.id });

    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }

    const valorTotal = Number(produto.preco) * pedido.quantidade;

    pedido.valor_total = valorTotal;
    pedido.usuario = usuario;
    pedido.produto = produto;

    return this.pedidoRepository.save(pedido);
  }

  findAll(): Promise<Pedido[]> {
    return this.pedidoRepository.find({
      relations: ['usuario', 'produto'],
    });
  }

  async findOne(id: number): Promise<Pedido> {

    const pedido = await this.pedidoRepository.findOne({
      where: { id },
      relations: ['usuario', 'produto'],
    });

    if (!pedido) {
      throw new NotFoundException('Pedido não encontrado');
    }

    return pedido;
  }

  async update(id: number, pedido: Pedido): Promise<Pedido> {

    const pedidoExistente = await this.findOne(id);

    if (pedido.quantidade) {
      pedidoExistente.quantidade = pedido.quantidade;
    }

    if (pedido.produto && pedido.produto.id) {

      const produto = await this.produtoRepository.findOneBy({
        id: pedido.produto.id,
      });

      if (!produto) {
        throw new NotFoundException('Produto não encontrado');
      }

      pedidoExistente.produto = produto;
      pedidoExistente.valor_total =
        Number(produto.preco) * pedidoExistente.quantidade;
    }

    if (pedido.usuario && pedido.usuario.id) {

      const usuario = await this.usuarioRepository.findOneBy({
        id: pedido.usuario.id,
      });

      if (!usuario) {
        throw new NotFoundException('Usuário não encontrado');
      }

      pedidoExistente.usuario = usuario;
    }

    return this.pedidoRepository.save(pedidoExistente);
  }

  async remove(id: number): Promise<void> {

    const pedido = await this.findOne(id);

    await this.pedidoRepository.remove(pedido);
  }
}