import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Menu } from '../../models/menu';

@Component({
  selector: 'app-menu-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './menu-form.html',
})
export class MenuFormComponent implements OnChanges {
  @Input() initialMenu: Menu | null = null;
  @Output() save = new EventEmitter<Menu>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      date: ['', Validators.required],
      first_course: ['', Validators.required],
      second_course: ['', Validators.required],
      dessert: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnChanges(): void {
    if (this.initialMenu) {
      this.form.patchValue(this.initialMenu);
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.save.emit(this.form.value as Menu);
  }
}
