import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.css']
})
export class ChatlistComponent implements OnInit {
  messages: any[] = [
    {
      "name": "Douglas  Pace"
    },
    {
      "name": "Mcleod  Mueller"
    },
    {
      "name": "Day  Meyers"
    },
    {
      "name": "Aguirre  Ellis"
    },
    {
      "name": "Cook  Tyson"
    },
    {
      "name": "Cook  Tyson"
    },
    {
      "name": "Cook  Tyson"
    },
    {
      "name": "Cook  Tyson"
    },
    {
      "name": "Cook  Tyson"
    }
  ];
  dateSent: String = "pon 14:37";

  constructor() { }

  ngOnInit() {
  }

  test() {
    console.log("dupa");
  }

}
