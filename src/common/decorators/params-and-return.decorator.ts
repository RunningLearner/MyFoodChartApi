import 'reflect-metadata';
import { inspect } from 'util';

export function LogParamsAndReturn(): MethodDecorator {
  return function (target, propertyName, descriptor: PropertyDescriptor) {
    const className = target.constructor.name;
    const originalMethod = descriptor.value;

    const safeStringify = (obj: any): string => {
      return inspect(obj, { depth: null });
    };

    descriptor.value = function (...args: any[]) {
      let methodArgs;

      if (className.includes('Controller')) {
        const reqIndex = args.findIndex(
          (arg) => arg && typeof arg === 'object' && 'body' in arg,
        );
        methodArgs = reqIndex >= 0 ? args[reqIndex].body : null;
      } else {
        methodArgs = args;
      }

      if (this.logger) {
        this.logger.info(
          `${className} ${propertyName.toString()} 호출. Args: [${safeStringify(
            methodArgs,
          )}]`,
        );
      }

      const result = originalMethod.apply(this, args);

      if (this.logger) {
        this.logger.info(`${className} ${propertyName.toString()} 완료.`);
      }

      return result;
    };
    return descriptor;
  };
}
