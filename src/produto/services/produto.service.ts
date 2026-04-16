import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Produto } from '../entities/produto.entity';



@Injectable()
export class ProdutoService {

  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}



  //criar 
  create(produto: Produto): Promise<Produto> {
    return this.produtoRepository.save(produto);
  }


  //Procurar 
  async findAll(): Promise<Produto[]> {
  return await this.produtoRepository.find({
    relations: {
      categoria: true,
      usuario: true
    }
  });
}
async findAllOrderByCalorias(): Promise<Produto[]> {
  return await this.produtoRepository.find({
    relations: {
      categoria: true,
      usuario: true
    },
    order: {
      calorias: 'ASC' // 'ASC' para Ascendente (menor para o maior)
    }
  });
}




//Procurar por ID
  async findOne(id: number): Promise<Produto> {
  const produto = await this.produtoRepository.findOne({
    where: { id },
    relations: {
      categoria: true,
      usuario: true
    }
  });

  if (!produto) {
    throw new NotFoundException('Produto não encontrado');
  }
  return produto;
}


  
  async update(id: number, produto: Produto): Promise<Produto> {

    const produtoExistente = await this.findOne(id);

    produtoExistente.nome = produto.nome ?? produtoExistente.nome;
    produtoExistente.descricao = produto.descricao ?? produtoExistente.descricao;
    produtoExistente.preco = produto.preco ?? produtoExistente.preco;
    produtoExistente.calorias = produto.calorias ?? produtoExistente.calorias;

    return this.produtoRepository.save(produtoExistente);
  }

  async remove(id: number): Promise<void> {

    const produto = await this.findOne(id);

    await this.produtoRepository.remove(produto);
  }

  async findByDescricao(descricao: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        descricao: ILike(`%${descricao}%`) // O símbolo % permite buscar em qualquer parte do texto
      },
      relations: {
        categoria: true,
        usuario: true
      }
    });
  }


}