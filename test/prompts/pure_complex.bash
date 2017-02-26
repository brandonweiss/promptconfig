function _promptconfig_working_directory() {
  dirs +0
}

function _promptconfig_git_in_directory() {
  git rev-parse --git-dir > /dev/null 2>&1
}

function _promptconfig_git_branch_name() {
  if _promptconfig_git_in_directory; then
    local branch=$(git symbolic-ref HEAD 2> /dev/null | sed -e 's|^refs/heads/||')
    local revision=$(git rev-parse HEAD 2> /dev/null | cut -b 1-7)

    if [ -n $branch ]; then
      printf $branch
    else
      printf $revision
    fi
  fi
}

function _promptconfig_git_upstream_configured() {
  git rev-parse --abbrev-ref @'{u}' > /dev/null 2>&1
}

function _promptconfig_git_behind_upstream() {
  if _promptconfig_git_in_directory; then
    if _promptconfig_git_upstream_configured; then
      local commits_behind=$(git rev-list --right-only --count HEAD...@"{u}" 2> /dev/null)
      [ $commits_behind -gt 0 ]
    else
      false
    fi
  else
    false
  fi
}

function _promptconfig_git_ahead_of_upstream() {
  if _promptconfig_git_in_directory; then
    if _promptconfig_git_upstream_configured; then
      local commits_ahead=$(git rev-list --left-only --count HEAD...@"{u}" 2> /dev/null)
      [ $commits_ahead -gt 0 ]
    else
      false
    fi
  else
    false
  fi
}

function _promptconfig_component_git_behind_upstream() {
  if $(_promptconfig_git_behind_upstream); then
    printf '⇣'
  fi
}

function _promptconfig_component_git_ahead_of_upstream() {
  if $(_promptconfig_git_ahead_of_upstream); then
    printf '⇡'
  fi
}

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
  prompt+='\[\e[38;5;4m\]'
  prompt+=$(_promptconfig_working_directory)
  prompt+='\[\e[0m\]'
  prompt+=' '
  prompt+='\[\e[38;5;242m\]'
  prompt+=$(_promptconfig_git_branch_name)
  prompt+='\[\e[0m\]'
  prompt+=' '
  prompt+='\[\e[38;5;6m\]'
  prompt+=$(_promptconfig_component_git_behind_upstream)
  prompt+='\[\e[0m\]'
  prompt+='\[\e[38;5;6m\]'
  prompt+=$(_promptconfig_component_git_ahead_of_upstream)
  prompt+='\[\e[0m\]'
  prompt+='\n'
  prompt+=$(_promptconfig_color_prompt_character)
  prompt+='❯'
  prompt+='\[\e[0m\]'
  prompt+=' '
  PS1=$prompt
}

PROMPT_COMMAND="_promptconfig_prompt; $PROMPT_COMMAND"
