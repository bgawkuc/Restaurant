import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  public currency = 'USD';

  constructor() { }
}