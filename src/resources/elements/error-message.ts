import { bindable } from 'aurelia-framework';

export class ErrorMessage {
  @bindable
  errMessage: string;
  @bindable
  isError: boolean;
}
