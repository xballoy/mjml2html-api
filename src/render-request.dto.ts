import { IsNotEmpty, IsString } from 'class-validator';

export class RenderRequestDto {
  @IsNotEmpty()
  @IsString()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  mjml: string;
}
