import test from "ava"
import dedent from "dedent"
import conditional from "../../lib/bash/conditional"

test("conditions with true and false", (t) => {
  let bash = conditional({
  comparator: "function",
    conditions: {
      true: "'foo'",
      false: "'bar'",
    },
  })

  t.is(bash, dedent`
    if $(function); then
      printf 'foo'
    else
      printf 'bar'
    fi
  `)
})

test("conditions with only true", (t) => {
  let bash = conditional({
  comparator: "function",
    conditions: {
      true: "'foo'",
    },
  })

  t.is(bash, dedent`
    if $(function); then
      printf 'foo'
    fi
  `)
})

test("conditions with only false", (t) => {
  let bash = conditional({
  comparator: "function",
    conditions: {
      false: "'bar'",
    },
  })

  t.is(bash, dedent`
    if ! $(function); then
      printf 'bar'
    fi
  `)
})

test("conditions with one case", (t) => {
  let bash = conditional({
  comparator: "function",
    conditions: {
      foo: "'bar'",
    },
  })

  t.is(bash, dedent`
    if [ $(function) -eq 'foo' ]; then
      printf 'bar'
    fi
  `)
})

test("conditions with two cases", (t) => {
  let bash = conditional({
  comparator: "function",
    conditions: {
      foo: "'bar'",
      baz: "'qux'",
    },
  })

  t.is(bash, dedent`
    if [ $(function) -eq 'foo' ]; then
      printf 'bar'
    elif [ $(function) -eq 'baz' ]; then
      printf 'qux'
    fi
  `)
})
