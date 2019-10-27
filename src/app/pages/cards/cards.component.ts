import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards/cards.service';
import { ICard } from '../../models/cardModel';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  public categorizedCards$: Observable<ICategorizedCards>;
  public filteredCategorizedCards$: Observable<ICategorizedCards>;
  public objectKeys = Object.keys;
  public isCategoryShown: { [key: string]: boolean } = {};

  public filtersForm: FormGroup;
  private activatedFilters: any = {};

  public constructor(private cardsService: CardsService, private fb: FormBuilder) {
  }

  public ngOnInit() {
    this.createFiltersForm();

    this.filtersForm.valueChanges.subscribe(val => {
      this.activatedFilters = val;
      this.filter(this.activatedFilters);
    });

    this.categorizedCards$ = this.cardsService
      .getCards()
      .pipe(
        map(res => {
          const categorizedCards = {};
          res.forEach(card => {
            try {
              categorizedCards[card.category].push(card);
            } catch {
              categorizedCards[card.category] = [card];
            }
          });

          return categorizedCards;
        }),
        shareReplay(1)
      );
    this.filteredCategorizedCards$ = this.categorizedCards$;
  }

  private createFiltersForm(): void {
    this.filtersForm = this.fb.group({
      category: [''],
      language: [''],
      level: [''],
      search: [''],
    });
  }

  private filter(filters: any) {
    Object.keys(filters).forEach(filterName => {
      if (filterName === 'category') {
        this.filteredCategorizedCards$ = this.categorizedCards$
          .pipe(
            map(cards => {
              if (!filters[filterName]) {
                return cards;
              }
              return { [filters[filterName]]: cards[filters[filterName]] };
            })
          );
      } else if (filterName === 'search') {
        this.filteredCategorizedCards$ = this.filteredCategorizedCards$
          .pipe(
            map(cards => {
              if (!filters[filterName]) {
                return cards;
              }

              const filteredCards = {};
              Object.keys(cards)
                .forEach(key => filteredCards[key] = cards[key]
                  .filter(card => card.text.toLowerCase().includes(filters[filterName].toLowerCase())));

              return filteredCards;
            })
          );
      } else {
        this.filteredCategorizedCards$ = this.filteredCategorizedCards$
          .pipe(
            map(cards => {
              if (!filters[filterName]) {
                return cards;
              }

              const filteredCards = {};
              Object.keys(cards)
                .forEach(key => filteredCards[key] = cards[key]
                  .filter(card => card[filterName] === filters[filterName]));

              return filteredCards;
            })
          );
      }
    });
  }

  public selectCard(id: number | string) {
    // coming soon
  }
}

interface ICategorizedCards {
  [key: string]: ICard[];
}
