import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Hero} from './hero';
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb(){
    const heroes = [
    { id: 11,name: 'Trịnh Đình Nam'},
    { id: 12,name: 'Hoàng Phi Hùng'},
    { id: 13,name: 'Phạm Minh Sang'},
    { id: 14,name: 'Lê Quốc Mạnh'},
    { id: 15,name: 'Nguyễn Bá Lương'},
    { id: 16,name: 'Lưu Văn Hoàng'},
    { id: 17,name: 'Nguyễn Kim Đạt'},
    { id: 18,name: 'Nguyễn Thế Sơn'},
    { id: 19,name: 'Nguyễn Hà Thu'},
    { id: 20,name: 'Bùi Trung Tú'}

    ];
    return {heroes};
  }
  genId(heroes: Hero[]): number{
    return heroes.length>0?Math.max(...heroes.map(hero => hero.id))+1:11;
  }
  constructor() { }
}
