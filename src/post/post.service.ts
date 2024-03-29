import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>)
  { }

/**
 * Create a new post
 * @param data The data recieved
 * @param user The user
 * @returns Id of the created post
 */
  public async create(data: CreatePostDto, user: User): Promise<object> {
    const newPost = {
      userId: user,
      title: data.title,
      description: data.description,
      url: data.url,
      //imagesUrls: data.imagesUrls,
      likes: data.likes,
    }

    const savedPost = await this.postRepository.save(newPost);
    if (!savedPost) throw new BadRequestException('An error has occured while saving the post');

    return { message: "Post created !" }
  }

  /**
 * Return all posts
 * @returns A list of all posts
 */
  public async findAll(index: number): Promise<Post[]> {
    const allPosts = await this.postRepository.createQueryBuilder('post')
    .orderBy('post.created_at', 'DESC')
    .leftJoinAndSelect('post.userId', 'userId')
    .offset(index)
    .limit(100)
    .getMany();

    if (allPosts.length === 0) throw new NotFoundException('There is not a single post');

    return allPosts;
  }

  /**
   * Find all posts of an user
   * @returns A list of all posts
   * @param userId The id of the user
   */
  public async findAllForUser(username: string): Promise<Post[]> {
    const user = await this.userRepository.findOne({ where: { username: username } });
    if (!user) throw new NotFoundException('User with that username does not exist');

    const allPosts = await this.postRepository.find({ where: { userId: user } });
    if (allPosts.length === 0) throw new NotFoundException('This user has no posts');

    return allPosts;
  }

  /**
   * 
   * @param idPost The id of the post
   * @param data The data recieved
   * @returns A message if the post is deleted
   */
  public async update(idPost: string, data: UpdatePostDto, user: User): Promise<object> {
    const post = await this.postRepository.findOne({ where: { id: idPost, userId: user.id } });
    if (!post) throw new NotFoundException('Post does not exist');

    const editPost = {
      userId: user,
      title: data.title,
      description: data.description,
      url: data.url,
      //imagesUrls: data.imagesUrls,
      likes: data.likes,
    }

    const savedPost = await this.postRepository.update(idPost, editPost);
    if (!savedPost) throw new BadRequestException('An error has occured while saving the post');

    return { message: "Post updated !" }
  }

  /**
   * Remove a selected post
   * @param idPost The id of the post
   * @param user The user
   * @returns A message if the post is deleted
   */
  public async remove(idPost: string, user: User): Promise<object> {
    const post = await this.postRepository.findOne({ where: { id: idPost, userId: user.id } });
    if (!post) throw new NotFoundException('Post does not exist');

    await this.postRepository.remove(post);

    return { message: "Post deleted !" }
  }
}
