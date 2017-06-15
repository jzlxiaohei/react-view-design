import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import { extendObservable, action, computed } from 'mobx';
import forOwn from 'lodash/forOwn';
import isEmpty from 'lodash/isEmpty';

type RuleFn = (modelValue:any, model: Object) => any | string;
type CheckFn = RuleFn | Array<RuleFn | string>;
type Rules = { [key:string] :CheckFn }

function checkInternal(checkFn: CheckFn, modelValue, model: Object): any| string {
  if (isArray(checkFn)) {
    // 如果是数组，
    // 1. 最后一项是string的话，检验不成功，这个string是最后的返回值
    // 2. 数组里全是函数，执行到哪个函数返回string，直接返回
    let fnLength = checkFn.length;
    let resultString = '';
    const lastItem = checkFn[fnLength - 1];
    if (isString(lastItem)) {
      fnLength -= 1;
      resultString = lastItem;
    }

    for (let i = 0; i < fnLength; i += 1) {
      const fn = checkFn[i];
      const tempResult = fn(modelValue, model);
      if (isString(tempResult)) {
        return (resultString || tempResult);
      }
    }
    return true;
  }
  return checkFn(modelValue, model);
}


function applyRules(model, rules: Rules, {
  lazy = false,
} = {}) {
  if (process.env.NODE_ENV !== 'production') {
    forOwn(rules, (_k, key) => {
      if (!(key in model)) {
        throw new Error(`${key} in rules but not in model`);
      }
      if (model.$rules) {
        if (key in model.$rules) {
          console.warn(`rule for ${key} has been set. old rule will be override`);
        }
      }
    });
  }
  /* eslint-disable no-param-reassign */
  if (model.$rules === undefined) model.$rules = {};
  if (model.$validState === undefined) model.$validState = {};

  forOwn(rules, (value, key) => { model.$rules[key] = value; });
  if (!lazy) {
    const computedFns = {};
    forOwn(rules, (value, key) => {
      computedFns[key] = computed(() => {
        const modelValue = this[key];
        return model.$needTrackValidState && checkInternal(value, modelValue, this);
      });
    });
    extendObservable(model.$validState, computedFns);
  }
  model.$hasRules = function $hasRules() {
    return !isEmpty(model.$rules);
  };

  model.$clearRules = function $clearRules() {
    model.$rules = {};
  };

  model.$isValid = function $isValid() {
    let isValid = true;
    forOwn(this.$rules, (value: RuleFn, key) => {
      const modelValue = this[key];
      const checkResult = checkInternal(value, modelValue, this);
      if (isString(checkResult)) {
        return (isValid = false); // return false to break iteration
      }
    });
    return isValid;
  };

  model.$trackValidState = action(
    function $trackValidState(state = true) {
      if (this.$needTrackValidState !== state) {
        this.$needTrackValidState = state;
      }
    },
  );
}


export default applyRules;
