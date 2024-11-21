import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Subject {
  name: string;
  professor?: string;
  classroom?: string;
  day: string;
  startTime: string;
  endTime: string;
  color?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private subjects = new BehaviorSubject<Subject[]>([]);
  subjects$ = this.subjects.asObservable();

  constructor() {
    const savedSubjects = localStorage.getItem('subjects');
    if (savedSubjects) {
      this.subjects.next(JSON.parse(savedSubjects));
    }
  }

  updateSubjects(subjects: Subject[]) {
    this.subjects.next(subjects);
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }

  getSubjects(): Subject[] {
    return this.subjects.getValue();
  }
}



