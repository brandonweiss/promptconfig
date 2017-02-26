import style from "ansi-styles"
import Behavior from "./behavior"
import color from "./bash/color"
import bashFunction from "./bash/function"
const { raw } = String

class Color {

  constructor({ componentKey, options }) {
    this._componentKey = componentKey

    if (typeof options === "object") {
      if (options.value)    { this._value    = options.value }
      if (options.command)  { this._command  = options.command }
      if (options.function) { this._function = options.function }

      this._conditions = options.conditions
    } else {
      this._value = options
      this._conditions = undefined
    }
  }

  get dependencyFunctionNames() {
    return this._isFunction ? [this._function] : []
  }

  invocation({ text }) {
    var colorString

    if (this._isValue) {
      colorString = color(this._value)
    } else {
      colorString = bashFunction({ name: this._functionName, body: "" }).invocation
    }

    return [
      colorString,
      text,
      raw`'\[\e[0m\]'`,
    ]
  }

  get _functionName() {
    return `color_${this._componentKey}`
  }

  _transformConditionValue(value) {
    return color(value)
  }

  get usesExitStatusFunction() {
    return this._isFunction && this._function == "exit_status"
  }

}

export default Behavior(Color)
