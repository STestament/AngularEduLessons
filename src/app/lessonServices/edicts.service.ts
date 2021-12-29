import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { edictItem, executedPerson } from '../lesson1/classStore';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

type edictFromServer = {
  id: number,
  header: string,
  description: string,
  dayOfComplete: number,
  executedPerson: executedPerson    
}

@Injectable({
  providedIn: 'root'
})
export class EdictsService {
  private edictSubject!: BehaviorSubject<edictItem[]>;
  constructor(private httpClient: HttpClient) { }

  public getEdicts(): Observable<edictItem[]>{
    if (!this.edictSubject) {
      this.edictSubject = new BehaviorSubject<edictItem[]>([]);
    }
    this.httpClient.post<edictItem[]>('https://localhost:5001/Edict/GetEdicts', null)
    .pipe(
      map(item => this.convertToEdictItem(item))
    ).subscribe((item) => {
      this.edictSubject.next(item);
    });
    return this.edictSubject.asObservable();
  }

  private convertToEdictItem(items: edictFromServer[]): edictItem[] {
    return items.map(x => {
      return {
        id: x.id,
        header: x.header,
        description: x.description,
        dayOfComplete: x.dayOfComplete,
        isSelectEdictState: false,
        executedPerson: executedPerson.WarChief
      };
    });
  }

  public addEdict(edictItem: edictItem) {
    if (this.edictSubject) {
      this.httpClient.post('https://localhost:5001/Edict/AddEdict', edictItem).subscribe({
        next: () => {
          let edicts = this.edictSubject.getValue();
          edicts.push(edictItem);
          this.edictSubject.next(edicts);
        },
        error: (error: HttpErrorResponse) => console.log(error.message),
        complete: () => { console.log("add complete"); }
      });
    }    
  }

  public updateEdict(edictItem: edictItem) {  
    if (this.edictSubject) {
      
      this.httpClient.post('https://localhost:5001/Edict/UpdateEdict', edictItem).subscribe({
        next: () => {
          let edicts = this.edictSubject.getValue();
          let indexUpdatedEdict = edicts.findIndex(e => e.id === edictItem.id);
          edicts[indexUpdatedEdict] = edictItem;
          this.edictSubject.next(edicts);
        },
        error: (error: HttpErrorResponse) => console.log(error.message),
        complete: () => { console.log("update complete"); }
      });
    }
  }

  public removeEdict(edictItem: edictItem) {    
    if (this.edictSubject) {
      let edicts = this.edictSubject.getValue();
      this.httpClient.post('https://localhost:5001/Edict/DeleteEdicts', [edictItem.id]).subscribe({
        next: () => {
          this.edictSubject.next(edicts.filter(item => item.id !== edictItem.id));
        },
        error: (error: HttpErrorResponse) => console.log(error.message),
        complete: () => { console.log("delete complete"); }
      });
    }
  }

  public removeEdictAllSelectedEdict(edictItems: edictItem[]) {
    if (this.edictSubject) {
      let edicts = this.edictSubject.getValue();
      let selectedIds = edicts.filter(item => item.isSelectEdictState).map(item => item.id);
      this.httpClient.post('https://localhost:5001/Edict/DeleteEdicts', selectedIds).subscribe({
        next: () => {
          this.edictSubject.next(edictItems.filter(item => !item.isSelectEdictState));
        },
        error: (error: HttpErrorResponse) => console.log(error.message),
        complete: () => { console.log("all delete complete"); }
      });
    }
    
  }
}

