import { Controller, Post, Body, Get, Patch, Delete, Param } from '@nestjs/common';
import { CodeService } from './code.service';

@Controller('code')
export class CodeController {
  constructor(private readonly codeService: CodeService) { }
}
