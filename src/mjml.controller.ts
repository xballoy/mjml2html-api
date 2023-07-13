import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { MjmlService } from './mjml.service';
import { RenderRequestDto } from './render-request.dto';

@Controller()
export class MjmlController {
  constructor(private readonly mjmlService: MjmlService) {}

  @HttpCode(200)
  @Post()
  render(@Body() { mjml }: RenderRequestDto) {
    return this.mjmlService.render(mjml);
  }
}
