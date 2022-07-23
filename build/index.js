var MyClass = (function () {
    function MyClass(aInteger) {
        this.aInteger = aInteger;
    }
    MyClass.prototype.getInteger = function () {
        return this.aInteger;
    };
    return MyClass;
}());

var matchInit = function (ctx, logger, nk, params) {
    var myClass = new MyClass(1);
    logger.info("MY CLASS %s", myClass.getInteger());
    return {
        state: {
            myClass: new MyClass(2)
        },
        tickRate: 2,
        label: 'World 1'
    };
};
var matchJoinAttempt = function (ctx, logger, nk, dispatcher, tick, state, presence, metadata) {
    return {
        state: state,
        accept: true
    };
};
var matchJoin = function (ctx, logger, nk, dispatcher, tick, state, presences) {
    return {
        state: state
    };
};
var matchLeave = function (ctx, logger, nk, dispatcher, tick, state, presences) {
    return {
        state: state
    };
};
var matchTerminate = function (ctx, logger, nk, dispatcher, tick, state, graceSeconds) {
    return {
        state: state
    };
};
var matchSignal = function (ctx, logger, nk, dispatcher, tick, state, data) {
    return {
        state: state
    };
};
function InitModule(ctx, logger, nk, initializer) {
    initializer.registerMatch('worlds', {
        matchInit: matchInit,
        matchJoinAttempt: matchJoinAttempt,
        matchJoin: matchJoin,
        matchLeave: matchLeave,
        matchLoop: matchLoop,
        matchTerminate: matchTerminate,
        matchSignal: matchSignal
    });
    nk.matchCreate("worlds", {});
}
var matchLoop = function (ctx, logger, nk, dispatcher, tick, state, messages) {
    logger.info("state: %s", state.myClass.getInteger());
    return {
        state: state
    };
};
!InitModule && InitModule.bind(null);
