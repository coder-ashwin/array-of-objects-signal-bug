import { Component, computed, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `
    @for(value of arrayvalue(); track value.name) {
      <input type="checkbox"  [checked]="value.isSelected" (change)="toggleSelect(value)" /> {{ value.name }}
      <br />
    }
    {{ anySelected() }}
  `,
})
export class App {
  name = 'Angular';
  arrayvalue = signal([
    {
      name: 'test1',
      isSelected: false,
    },
    {
      name: 'test2',
      isSelected: false,
    },
    {
      name: 'test3',
      isSelected: false,
    },
  ]);
  anySelected = computed(() =>
    this.arrayvalue().some((value) => value.isSelected)
  );

  public toggleSelect(item: any) {
    console.log(JSON.parse(JSON.stringify(this.arrayvalue())));
    this.arrayvalue.update((arrayvalue) => {
      let index = arrayvalue.findIndex((value) => value.name == item.name);
      arrayvalue[index].isSelected = !arrayvalue[index].isSelected;
      return arrayvalue;
    });
    console.log(JSON.parse(JSON.stringify(this.arrayvalue())));
  }
}

bootstrapApplication(App);
