import {Salary} from './Salary';

export class Employee {

  totalHours: number;
  firstName: string;
  lastName: string;
  salary: Salary;
  working: boolean;
  public constructor(totalHours: number,
                     firstName: string,
                     lastName: string,
                     salary: Salary,
                     working: boolean) {
                       this.totalHours = totalHours;
                       this.firstName = firstName;
                       this.lastName = lastName;
                       this.salary = salary;
                       this.working = working;
                     }


}
