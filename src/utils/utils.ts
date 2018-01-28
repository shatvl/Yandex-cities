class EventEmitter {
    public events: any = {};
    public ymapReady: boolean = false;
    public scriptIsNotAttached: boolean = true;

    constructor() { }

    $on(eventName: string, fn: any) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(fn);

        return () => {
            this.events[eventName] = this.events[eventName].filter((eventFn: any) => fn !== eventFn);
        };
    }

    $emit(eventName: string, data: any = {}) {
        const event = this.events[eventName];
        if (event) {
            event.forEach((fn: any) => fn(data));
        }
    }
}

export const emitter = new EventEmitter();