import BaseClass from './BaseClass';

export default class Project extends BaseClass {
  [key: string]: any;
  projectName: string;
  dataName: string;
  constructor(projectName: string = '', dataName: string = '') {
    super();
    this.projectName = projectName;
    this.dataName = dataName;
  }
}
