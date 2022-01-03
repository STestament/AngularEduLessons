import { Pipe, PipeTransform } from '@angular/core';
import { edictItem, executedPerson } from '../lesson1/classStore';

@Pipe({
  name: 'executorTypePipe'
})
export class ExecutorTypePipePipe implements PipeTransform {

  transform(person: edictItem): string {
    let typePerson = person.executedPerson;
    let typeOfPerson = "-";
    switch (typePerson as executedPerson) {
      case executedPerson.Advisor: typeOfPerson = "С"; break;
      case executedPerson.CityBuilder: typeOfPerson = "Г"; break;
      case executedPerson.Spy: typeOfPerson = "Ш"; break;      
      case executedPerson.WarChief: typeOfPerson = "В"; break;
      case executedPerson.Unassigned: typeOfPerson = "-"; break;
      default: typeOfPerson = "-"; break;
    }
    return '['+typeOfPerson+']';
  }
}
