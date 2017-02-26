import dedent from "dedent"
import Function from "../function"
import namespace from "../bash/namespace"
import gitInDirectory from "./git_in_directory"

let body = dedent`
  if ${namespace("git_in_directory")}; then
    local branch=$(git symbolic-ref HEAD 2> /dev/null | sed -e 's|^refs/heads/||')
    local revision=$(git rev-parse HEAD 2> /dev/null | cut -b 1-7)

    if [ -n $branch ]; then
      printf $branch
    else
      printf $revision
    fi
  fi
`

export default new Function({
  name: "git_branch_name",
  body: body,
  dependencies: [
    gitInDirectory,
  ],
})
