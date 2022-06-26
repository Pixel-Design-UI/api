import { Module } from '@nestjs/common';
import { CodeService } from './code.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Code } from './code.entity';
import { CodeController } from './code.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Code]),
  ],
  providers: [CodeService],
  exports: [CodeService],
  controllers: [CodeController]
})
export class CodeModule { }
