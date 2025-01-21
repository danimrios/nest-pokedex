import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { join } from 'path';
import { paginationDto } from 'src/common/Dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {

    private defaultLimit:number;   

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  
    private readonly configService:ConfigService
  ){
     this.defaultLimit=configService.get<number>("DEFAULT_LIMIT");

  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name=createPokemonDto.name.toLocaleLowerCase();// lo guarda en minuscula 
    try {
      const Pokemon= await  this.pokemonModel.create(createPokemonDto);

      return Pokemon;
    } catch (error) {
      this.handleExceotion(error);
    }       
    
  }

  findAll(paginationDto: paginationDto) {
    const{limit =this.defaultLimit, offset=0 }= paginationDto;
    
    return this.pokemonModel.find()
      .limit(limit)
      .skip(offset)
      .sort({
        no:1
      })
      .select('-__v');    
  }

async  findOne(id: string) {
    let pokemon:Pokemon;

    if(!isNaN(+id)){
      pokemon= await this.pokemonModel.findOne({no:id})
    }
    //mongo id
    if(!pokemon && isValidObjectId(id))
    {
      pokemon= await this.pokemonModel.findById(id)   
    }
    ///por name 
    if(!pokemon){
      pokemon=await this.pokemonModel.findOne({name: id.toLowerCase().trim()})
    }
     if(!pokemon)
      throw new NotFoundException(`pokemon whit id, name or no "${id}"not found`)

    return pokemon;
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon= await this.findOne(id);
    if(updatePokemonDto.name)
      updatePokemonDto.name=updatePokemonDto.name.toLowerCase();
    
    try {
      await pokemon.updateOne(updatePokemonDto,{new: true})
    } catch (error) {
      this.handleExceotion(error);
    }
  


    return {...pokemon.toJSON,...updatePokemonDto};
  }

   async remove(id: string) {
    
    // const pokemon= await this.findOne(id);
    // await pokemon.deleteOne();
    
    // const resul= await this.pokemonModel.findByIdAndDelete(id);
    const {deletedCount}= await this.pokemonModel.deleteOne({ _id:id });
    if(deletedCount===0)
      throw new BadRequestException(`Pokemon with id "${id}" not found`);
    return ;

  }

  private handleExceotion(error:any){
    if(error.code===1100){
      throw new BadRequestException(`pokemon exists in db ${JSON.stringify(error.keyvalue) }`);
    }
    console.log(Error)
    throw new InternalServerErrorException(`can't create pokemon - check server logs`); 
  }
}
