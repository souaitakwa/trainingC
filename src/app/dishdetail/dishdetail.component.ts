import { Component, OnInit , Input,ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import {MatSliderModule} from '@angular/material/slider';
import { baseURL } from '../shared/baseurl';

import { visibility ,expand} from '../animations/app.animation';








@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    visibility(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {
  dish : Dish;

  dishIds: string[];
  prev: string;
  next: string;
  errMess: string;
  testURL = baseURL;


  dishcopy: Dish;
  visibility = 'shown';

  @ViewChild('fform') feedbackFormDirective;

  
  feedbackForm: FormGroup;
  Comment: Comment;



  constructor( private dishService : DishService,private route: ActivatedRoute, private location: Location,
    private fb: FormBuilder,
   // @Inject('baseURL') private baseURL
   ) {
      this.createForm();
     }

  ngOnInit(): void {
   // this.dish = this.dishService.getDish(id);
/*
   let id =this.route.snapshot.params['id'];

   this.dishService.getDish(id).subscribe(dish=>  this.dish =dish )
   
*/
/*
this.createForm();
   this.dishService.getDishIds()
   .subscribe((dishIds) => this.dishIds = dishIds); 
    
  this.route.params
   .pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
   .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
     errmess => this.errMess = <any>errmess );
wihout animation 
 */
this.dishService.getDishIds()
.subscribe((dishIds) => this.dishIds = dishIds); 
this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishService.getDish(+params['id']); }))
.subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
  errmess => this.errMess = <any>errmess);

  }

  goBack(): void{
    this.location.back();
  }


  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  formErrors = {
    'rating': '',
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'rating': {
      'required':      'rating is required.',
      'pattern':       'rating must contain only numbers.'
    },
    'author': {
      'required':      'Author Name is required.',
      'minlength':     'Author Name must be at least 2 characters long.',
      'maxlength':     'Author Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'Comment is required.',
      'minlength':     'comment must be at least 2 characters long.',
    },
  
  };


//  Form part 
  createForm() {
    this.feedbackForm = this.fb.group({
     // rating: ['', [Validators.required, Validators.pattern] ],
     rating : 3,
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
     comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
     date : Date.now()
     
    });
    this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

  this.onValueChanged(); // (re)set validation messages now
  }


  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.Comment = this.feedbackForm.value;
    console.log(this.Comment);
    
    //put
    this.dishcopy.comments.push(this.Comment);
    this.dishService.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });


    this.feedbackForm.reset({
      rating:1,
      author: '',
      comment: '',

    });
    this.feedbackFormDirective.resetForm();
  }





    autoTicks = true;
    disabled = false;
    invert = false;
    max = 5;
    min = 1;
    showTicks = true;
    step = 1;
    thumbLabel = true;
    value = 1;
    vertical = false;
    tickInterval = 1;
  
    getSliderTickInterval(): number | 'auto' {
      if (this.showTicks) {
        return this.autoTicks ? 'auto' : this.tickInterval;
      }
  
      return 0;
    }
}
