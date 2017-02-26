import test from "ava"
import dedent from "dedent"
import prompt from "../../lib/prompt"
const { raw } = String

test("component function without conditions", (t) => {
  let configuration = {
    prompt: ["character"],
    components: [{
      key: "character",
      function: "git_in_directory",
    }],
  }

  t.is(prompt(configuration), dedent(raw`
    function _promptconfig_git_in_directory() {
      git rev-parse --git-dir > /dev/null 2>&1
    }

    function _promptconfig_prompt() {
      local prompt=''
      prompt+=$(_promptconfig_git_in_directory)
      PS1=$prompt
    }

    PROMPT_COMMAND="_promptconfig_prompt; $PROMPT_COMMAND"\n
  `))
})

test("component function with conditions", (t) => {
  let configuration = {
    prompt: ["character"],
    components: [{
      key: "character",
      function: "git_in_directory",
      conditions: {
        true: "git it"
      }
    }],
  }

  t.is(prompt(configuration), dedent(raw`
    function _promptconfig_git_in_directory() {
      git rev-parse --git-dir > /dev/null 2>&1
    }

    function _promptconfig_component_character() {
      if $(_promptconfig_git_in_directory); then
        printf 'git it'
      fi
    }

    function _promptconfig_prompt() {
      local prompt=''
      prompt+=$(_promptconfig_component_character)
      PS1=$prompt
    }

    PROMPT_COMMAND="_promptconfig_prompt; $PROMPT_COMMAND"\n
  `))
})

test("color function", (t) => {
  let configuration = {
    prompt: ["character"],
    components: [{
      key: "character",
      value: "❯",
      color: {
        function: "git_in_directory",
        conditions: {
          true: "black",
        },
      }
    }],
  }

  t.is(prompt(configuration), dedent(raw`
    function _promptconfig_git_in_directory() {
      git rev-parse --git-dir > /dev/null 2>&1
    }

    function _promptconfig_color_character() {
      if $(_promptconfig_git_in_directory); then
        printf '\[\e[38;5;0m\]'
      fi
    }

    function _promptconfig_prompt() {
      local prompt=''
      prompt+=$(_promptconfig_color_character)
      prompt+='❯'
      prompt+='\[\e[0m\]'
      PS1=$prompt
    }

    PROMPT_COMMAND="_promptconfig_prompt; $PROMPT_COMMAND"\n
  `))
})
