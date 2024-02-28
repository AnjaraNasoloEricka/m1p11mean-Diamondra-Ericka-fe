import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

interface Task {
  id: string;
  title: string;
  column: 'todo' | 'in-progress' | 'done';
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {

  isLoading : boolean = false;

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  inProgress = [
    'Take a coffee'
  ];

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
  }

  // The key function to handle drag and drop events
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  /** Prevents dragging items when they're not supposed to be moved */
  shouldDrag(task: Task): boolean {
    // Example: you could add conditions here, like disabling drag for completed tasks
    return true; 
  }

}
