import dedent from "dedent"

const isTrueAndFalse = (conditions) => {
  let keys = Object.keys(conditions).sort()
  return keys.length === 2 && keys[0] === "false" && keys[1] === "true"
}

const isTrue = (conditions) => {
  let keys = Object.keys(conditions)
  return keys.length === 1 && keys[0] === "true"
}

const isFalse = (conditions) => {
  let keys = Object.keys(conditions)
  return keys.length === 1 && keys[0] === "false"
}

export default ({ comparator, conditions }) => {
  comparator = `$(${comparator})`

  conditions = Object.entries(conditions).reduce((object, [key, value]) => {
    object[key] = `printf ${value}`
    return object
  }, {})

  if (isTrueAndFalse(conditions)) {
    return dedent`
      if ${comparator}; then
        ${conditions["true"]}
      else
        ${conditions["false"]}
      fi
    `
  } else if (isFalse(conditions)) {
    return dedent`
      if ! ${comparator}; then
        ${conditions["false"]}
      fi
    `
  } else if (isTrue(conditions)) {
    return dedent`
      if ${comparator}; then
        ${conditions["true"]}
      fi
    `
  } else {
    let output = []

    Object.entries(conditions).forEach(([key, value], index) => {
      let keyword = index === 0 ? "if" : "elif"

      output.push(`${keyword} [ ${comparator} -eq '${key}' ]; then`)
      output.push(`  ${value}`)
    })

    output.push("fi")

    return output.join("\n")
  }
}
