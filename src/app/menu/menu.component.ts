import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { baseURL } from '../shared/baseurl';




@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  errMess: string;
  dishes : Dish[];
  testURL = baseURL;
  
// selectedDish : Dish; removed when i used http 
  constructor( private dishService :DishService,
    // @Inject('baseURL') private baseURL 
    ) {  }

  ngOnInit(): void {
 //   this.dishes = this.dishService.getDishes();

 // this.dishService.getDishes().then(dishes => this.dishes =dishes); when we use promises 

 // now when we use observables 
 //this.dishService.getDishes().subscribe(dishes => this.dishes =dishes); 
 this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes,
      errmess => this.errMess = <any>errmess);  
}

/*
  onSelect(dish: Dish){

    this.selectedDish=dish;
  }
  removed when we used http */
}
