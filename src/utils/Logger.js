
class Logger {
  constructor(logFn = console.log) {
    this.logFn = logFn;
    this._init();
  }

  static _name = "LOGGER-";

  _init() {
    const msg = Logger._name + "INIT:: starting session";
    this.logFn('>>>>>>>>>>>>>>>>>>>>>>>>');
    this.log(msg);
  }

  destroy() {
    const msg = Logger._name + "END:: ending session";
    this.logFn(msg);
  }

  log(status) {
    this.logFn(`status:${status}, time:${Date.now()}`);
  }
}

export default Logger;
