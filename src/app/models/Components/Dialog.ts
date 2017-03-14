export class Dialog {
  bodyComponent: any;
  dialogInstance: string[];
  dialogInstanceValue: any[];

  constructor(bodyComponent, dialogInstance, dialogInstanceValue) {
    this.bodyComponent = bodyComponent;
    this.dialogInstance = dialogInstance;
    this.dialogInstanceValue = dialogInstanceValue;
  }
}
