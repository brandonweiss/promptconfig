import Behavior from "./behavior"
import Color from "./color"
import namespace from "./bash/namespace"
import bashFunction from "./bash/function"

class Component {

  constructor({ key, value, command, function: functionVariable, conditions, color }) {
    this.key = key

    if (value)            { this._value    = value }
    if (command)          { this._command  = command }
    if (functionVariable) { this._function = functionVariable }

    this._conditions = conditions
    this._colorOptions = color
  }

  get _isColorless() {
    return !this._colorOptions
  }

  get _isColored() {
    return !!this._colorOptions
  }

  get dependencyFunctionNames() {
    return [
      (this._isFunction ? this._function : undefined),
      (this._color && this._color.dependencyFunctionNames),
    ].flatten().filter(Boolean)
  }

  get definitions() {
    return [
      this.definition,
      (this._color && this._color.definition),
    ].filter(Boolean)
  }

  get invocation() {
    var string

    if (this._isConditionless) {
      if (this._isValue) {
        string = `'${this._value}'`
      } else if (this._isCommand) {
        string = `$(${this._command})`
      } else if (this._isFunction) {
        string = `$(${namespace(this._function)})`
      }
    } else {
      string = bashFunction({ name: this._functionName, body: "" }).invocation
    }

    return this._isColorless ? [string] : this._color.invocation({ text: string })
  }

  get _functionName() {
    return `component_${this.key}`
  }

  _transformConditionValue(value) {
    return `'${value}'`
  }

  get _color() {
    return this._colorOptions && new Color({ componentKey: this.key, options: this._colorOptions })
  }

  get usesExitStatusFunction() {
    return this._componentUsesExitStatusFunction || this._colorUsesExitStatusFunction
  }

  get _componentUsesExitStatusFunction() {
    return this._isFunction && this._function === "exit_status"
  }

  get _colorUsesExitStatusFunction() {
    return this._color && this._color.usesExitStatusFunction
  }

}

export default Behavior(Component)
