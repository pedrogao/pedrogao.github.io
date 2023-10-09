import { Timer } from "./timer";

export class Network {
  channelMap: Map<string, Channel>;
  delay: number;
  enable: boolean;

  public constructor(delay: number = 300, enable: boolean = true) {
    this.channelMap = new Map();
    this.delay = delay;
    this.enable = enable;
  }

  public createChannel(name: string): Channel {
    const channel = new Channel(name, this);
    this.channelMap.set(name, channel);
    return channel;
  }

  public getChannel(name: string): Channel | undefined {
    return this.channelMap.get(name);
  }

  public removeChannel(name: string): void {
    this.channelMap.delete(name);
  }

  public setDelay(i: number) {
    this.delay = i;
  }

  public setEnable(b: boolean) {
    this.enable = b;
  }

  public getEnable() {
    return this.enable;
  }
}

export type ReceiveCb = (message: string) => {};

export class Channel {
  name: string;
  network: Network;
  buffer: string[];
  timer: Timer;
  receiveCbs: ReceiveCb[];

  public constructor(name: string, network: Network) {
    this.name = name;
    this.network = network;
    this.buffer = [];
    this.receiveCbs = [];
    // const delay = this.network.delay;
    this.timer = new Timer(() => {
      const message = this.buffer.shift();
      // console.log(`Channel ${this.name} received message: ${message}`);
      if (
        message !== undefined &&
        message !== null &&
        this.network.getEnable()
      ) {
        this.receiveCbs.forEach((cb) => {
          cb(message);
        });
      }
    }, this.network.delay);
    this.timer.start();
  }

  public send(channelName: string, message: string) {
    const channel = this.network.getChannel(channelName);
    if (channel) {
      channel.write(message);
    } else {
      throw new Error(`Channel ${channelName} not found`);
    }
  }

  public broadcast(message: string) {
    for (const [name, channel] of this.network.channelMap.entries()) {
      if (name === this.name) {
        continue;
      }
      // console.log(`${this.name} Channel ${name} broadcast message: ${message}`);
      channel.write(message);
    }
  }

  public receive(cb: ReceiveCb): void {
    this.receiveCbs.push(cb);
  }

  public write(message: string) {
    // console.log(`Channel ${this.name} wrote message: ${message}`);
    setTimeout(() => {
      this.buffer.push(message);
    }, this.network.delay);
  }
}

export const defaultNetwork = new Network();
