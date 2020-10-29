import { Injectable } from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {Observable, of} from 'rxjs';
import { MessagesService } from './messages.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';

//Hàm show ra thông báo
private log(message: string){
  this.messageService.add(`HeroService: ${message}`);
}

constructor(private messageService: MessagesService,
            private http: HttpClient) { }
/** GET: Phương thức lấy ra danh sách anh hùng */
getHeroes(): Observable<Hero[]>{
  //this.messageService.add('HeroService: fetched heroes');
  //return of(HEROES);
  return this.http.get<Hero[]>(this.heroesUrl).pipe(
    tap(_ => this.log('fetched heroes')),
    catchError(this.handleError<Hero[]>('getHeroes', []))
  );
}
/** GET: Phương thức lấy dữ liệu anh hùng theo id */
getHero(id: number): Observable<Hero>{
  //TODO: gửi thông báo sau khi fetching hero
  const url = `${this.heroesUrl}/${id}`;
  return  this.http.get<Hero>(url).pipe(
    tap(_=> this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<Hero>(`getHero id=${id}`))
  );
}



private handleError<T>(oepration = 'operation', result?: T){
  return (error: any): Observable<T> => {
    //TODO: Gửi lỗi tới logging
    console.error(error);
    this.log(`${oepration} failed: ${error.mesage}`);
    return of(result as T);
  };
}

/** PUT: Hàm cập nhật dữ liệu */
updateHero(hero: Hero): Observable<any>{
  
  return this.http.put(this.heroesUrl,hero,this.httpOptions).pipe(
    tap(_ => this.log(`Update hero id=${hero.id}`)),
    catchError(this.handleError<any>('updateHero'))
  )
}
// Định  nghĩa hàm tùy chọn
httpOptions = {
   headers: new HttpHeaders({'Content-Type': 'application/json'})
};

/** POST: Phương thức thêm 1 anh hùng vào data */
addHero(hero: Hero): Observable<Hero>{
  
  return this.http.post<Hero>(this.heroesUrl, hero,this.httpOptions).pipe(
    tap((newHero: Hero)=> this.log(`added hero w/id=${newHero.id}`)),
    catchError(this.handleError<Hero>('addHero'))

  );
}

/**DELETE: Phương thức xóa 1 anh hùng */
deleteHero(hero: Hero | number): Observable<Hero> {
  const id = typeof hero === 'number' ? hero : hero.id;
  const url = `${this.heroesUrl}/${id}`;

  return this.http.delete<Hero>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}

/**GET: lấy thông tin anh hùng ra theo tên tìm kiếm */
searchHeroes(term: string): Observable<Hero[]> {
  if(!term.trim()){
    //Nếu không tìm thấy trả về mảng rỗng
    return of([]);
  }
  return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
    tap(x => x.length ? 
      this.log(`found heroes matching "${term}"`) : 
      this.log(`no heroes mathching "${term}"`)),
      catchError(this.handleError<Hero[]>(`searchHeroes`,[]))
  );
}
}


