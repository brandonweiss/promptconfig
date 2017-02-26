import test from "ava"
import dedent from "dedent"
import prompt from "../../lib/prompt"
const { raw } = String

test("component", (t) => {
  let configuration = {
    prompt: ["character"],
    components: [{
      key: "character",
      function: "exit_status",
      conditions: {
        true: "foo",
      },
    }],
  }

  t.is(prompt(configuration), dedent(raw`
    function _promptconfig_component_character() {
      if $(exit $exit_status); then
        printf 'foo'
      fi
    }

    function _promptconfig_prompt() {
      local exit_status=$?
      local prompt=''
      prompt+=$(_promptconfig_component_character)
      PS1=$prompt
    }

    PROMPT_COMMAND="_promptconfig_prompt; $PROMPT_COMMAND"\n
  `))
})

test("color", (t) => {
  let configuration = {
    prompt: ["character"],
    components: [{
      key: "character",
      value: "❯",
      color: {
        function: "exit_status",
        conditions: {
          true: "black",
        },
      }
    }],
  }

  t.is(prompt(configuration), dedent(raw`
    function _promptconfig_color_character() {
      if $(exit $exit_status); then
        printf '\[\e[38;5;0m\]'
      fi
    }

    function _promptconfig_prompt() {
      local exit_status=$?
      local prompt=''
      prompt+=$(_promptconfig_color_character)
      prompt+='❯'
      prompt+='\[\e[0m\]'
      PS1=$prompt
    }

    PROMPT_COMMAND="_promptconfig_prompt; $PROMPT_COMMAND"\n
  `))
})
