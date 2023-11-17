import 'reflect-metadata';
import { inspect } from 'util';

export function LogParamsAndReturn(): MethodDecorator {
  return function (target, propertyName, descriptor: PropertyDescriptor) {
    const className = target.constructor.name;
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const reqIndex = args.findIndex(
        (arg) => arg && typeof arg === 'object' && 'body' in arg,
      );
      const reqBody = reqIndex >= 0 ? args[reqIndex].body : null;

      if (this.logger) {
        this.logger.info(
          `${className} ${propertyName.toString()} 호출. Args: [${safeStringify(
            reqBody,
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

function safeStringify(obj: any): string {
  return inspect(obj, { depth: null });
}
