import dedent from "dedent"
import Function from "../function"
import namespace from "../bash/namespace"
import gitInDirectory from "./git_in_directory"
import gitUpstreamConfigured from "./git_upstream_configured"

let body = dedent`
  if ${namespace("git_in_directory")}; then
    if ${namespace("git_upstream_configured")}; then
      local commits_ahead=$(git rev-list --left-only --count HEAD...@"{u}" 2> /dev/null)
      [ $commits_ahead -gt 0 ]
    else
      false
    fi
  else
    false
  fi
`

export default new Function({
  name: "git_ahead_of_upstream",
  body: body,
  dependencies: [
    gitInDirectory,
    gitUpstreamConfigured,
  ],
})
