import BaseClass from './BaseClass';
import { logFunction } from './logger';

/**
 * @classdesc 各Sectionが持つ属性のクラス．
 * @extends BaseClass
 * @prop {string} name
 * @prop {string} jsonKey
 * @prop {Text} text
 * @prop {Img} img
 *
 * @prop {function} applyTo
 */
export default class Attribute extends BaseClass {
  [key: string]: any;
  name: string;
  jsonKey: string;
  text: Text;
  img: Img;

  constructor(name = '', jsonKey = '', text = new Text(), img = new Img()) {
    super();
    this.name = name;
    this.jsonKey = jsonKey;
    this.text = text;
    this.img = img;
  }

  /** @override */
  applyTo<T>(inObj: Record<string, any>, newCls: T): T {
    inObj.text = new Text().applyTo<Text>(inObj.text, new Text());
    inObj.img = new Img().applyTo<Img>(inObj.img, new Img());

    return super.applyTo<T>(inObj, newCls);
  }
}

/**
 * @classdesc 各Attributeが持つ文字列表示に関するクラス．
 * @extends BaseClass
 * @prop {boolean} need
 * @prop {boolean} size
 *
 * @prop {function} applyTo
 */
class Text extends BaseClass {
  [key: string]: any;
  need: boolean;
  size: string;
  constructor(need = true, size = 'medium') {
    super();
    this.need = need;
    this.size = size;
  }
}

/**
 * @classdesc 各Attributeが持つ画像表示に関するクラス．
 * @extends BaseClass
 * @prop {boolean} need
 * @prop {boolean} size
 *
 * @prop {function} applyTo
 */
class Img extends BaseClass {
  [key: string]: any;
  need: boolean;
  width: number;
  height: number;
  type: string;
  path: string;
  constructor(need = false, width = 50, height = 50, type = '.png', path = './') {
    super();
    this.need = need;
    this.width = width;
    this.height = height;
    this.type = type;
    this.path = path;
  }
}
