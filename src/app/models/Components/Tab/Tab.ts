export class Tab {
  id: number;
  iconName: string;
  text: string;
  active: boolean;

  constructor() {
    this.id = undefined;
    this.text = undefined;
    this.iconName = undefined;
    this.active = false;
  }
}
