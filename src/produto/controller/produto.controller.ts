import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ProdutoService } from "../services/produto.service";
import { Produto } from "../entities/produto.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";




@Controller('/produtos')
export class ProdutoController {

  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  create(@Body() produto: Produto) {
    return this.produtoService.create(produto);
  }

  @Get("/all")
  findAll() {
    return this.produtoService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.produtoService.findOne(id);
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() produto: Produto) {
    return this.produtoService.update(id, produto);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.produtoService.remove(id);
  }

  @Get('/descricao/:descricao')
  findByDescricao(@Param('descricao') descricao: string): Promise<Produto[]> {
  return this.produtoService.findByDescricao(descricao);
}

}