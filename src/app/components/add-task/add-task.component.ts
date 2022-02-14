import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { from, of } from 'rxjs';
import { TaskItemComponent } from '../task-item/task-item.component';
import { UiService } from 'src/app/services/ui.service';
import {Task} from '../../Task';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text!: string;
  day!: string;
  reminder:boolean = false;
  showAddTask: boolean = false;
  subscription: Subscription = new Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe((value => this.showAddTask = value));
  }

  ngOnInit(): void {
  }

  onSubmit(){
    alert(this.text);
    if(!this.text){
      alert('Please add a task!');
      return;
    }

    const newTask = {
      text: this.text,
      day: this.day || "",
      reminder: this.reminder,
    };

    //@todo-emit-events
    this.onAddTask.emit(newTask);

    this.text = "";
    this.day = "";
    this.reminder = false;
  }

}
