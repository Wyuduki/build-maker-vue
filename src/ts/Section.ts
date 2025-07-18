import Attribute from './Attribute';
export default class Section {
  name: string;
  attributes: Attribute[];
  constructor(name: string = '', attributes: Attribute[] = []) {
    this.name = name;
    this.attributes = attributes;
  }
}
