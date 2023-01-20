import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { HeroesService } from './heroes.service';
import { UpdateHeroDto } from './dto/update-hero.dto';

@Controller('heroes')
// @UsePipes(ValidationPipe)
export class HeroesController {

    constructor(
        private readonly heroesService: HeroesService
    ){}

    @Get()
    getAllHeroes(){
        return this.heroesService.findAll();
    }

    @Get(':id')
    getHeroeById( @Param('id', ParseUUIDPipe) id: string){
        console.log({id: id});
        return this.heroesService.findOneById(id);
        
    }

    @Post()
    createNewHero( @Body() createHeroDto: CreateHeroDto){
        return this.heroesService.create(createHeroDto); 
    }

    @Patch(':id')
    updateHero(
        @Param('id',ParseUUIDPipe) id:string,
        @Body() updateHeroDto: UpdateHeroDto
    ){
        return this.heroesService.update(id,updateHeroDto);
    }

    @Delete(':id')
    deleteHero(@Param('id') id: string){
        return this.heroesService.delete(id);
    }
}
