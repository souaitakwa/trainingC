import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';


import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }


 /* getDishes() : Dish[]{ 

    return DISHES;
  }
  

  getDish( id : string): Dish{
    return  DISHES.filter((dish) => (dish.id===id ))[0];    

  }
  getFeaturedDish():Dish{
    return DISHES.filter((dish) => (dish.featured) ) [0];
  }
  */
/*
 getDishes() :Promise< Dish[]>{ 

  return Promise.resolve(DISHES);
}


getDish( id : string): Promise< Dish>{
  return Promise.resolve(DISHES.filter((dish) => (dish.id===id ))[0]);    

}
getFeaturedDish(): Promise< Dish>{
  return Promise.resolve(DISHES.filter((dish) => (dish.featured) ) [0]);
}

without time response 
*/

/*
getDishes() :Promise< Dish[]>{ 

  return new Promise(resolve=>{
    setTimeout(()=>(resolve(DISHES),2000))
  }) ;
}
 
getDish(id: string): Promise<Dish> {
  return new Promise(resolve=> {
    // Simulate server latency with 2 second delay
      setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
  });
}

getFeaturedDish(): Promise<Dish> {
  return  new Promise(resolve=> {
    // Simulate server latency with 2 second delay
      setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
  });
}
Promises with response time 

*/
/*
getDishes(): Promise<Dish[]> {
  return of(DISHES).pipe(delay(2000)).toPromise();
}

getDish(id: string): Promise<Dish> {
  return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000)).toPromise();
}

getFeaturedDish(): Promise<Dish> {
  return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000)).toPromise();
}
 // Observebales with promises  ( a Promise method)

 // because when we update our services to use the HTTP service to go to a server to fetch the data, then we would note that in Angular the HTTP methods will return observables.
*/


getDishes(): Observable<Dish[]> {
  return of(DISHES).pipe(delay(2000));
}

getDish(id: string): Observable<Dish> {
  return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
}

getFeaturedDish(): Observable<Dish> {
  return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
}

getDishIds(): Observable<string[] | any> {
  return of(DISHES.map(dish => dish.id ));
}
}
