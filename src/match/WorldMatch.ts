import { MyClass } from "../MyClass";
import { WorldState } from "./WorldState";

const matchInit = function (ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, params: { [key: string]: string }): { state: WorldState, tickRate: number, label: string } {
    
    const myClass = new MyClass(1);
    logger.info("MY CLASS %s", myClass.getInteger());
    return {
        state: {
        },
        tickRate: 2,
        label: 'World 1'
    }
}

const matchJoinAttempt = function (ctx: nkruntime.Context, logger:
    nkruntime.Logger, nk:
        nkruntime.Nakama, dispatcher:
        nkruntime.MatchDispatcher,
    tick: number,
    state: WorldState,
    presence: nkruntime.Presence,
    metadata: { [key: string]: any }): { state: WorldState, accept: boolean, rejectMessage?: string } | null {
    return {
        state: {
            myClass: new MyClass(100)
        },
        accept: true
    };
}

const matchJoin = function (ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, dispatcher: nkruntime.MatchDispatcher, tick: number, state: WorldState, presences: nkruntime.Presence[]): { state: WorldState } | null {
    return {
        state
    }
}

const matchLeave = function (ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, dispatcher: nkruntime.MatchDispatcher, tick: number, state: WorldState, presences: nkruntime.Presence[]): { state: WorldState } | null {
    
    return {
        state
    }
}

const matchTerminate = function (ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, dispatcher: nkruntime.MatchDispatcher, tick: number, state: WorldState, graceSeconds: number): { state: WorldState } | null {
    return {
        state
    }
}
const matchSignal = function (ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, dispatcher: nkruntime.MatchDispatcher, tick: number, state: WorldState, data: string): { state: WorldState, data?: string } | null {
    return {
        state
    }
}

function InitModule(ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, initializer: nkruntime.Initializer) {
    initializer.registerMatch<WorldState>('worlds', {
        matchInit,
        matchJoinAttempt,
        matchJoin,
        matchLeave,
        matchLoop,
        matchTerminate,
        matchSignal
    });
    nk.matchCreate("worlds", {});
}

const matchLoop = function (ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, dispatcher: nkruntime.MatchDispatcher, tick: number, state: WorldState, messages: nkruntime.MatchMessage[]): { state: WorldState } | null {
    logger.info("state: %s", state.myClass.getInteger());

    return {
        state
    }
}

// Reference InitModule to avoid it getting removed on build
!InitModule && InitModule.bind(null);

