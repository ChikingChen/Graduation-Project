if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = { ...defaultSettings };
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e) {
          }
          currentSettings = value;
        }
      };
      hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
        if (pluginId === this.plugin.id) {
          this.fallbacks.setSettings(value);
        }
      });
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && pluginDescriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(pluginDescriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
   * vuex v4.1.0
   * (c) 2022 Evan You
   * @license MIT
   */
  var storeKey = "store";
  function forEachValue(obj, fn) {
    Object.keys(obj).forEach(function(key) {
      return fn(obj[key], key);
    });
  }
  function isObject(obj) {
    return obj !== null && typeof obj === "object";
  }
  function isPromise(val) {
    return val && typeof val.then === "function";
  }
  function assert(condition, msg) {
    if (!condition) {
      throw new Error("[vuex] " + msg);
    }
  }
  function partial(fn, arg) {
    return function() {
      return fn(arg);
    };
  }
  function genericSubscribe(fn, subs, options) {
    if (subs.indexOf(fn) < 0) {
      options && options.prepend ? subs.unshift(fn) : subs.push(fn);
    }
    return function() {
      var i = subs.indexOf(fn);
      if (i > -1) {
        subs.splice(i, 1);
      }
    };
  }
  function resetStore(store2, hot) {
    store2._actions = /* @__PURE__ */ Object.create(null);
    store2._mutations = /* @__PURE__ */ Object.create(null);
    store2._wrappedGetters = /* @__PURE__ */ Object.create(null);
    store2._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
    var state = store2.state;
    installModule(store2, state, [], store2._modules.root, true);
    resetStoreState(store2, state, hot);
  }
  function resetStoreState(store2, state, hot) {
    var oldState = store2._state;
    var oldScope = store2._scope;
    store2.getters = {};
    store2._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
    var wrappedGetters = store2._wrappedGetters;
    var computedObj = {};
    var computedCache = {};
    var scope = vue.effectScope(true);
    scope.run(function() {
      forEachValue(wrappedGetters, function(fn, key) {
        computedObj[key] = partial(fn, store2);
        computedCache[key] = vue.computed(function() {
          return computedObj[key]();
        });
        Object.defineProperty(store2.getters, key, {
          get: function() {
            return computedCache[key].value;
          },
          enumerable: true
          // for local getters
        });
      });
    });
    store2._state = vue.reactive({
      data: state
    });
    store2._scope = scope;
    if (store2.strict) {
      enableStrictMode(store2);
    }
    if (oldState) {
      if (hot) {
        store2._withCommit(function() {
          oldState.data = null;
        });
      }
    }
    if (oldScope) {
      oldScope.stop();
    }
  }
  function installModule(store2, rootState, path, module, hot) {
    var isRoot = !path.length;
    var namespace = store2._modules.getNamespace(path);
    if (module.namespaced) {
      if (store2._modulesNamespaceMap[namespace] && true) {
        console.error("[vuex] duplicate namespace " + namespace + " for the namespaced module " + path.join("/"));
      }
      store2._modulesNamespaceMap[namespace] = module;
    }
    if (!isRoot && !hot) {
      var parentState = getNestedState(rootState, path.slice(0, -1));
      var moduleName = path[path.length - 1];
      store2._withCommit(function() {
        {
          if (moduleName in parentState) {
            console.warn(
              '[vuex] state field "' + moduleName + '" was overridden by a module with the same name at "' + path.join(".") + '"'
            );
          }
        }
        parentState[moduleName] = module.state;
      });
    }
    var local = module.context = makeLocalContext(store2, namespace, path);
    module.forEachMutation(function(mutation, key) {
      var namespacedType = namespace + key;
      registerMutation(store2, namespacedType, mutation, local);
    });
    module.forEachAction(function(action, key) {
      var type = action.root ? key : namespace + key;
      var handler = action.handler || action;
      registerAction(store2, type, handler, local);
    });
    module.forEachGetter(function(getter, key) {
      var namespacedType = namespace + key;
      registerGetter(store2, namespacedType, getter, local);
    });
    module.forEachChild(function(child, key) {
      installModule(store2, rootState, path.concat(key), child, hot);
    });
  }
  function makeLocalContext(store2, namespace, path) {
    var noNamespace = namespace === "";
    var local = {
      dispatch: noNamespace ? store2.dispatch : function(_type, _payload, _options) {
        var args = unifyObjectStyle(_type, _payload, _options);
        var payload = args.payload;
        var options = args.options;
        var type = args.type;
        if (!options || !options.root) {
          type = namespace + type;
          if (!store2._actions[type]) {
            console.error("[vuex] unknown local action type: " + args.type + ", global type: " + type);
            return;
          }
        }
        return store2.dispatch(type, payload);
      },
      commit: noNamespace ? store2.commit : function(_type, _payload, _options) {
        var args = unifyObjectStyle(_type, _payload, _options);
        var payload = args.payload;
        var options = args.options;
        var type = args.type;
        if (!options || !options.root) {
          type = namespace + type;
          if (!store2._mutations[type]) {
            console.error("[vuex] unknown local mutation type: " + args.type + ", global type: " + type);
            return;
          }
        }
        store2.commit(type, payload, options);
      }
    };
    Object.defineProperties(local, {
      getters: {
        get: noNamespace ? function() {
          return store2.getters;
        } : function() {
          return makeLocalGetters(store2, namespace);
        }
      },
      state: {
        get: function() {
          return getNestedState(store2.state, path);
        }
      }
    });
    return local;
  }
  function makeLocalGetters(store2, namespace) {
    if (!store2._makeLocalGettersCache[namespace]) {
      var gettersProxy = {};
      var splitPos = namespace.length;
      Object.keys(store2.getters).forEach(function(type) {
        if (type.slice(0, splitPos) !== namespace) {
          return;
        }
        var localType = type.slice(splitPos);
        Object.defineProperty(gettersProxy, localType, {
          get: function() {
            return store2.getters[type];
          },
          enumerable: true
        });
      });
      store2._makeLocalGettersCache[namespace] = gettersProxy;
    }
    return store2._makeLocalGettersCache[namespace];
  }
  function registerMutation(store2, type, handler, local) {
    var entry = store2._mutations[type] || (store2._mutations[type] = []);
    entry.push(function wrappedMutationHandler(payload) {
      handler.call(store2, local.state, payload);
    });
  }
  function registerAction(store2, type, handler, local) {
    var entry = store2._actions[type] || (store2._actions[type] = []);
    entry.push(function wrappedActionHandler(payload) {
      var res = handler.call(store2, {
        dispatch: local.dispatch,
        commit: local.commit,
        getters: local.getters,
        state: local.state,
        rootGetters: store2.getters,
        rootState: store2.state
      }, payload);
      if (!isPromise(res)) {
        res = Promise.resolve(res);
      }
      if (store2._devtoolHook) {
        return res.catch(function(err) {
          store2._devtoolHook.emit("vuex:error", err);
          throw err;
        });
      } else {
        return res;
      }
    });
  }
  function registerGetter(store2, type, rawGetter, local) {
    if (store2._wrappedGetters[type]) {
      {
        console.error("[vuex] duplicate getter key: " + type);
      }
      return;
    }
    store2._wrappedGetters[type] = function wrappedGetter(store3) {
      return rawGetter(
        local.state,
        // local state
        local.getters,
        // local getters
        store3.state,
        // root state
        store3.getters
        // root getters
      );
    };
  }
  function enableStrictMode(store2) {
    vue.watch(function() {
      return store2._state.data;
    }, function() {
      {
        assert(store2._committing, "do not mutate vuex store state outside mutation handlers.");
      }
    }, { deep: true, flush: "sync" });
  }
  function getNestedState(state, path) {
    return path.reduce(function(state2, key) {
      return state2[key];
    }, state);
  }
  function unifyObjectStyle(type, payload, options) {
    if (isObject(type) && type.type) {
      options = payload;
      payload = type;
      type = type.type;
    }
    {
      assert(typeof type === "string", "expects string as the type, but found " + typeof type + ".");
    }
    return { type, payload, options };
  }
  var LABEL_VUEX_BINDINGS = "vuex bindings";
  var MUTATIONS_LAYER_ID = "vuex:mutations";
  var ACTIONS_LAYER_ID = "vuex:actions";
  var INSPECTOR_ID = "vuex";
  var actionId = 0;
  function addDevtools(app, store2) {
    setupDevtoolsPlugin(
      {
        id: "org.vuejs.vuex",
        app,
        label: "Vuex",
        homepage: "https://next.vuex.vuejs.org/",
        logo: "https://vuejs.org/images/icons/favicon-96x96.png",
        packageName: "vuex",
        componentStateTypes: [LABEL_VUEX_BINDINGS]
      },
      function(api) {
        api.addTimelineLayer({
          id: MUTATIONS_LAYER_ID,
          label: "Vuex Mutations",
          color: COLOR_LIME_500
        });
        api.addTimelineLayer({
          id: ACTIONS_LAYER_ID,
          label: "Vuex Actions",
          color: COLOR_LIME_500
        });
        api.addInspector({
          id: INSPECTOR_ID,
          label: "Vuex",
          icon: "storage",
          treeFilterPlaceholder: "Filter stores..."
        });
        api.on.getInspectorTree(function(payload) {
          if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
            if (payload.filter) {
              var nodes = [];
              flattenStoreForInspectorTree(nodes, store2._modules.root, payload.filter, "");
              payload.rootNodes = nodes;
            } else {
              payload.rootNodes = [
                formatStoreForInspectorTree(store2._modules.root, "")
              ];
            }
          }
        });
        api.on.getInspectorState(function(payload) {
          if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
            var modulePath = payload.nodeId;
            makeLocalGetters(store2, modulePath);
            payload.state = formatStoreForInspectorState(
              getStoreModule(store2._modules, modulePath),
              modulePath === "root" ? store2.getters : store2._makeLocalGettersCache,
              modulePath
            );
          }
        });
        api.on.editInspectorState(function(payload) {
          if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
            var modulePath = payload.nodeId;
            var path = payload.path;
            if (modulePath !== "root") {
              path = modulePath.split("/").filter(Boolean).concat(path);
            }
            store2._withCommit(function() {
              payload.set(store2._state.data, path, payload.state.value);
            });
          }
        });
        store2.subscribe(function(mutation, state) {
          var data = {};
          if (mutation.payload) {
            data.payload = mutation.payload;
          }
          data.state = state;
          api.notifyComponentUpdate();
          api.sendInspectorTree(INSPECTOR_ID);
          api.sendInspectorState(INSPECTOR_ID);
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: Date.now(),
              title: mutation.type,
              data
            }
          });
        });
        store2.subscribeAction({
          before: function(action, state) {
            var data = {};
            if (action.payload) {
              data.payload = action.payload;
            }
            action._id = actionId++;
            action._time = Date.now();
            data.state = state;
            api.addTimelineEvent({
              layerId: ACTIONS_LAYER_ID,
              event: {
                time: action._time,
                title: action.type,
                groupId: action._id,
                subtitle: "start",
                data
              }
            });
          },
          after: function(action, state) {
            var data = {};
            var duration = Date.now() - action._time;
            data.duration = {
              _custom: {
                type: "duration",
                display: duration + "ms",
                tooltip: "Action duration",
                value: duration
              }
            };
            if (action.payload) {
              data.payload = action.payload;
            }
            data.state = state;
            api.addTimelineEvent({
              layerId: ACTIONS_LAYER_ID,
              event: {
                time: Date.now(),
                title: action.type,
                groupId: action._id,
                subtitle: "end",
                data
              }
            });
          }
        });
      }
    );
  }
  var COLOR_LIME_500 = 8702998;
  var COLOR_DARK = 6710886;
  var COLOR_WHITE = 16777215;
  var TAG_NAMESPACED = {
    label: "namespaced",
    textColor: COLOR_WHITE,
    backgroundColor: COLOR_DARK
  };
  function extractNameFromPath(path) {
    return path && path !== "root" ? path.split("/").slice(-2, -1)[0] : "Root";
  }
  function formatStoreForInspectorTree(module, path) {
    return {
      id: path || "root",
      // all modules end with a `/`, we want the last segment only
      // cart/ -> cart
      // nested/cart/ -> cart
      label: extractNameFromPath(path),
      tags: module.namespaced ? [TAG_NAMESPACED] : [],
      children: Object.keys(module._children).map(
        function(moduleName) {
          return formatStoreForInspectorTree(
            module._children[moduleName],
            path + moduleName + "/"
          );
        }
      )
    };
  }
  function flattenStoreForInspectorTree(result, module, filter, path) {
    if (path.includes(filter)) {
      result.push({
        id: path || "root",
        label: path.endsWith("/") ? path.slice(0, path.length - 1) : path || "Root",
        tags: module.namespaced ? [TAG_NAMESPACED] : []
      });
    }
    Object.keys(module._children).forEach(function(moduleName) {
      flattenStoreForInspectorTree(result, module._children[moduleName], filter, path + moduleName + "/");
    });
  }
  function formatStoreForInspectorState(module, getters, path) {
    getters = path === "root" ? getters : getters[path];
    var gettersKeys = Object.keys(getters);
    var storeState = {
      state: Object.keys(module.state).map(function(key) {
        return {
          key,
          editable: true,
          value: module.state[key]
        };
      })
    };
    if (gettersKeys.length) {
      var tree = transformPathsToObjectTree(getters);
      storeState.getters = Object.keys(tree).map(function(key) {
        return {
          key: key.endsWith("/") ? extractNameFromPath(key) : key,
          editable: false,
          value: canThrow(function() {
            return tree[key];
          })
        };
      });
    }
    return storeState;
  }
  function transformPathsToObjectTree(getters) {
    var result = {};
    Object.keys(getters).forEach(function(key) {
      var path = key.split("/");
      if (path.length > 1) {
        var target = result;
        var leafKey = path.pop();
        path.forEach(function(p) {
          if (!target[p]) {
            target[p] = {
              _custom: {
                value: {},
                display: p,
                tooltip: "Module",
                abstract: true
              }
            };
          }
          target = target[p]._custom.value;
        });
        target[leafKey] = canThrow(function() {
          return getters[key];
        });
      } else {
        result[key] = canThrow(function() {
          return getters[key];
        });
      }
    });
    return result;
  }
  function getStoreModule(moduleMap, path) {
    var names = path.split("/").filter(function(n) {
      return n;
    });
    return names.reduce(
      function(module, moduleName, i) {
        var child = module[moduleName];
        if (!child) {
          throw new Error('Missing module "' + moduleName + '" for path "' + path + '".');
        }
        return i === names.length - 1 ? child : child._children;
      },
      path === "root" ? moduleMap : moduleMap.root._children
    );
  }
  function canThrow(cb) {
    try {
      return cb();
    } catch (e) {
      return e;
    }
  }
  var Module = function Module2(rawModule, runtime) {
    this.runtime = runtime;
    this._children = /* @__PURE__ */ Object.create(null);
    this._rawModule = rawModule;
    var rawState = rawModule.state;
    this.state = (typeof rawState === "function" ? rawState() : rawState) || {};
  };
  var prototypeAccessors$1 = { namespaced: { configurable: true } };
  prototypeAccessors$1.namespaced.get = function() {
    return !!this._rawModule.namespaced;
  };
  Module.prototype.addChild = function addChild(key, module) {
    this._children[key] = module;
  };
  Module.prototype.removeChild = function removeChild(key) {
    delete this._children[key];
  };
  Module.prototype.getChild = function getChild(key) {
    return this._children[key];
  };
  Module.prototype.hasChild = function hasChild(key) {
    return key in this._children;
  };
  Module.prototype.update = function update2(rawModule) {
    this._rawModule.namespaced = rawModule.namespaced;
    if (rawModule.actions) {
      this._rawModule.actions = rawModule.actions;
    }
    if (rawModule.mutations) {
      this._rawModule.mutations = rawModule.mutations;
    }
    if (rawModule.getters) {
      this._rawModule.getters = rawModule.getters;
    }
  };
  Module.prototype.forEachChild = function forEachChild(fn) {
    forEachValue(this._children, fn);
  };
  Module.prototype.forEachGetter = function forEachGetter(fn) {
    if (this._rawModule.getters) {
      forEachValue(this._rawModule.getters, fn);
    }
  };
  Module.prototype.forEachAction = function forEachAction(fn) {
    if (this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn);
    }
  };
  Module.prototype.forEachMutation = function forEachMutation(fn) {
    if (this._rawModule.mutations) {
      forEachValue(this._rawModule.mutations, fn);
    }
  };
  Object.defineProperties(Module.prototype, prototypeAccessors$1);
  var ModuleCollection = function ModuleCollection2(rawRootModule) {
    this.register([], rawRootModule, false);
  };
  ModuleCollection.prototype.get = function get(path) {
    return path.reduce(function(module, key) {
      return module.getChild(key);
    }, this.root);
  };
  ModuleCollection.prototype.getNamespace = function getNamespace(path) {
    var module = this.root;
    return path.reduce(function(namespace, key) {
      module = module.getChild(key);
      return namespace + (module.namespaced ? key + "/" : "");
    }, "");
  };
  ModuleCollection.prototype.update = function update$1(rawRootModule) {
    update([], this.root, rawRootModule);
  };
  ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
    var this$1$1 = this;
    if (runtime === void 0)
      runtime = true;
    {
      assertRawModule(path, rawModule);
    }
    var newModule = new Module(rawModule, runtime);
    if (path.length === 0) {
      this.root = newModule;
    } else {
      var parent = this.get(path.slice(0, -1));
      parent.addChild(path[path.length - 1], newModule);
    }
    if (rawModule.modules) {
      forEachValue(rawModule.modules, function(rawChildModule, key) {
        this$1$1.register(path.concat(key), rawChildModule, runtime);
      });
    }
  };
  ModuleCollection.prototype.unregister = function unregister(path) {
    var parent = this.get(path.slice(0, -1));
    var key = path[path.length - 1];
    var child = parent.getChild(key);
    if (!child) {
      {
        console.warn(
          "[vuex] trying to unregister module '" + key + "', which is not registered"
        );
      }
      return;
    }
    if (!child.runtime) {
      return;
    }
    parent.removeChild(key);
  };
  ModuleCollection.prototype.isRegistered = function isRegistered(path) {
    var parent = this.get(path.slice(0, -1));
    var key = path[path.length - 1];
    if (parent) {
      return parent.hasChild(key);
    }
    return false;
  };
  function update(path, targetModule, newModule) {
    {
      assertRawModule(path, newModule);
    }
    targetModule.update(newModule);
    if (newModule.modules) {
      for (var key in newModule.modules) {
        if (!targetModule.getChild(key)) {
          {
            console.warn(
              "[vuex] trying to add a new module '" + key + "' on hot reloading, manual reload is needed"
            );
          }
          return;
        }
        update(
          path.concat(key),
          targetModule.getChild(key),
          newModule.modules[key]
        );
      }
    }
  }
  var functionAssert = {
    assert: function(value) {
      return typeof value === "function";
    },
    expected: "function"
  };
  var objectAssert = {
    assert: function(value) {
      return typeof value === "function" || typeof value === "object" && typeof value.handler === "function";
    },
    expected: 'function or object with "handler" function'
  };
  var assertTypes = {
    getters: functionAssert,
    mutations: functionAssert,
    actions: objectAssert
  };
  function assertRawModule(path, rawModule) {
    Object.keys(assertTypes).forEach(function(key) {
      if (!rawModule[key]) {
        return;
      }
      var assertOptions = assertTypes[key];
      forEachValue(rawModule[key], function(value, type) {
        assert(
          assertOptions.assert(value),
          makeAssertionMessage(path, key, type, value, assertOptions.expected)
        );
      });
    });
  }
  function makeAssertionMessage(path, key, type, value, expected) {
    var buf = key + " should be " + expected + ' but "' + key + "." + type + '"';
    if (path.length > 0) {
      buf += ' in module "' + path.join(".") + '"';
    }
    buf += " is " + JSON.stringify(value) + ".";
    return buf;
  }
  function createStore(options) {
    return new Store(options);
  }
  var Store = function Store2(options) {
    var this$1$1 = this;
    if (options === void 0)
      options = {};
    {
      assert(typeof Promise !== "undefined", "vuex requires a Promise polyfill in this browser.");
      assert(this instanceof Store2, "store must be called with the new operator.");
    }
    var plugins = options.plugins;
    if (plugins === void 0)
      plugins = [];
    var strict = options.strict;
    if (strict === void 0)
      strict = false;
    var devtools = options.devtools;
    this._committing = false;
    this._actions = /* @__PURE__ */ Object.create(null);
    this._actionSubscribers = [];
    this._mutations = /* @__PURE__ */ Object.create(null);
    this._wrappedGetters = /* @__PURE__ */ Object.create(null);
    this._modules = new ModuleCollection(options);
    this._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
    this._subscribers = [];
    this._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
    this._scope = null;
    this._devtools = devtools;
    var store2 = this;
    var ref = this;
    var dispatch = ref.dispatch;
    var commit = ref.commit;
    this.dispatch = function boundDispatch(type, payload) {
      return dispatch.call(store2, type, payload);
    };
    this.commit = function boundCommit(type, payload, options2) {
      return commit.call(store2, type, payload, options2);
    };
    this.strict = strict;
    var state = this._modules.root.state;
    installModule(this, state, [], this._modules.root);
    resetStoreState(this, state);
    plugins.forEach(function(plugin) {
      return plugin(this$1$1);
    });
  };
  var prototypeAccessors = { state: { configurable: true } };
  Store.prototype.install = function install(app, injectKey) {
    app.provide(injectKey || storeKey, this);
    app.config.globalProperties.$store = this;
    var useDevtools = this._devtools !== void 0 ? this._devtools : true;
    if (useDevtools) {
      addDevtools(app, this);
    }
  };
  prototypeAccessors.state.get = function() {
    return this._state.data;
  };
  prototypeAccessors.state.set = function(v) {
    {
      assert(false, "use store.replaceState() to explicit replace store state.");
    }
  };
  Store.prototype.commit = function commit(_type, _payload, _options) {
    var this$1$1 = this;
    var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;
    var mutation = { type, payload };
    var entry = this._mutations[type];
    if (!entry) {
      {
        console.error("[vuex] unknown mutation type: " + type);
      }
      return;
    }
    this._withCommit(function() {
      entry.forEach(function commitIterator(handler) {
        handler(payload);
      });
    });
    this._subscribers.slice().forEach(function(sub) {
      return sub(mutation, this$1$1.state);
    });
    if (options && options.silent) {
      console.warn(
        "[vuex] mutation type: " + type + ". Silent option has been removed. Use the filter functionality in the vue-devtools"
      );
    }
  };
  Store.prototype.dispatch = function dispatch(_type, _payload) {
    var this$1$1 = this;
    var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;
    var action = { type, payload };
    var entry = this._actions[type];
    if (!entry) {
      {
        console.error("[vuex] unknown action type: " + type);
      }
      return;
    }
    try {
      this._actionSubscribers.slice().filter(function(sub) {
        return sub.before;
      }).forEach(function(sub) {
        return sub.before(action, this$1$1.state);
      });
    } catch (e) {
      {
        console.warn("[vuex] error in before action subscribers: ");
        console.error(e);
      }
    }
    var result = entry.length > 1 ? Promise.all(entry.map(function(handler) {
      return handler(payload);
    })) : entry[0](payload);
    return new Promise(function(resolve, reject) {
      result.then(function(res) {
        try {
          this$1$1._actionSubscribers.filter(function(sub) {
            return sub.after;
          }).forEach(function(sub) {
            return sub.after(action, this$1$1.state);
          });
        } catch (e) {
          {
            console.warn("[vuex] error in after action subscribers: ");
            console.error(e);
          }
        }
        resolve(res);
      }, function(error) {
        try {
          this$1$1._actionSubscribers.filter(function(sub) {
            return sub.error;
          }).forEach(function(sub) {
            return sub.error(action, this$1$1.state, error);
          });
        } catch (e) {
          {
            console.warn("[vuex] error in error action subscribers: ");
            console.error(e);
          }
        }
        reject(error);
      });
    });
  };
  Store.prototype.subscribe = function subscribe(fn, options) {
    return genericSubscribe(fn, this._subscribers, options);
  };
  Store.prototype.subscribeAction = function subscribeAction(fn, options) {
    var subs = typeof fn === "function" ? { before: fn } : fn;
    return genericSubscribe(subs, this._actionSubscribers, options);
  };
  Store.prototype.watch = function watch$1(getter, cb, options) {
    var this$1$1 = this;
    {
      assert(typeof getter === "function", "store.watch only accepts a function.");
    }
    return vue.watch(function() {
      return getter(this$1$1.state, this$1$1.getters);
    }, cb, Object.assign({}, options));
  };
  Store.prototype.replaceState = function replaceState(state) {
    var this$1$1 = this;
    this._withCommit(function() {
      this$1$1._state.data = state;
    });
  };
  Store.prototype.registerModule = function registerModule(path, rawModule, options) {
    if (options === void 0)
      options = {};
    if (typeof path === "string") {
      path = [path];
    }
    {
      assert(Array.isArray(path), "module path must be a string or an Array.");
      assert(path.length > 0, "cannot register the root module by using registerModule.");
    }
    this._modules.register(path, rawModule);
    installModule(this, this.state, path, this._modules.get(path), options.preserveState);
    resetStoreState(this, this.state);
  };
  Store.prototype.unregisterModule = function unregisterModule(path) {
    var this$1$1 = this;
    if (typeof path === "string") {
      path = [path];
    }
    {
      assert(Array.isArray(path), "module path must be a string or an Array.");
    }
    this._modules.unregister(path);
    this._withCommit(function() {
      var parentState = getNestedState(this$1$1.state, path.slice(0, -1));
      delete parentState[path[path.length - 1]];
    });
    resetStore(this);
  };
  Store.prototype.hasModule = function hasModule(path) {
    if (typeof path === "string") {
      path = [path];
    }
    {
      assert(Array.isArray(path), "module path must be a string or an Array.");
    }
    return this._modules.isRegistered(path);
  };
  Store.prototype.hotUpdate = function hotUpdate(newOptions) {
    this._modules.update(newOptions);
    resetStore(this, true);
  };
  Store.prototype._withCommit = function _withCommit(fn) {
    var committing = this._committing;
    this._committing = true;
    fn();
    this._committing = committing;
  };
  Object.defineProperties(Store.prototype, prototypeAccessors);
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$4 = {
    data() {
      return {
        LoginMode: true,
        OverallDisplay: "col1",
        LoginChooseDisplay: "row1",
        CodeDisplay: "row2",
        LoginChooseClass: {
          PasswordLogin: "loginChooseClass1",
          CodeLogin: "loginChooseClass2"
        },
        LoginButtonClass: "loginButtonClass1",
        InputValue: {
          InputBox1: "",
          InputBox2: ""
        },
        InputClass: {
          InputBox1: "inputClass1",
          InputBox2: "inputClass1"
        },
        InputPlaceHolder: {
          InputBox1: "请输入邮箱号",
          InputBox2: "请输入密码"
        },
        ErrorShow: {
          ErrorBox1: "",
          ErrorBox2: ""
        },
        ErrorClass: {
          ErrorBox1: "errorClass",
          ErrorBox2: "errorClass"
        },
        GetClass: "get1",
        SigninClass: "signin",
        BaseURL: vue.inject("BaseURL")
      };
    },
    setup() {
    },
    methods: {
      CodeChoose() {
        this.LoginMode = false;
        this.LoginChooseClass.PasswordLogin = "loginChooseClass3";
        this.LoginChooseClass.CodeLogin = "loginChooseClass4";
        this.ErrorShow.ErrorBox1 = "";
        this.ErrorShow.ErrorBox2 = "";
        this.InputPlaceHolder.InputBox2 = "请输入验证码";
        this.InputClass.InputBox2 = "inputClass3";
        this.InputValue.InputBox2 = "";
        this.LoginButtonClass = "loginButtonClass1";
        this.GetClass = "get1";
      },
      PswChoose() {
        this.LoginMode = true;
        this.LoginChooseClass.PasswordLogin = "loginChooseClass1";
        this.LoginChooseClass.CodeLogin = "loginChooseClass2";
        this.ErrorShow.ErrorBox1 = "";
        this.ErrorShow.ErrorBox2 = "";
        this.InputPlaceHolder.InputBox2 = "请输入密码";
        this.InputClass.InputBox2 = "inputClass1";
        this.InputValue.InputBox2 = "";
        this.LoginButtonClass = "loginButtonClass1";
        this.GetClass = "get1";
      },
      AccountLogin(self2) {
        this.$store.commit("login", self2.InputValue.InputBox1);
      },
      login() {
        const self2 = this;
        if (self2.LoginMode) {
          uni.request({
            url: self2.BaseURL + "login/psw/",
            method: "GET",
            data: {
              email: self2.InputValue.InputBox1,
              psw: self2.InputValue.InputBox2
            },
            success: function(res) {
              const back = res.data;
              formatAppLog("log", "at pages/index/index.vue:164", back);
              if (back == "LEN ERROR." || back == "EMAIL ERROR.") {
                self2.ErrorShow.ErrorBox1 = "邮箱号错误";
                self2.ErrorShow.ErrorBox2 = "";
                self2.InputClass.InputBox2 = "inputClass2";
                self2.LoginButtonClass = "loginButtonClass1";
              } else if (back == "PSW ERROR.") {
                self2.ErrorShow.ErrorBox1 = "";
                self2.ErrorShow.ErrorBox2 = "密码错误";
                self2.InputClass.InputBox2 = "inputClass1";
                self2.LoginButtonClass = "loginButtonClass2";
              } else {
                self2.AccountLogin(self2);
                uni.redirectTo({
                  url: "/pages/main/main"
                });
              }
            },
            fail: function(res) {
              formatAppLog("log", "at pages/index/index.vue:183", "LOGIN FAILED.");
            }
          });
        } else {
          formatAppLog("log", "at pages/index/index.vue:187", InputValue.InputBox2);
          uni.request({
            url: self2.BaseURL + "login/email/",
            method: "GET",
            data: {
              email: self2.InputValue.InputBox1,
              code: self2.InputValue.InputBox2
            },
            success: function(res) {
              const back = res.data;
              formatAppLog("log", "at pages/index/index.vue:197", back);
              if (back == "LEN ERROR." || back == "EMAIL ERROR.") {
                self2.ErrorShow.ErrorBox1 = "邮箱号错误";
                self2.ErrorShow.ErrorBox2 = "";
                self2.InputClass.InputBox2 = "inputClass4";
                self2.GetClass = "get2";
                self2.LoginButtonClass = "loginButtonClass1";
              } else if (back == "CODE ERROR.") {
                self2.ErrorShow.ErrorBox1 = "";
                self2.ErrorShow.ErrorBox2 = "验证码错误";
                self2.InputClass.InputBox2 = "inputClass3";
                self2.GetClass = "get1";
                self2.LoginButtonClass = "loginButtonClass2";
              } else {
                self2.AccountLogin(self2);
                uni.redirectTo({
                  url: "/pages/main/main"
                });
              }
            },
            fail: function(res) {
              formatAppLog("log", "at pages/index/index.vue:218", "LOGIN FAILED.");
            }
          });
        }
      },
      signin() {
        uni.redirectTo({
          url: "/pages/signin/signin"
        });
      },
      get() {
        formatAppLog("log", "at pages/index/index.vue:229", Account);
        uni.request({
          url: BaseURL + "login/get/",
          method: "GET",
          data: {
            email: self.InputValue.InputBox1
          },
          success: function(res) {
            const back = res.data;
            if (back == "LEN ERROR." || back == "EMAIL ERROR.") {
              self.ErrorShow.ErrorBox1 = "邮箱号错误";
              self.ErrorShow.ErrorBox2 = "";
              self.InputClass.InputBox2 = "inputClass4";
              self.GetClass = "get2";
              self.LoginButtonClass = "loginButtonClass1";
            }
          },
          fail: function(res) {
            formatAppLog("log", "at pages/index/index.vue:247", "LOGIN FAILED.");
          }
        });
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return $data.LoginMode ? (vue.openBlock(), vue.createElementBlock(
      "div",
      {
        key: 0,
        class: vue.normalizeClass($data.OverallDisplay)
      },
      [
        vue.createElementVNode(
          "div",
          {
            class: vue.normalizeClass($data.LoginChooseDisplay)
          },
          [
            vue.createElementVNode(
              "div",
              {
                class: vue.normalizeClass($data.LoginChooseClass.PasswordLogin)
              },
              " 密码登录 ",
              2
              /* CLASS */
            ),
            vue.createElementVNode(
              "div",
              {
                class: vue.normalizeClass($data.LoginChooseClass.CodeLogin),
                onClick: _cache[0] || (_cache[0] = (...args) => $options.CodeChoose && $options.CodeChoose(...args))
              },
              " 验证码登录 ",
              2
              /* CLASS */
            )
          ],
          2
          /* CLASS */
        ),
        vue.createElementVNode("div", null, [
          vue.withDirectives(vue.createElementVNode("input", {
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.InputValue.InputBox1 = $event),
            class: vue.normalizeClass($data.InputClass.InputBox1),
            placeholder: $data.InputPlaceHolder.InputBox1
          }, null, 10, ["placeholder"]), [
            [vue.vModelText, $data.InputValue.InputBox1]
          ]),
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass($data.ErrorClass.ErrorBox1)
            },
            vue.toDisplayString($data.ErrorShow.ErrorBox1),
            3
            /* TEXT, CLASS */
          ),
          vue.withDirectives(vue.createElementVNode("input", {
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.InputValue.InputBox2 = $event),
            class: vue.normalizeClass($data.InputClass.InputBox2),
            placeholder: $data.InputPlaceHolder.InputBox2,
            password: true
          }, null, 10, ["placeholder"]), [
            [vue.vModelText, $data.InputValue.InputBox2]
          ]),
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass($data.ErrorClass.ErrorBox2)
            },
            vue.toDisplayString($data.ErrorShow.ErrorBox2),
            3
            /* TEXT, CLASS */
          )
        ]),
        vue.createElementVNode(
          "button",
          {
            class: vue.normalizeClass($data.LoginButtonClass),
            onClick: _cache[3] || (_cache[3] = (...args) => $options.login && $options.login(...args))
          },
          " 登录 ",
          2
          /* CLASS */
        ),
        vue.createElementVNode(
          "div",
          {
            class: vue.normalizeClass($data.SigninClass),
            onClick: _cache[4] || (_cache[4] = (...args) => $options.signin && $options.signin(...args))
          },
          " 还没有账号？ ",
          2
          /* CLASS */
        )
      ],
      2
      /* CLASS */
    )) : (vue.openBlock(), vue.createElementBlock(
      "div",
      {
        key: 1,
        class: vue.normalizeClass($data.OverallDisplay)
      },
      [
        vue.createElementVNode(
          "div",
          {
            class: vue.normalizeClass($data.LoginChooseDisplay)
          },
          [
            vue.createElementVNode(
              "div",
              {
                class: vue.normalizeClass($data.LoginChooseClass.PasswordLogin),
                onClick: _cache[5] || (_cache[5] = (...args) => $options.PswChoose && $options.PswChoose(...args))
              },
              " 密码登录 ",
              2
              /* CLASS */
            ),
            vue.createElementVNode(
              "div",
              {
                class: vue.normalizeClass($data.LoginChooseClass.CodeLogin)
              },
              " 验证码登录 ",
              2
              /* CLASS */
            )
          ],
          2
          /* CLASS */
        ),
        vue.createElementVNode("div", null, [
          vue.withDirectives(vue.createElementVNode("input", {
            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.InputValue.InputBox1 = $event),
            class: vue.normalizeClass($data.InputClass.InputBox1),
            placeholder: $data.InputPlaceHolder.InputBox1
          }, null, 10, ["placeholder"]), [
            [vue.vModelText, $data.InputValue.InputBox1]
          ]),
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass($data.ErrorClass.ErrorBox1)
            },
            vue.toDisplayString($data.ErrorShow.ErrorBox1),
            3
            /* TEXT, CLASS */
          ),
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass($data.CodeDisplay)
            },
            [
              vue.createElementVNode("div", null, [
                vue.withDirectives(vue.createElementVNode("input", {
                  "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.InputValue.InputBox2 = $event),
                  class: vue.normalizeClass($data.InputClass.InputBox2),
                  placeholder: $data.InputPlaceHolder.InputBox2,
                  password: true
                }, null, 10, ["placeholder"]), [
                  [vue.vModelText, $data.InputValue.InputBox2]
                ]),
                vue.createElementVNode(
                  "div",
                  {
                    class: vue.normalizeClass($data.ErrorClass.ErrorBox2)
                  },
                  vue.toDisplayString($data.ErrorShow.ErrorBox2),
                  3
                  /* TEXT, CLASS */
                )
              ]),
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass($data.GetClass),
                  onClick: _cache[8] || (_cache[8] = (...args) => $options.get && $options.get(...args))
                },
                " 获取验证码 ",
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          )
        ]),
        vue.createElementVNode(
          "button",
          {
            class: vue.normalizeClass($data.LoginButtonClass),
            onClick: _cache[9] || (_cache[9] = (...args) => $options.login && $options.login(...args))
          },
          " 登录 ",
          2
          /* CLASS */
        ),
        vue.createElementVNode(
          "div",
          {
            class: vue.normalizeClass($data.SigninClass),
            onClick: _cache[10] || (_cache[10] = (...args) => $options.signin && $options.signin(...args))
          },
          " 还没有账号？ ",
          2
          /* CLASS */
        )
      ],
      2
      /* CLASS */
    ));
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$1], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/index/index.vue"]]);
  const _sfc_main$3 = {
    __name: "signin",
    setup(__props) {
      const BaseURL2 = vue.inject("BaseURL");
      const OverallDisplay = vue.ref("col1");
      const CodeDisplay = vue.ref("row2");
      const TitleDisplay = vue.ref("row1");
      vue.ref("无");
      const TitleClass = vue.ref("title");
      const GetClass = vue.ref("get1");
      const ErrorClass = vue.ref("errorClass");
      const TipClass = vue.ref("tipClass");
      vue.ref(null);
      const passwordValid = vue.ref({
        code: "1",
        password: "1",
        repeat: "1"
      });
      const errorValue = vue.ref({
        emailError: "",
        // 请输入正确的电子邮箱
        codeError: "",
        // 请输入正确的验证码
        nicknameError: "",
        passwordError: "",
        // 请保证输入格式正确
        repeatError: ""
        // 请保证两次输入的密码相同
      });
      const placeholderValue = vue.ref({
        emailPlaceholder: "请输入电子邮箱",
        codePlaceholder: "请输入验证码",
        nicknamePlaceholder: "请输入昵称",
        passwordPlaceholder: "请输入密码",
        repeatPlaceholder: "请确认密码"
      });
      const inputClass = vue.ref({
        emailInput: "inputClass1",
        codeInput: "inputClass3",
        nicknameInput: "inputClass1",
        passwordInput: "inputClass1",
        repeatInput: "inputClass1"
      });
      const inputValue = vue.ref({
        emailInput: "",
        codeInput: "",
        nicknameInput: "",
        passwordInput: "",
        repeatInput: ""
      });
      const buttonClass = vue.ref("loginButtonClass1");
      function emailValid(email) {
        return true;
      }
      function codeValid(code) {
        if (code.length != 4)
          return false;
        for (let i = 0; i < code.length; i++) {
          if (!(code[i] >= "0" && code[i] <= "9"))
            return false;
        }
        return true;
      }
      function nickValid(code) {
        if (code.length > 10)
          return false;
        return true;
      }
      function pswValid(code) {
        if (!(code.length >= 6 && code.length <= 20))
          return false;
        return true;
      }
      function signin() {
        if (!emailValid(inputValue.value.emailInput))
          ;
        if (!codeValid(inputValue.value.codeInput)) {
          errorValue.value.emailError = "";
          errorValue.value.codeError = "验证码错误";
          errorValue.value.nicknameError = "";
          errorValue.value.passwordError = "";
          errorValue.value.repeatError = "";
          GetClass.value = "get1";
          inputClass.value.codeInput = "inputClass3";
          inputClass.value.nicknameInput = "inputClass2";
          inputClass.value.passwordInput = "inputClass1";
          inputClass.value.repeatInput = "inputClass1";
          buttonClass.value = "loginButtonClass1";
          return;
        }
        if (!nickValid(inputValue.value.nicknameInput)) {
          errorValue.value.emailError = "";
          errorValue.value.codeError = "";
          errorValue.value.nicknameError = "昵称只能由少于或等于10个字符";
          errorValue.value.passwordError = "";
          errorValue.value.repeatError = "";
          GetClass.value = "get1";
          inputClass.value.codeInput = "inputClass3";
          inputClass.value.nicknameInput = "inputClass1";
          inputClass.value.passwordInput = "inputClass2";
          inputClass.value.repeatInput = "inputClass1";
          buttonClass.value = "loginButtonClass1";
          return;
        }
        if (!pswValid(inputValue.value.passwordInput)) {
          errorValue.value.emailError = "";
          errorValue.value.codeError = "";
          errorValue.value.nicknameError = "";
          errorValue.value.passwordError = "密码只能由少于20位并且多于6位大小写英文或数字";
          errorValue.value.repeatError = "";
          GetClass.value = "get1";
          inputClass.value.codeInput = "inputClass3";
          inputClass.value.nicknameInput = "inputClass1";
          inputClass.value.passwordInput = "inputClass1";
          inputClass.value.repeatInput = "inputClass2";
          buttonClass.value = "loginButtonClass1";
          return;
        }
        if (inputValue.value.passwordInput != inputValue.value.repeatInput) {
          errorValue.value.emailError = "";
          errorValue.value.codeError = "";
          errorValue.value.nicknameError = "";
          errorValue.value.passwordError = "";
          errorValue.value.repeatError = "请保证两次输入的密码相同";
          GetClass.value = "get1";
          inputClass.value.codeInput = "inputClass3";
          inputClass.value.nicknameInput = "inputClass1";
          inputClass.value.passwordInput = "inputClass1";
          inputClass.value.repeatInput = "inputClass1";
          buttonClass.value = "loginButtonClass2";
          return;
        }
        errorValue.value.emailError = "";
        errorValue.value.codeError = "";
        errorValue.value.nicknameError = "";
        errorValue.value.passwordError = "";
        errorValue.value.repeatError = "";
        GetClass.value = "get1";
        inputClass.value.codeInput = "inputClass3";
        inputClass.value.nicknameInput = "inputClass1";
        inputClass.value.passwordInput = "inputClass1";
        inputClass.value.repeatInput = "inputClass1";
        buttonClass.value = "loginButtonClass1";
        uni.request({
          url: BaseURL2 + "signin/signin/",
          method: "GET",
          data: {
            email: inputValue.value.emailInput,
            code: inputValue.value.codeInput,
            nickname: inputValue.value.nicknameInput,
            password: inputValue.value.passwordInput
          },
          success: function(res) {
            const back = res.data;
            if (back == "EMAIL EXISTS.") {
              errorValue.value.emailError = "该邮箱已经被注册";
              errorValue.value.codeError = "";
              errorValue.value.nicknameError = "";
              errorValue.value.passwordError = "";
              errorValue.value.repeatError = "";
              GetClass.value = "get2";
              inputClass.value.codeInput = "inputClass4";
              inputClass.value.nicknameInput = "inputClass1";
              inputClass.value.passwordInput = "inputClass1";
              inputClass.value.repeatInput = "inputClass1";
              buttonClass.value = "loginButtonClass1";
            } else if (back == "SIGNIN SUCCESS.") {
              uni.redirectTo({
                url: "/pages/index/index"
              });
            }
          },
          fail: function(res) {
            errorValue.value.emailError = "请输入正确的邮箱";
            errorValue.value.codeError = "";
            errorValue.value.nicknameError = "";
            errorValue.value.passwordError = "";
            errorValue.value.repeatError = "";
            GetClass.value = "get2";
            inputClass.value.codeInput = "inputClass4";
            inputClass.value.nicknameInput = "inputClass1";
            inputClass.value.passwordInput = "inputClass1";
            inputClass.value.repeatInput = "inputClass1";
            buttonClass.value = "loginButtonClass1";
          }
        });
      }
      function get() {
        uni.request({
          url: BaseURL2 + "signin/get/",
          method: "GET",
          data: {
            email: inputValue.value.emailInput
          },
          success: function(res) {
            const back = res.data;
            if (back == "LEN ERROR.") {
              errorValue.value.emailError = "请输入正确的电子邮箱";
              errorValue.value.codeError = "";
              errorValue.value.nicknameError = "";
              errorValue.value.passwordError = "";
              errorValue.value.repeatError = "";
              GetClass.value = "get2";
              inputClass.value.codeInput = "inputClass4";
              inputClass.value.nicknameInput = "inputClass1";
              inputClass.value.passwordInput = "inputClass1";
              inputClass.value.repeatInput = "inputClass1";
              buttonClass.value = "loginButtonClass1";
            } else if (back == "EMAIL EXISTS.") {
              errorValue.value.emailError = "该邮箱已经被注册";
              errorValue.value.codeError = "";
              errorValue.value.nicknameError = "";
              errorValue.value.passwordError = "";
              errorValue.value.repeatError = "";
              GetClass.value = "get2";
              inputClass.value.codeInput = "inputClass4";
              inputClass.value.nicknameInput = "inputClass1";
              inputClass.value.passwordInput = "inputClass1";
              inputClass.value.repeatInput = "inputClass1";
              buttonClass.value = "loginButtonClass1";
            } else {
              errorValue.value.emailError = "";
              errorValue.value.codeError = "";
              errorValue.value.nicknameError = "";
              errorValue.value.passwordError = "";
              errorValue.value.repeatError = "";
              GetClass.value = "get1";
              inputClass.value.codeInput = "inputClass3";
              inputClass.value.nicknameInput = "inputClass1";
              inputClass.value.passwordInput = "inputClass1";
              inputClass.value.repeatInput = "inputClass1";
              buttonClass.value = "loginButtonClass1";
            }
          },
          fail: function(res) {
            errorValue.value.emailError = "请输入正确的电子邮箱";
            errorValue.value.codeError = "";
            errorValue.value.nicknameError = "";
            errorValue.value.passwordError = "";
            errorValue.value.repeatError = "";
            GetClass.value = "get2";
            inputClass.value.codeInput = "inputClass4";
            inputClass.value.nicknameInput = "inputClass1";
            inputClass.value.passwordInput = "inputClass1";
            inputClass.value.repeatInput = "inputClass1";
            buttonClass.value = "loginButtonClass1";
          }
        });
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          "div",
          {
            class: vue.normalizeClass(OverallDisplay.value)
          },
          [
            vue.createElementVNode(
              "div",
              {
                class: vue.normalizeClass(TitleDisplay.value)
              },
              [
                vue.createElementVNode(
                  "div",
                  {
                    class: vue.normalizeClass(TitleClass.value)
                  },
                  " 注册 ",
                  2
                  /* CLASS */
                )
              ],
              2
              /* CLASS */
            ),
            vue.withDirectives(vue.createElementVNode("input", {
              placeholder: placeholderValue.value.emailPlaceholder,
              class: vue.normalizeClass(inputClass.value.emailInput),
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => inputValue.value.emailInput = $event)
            }, null, 10, ["placeholder"]), [
              [vue.vModelText, inputValue.value.emailInput]
            ]),
            vue.createElementVNode(
              "div",
              {
                class: vue.normalizeClass(ErrorClass.value)
              },
              vue.toDisplayString(errorValue.value.emailError),
              3
              /* TEXT, CLASS */
            ),
            vue.createElementVNode(
              "div",
              {
                class: vue.normalizeClass(CodeDisplay.value)
              },
              [
                vue.withDirectives(vue.createElementVNode("input", {
                  placeholder: placeholderValue.value.codePlaceholder,
                  class: vue.normalizeClass(inputClass.value.codeInput),
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => inputValue.value.codeInput = $event),
                  password: passwordValid.value.code
                }, null, 10, ["placeholder", "password"]), [
                  [vue.vModelText, inputValue.value.codeInput]
                ]),
                vue.createElementVNode(
                  "div",
                  {
                    class: vue.normalizeClass(GetClass.value),
                    onClick: get
                  },
                  " 获取验证码 ",
                  2
                  /* CLASS */
                )
              ],
              2
              /* CLASS */
            ),
            vue.createElementVNode(
              "div",
              {
                class: vue.normalizeClass(ErrorClass.value)
              },
              vue.toDisplayString(errorValue.value.codeError),
              3
              /* TEXT, CLASS */
            ),
            vue.withDirectives(vue.createElementVNode("input", {
              placeholder: placeholderValue.value.nicknamePlaceholder,
              class: vue.normalizeClass(inputClass.value.nicknameInput),
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => inputValue.value.nicknameInput = $event)
            }, null, 10, ["placeholder"]), [
              [vue.vModelText, inputValue.value.nicknameInput]
            ]),
            vue.createElementVNode(
              "div",
              {
                class: vue.normalizeClass(ErrorClass.value)
              },
              vue.toDisplayString(errorValue.value.nicknameError),
              3
              /* TEXT, CLASS */
            ),
            vue.withDirectives(vue.createElementVNode("input", {
              placeholder: placeholderValue.value.passwordPlaceholder,
              class: vue.normalizeClass(inputClass.value.passwordInput),
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => inputValue.value.passwordInput = $event),
              password: passwordValid.value.password
            }, null, 10, ["placeholder", "password"]), [
              [vue.vModelText, inputValue.value.passwordInput]
            ]),
            vue.createElementVNode(
              "div",
              {
                class: vue.normalizeClass(ErrorClass.value)
              },
              vue.toDisplayString(errorValue.value.passwordError),
              3
              /* TEXT, CLASS */
            ),
            vue.withDirectives(vue.createElementVNode("input", {
              placeholder: placeholderValue.value.repeatPlaceholder,
              class: vue.normalizeClass(inputClass.value.repeatInput),
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => inputValue.value.repeatInput = $event),
              password: passwordValid.value.repeat
            }, null, 10, ["placeholder", "password"]), [
              [vue.vModelText, inputValue.value.repeatInput]
            ]),
            vue.createElementVNode(
              "div",
              {
                class: vue.normalizeClass(ErrorClass.value)
              },
              vue.toDisplayString(errorValue.value.repeatError),
              3
              /* TEXT, CLASS */
            ),
            vue.createElementVNode(
              "button",
              {
                class: vue.normalizeClass(buttonClass.value),
                onClick: signin
              },
              " 注册 ",
              2
              /* CLASS */
            ),
            vue.createElementVNode(
              "div",
              {
                class: vue.normalizeClass(TipClass.value)
              },
              " 注册成功即可跳转 ",
              2
              /* CLASS */
            )
          ],
          2
          /* CLASS */
        );
      };
    }
  };
  const PagesSigninSignin = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/signin/signin.vue"]]);
  const _sfc_main$2 = {
    __name: "main",
    setup(__props) {
      const ScrollY = vue.ref("true");
      vue.ref("scrollClass");
      const ScrollTop = vue.ref("0");
      const BarClass = vue.ref("barClass");
      const chooseBarClass1 = vue.ref("chooseBarClass1");
      const chooseBarClass2 = vue.ref("chooseBarClass2");
      const chooseBarClass3 = vue.ref("chooseBarClass3");
      const chooseBarClass4 = vue.ref("chooseBarClass4");
      const ModeChoose = vue.ref("1");
      vue.ref("null");
      function priClicked() {
        ModeChoose.value = 1;
      }
      function appClicked() {
        ModeChoose.value = 2;
      }
      function messClicked() {
        ModeChoose.value = 3;
      }
      function perClicked() {
        ModeChoose.value = 4;
      }
      return (_ctx, _cache) => {
        return ModeChoose.value == 1 ? (vue.openBlock(), vue.createElementBlock("div", { key: 0 }, [
          vue.createElementVNode("scroll-view", {
            "scroll-y": ScrollY.value,
            "scroll-top": ScrollTop.value
          }, [
            vue.createCommentVNode(" <home /> ")
          ], 8, ["scroll-y", "scroll-top"]),
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(BarClass.value)
            },
            [
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass(chooseBarClass2.value)
                },
                " 首页 ",
                2
                /* CLASS */
              ),
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass(chooseBarClass1.value),
                  onClick: appClicked
                },
                " 预约 ",
                2
                /* CLASS */
              ),
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass(chooseBarClass1.value),
                  onClick: messClicked
                },
                " 消息 ",
                2
                /* CLASS */
              ),
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass(chooseBarClass3.value),
                  onClick: perClicked
                },
                " 个人 ",
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          )
        ])) : ModeChoose.value == 2 ? (vue.openBlock(), vue.createElementBlock("div", { key: 1 }, [
          vue.createElementVNode("scroll-view", {
            "scroll-y": ScrollY.value,
            "scroll-top": ScrollTop.value
          }, [
            vue.createTextVNode(" // "),
            vue.createCommentVNode(" <appointment /> ")
          ], 8, ["scroll-y", "scroll-top"]),
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(BarClass.value)
            },
            [
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass(chooseBarClass1.value),
                  onClick: priClicked
                },
                " 首页 ",
                2
                /* CLASS */
              ),
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass(chooseBarClass2.value)
                },
                " 预约 ",
                2
                /* CLASS */
              ),
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass(chooseBarClass1.value),
                  onClick: messClicked
                },
                " 消息 ",
                2
                /* CLASS */
              ),
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass(chooseBarClass3.value),
                  onClick: perClicked
                },
                " 个人 ",
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          )
        ])) : ModeChoose.value == 3 ? (vue.openBlock(), vue.createElementBlock("div", { key: 2 }, [
          vue.createElementVNode("scroll-view", {
            "scroll-y": ScrollY.value,
            "scroll-top": ScrollTop.value
          }, [
            vue.createCommentVNode(" <message /> ")
          ], 8, ["scroll-y", "scroll-top"]),
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(BarClass.value)
            },
            [
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass(chooseBarClass1.value),
                  onClick: priClicked
                },
                " 首页 ",
                2
                /* CLASS */
              ),
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass(chooseBarClass1.value),
                  onClick: appClicked
                },
                " 预约 ",
                2
                /* CLASS */
              ),
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass(chooseBarClass2.value)
                },
                " 消息 ",
                2
                /* CLASS */
              ),
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass(chooseBarClass3.value),
                  onClick: perClicked
                },
                " 个人 ",
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          )
        ])) : (vue.openBlock(), vue.createElementBlock("div", { key: 3 }, [
          vue.createElementVNode("scroll-view", {
            "scroll-y": ScrollY.value,
            "scroll-top": ScrollTop.value
          }, [
            vue.createCommentVNode(" <personality /> ")
          ], 8, ["scroll-y", "scroll-top"]),
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(BarClass.value)
            },
            [
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass(chooseBarClass1.value),
                  onClick: priClicked
                },
                " 首页 ",
                2
                /* CLASS */
              ),
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass(chooseBarClass1.value),
                  onClick: appClicked
                },
                " 预约 ",
                2
                /* CLASS */
              ),
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass(chooseBarClass1.value),
                  onClick: messClicked
                },
                " 消息 ",
                2
                /* CLASS */
              ),
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass(chooseBarClass4.value)
                },
                " 个人 ",
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          )
        ]));
      };
    }
  };
  const PagesMainMain = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/main/main.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {
        titleClass: "title",
        chooseClass: "choose",
        choosePlaceholder: "请选择您的地点",
        searchUrl: "/static/search.jpeg",
        searchClass: "img",
        overallDisplayClass: "overallDisplay",
        nowLocationClass: "nowLocation"
      };
    },
    methods: {}
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode(
          "div",
          {
            class: vue.normalizeClass($data.overallDisplayClass)
          },
          [
            vue.createElementVNode("image", {
              src: $data.searchUrl,
              class: vue.normalizeClass($data.searchClass)
            }, null, 10, ["src"]),
            vue.createElementVNode("input", {
              class: vue.normalizeClass($data.chooseClass),
              placeholder: $data.choosePlaceholder
            }, null, 10, ["placeholder"])
          ],
          2
          /* CLASS */
        ),
        vue.createElementVNode(
          "div",
          {
            class: vue.normalizeClass($data.nowLocationClass)
          },
          " 当前地点： ",
          2
          /* CLASS */
        )
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesLocationChooseLocationChoose = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/pages/locationChoose/locationChoose.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/signin/signin", PagesSigninSignin);
  __definePage("pages/main/main", PagesMainMain);
  __definePage("pages/locationChoose/locationChoose", PagesLocationChooseLocationChoose);
  const _sfc_main = {
    __name: "App",
    setup(__props) {
      vue.provide("BaseURL", "http://127.0.0.1:8000/");
      return () => {
      };
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "C:/Users/Chen Zhiyuan/Desktop/graduation-project/project/frontend(Android)/FrontEnd/App.vue"]]);
  const store = createStore({
    state: {
      loginAccount: "1196775239@qq.com",
      location: ""
    },
    mutations: {
      login(state, loginAccount) {
        state.loginAccount = loginAccount;
      }
    }
  });
  function createApp() {
    const app = vue.createVueApp(App);
    app.use(store);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
