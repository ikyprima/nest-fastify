import { Controller, Get, Post, Body, Patch, Param, Delete, Res,ParseIntPipe } from '@nestjs/common';
import { KategoriService } from './kategori.service';
import { CreateKategoriDto } from './dto/create-kategori.dto';
import { UpdateKategoriDto } from './dto/update-kategori.dto';
import { FastifyReply } from 'fastify';
import { repl } from '@nestjs/core';
import { Kategori } from '@prisma/client';


@Controller('kategori')
export class KategoriController {
  constructor(private readonly kategoriService: KategoriService) {}

  @Post()
  async create(
    @Body() createKategoriDto : CreateKategoriDto,
    @Res() reply : FastifyReply
  ):Promise<void> {
    const kategori = await this.kategoriService.create(createKategoriDto);
    reply.send(kategori);
  }
  
  @Get()
  async findAll(
    @Res()replay : FastifyReply
  ):Promise<void> {
    const kategori = await this.kategoriService.findAll({});
    replay.send(kategori);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Res() reply : FastifyReply
  ):Promise<void> {
    const data = await this.kategoriService.findOne(+id);
    reply.send(data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateKategoriDto: UpdateKategoriDto,
    @Res() reply : FastifyReply
  ):Promise<void> {
    const data = await this.kategoriService.update(+id, updateKategoriDto);
    reply.send(data);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res() reply : FastifyReply
    ):Promise<void>{
    reply.send(await this.kategoriService.remove(+id));
  }
}
