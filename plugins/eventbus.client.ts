import mitt from "mitt"
const emitter = mitt()
export default defineNuxtPlugin(() => {
    return {
        provide: {
            bus: {
                $on: emitter.on,
                $emit: emitter.emit,
                $off: emitter.off,
            },
        },
    }
})
