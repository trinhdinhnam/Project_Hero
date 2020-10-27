import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
//import { HEROES } from '../mock-heroes';
import {HeroService} from '../hero.service';
import {MessagesService} from '../messages.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  constructor(private heroService: HeroService, private messageService: MessagesService) { }
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  }

  heroes: Hero[];

  selectedHero: Hero;
  onSelected(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }
  ngOnInit(): void {
    this.getHeroes();

  }
  getHeroes(): void{
    this.heroService.getHeroes().subscribe(data=>{
        this.heroes = data;
    });
  }

}
