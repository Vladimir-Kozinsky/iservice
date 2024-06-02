import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class HashUserDto {

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE1N2U4OWI1ZmQyY2NmZDFmMTY5MmUiLCJlbWFpbCI6InUua2F6aW5za2lAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiSmhvbiIsImxhc3ROYW1lIjoiU21pZHQiLCJwb3NpdGlvbiI6ImVuZ2luZWVyIiwicm9sZSI6ImFkbWluIiwiaXNBY3RpdmF0ZWQiOnRydWUsImlhdCI6MTY4ODU2OTUzMywiZXhwIjoxNjg4NTcwNDMzfQ.3C4O8nmCXU6ex5VdLykohz2fXl9kQ-ZvqtuMPlFYAAc', description: "accessToken" })
  @IsNotEmpty()
  readonly accessToken: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE1N2U4OWI1ZmQyY2NmZDFmMTY5MmUiLCJlbWFpbCI6InUua2F6aW5za2lAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiSmhvbiIsImxhc3ROYW1lIjoiU21pZHQiLCJwb3NpdGlvbiI6ImVuZ2luZWVyIiwicm9sZSI6ImFkbWluIiwiaXNBY3RpdmF0ZWQiOnRydWUsImlhdCI6MTY4ODU2OTUzMywiZXhwIjoxNjg4NTcwNDMzfQ.3C4O8nmCXU6ex5VdLykohz2fXl9kQ-ZvqtuMPlFYAAc', description: "refreshToken" })
  @IsNotEmpty()
  readonly refreshToken: string;


}