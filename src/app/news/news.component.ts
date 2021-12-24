import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NewsServiceService } from '../news-service.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, OnDestroy {

  news : any[] = [];
  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private newsService: NewsServiceService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      /* autoWidth: true,
      ajax: 'https://jsonplaceholder.typicode.com/posts', */
    }
    this.getAllNews();
  }

  getAllNews() {
    this.newsService.getNews()
      .subscribe(
        news => {
          console.log(news);
          this.news = news;
          this.dtTrigger.next(this.dtOptions)
        }
      )
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
