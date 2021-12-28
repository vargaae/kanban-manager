import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class MeasureService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list(
      'measures',
      ref => ref.orderByChild('unit')
    ).snapshotChanges();
  }

}
