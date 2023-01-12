import { Component } from '@angular/core';
import { faSimCard, faCoins } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  simCard = faSimCard;
  coins = faCoins;
  constructor() {

  }

}
