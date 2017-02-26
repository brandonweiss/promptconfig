import test from "ava"
import namespace from "../../lib/bash/namespace"

test("namespaces a string", (t) => {
  t.is(namespace("foo"), "_promptconfig_foo")
})
