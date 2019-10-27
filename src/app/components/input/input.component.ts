import { AfterViewInit, Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
})
export class InputComponent implements AfterViewInit, ControlValueAccessor {

  @ViewChild('input', {static: false}) private input: ElementRef<HTMLInputElement>;
  @Input() public placeholder: string;

  public value: string;

  public constructor() { }

  public ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'input')
      .subscribe(() => {
        this.writeValue(this.input.nativeElement.value);
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
