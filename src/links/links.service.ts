import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Link } from './link.entity';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link)
    private linkRespository: Repository<Link>)
  { }

  /**
   * Create a new link
   * @param data The data recieved
   * @returns Id of the created link
   */
  public async create(data: CreateLinkDto) {
    return 'This action adds a new link';
  }

  /**
   * Find all links
   * @returns A list of all links
   */
  public async findAll() {
    return `This action returns all links`;
  }

    /**
   * Find one link based on the id
   * @param id The id of the link
   * @returns The link with this id
   */
  public async findOne(id: string) {
    return `This action returns a #${id} link`;
  }

  /**
   * 
   * @param id The id of the link
   * @param data The data recieved
   * @returns A message if the link is deleted
   */
  public async update(id: string, updateLinkDto: UpdateLinkDto) {
    return `This action updates a #${id} link`;
  }

  /**
   * Remove a selected link
   * @param id The id of the link
   * @returns A message if the link is deleted
   */
  public async remove(id: string) {
    return `This action removes a #${id} link`;
  }
}
