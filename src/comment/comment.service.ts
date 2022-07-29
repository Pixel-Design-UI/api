import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private userRepository: Repository<User>)
  { }

  /**
   * Create a new comment
   * @param data The data recieved
   * @param user The user
   * @returns Id of the created comment
  */
  public async create(data: CreateCommentDto, user: User): Promise<object> {
    const newComment = {
      userId: user,
      postId: data.postId,
      message: data.message,
      likes: 0
    }

    const savedComment = await this.commentRepository.save(newComment);
    if (!savedComment) throw new BadRequestException('An error has occured while saving the comment');

    return { message: "Comment created !" }
  }

  /**
   * Return all comments from a post
   * @param postId The id of the post
   * @returns A list of comments
  */
  public async findAllForPost(postId: string): Promise<Comment[]> {
    const allComments = await this.commentRepository.find({ where: { postId: postId } });
    if (allComments.length === 0) throw new NotFoundException('No comments found');

    return allComments;
  }

  /**
   * Find all posts of an user
   * @returns A list of all posts
   * @param userId The id of the user
   */
   public async findAllForUser(username: string): Promise<Comment[]> {
    const user = await this.userRepository.findOne({ where: { username: username } });
    if (!user) throw new NotFoundException('User with that username does not exist');

    const allComments = await this.commentRepository.find({ where: { userId: user } });
    if (allComments.length === 0) throw new NotFoundException('This user has no comments');

    return allComments;
  }

  /**
   * Update a selected comment
   * @param id The id of the comment
   * @param data The data recieved
   * @param user The user
   * @returns A message if the comment is deleted
  */
  public async update(idComment: string, data: UpdateCommentDto, user: User): Promise<object> {
    const comment = await this.commentRepository.findOne({ where: { id: idComment, userId: user.id } });
    if (!comment) throw new NotFoundException('Comment does not exist');

    const editComment = {
      userId: user,
      postId: data.postId,
      message: data.message,
    }

    const savedComment = await this.commentRepository.update(idComment, editComment);
    if (!savedComment) throw new BadRequestException('An error has occured while saving the comment');

    return { message: "Post updated !" }
  }

  /**
   * Remove a selected comment
   * @param id The id of the comment
   * @param user The user
   * @returns A message if the comment is deleted
  */
  public async remove(idComment: string, user: User): Promise<object> {
    const comment = await this.commentRepository.findOne({ where: { id: idComment, userId: user.id } });
    if (!comment) throw new NotFoundException('Post does not exist');

    await this.commentRepository.remove(comment);

    return { message: "Post deleted !" }
  }
}
