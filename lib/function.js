import bashFunction from "./bash/function"

export default class {

  constructor({ name, body, dependencies }) {
    this.name = name
    this.body = body
    this.dependencies = dependencies
  }

  get definitions() {
    return [
      ...this.dependencies.map((dependency) => dependency.definition),
      this.definition,
    ]
  }

  get definition() {
    return bashFunction({
      name: this.name,
      body: this.body,
    }).definition
  }

}
