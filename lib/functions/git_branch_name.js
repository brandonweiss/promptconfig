import dedent from "dedent"
import Function from "../function"
import namespace from "../bash/namespace"
import gitInDirectory from "./git_in_directory"

let body = dedent`
  if ${namespace("git_in_directory")}; then
    printf "$(git branch 2> /dev/null | grep '^*' | colrm 1 2)"
  fi
`

export default new Function({
  name: "git_branch_name",
  body: body,
  dependencies: [
    gitInDirectory,
  ],
})
