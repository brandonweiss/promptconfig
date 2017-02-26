import test from "ava"
import dedent from "dedent"
import prompt from "../../lib/prompt"
const { raw } = String

test("one-line prompt", (t) => {
  let configuration = {
    prompt: ["character"],
    components: [{
      key: "character",
      value: "❯",
    }],
  }

  t.is(prompt(configuration), dedent(raw`
    function _promptconfig_prompt() {
      local prompt=''
      prompt+='❯'
      PS1=$prompt
    }

    PROMPT_COMMAND="_promptconfig_prompt; $PROMPT_COMMAND"\n
  `))
})

test("multi-line prompt", (t) => {
  let configuration = {
    prompt: [
      ["first_line"],
      ["second_line"],
    ],
    components: [{
      key: "first_line",
      value: "foo",
    }, {
      key: "second_line",
      value: "bar",
    }],
  }

  let result = dedent`
    function _promptconfig_prompt() {
      local prompt=''
      prompt+='foo'
      prompt+='\n'
      prompt+='bar'
      PS1=$prompt
    }

    PROMPT_COMMAND="_promptconfig_prompt; $PROMPT_COMMAND"\n
  `

  t.is(prompt(configuration), raw`function _promptconfig_prompt() {
  local prompt=''
  prompt+='foo'
  prompt+='\n'
  prompt+='bar'
  PS1=$prompt
}

PROMPT_COMMAND="_promptconfig_prompt; $PROMPT_COMMAND"
`)
})

test("multi-line prompt with empty line", (t) => {
  let configuration = {
    prompt: [
      [],
      ["second_line"],
    ],
    components: [{
      key: "second_line",
      value: "foobar",
    }],
  }

  t.is(prompt(configuration), raw`function _promptconfig_prompt() {
  local prompt=''
  prompt+='\n'
  prompt+='foobar'
  PS1=$prompt
}

PROMPT_COMMAND="_promptconfig_prompt; $PROMPT_COMMAND"
`)
})
