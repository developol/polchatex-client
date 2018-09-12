import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: any[] = [{
  "content": "This is some text within a card body.",
    "class": "sent-message"
},
{
  "content": "This is some text within a card body.",
  "class": "sent-message"
},
{
  "content": "This is some text within a card body.",
  "class": "received-message"
},
{
  "content": "This is some text within a card body.",
  "class": "sent-message"
},
{
  "content": "This",
  "class": "sent-message"
},
{
  "content": "This xD",
  "class": "received-message"
},
{
  "content": "This is some text within a card body.",
  "class": "received-message"
},
{
  "content": "This is some text within a card body. \"class\": background-color: #ffedda; background-color: #ffedda; background-color: #ffedda; background-color: #ffedda; background-color: #ffedda; background-color: #ffedda;\"sent-message\" \"class\": \"sent-message\" \"class\": \"sent-message\" \"class\": \"sent-message\"This is some text within a card body.",
  "class": "received-message"
},
{
  "content": "This is some text within a card body. This is some text within a card body. This is some text within a card body. This is some text within a card body. This is some text within a card body.",
  "class": "sent-message"
},
    {
      "content": "This xD",
      "class": "received-message"
    },
    {
      "content": "This is some text within a card body.",
      "class": "received-message"
    },
    {
      "content": "This is some text within a card body. \"class\": background-color: #ffedda; background-color: #ffedda; background-color: #ffedda; background-color: #ffedda; background-color: #ffedda; background-color: #ffedda;\"sent-message\" \"class\": \"sent-message\" \"class\": \"sent-message\" \"class\": \"sent-message\"This is some text within a card body.",
      "class": "received-message"
    },
    {
      "content": "This is some text within a card body. This is some text within a card body. This is some text within a card body. This is some text within a card body. This is some text within a card body.",
      "class": "sent-message"
    },
    {
      "content": "This xD",
      "class": "received-message"
    },
    {
      "content": "This is some text within a card body.",
      "class": "received-message"
    },
    {
      "content": "This is some text within a card body. \"class\": background-color: #ffedda; background-color: #ffedda; background-color: #ffedda; background-color: #ffedda; background-color: #ffedda; background-color: #ffedda;\"sent-message\" \"class\": \"sent-message\" \"class\": \"sent-message\" \"class\": \"sent-message\"This is some text within a card body.",
      "class": "received-message"
    },
    {
      "content": "This is some text within a card body. This is some text within a card body. This is some text within a card body. This is some text within a card body. This is some text within a card body.",
      "class": "sent-message"
    }
];

  constructor() { }

  ngOnInit() {
  }

}
