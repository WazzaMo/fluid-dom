

export class Option<T> {
  private value: T | null;

  constructor(_value ?: T) {
    if (_value) {
      this.value = _value;
    } else {
      this.value = null;
    }
  }

  get Value() : T {
    return <T> this.value;
  }

  get isValid() : boolean {
    return !! this.value;
  }
}