import { Module } from '@nestjs/common';
import { MjmlController } from './mjml.controller';
import { MjmlService } from './mjml.service';

@Module({
  imports: [],
  controllers: [MjmlController],
  providers: [MjmlService],
})
export class MjmlModule {}
