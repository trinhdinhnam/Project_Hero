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
  //Lấy ra danh sách các anh hùng
  getHeroes(): void{
    this.heroService.getHeroes().subscribe(data=>{
        this.heroes = data;
    });
  }
  //Hàm thêm một anh hùng vào trong dữ liệu
  add(name: string): void{
    
    name = name.trim();
    if(!name){ return;}
    this.heroService.addHero({name} as Hero)
        .subscribe(hero => {
          this.heroes.push(hero);
        })
  }
  //Hàm xóa 1 anh hùng
  delete(hero: Hero): void{
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
