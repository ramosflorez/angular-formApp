import { Component, OnInit } from '@angular/core';

interface MenuItem {
  title:string;
  route:string;
}

@Component({
  selector: 'shared-sideMenu',
  templateUrl: './sideMenu.component.html',
  styleUrls: ['./sideMenu.component.css']
})
export class SideMenuComponent implements OnInit {

  public reactiveMenu:MenuItem[] = [
    {
      title:'Basicos', route:'./reactive/basic'
    },
    {
      title:'Dinamicos', route:'./reactive/dynamic'
    },
    {
      title:'Switches', route:'./reactive/switches'
    }
  ];

  public authMenu:MenuItem[] = [
    {
      title:'Registro', route:'./auth'
    }
  ];

  constructor() { }

  ngOnInit() {
  }



}
