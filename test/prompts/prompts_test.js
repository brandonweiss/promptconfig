import test from "ava"
import { readFileSync } from "fs"
import prompt from "../../lib/prompt"

const read = (path) => {
  return readFileSync(path).toString()
}

test("generates a simple Pure prompt", (t) => {
  let json = read("test/prompts/pure_simple.json")
  let configuration = JSON.parse(json)

  let bash = read("test/prompts/pure_simple.bash")

  t.is(prompt(configuration), bash)
})

test("generates a complex Pure prompt", (t) => {
  let json = read("test/prompts/pure_complex.json")
  let configuration = JSON.parse(json)

  let bash = read("test/prompts/pure_complex.bash")

  t.is(prompt(configuration), bash)
})
