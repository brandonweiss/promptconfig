import indentString from "indent-string"
import namespace from "./namespace"

export default ({ name, body }) => {
  let namespacedName = namespace(name)

  let definition = [
    `function ${namespacedName}() {`,
    indentString(body, 2),
    "}"
  ].join("\n")

  return {
    definition: definition,
    name: namespacedName,
    invocation: `$(${namespacedName})`,
  }
}
