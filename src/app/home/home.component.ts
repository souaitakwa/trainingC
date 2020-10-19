import { Component, OnInit, Inject } from '@angular/core';

import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { baseURL } from '../shared/baseurl';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish : Dish;
  promotion : Promotion ;
  leader : Leader;
  testURL = baseURL;


  constructor(private dishService : DishService ,private  promotionService : PromotionService,
     private leaderService : LeaderService,
    ) { }

  ngOnInit(): void {
   /* this.dish = this.dishService.getFeaturedDish();
    this.promotion = this.promotionService.getFeaturedPromotion();
    this.leader = this.leaderService.getFeaturedLeader();
*/
/*
 this.dishService.getFeaturedDish().then(dish=>this.dish =dish);
     this.promotionService.getFeaturedPromotion().then(promotion=> this.promotion= promotion);
     this.leaderService.getFeaturedLeader().then(leader=> this.leader=leader);
     Promises 
     */
    this.dishService.getFeaturedDish().subscribe(dish=>this.dish =dish);
    this.promotionService.getFeaturedPromotion().subscribe(promotion=> this.promotion= promotion);
    this.leaderService.getFeaturedLeader().subscribe(leader=> this.leader=leader);
  }

}
