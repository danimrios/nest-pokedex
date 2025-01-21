import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguratio } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';


@Module({
  imports: [

    ConfigModule.forRoot({

      load: [EnvConfiguratio],
      validationSchema:JoiValidationSchema,
    }),

    ServeStaticModule.forRoot({ 
    rootPath: join(__dirname,'..','public'), 
    }),
    MongooseModule.forRoot(process.env.MONGODB, {dbName:'pokemonsdb'} ),
    PokemonModule,
    CommonModule,
    SeedModule 
    ], 
})
export class AppModule {}
