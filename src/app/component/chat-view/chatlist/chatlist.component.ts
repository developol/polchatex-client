import { Component, OnInit } from '@angular/core';
import {mockupDateSent, mockupUsers} from "../../../mockup";

@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.css']
})
export class ChatlistComponent implements OnInit {
  dateSent = mockupDateSent;
  users = mockupUsers;
  constructor() { }

  ngOnInit() {
  }

  test() {
    console.log("dupa");
  }

}
