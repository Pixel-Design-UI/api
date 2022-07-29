import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Link } from './link.entity';

@Injectable()
export class LinkService {

  constructor(
    @InjectRepository(Link)
    private linkRepository: Repository<Link>)
  { }

  /**
   * Create a new link
   * @param data The data recieved
   * @param user The user
   * @returns Id of the created link
  */
  public async create(data: CreateLinkDto, user: User): Promise<object> {
    const newLink = {
      userId: user,
      type: data.type,
      url: data.url
    }

    const savedLink = await this.linkRepository.save(newLink);
    if (!savedLink) throw new BadRequestException('An error has occured while saving the link');

    return { message: "Link created !" }
  }

  /**
   * Update a selected link
   * @param id The id of the link
   * @param data The data recieved
   * @param user The user
   * @returns A message if the link is deleted
  */
  public async update(idLink: string, data: UpdateLinkDto, user: User): Promise<object> {
    const link = await this.linkRepository.findOne({ where: { id: idLink, userId: user.id } });
    if (!link) throw new NotFoundException('Link does not exist');

    const editLink = {
      userId: user,
      type: data.type,
      url: data.url,
    }

    const savedLink = await this.linkRepository.update(idLink, editLink);
    if (!savedLink) throw new BadRequestException('An error has occured while saving the link');

    return { message: "Link updated !" }
  }

  /**
   * Remove a selected link
   * @param id The id of the link
   * @param user The user
   * @returns A message if the link is deleted
  */
  public async remove(idLink: string, user: User): Promise<object> {
    const link = await this.linkRepository.findOne({ where: { id: idLink, userId: user.id } });
    if (!link) throw new NotFoundException('Code does not exist');

    await this.linkRepository.remove(link);

    return { message: "Link deleted !" }
  }
}
