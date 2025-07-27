import Attribute from './Attribute';
import BaseClass from './BaseClass';

export default class Section extends BaseClass {
  [key: string]: any;

  name: string;
  dataKey: string;
  row: number;
  column: number;
  attributes: Attribute[];
  constructor(
    name: string = '',
    dataKey: string = '',
    attributes: Attribute[] = [],
    row: number = 1,
    column: number = 1,
  ) {
    super();
    this.name = name;
    this.dataKey = dataKey;
    this.row = row;
    this.column = column;
    this.attributes = attributes;
  }

  /** @override */
  applyTo<T>(inObj: Record<string, any>, newCls: T): T {
    const tmpAttrs: Attribute[] = structuredClone(inObj.attributes) as Attribute[];
    inObj.attributes = [];
    for (const attr of tmpAttrs) {
      inObj.attributes.push(new Attribute().applyTo<Attribute>(attr, new Attribute()));
    }

    return super.applyTo<T>(inObj, newCls);
  }
}
