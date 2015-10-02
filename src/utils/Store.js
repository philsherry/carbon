import Events from 'events';

class Store extends Events.EventEmitter {

  constructor(Dispatcher, data) {
    super();

    var _store = this;

    this.data = data;

    this.dispatchToken = Dispatcher.register(this.dispatcherCallback);
  }

  addChangeListener = (callback) => {
    this.on('change', callback);
  };

  removeChangeListener = (callback) => {
    this.removeListener('change', callback);
  };

  getState = () => {
    return this.data;
  };

  dispatcherCallback = (action) => {
    var scope = this;
    if (this[action.actionType]) {
      this.promiseFunction(action).then(function(response) {
        console.log("SUCCESS")
        scope.emit('change');
      }, function(error) {
          console.error("Failed!", error);
      });

    }
  }

  promiseFunction = (action) => {
    var scope = this;
    return new Promise( function(resolve, reject) {
      // Requires actions to return a boolean?
      if(scope[action.actionType].call(scope, action)){
        resolve();
      } else {
        reject();
      }
    });
  }
}

export default Store
