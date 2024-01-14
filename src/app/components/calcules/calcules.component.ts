
import { FormBuilder, FormGroup } from '@angular/forms';
import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-calcules',
  templateUrl: './calcules.component.html',
  styleUrls: ['./calcules.component.css']
})
export class CalculesComponent {

  calculForm: FormGroup = this.formBuilder.group({
    price:[1, []],
    sailorRemu:[1, []],
    fee:[1, []],
    commissionRate:[18, []],
    piceRate:[1, []],
    feeRate:[1, []],
  });
    price: number = 0
    sailorRemu: number = 0
    fee: number = 0
    comRate: number = 0

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {

    this.calculForm.get('price')?.valueChanges.subscribe((val) => {
      this.price = val
      this.fee = Math.ceil(val * this.calculForm.value.commissionRate / (this.calculForm.value.commissionRate + 100))
      this.sailorRemu = val - this.fee
    })
    this.calculForm.get('sailorRemu')?.valueChanges.subscribe((val) => {
      this.sailorRemu = val
      this.price = Math.ceil(val * (this.calculForm.value.commissionRate / 100))
      this.fee = val + this.fee
    })
    this.calculForm.get('fee')?.valueChanges.subscribe((val) => {
      this.fee = val
      this.price = val * (100 + this.calculForm.value.commissionRate) / this.calculForm.value.commissionRate
      this.sailorRemu = this.price - val
    })

    this.calculForm.get('piceRate')?.valueChanges.subscribe((val) => {
      this.price = val;
      this.comRate = val * 100 / (val - this.calculForm.value.feeRate)
      this.sailorRemu = val - this.calculForm.value.feeRate
    })
    this.calculForm.get('feeRate')?.valueChanges.subscribe((val) => {
      this.fee = val;
      this.comRate = val * 100 / (this.calculForm.value.piceRate - val)
      this.sailorRemu = this.calculForm.value.piceRate - val
    })

  }

}
