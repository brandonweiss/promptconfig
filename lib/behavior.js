import namespace from "./bash/namespace"
import bashFunction from "./bash/function"
import conditional from "./bash/conditional"

export default (superclass) => class extends superclass {

  get _isValue() {
    return this.hasOwnProperty("_value")
  }

  get _isCommand() {
    return this.hasOwnProperty("_command")
  }

  get _isFunction() {
    return this.hasOwnProperty("_function")
  }

  get _isConditional() {
    return !!this._conditions
  }

  get _isConditionless() {
    return !this._conditions
  }

  get definition() {
    if (this._isConditionless) {
      return
    }

    var comparator

    if (this._isCommand) {
      comparator = this._command
    } else if (this._isFunction) {
      if (this._function === "exit_status") {
        comparator = `exit $${this._function}`
      } else {
        comparator = namespace(this._function)
      }
    }

    let conditions = Object.entries(this._conditions).reduce((object, [key, value]) => {
      object[key] = `${this._transformConditionValue(value)}`
      return object
    }, {})

    return bashFunction({
      name: this._functionName,
      body: conditional({
        comparator: comparator,
        conditions: conditions,
      })
    }).definition
  }

}
