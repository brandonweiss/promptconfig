function _promptconfig_color_prompt_character() {
  if $(exit $exit_status); then
    printf '\[\e[38;5;5m\]'
  else
    printf '\[\e[38;5;1m\]'
  fi
}

function _promptconfig_prompt() {
  local exit_status=$?
  local prompt=''
  prompt+='\n'
  prompt+=$(_promptconfig_color_prompt_character)
  prompt+='❯'
  prompt+='\[\e[0m\]'
  prompt+=' '
  PS1=$prompt
}

PROMPT_COMMAND="_promptconfig_prompt; $PROMPT_COMMAND"
