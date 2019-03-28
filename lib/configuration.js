import Component from "./component"
import newlineComponent from "./components/newline"
import spaceComponent from "./components/space"

const intersperse = (array, value) => {
  return array.reduce((a, b) => a.concat(value, b))
}

export default class {

  constructor(options) {
    this.options = options
    this.prompt = options.prompt
    this.components = options.components
  }

  get promptComponents() {
    return this._promptComponentKeys.map((componentKey) => {
      return this._findComponent({ key: componentKey })
    })
  }

  get _promptComponentKeys() {
    let prompt = this.prompt

    if (!Array.isArray(prompt[0])) {
      prompt = [prompt]
    }

    return intersperse(prompt, ["newline"]).flat(2)
  }

  _findComponent({ key }) {
    return [
      ...this._components,
      ...this._builtinComponents,
    ].find((component) => component.key === key)
  }

  get _components() {
    return this.components.map((component) => {
      return new Component({
        key: component.key,
        value: component.value,
        function: component.function,
        command: component.command,
        conditions: component.conditions,
        color: component.color,
      })
    })
  }

  get _builtinComponents() {
    return [
      newlineComponent,
      spaceComponent,
    ]
  }

}
