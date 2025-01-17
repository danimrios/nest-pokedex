import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Pokemon extends Document {

    @Prop(
        {
            unique: true,
            index: true,//sabe en donde esta el elemento que estamos buscando
        }
       )
     name: string;
     @Prop(
        {
            unique: true,
            index: true,//sabe en donde esta el elemento que estamos buscando
        }
       )
     no: number
}

export const  PokemonShema= SchemaFactory.createForClass(Pokemon);
