import { IsInt, IsPositive, IsString, Min,  MinLength } from "class-validator";

export class CreatePokemonDto {
   @MinLength(1)
   @IsString()
    name: string;
    // @min
    @IsPositive()
    @IsInt()
    @Min(1)
    no:number;
}
