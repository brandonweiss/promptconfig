import test from "ava"
import dedent from "dedent"
import prompt from "../../lib/prompt"
const { raw } = String

test("implicit ANSI color name", (t) => {
  let configuration = {
    prompt: ["character"],
    components: [{
      key: "character",
      value: "❯",
      color: "white",
    }],
  }

  t.is(prompt(configuration), dedent(raw`
    function _promptconfig_prompt() {
      local prompt=''
      prompt+='\[\e[38;5;7m\]'
      prompt+='❯'
      prompt+='\[\e[0m\]'
      PS1=$prompt
    }

    PROMPT_COMMAND="_promptconfig_prompt; $PROMPT_COMMAND"\n
  `))
})

test("implicit ANSI color code", (t) => {
  let configuration = {
    prompt: ["character"],
    components: [{
      key: "character",
      value: "❯",
      color: 132,
    }],
  }

  t.is(prompt(configuration), dedent(raw`
    function _promptconfig_prompt() {
      local prompt=''
      prompt+='\[\e[38;5;132m\]'
      prompt+='❯'
      prompt+='\[\e[0m\]'
      PS1=$prompt
    }

    PROMPT_COMMAND="_promptconfig_prompt; $PROMPT_COMMAND"\n
  `))
})

test("explicit ANSI color name", (t) => {
  let configuration = {
    prompt: ["character"],
    components: [{
      key: "character",
      value: "❯",
      color: {
        value: "white",
      },
    }],
  }

  t.is(prompt(configuration), dedent(raw`
    function _promptconfig_prompt() {
      local prompt=''
      prompt+='\[\e[38;5;7m\]'
      prompt+='❯'
      prompt+='\[\e[0m\]'
      PS1=$prompt
    }

    PROMPT_COMMAND="_promptconfig_prompt; $PROMPT_COMMAND"\n
  `))
})

test("explicit ANSI color code", (t) => {
  let configuration = {
    prompt: ["character"],
    components: [{
      key: "character",
      value: "❯",
      color: {
        value: 132,
      },
    }],
  }

  t.is(prompt(configuration), dedent(raw`
    function _promptconfig_prompt() {
      local prompt=''
      prompt+='\[\e[38;5;132m\]'
      prompt+='❯'
      prompt+='\[\e[0m\]'
      PS1=$prompt
    }

    PROMPT_COMMAND="_promptconfig_prompt; $PROMPT_COMMAND"\n
  `))
})
