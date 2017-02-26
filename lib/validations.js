export default (options) => {

  if (!options.hasOwnProperty("prompt")) {
    throw new Error("`prompt` key is missing.")
  }

  if (!Array.isArray(options.prompt)) {
    throw new Error("`prompt` key must be an array or array of arrays.")
  }

  if (options.prompt.length === 0) {
    throw new Error("`prompt` key contains no components.")
  }

  if (!options.hasOwnProperty("components")) {
    throw new Error("`components` key is missing.")
  }

  options.components.forEach((component) => {
    if (component.hasOwnProperty("conditions") && Object.keys(component.conditions).length === 0) {
      throw new Error(`Conditions of “${component.key}” component cannot be empty.`)
    }

    if (component.function === "exit_status" && !component.hasOwnProperty("conditions")) {
      throw new Error(`“exit_status” function for “character” component must have conditions.`)
    }

    if (!component.hasOwnProperty("color")) {
      return
    }

    let color = component.color

    if (color.hasOwnProperty("command") && !color.hasOwnProperty("conditions")) {
      throw new Error(`Color command for “${component.key}” component must have conditions.`)
    }

    if (color.hasOwnProperty("function") && !color.hasOwnProperty("conditions")) {
      throw new Error(`Color function for “${component.key}” component must have conditions.`)
    }

    if (color.hasOwnProperty("conditions") && Object.keys(color.conditions).length === 0) {
      throw new Error(`Conditions for color of “${component.key}” component cannot be empty.`)
    }
  })

}
