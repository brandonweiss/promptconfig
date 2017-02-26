import test from "ava"
import dedent from "dedent"
import bashFunction from "../../lib/bash/function"

test("has a definition", (t) => {
  let result = bashFunction({
    name: "foo",
    body: "echo bar\necho baz",
  })

  t.is(result.definition, dedent`
    function _promptconfig_foo() {
      echo bar
      echo baz
    }
  `)
})

test("has a name", (t) => {
  let result = bashFunction({
    name: "foo",
    body: "echo bar",
  })

  t.is(result.name, "_promptconfig_foo")
})


test("has an invocation", (t) => {
  let result = bashFunction({
    name: "foo",
    body: "echo bar",
  })

  t.is(result.invocation, "$(_promptconfig_foo)")
})
