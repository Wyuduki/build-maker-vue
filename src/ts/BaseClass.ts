import { reactive } from 'vue';
export default class BaseClass {
  constructReactive<T>(cls: T) {
    return reactive(cls as object);
  }
  /**
   * @description 指定されたキーを反映した初期化．不足した要素はデフォルトの値を入れ，余分な要素は無視する．
   * @param {Record<string, any>} inObj 自分で入力したオブジェクト．
   * @param T newCls
   * @returns {T}
   */
  applyTo<T>(inObj: Record<string, any> = {}, newCls: T): T {
    let result: T = newCls;
    for (const key in result) {
      if (inObj[key] != undefined) {
        result[key] = inObj[key];
      }
    }
    return result;
  }
}
