import EventEmitter from 'node:events';

export class TypedEventEmitter<Events extends Record<PropertyKey, unknown[]>> extends EventEmitter {
  public declare on: <K extends keyof Events>(
    eventName: K,
    listener: (...args: Events[K]) => void
  ) => this;

  public declare emit: <K extends keyof Events>(
    eventName: K,
    ...args: Events[K]
  ) => boolean;
}
