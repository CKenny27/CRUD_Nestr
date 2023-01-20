import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid'
import { Hero } from './interfaces/hero.interface';
import { CreateHeroDto,UpdateHeroDto } from './dto';

@Injectable()
export class HeroesService {

    private heroes: Hero[] = [
        {
            id: uuid(),
            superhero:'Batman', 
            publisher:'DC Comics', 
            alter_ego:'Bruce Wayne',
            first_appearance:'Detective Comics #27',
            characters:'Bruce Wayne'
        },
        {
            id: uuid(),
            superhero:'Superman', 
            publisher:'DC Comics', 
            alter_ego:'Kal-El',
            first_appearance:'Action Comics #1',
            characters:'Kal-El'
        },
        {
            id: uuid(),
            superhero:'Flash', 
            publisher:'DC Comics', 
            alter_ego:'Jay Garrick',
            first_appearance:'Flash Comics #1',
            characters:'Jay Garrick, Barry Allen, Wally West, Bart Allen'
        },
        {
            id: uuid(),
            superhero:'Green Lantern', 
            publisher:'DC Comics', 
            alter_ego:'Alan Scott',
            first_appearance:'All-American Comics #16',
            characters:'Alan Scott, Hal Jordan, Guy Gardner, John Stewart, Kyle Raynor, Jade, Sinestro, Simon Baz'
        },
        {
            id: uuid(),
            superhero:'Green Arrow', 
            publisher:'DC Comics', 
            alter_ego:'Oliver Queen',
            first_appearance:'More Fun Comics #73',
            characters:'Oliver Queen'
        },
        {
            id: uuid(),
            superhero:'Wonder Woman', 
            publisher:'DC Comics', 
            alter_ego:'Princess Diana',
            first_appearance:'All Star Comics #8',
            characters:'Princess Diana'
        },
        {
            id: uuid(),
            superhero:'Martian Manhunter', 
            publisher:'DC Comics', 
            alter_ego:'J\'onn J\'onzz',
            first_appearance:'Detective Comics #225',
            characters:'Martian Manhunter'
        },
        {
            id: uuid(),
            superhero:'Robin/Nightwing', 
            publisher:'DC Comics', 
            alter_ego:'Dick Grayson',
            first_appearance:'Detective Comics #38',
            characters:'Dick Grayson'
        },
        {
            id: uuid(),
            superhero:'Blue Beetle', 
            publisher:'DC Comics', 
            alter_ego:'Dan Garret',
            first_appearance:'Mystery Men Comics #1',
            characters:'Dan Garret, Ted Kord, Jaime Reyes'
        },
        {
            id: uuid(),
            superhero:'Black Canary', 
            publisher:'DC Comics', 
            alter_ego:'Dinah Drake',
            first_appearance:'Flash Comics #86',
            characters:'Dinah Drake, Dinah Lance'
        },
        {
            id: uuid(),
            superhero:'Spider Man', 
            publisher:'Marvel Comics', 
            alter_ego:'Peter Parker',
            first_appearance:'Amazing Fantasy #15',
            characters:'Peter Parker'
        },
        {
            id: uuid(),
            superhero:'Captain America', 
            publisher:'Marvel Comics', 
            alter_ego:'Steve Rogers',
            first_appearance:'Captain America Comics #1',
            characters:'Steve Rogers'
        },
        {
            id: uuid(),
            superhero:'Iron Man', 
            publisher:'Marvel Comics', 
            alter_ego:'Tony Stark',
            first_appearance:'Tales of Suspense #39',
            characters:'Tony Stark'
        },
        {
            id: uuid(),
            superhero:'Thor', 
            publisher:'Marvel Comics', 
            alter_ego:'Thor Odinson',
            first_appearance:'Journey into Myster #83',
            characters:'Thor Odinson'
        },
        {
            id: uuid(),
            superhero:'Hulk', 
            publisher:'Marvel Comics', 
            alter_ego:'Bruce Banner',
            first_appearance:'The Incredible Hulk #1',
            characters:'Bruce Banner'
        },
        {
            id: uuid(),
            superhero:'Wolverine', 
            publisher:'Marvel Comics', 
            alter_ego:'James Howlett',
            first_appearance:'The Incredible Hulk #180',
            characters:'James Howlett'
        },
        {
            id: uuid(),
            superhero:'Daredevil', 
            publisher:'Marvel Comics', 
            alter_ego:'Matthew Michael Murdock',
            first_appearance:'Daredevil #1',
            characters:'Matthew Michael Murdock'
        },
        {
            id: uuid(),
            superhero:'Hawkeye', 
            publisher:'Marvel Comics', 
            alter_ego:'Clinton Francis Barton',
            first_appearance:'Tales of Suspense #57',
            characters:'Clinton Francis Barton'
        },
        {
            id: uuid(),
            superhero:'Cyclops', 
            publisher:'Marvel Comics', 
            alter_ego:'Scott Summers',
            first_appearance:'X-Men #1',
            characters:'Scott Summers'
        },
        {
            id: uuid(),
            superhero:'Silver Surfer', 
            publisher:'Marvel Comics', 
            alter_ego:'Norrin Radd',
            first_appearance:'The Fantastic Four #48',
            characters:'Norrin Radd'
        }
    ];

    findAll(){
        return this.heroes;
    }

    findOneById( id: string){
        const hero = this.heroes.find( hero => hero.id === id);
        if (!hero){
            throw new NotFoundException(`Hero with id '${id}' not found!`);
        }
        return hero;
    }

    create(createHeroDto: CreateHeroDto){
        const heroe: Hero = {
            id: uuid(),
            ... createHeroDto,
        }
        this.heroes.push(heroe);
        return heroe;
    }

    update(id:string, updateHeroDto: UpdateHeroDto){
        let HeroesDB = this.findOneById(id);
        if (updateHeroDto.id && updateHeroDto.id != id){
            throw new BadRequestException(`Heroes id not valid inside body!`)
        }
        this.heroes = this.heroes.map(Hero =>{
            if(Hero.id === id){
                HeroesDB = {
                    ...HeroesDB,
                    ...updateHeroDto,
                    id
                }
                return HeroesDB;
            }
            return Hero;
        });
        return HeroesDB;
    }

    delete(id: string){
        this.heroes = this.heroes.filter(Hero=>Hero.id!=id);
    }

}
