import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';




@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes : Dish[];
  
selectedDish : Dish;
  constructor( private dishService :DishService ) { }

  ngOnInit(): void {
 //   this.dishes = this.dishService.getDishes();

 // this.dishService.getDishes().then(dishes => this.dishes =dishes); when we use promises 

 // now when we use observables 
 this.dishService.getDishes().subscribe(dishes => this.dishes =dishes); 
  }

  onSelect(dish: Dish){

    this.selectedDish=dish;
  }
}
