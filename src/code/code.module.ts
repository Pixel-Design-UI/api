import { Module } from '@nestjs/common';
import { CodeService } from './code.service';
import { CodeController } from './code.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Code } from './code.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Code])
  ],
  controllers: [CodeController],
  providers: [CodeService],
  exports: [CodeService]
})
export class CodeModule { }
