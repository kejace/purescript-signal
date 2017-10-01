// module Signal.Eff

exports.mapEffP =
  function mapEffP(channel) {
    return function (send) {
      return function (action) {
        return function () {
          return function (sig) {
            var initial = action(sig.get());
            var chan = channel(initial)();
            sig.subscribe(function (val) {
              send(chan)(action(val)())();
            });
            return chan;
          };
        };
      };
    };
  };
