import { Component, computed, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `
    @for(item of itemList(); track item.name) {
      <input type="checkbox"  [checked]="item.isSelected" (change)="toggleSelect(item)" /> {{ item.name }}
      <br />
    }
    {{ anySelected() }}
  `,
})
export class App {
  name = 'Angular';
  itemList = signal([
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
    this.itemList().some((value) => value.isSelected)
  );

  public toggleSelect(value: any) {
    console.log(JSON.parse(JSON.stringify(this.itemList())));
    this.itemList.update((itemList) => {
      let index = itemList.findIndex(item => value.name == item.name);
      itemList[index].isSelected = !itemList[index].isSelected;
      return itemList;
    });
    console.log(JSON.parse(JSON.stringify(this.itemList())));
  }
}

bootstrapApplication(App);
