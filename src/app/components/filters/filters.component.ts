import { Component, Input, OnInit } from '@angular/core';
import { FiltersService } from '../../services/filters/filters.service';
import { Observable } from 'rxjs';
import { IFilters } from '../../models/filtersModel';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input() public filtersForm: FormGroup;
  public filters$: Observable<IFilters>;

  public constructor(private filtersService: FiltersService) { }

  public ngOnInit() {
    this.filters$ = this.filtersService.getCardsFilters();
  }

}
