export class Timer {
  lastUpdate: number = 0;
  isRunning: boolean = false;
  delay: number = 0;
  callback: () => void;

  public constructor(callback: () => void, delay: number) {
    this.callback = callback;
    this.delay = delay;
    this.loop();
  }

  private loop() {
    requestAnimationFrame(() => {
      const now = Date.now();
      if (!this.isRunning) {
        this.lastUpdate = now;
        this.loop();
      } else {
        const elapsed = now - this.lastUpdate;
        // console.log(`elapsed: ${elapsed}`);
        if (this.lastUpdate === null || elapsed > this.delay) {
          this.callback();
          this.lastUpdate = now - (elapsed % this.delay);
        }
        this.loop();
      }
    });
  }

  start() {
    if (this.isRunning) {
      return;
    }
    this.lastUpdate = Date.now();
    this.isRunning = true;
  }

  stop() {
    this.isRunning = false;
  }

  reset(newDelay: number) {
    this.lastUpdate = Date.now();
    this.delay = newDelay;
    this.start();
  }

  resetForward(newDelay: number) {
    this.callback();
    this.delay = newDelay;
    this.lastUpdate = Date.now();
    this.start();
  }
}
