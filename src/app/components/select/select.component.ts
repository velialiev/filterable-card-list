import { AfterViewInit, Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
})
export class SelectComponent implements AfterViewInit, ControlValueAccessor {

  @ViewChild('select', {static: false}) private select: ElementRef<HTMLSelectElement>;
  @Input() public options: string[];
  @Input() public baseOption: string;

  public value: string;

  public constructor() { }

  public ngAfterViewInit(): void {
    fromEvent(this.select.nativeElement, 'input')
      .subscribe(() => {
        this.writeValue(this.select.nativeElement.value);
      });
  }

  public writeValue(value: string): void {
    this.value = value;

    this.onChange(value);
    this.onTouched();
  }

  private onChange = (value: string) => {};
  private onTouched = () => {};

  public registerOnChange(fn: (value: string) => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }
}
