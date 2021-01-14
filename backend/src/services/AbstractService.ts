export default abstract class AbstractService {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract async load(): Promise<boolean>;
}
