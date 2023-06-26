// task-hour.controller.ts
import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { CreateCommentDto } from './dto/comment.dto';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/add')
  async addcommentToWorkDay(@Body() createComment: CreateCommentDto) {
    return this.commentService.addCommentToWorkDay(createComment);
  }

  @Delete('/:id')
  async deleteComment(@Param('id') id: string) {
    return this.commentService.deleteComment(id);
  }
}
