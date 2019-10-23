import glob from "glob"
import Configuration from "./configuration"
import bashFunction from "./bash/function"
import throwIfValidationsFail from "./validations"

const unique = (array) => {
  return [...new Set(array)]
}

class Prompt {

  constructor(components) {
    this.components = components
  }

  get definition() {
    return [
      this._dependencyDefinitions,
      this._componentDefinitions,
      this._function.definition,
      `PROMPT_COMMAND="${this._function.name}; $PROMPT_COMMAND"\n`,
    ].filter(Boolean).join("\n\n")
  }

  get _dependencyDefinitions() {
    return unique(this._dependencies.flatMap((dependency) => dependency.definitions)).join("\n\n")
  }

  get _componentDefinitions() {
    return this.components.flatMap((component) => component.definitions).join("\n\n")
  }

  get _function() {

    let body = [
      "local prompt=''",
      ...this.components.flatMap((component) => component.invocation).map((invocation) => `prompt+=${invocation}`),
      "PS1=$prompt",
    ]

    if (this.components.some((component) => component.usesExitStatusFunction)) {
      body.unshift("local exit_status=$?")
    }

    return bashFunction({
      name: "prompt",
      body: body.filter(Boolean).join("\n"),
    })
  }

  get _dependencies() {
    let dependencyFunctionNames = this.components.flatMap((component) => component.dependencyFunctionNames).filter((functionName) => {
      return functionName !== "exit_status"
    })

    return dependencyFunctionNames.map((dependencyFunctionName) => {
      return this._dependencyFunctions.find((dependencyFunction) => {
        return dependencyFunction.name === dependencyFunctionName
      })
    })
  }

  get _dependencyFunctions() {
    return glob.sync(`${__dirname}/functions/*`).map((module) => require(module))
  }

}

export default (options) => {
  throwIfValidationsFail(options)

  let configuration = new Configuration(options)

  try {
    return new Prompt(configuration.promptComponents).definition
  } catch(_error) {
    let message = [
      "A prompt could not be generated given your configuration 😞",
      "Please report the issue with `npm issues promptconfig` 🙌🏼"
    ].join("\n")

    throw new Error(message)
  }
}
