import Function from "../function"

export default new Function({
  name: "git_in_directory",
  body: "git rev-parse --git-dir > /dev/null 2>&1",
  dependencies: [],
})
