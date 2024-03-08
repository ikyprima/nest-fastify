import { Injectable, Param, NotFoundException } from '@nestjs/common';
import { CreateKategoriDto } from './dto/create-kategori.dto';
import { UpdateKategoriDto } from './dto/update-kategori.dto';
import { Kategori, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class KategoriService {
  constructor(private prisma: PrismaService) {}

  async create(createKategoriDto: CreateKategoriDto): Promise<Kategori> {
    return this.prisma.kategori.create({
      data: {
        nama: createKategoriDto.nama,
        Singkatan: createKategoriDto.singkatan,
      },
    });
  }

  async findAll(params:{
    skip?: number;
    take?: number;
    cursor?:Prisma.KategoriWhereUniqueInput;
    where?: Prisma.KategoriWhereInput;
    orderBy?: Prisma.KategoriOrderByWithRelationInput;
  }):Promise<Kategori[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.kategori.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async findOne(id: number):Promise<Kategori> {
    const data = await this.prisma.kategori.findUnique({
      where: { id: id },
    })
    if(!data){
      throw new NotFoundException(`Kategori dengan id '${id}' tidak ditemukan.`);
    }
    return data;
  }
  async update(
    id: number,
    updateKategoriDto: UpdateKategoriDto
    ): Promise<Kategori> {
    const existingKategori = await this.prisma.kategori.findUnique({ where: { id } });

    if (!existingKategori) {
      throw new NotFoundException(`Kategori dengan id '${id}' tidak ditemukan.`);
    }

    return this.prisma.kategori.update({
      where: { id },
      data: {
        nama: updateKategoriDto.nama || existingKategori.nama,
        Singkatan: updateKategoriDto.singkatan || existingKategori.Singkatan,
      },
    });
  }

  async remove(id: number):Promise<HttpMessageResponse > {
    this.prisma.kategori.delete({
      where: { id:id },
    }).catch(() => {
      throw new NotFoundException(`Can't find item with id ${id}`);
    });

    const response: HttpMessageResponse = {
      statusCode: 200,
      message: `Kategori dengan id '${id}' berhasil dihapus.`,
    };

    return response;
  }
  
}
interface HttpMessageResponse {
  statusCode: number;
  message: string;
}