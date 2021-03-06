import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: '用户名'
   })
  readonly name: string;

  @ApiProperty()
  readonly password: string;
}
