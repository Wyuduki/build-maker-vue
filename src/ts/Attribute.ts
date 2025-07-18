export default class Attribute {
  name: string;
  jsonKey: string;
  size: string;
  img: { need: boolean; width: number; height: number };

  constructor(
    name = '',
    jsonKey = '',
    size = 'medium',
    img = { need: false, width: 50, height: 50 },
  ) {
    this.name = name;
    this.jsonKey = jsonKey;
    this.size = size;
    this.img = img;
  }
}
