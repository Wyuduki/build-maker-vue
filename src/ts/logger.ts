/** functionのグループ(args, retを含む)出力． */
export function logFunction(flagArgs: boolean = true, flagRet: boolean = true) {
  return function (target: Function, context: ClassMethodDecoratorContext) {
    return function (this: any, ...args: any[]) {
      debugObject('logFunction args', target, context);

      console.group('exec <' + context.name.toString() + '>');
      if (flagArgs && args.length > 0) {
        logObject({ args });
      }
      const ret = target.call(this, ...args);
      if (flagRet && ret != undefined) logObject({ ret });
      console.groupEnd();
      return ret;
    };
  };
}

/**
 * objectの出力．
 * @param obj
 * @returns
 */
export function logObject(obj: { [key: string]: any }): void {
  debugObject('logObject args', obj);

  const key: string[] = Object.keys(obj);
  if (key.length != 1) {
    console.warn('引数の指定方法が間違っています。', obj);
    return;
  }
  if (obj[key[0]] == undefined) {
    obj[key[0]] = 'undefined';
  }

  let name: string = JSON.stringify(obj);
  debugObject('name before', name);
  name = name.replace(/^{|"|:.*/g, '');
  debugObject('name after', name);
  const value: any = obj[name] == 'undefined' ? undefined : obj[name];

  console.info(name + ':', value);
  return;
}

export function debugObject(key: string, ...obj: any[]): void {
  let output: any;
  if (obj.length == 1) {
    output = obj[0];
  } else {
    output = obj;
  }
  console.debug(key + ':', output);
  return;
}
