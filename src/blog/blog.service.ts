import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';


@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>)
  { }

  /**
   * Returns all blogs
   * @returns A list of blogs
   */
  public async findAll(): Promise<Blog[]> {
    const allBlogs = await this.blogRepository.find();
    if (allBlogs.length === 0) throw new NotFoundException('No blogs found');

    return allBlogs;
  }
}
