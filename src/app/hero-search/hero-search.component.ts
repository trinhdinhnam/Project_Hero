import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged,switchMap} from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
heroes$: Observable<Hero[]>;
private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }
  // Đẩy cụm từ tìm kiếm vào Observable
  search(term: string): void{
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      //đợi cho đến khi luồng sự kiện chuỗi mới tạm dừng trong 300 mili giây trước khi chuyển dọc theo chuỗi mới nhất
      debounceTime(300),
      //Đảm bảo rằng một yêu cầu chỉ được gửi nến bộ lọc thay đổi
      distinctUntilChanged(),
      //gọi dịch vụ tìm kiếm cho từng cụm từ tìm kiếm
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }

}
