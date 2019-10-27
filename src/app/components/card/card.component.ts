import { Component, Input } from '@angular/core';
import { ICard } from '../../models/cardModel';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() public card: ICard;

  public constructor() { }

}
