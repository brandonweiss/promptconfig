import Function from "../function"

export default new Function({
  name: "git_upstream_configured",
  body: "git rev-parse --abbrev-ref @'{u}' > /dev/null 2>&1",
  dependencies: [],
})
