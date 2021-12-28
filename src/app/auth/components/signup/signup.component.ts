import { Signup } from './../../models/signup';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signup: Signup={} as Signup;

  constructor() { }

  ngOnInit(): void {
  }

  onSignUp(signup: Signup) {
    const email = this.signup.email;
    const password = this.signup.password;
    // let order = {
      //   userId: this.userId,
      //   datePlaced: new Date().getTime(),
      //   shipping: this.shipping,
      //   items: this.cart.items.map(i => {
      //     return {
      //       product: {
      //         title: i.title,
      //         imageUrl: i.imageUrl,
      //         price: i.price
      //       },
      //       quantity: i.quantity,
      //       totalPrice: i.totalPrice
      //     }
  }

}
