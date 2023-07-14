import { IsNotEmpty, IsString } from 'class-validator';

export class RenderRequestDto {
  @IsNotEmpty()
  @IsString()
  mjml!: string;
}
