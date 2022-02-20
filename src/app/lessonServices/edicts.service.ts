import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { edictItem, executedPerson } from '../lesson1/classStore';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class EdictsService {
  private edictSubject!: BehaviorSubject<edictItem[]>;
  constructor(private httpClient: HttpClient) { }

  // Получение данных
  public searchEdicts(filterString: string): Observable<edictItem[]> {
    let params = {
      params: new HttpParams().set('filterText', filterString)
    }
    this.httpClient.get<edictItem[]>('https://localhost:5001/Edict/SearchEdicts', params)
        .subscribe((item) => {
          this.edictSubject.next(item);
      });
      return this.edictSubject.asObservable();
  }
  public filterEdicts(filterType: string, filterString: string): Observable<edictItem[]> {
    if (!this.edictSubject) {
      this.edictSubject = new BehaviorSubject<edictItem[]>([]); 
    }
    let params = {
      params: new HttpParams().set('filterText', filterString).set('filterType', filterType)
    }
    this.httpClient.get<edictItem[]>('https://localhost:5001/Edict/FilterEdicts', params)
        .subscribe((item) => {          
          this.edictSubject.next(item);
      });
    return this.edictSubject.asObservable();
  }

  public getEdictsAsOberverble(): Observable<edictItem[]>{
    return this.edictSubject.asObservable();
  }

  // Работы с записями
  public addEdict(edictItem: edictItem) {
    if (this.edictSubject) {
      this.httpClient.post('https://localhost:5001/Edict/AddEdict', edictItem)
      .subscribe({
        next: (id) => {
          let edicts = this.edictSubject.getValue();
          edictItem.id = id as number;
          edicts.push(edictItem);
          this.edictSubject.next(edicts);
        },
        error: (error: HttpErrorResponse) => console.log(error.message),
        complete: () => { console.log("Добавлен элемент"); }
      });
    }    
  }

  public updateEdict(edictItem: edictItem) {  
    if (this.edictSubject) {      
      this.httpClient.post('https://localhost:5001/Edict/UpdateEdict', edictItem)
      .subscribe({
        next: () => {
          let edicts = this.edictSubject.getValue();
          let indexUpdatedEdict = edicts.findIndex(e => e.id === edictItem.id);
          edicts[indexUpdatedEdict] = edictItem;
          this.edictSubject.next(edicts);
        },
        error: (error: HttpErrorResponse) => console.log(error.message),
        complete: () => { console.log("Обновлен элемент"); }
      });
    }
    return this.edictSubject.asObservable();
  }

  public removeEdict(edictItem: edictItem) {    
    if (this.edictSubject) {
      let edicts = this.edictSubject.getValue();
      this.httpClient.post('https://localhost:5001/Edict/DeleteEdicts', [edictItem.id])
      .subscribe({
        next: () => {
          this.edictSubject.next(edicts.filter(item => item.id !== edictItem.id));
        },
        error: (error: HttpErrorResponse) => console.log(error.message),
        complete: () => { console.log("Удалены элемент"); }
      });
    }
  }

  public removeEdicts(edictItems: edictItem[]) {
    if (this.edictSubject) {
      let edicts = this.edictSubject.getValue();
      let selectedIds = edicts.filter(item => item.isSelectEdictState).map(item => item.id);
      this.httpClient.post('https://localhost:5001/Edict/DeleteEdicts', selectedIds).subscribe({
        next: () => {
          this.edictSubject.next(edictItems);
        },
        error: (error: HttpErrorResponse) => console.log(error.message),
        complete: () => { console.log("Удалены отмеченные элементы"); }
      });
    }    
  }
}

