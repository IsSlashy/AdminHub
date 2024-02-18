import { Injectable } from '@angular/core';

export interface Port {
  Port: string;
  'Région/place': string;
  Algo: string;
  Variable: string;
  'Prix journaliers': string;
}

@Injectable({
  providedIn: 'root',
})
export class PortService {
  private ports: Port[] = [
    {
      Port: 'Port1',
      'Région/place': 'Région1',
      Algo: 'Algo1',
      Variable: 'Variable1',
      'Prix journaliers': '100€',
    },
    {
      Port: 'Port2',
      'Région/place': 'Région2',
      Algo: 'Algo2',
      Variable: 'Variable2',
      'Prix journaliers': '200€',
    },
  ];

  getPorts(): Port[] {
    return this.ports;
  }
}
