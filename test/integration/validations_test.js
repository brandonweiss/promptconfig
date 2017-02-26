import test from "ava"
import prompt from "../../lib/prompt"

test("no prompt key", (t) => {
  let configuration = {
    components: [{
      key: "character",
      value: "$",
    }],
  }

  let error = t.throws(() => {
    prompt(configuration)
  })

  t.is(error.message, "`prompt` key is missing.")
})

test("prompt key is not an array ", (t) => {
  let configuration = {
    prompt: undefined,
  }

  let error = t.throws(() => {
    prompt(configuration)
  })

  t.is(error.message, "`prompt` key must be an array or array of arrays.")
})

test("prompt key is empty", (t) => {
  let configuration = {
    prompt: [],
  }

  let error = t.throws(() => {
    prompt(configuration)
  })

  t.is(error.message, "`prompt` key contains no components.")
})

test("no components key", (t) => {
  let configuration = {
    prompt: ["character"],
  }

  let error = t.throws(() => {
    prompt(configuration)
  })

  t.is(error.message, "`components` key is missing.")
})

test("component function with “exit_status” has conditions", (t) => {
    let configuration = {
      prompt: ["character"],
      components: [
        {
          key: "character",
          function: "exit_status",
        }
      ],
    }

    let error = t.throws(() => {
      prompt(configuration)
    })

    t.is(error.message, "“exit_status” function for “character” component must have conditions.")
})

test("color command has conditions", (t) => {
  let configuration = {
    prompt: ["character"],
    components: [
      {
        key: "character",
        command: "whoami",
        color: {
          command: "whoami",
        }
      }
    ],
  }

  let error = t.throws(() => {
    prompt(configuration)
  })

  t.is(error.message, "Color command for “character” component must have conditions.")
})

test("color function has conditions", (t) => {
  let configuration = {
    prompt: ["character"],
    components: [
      {
        key: "character",
        command: "whoami",
        color: {
          function: "exit_status",
        }
      }
    ],
  }

  let error = t.throws(() => {
    prompt(configuration)
  })

  t.is(error.message, "Color function for “character” component must have conditions.")
})

test("component conditions not empty", (t) => {
  let configuration = {
    prompt: ["character"],
    components: [
      {
        key: "character",
        command: "whoami",
        conditions: {},
      }
    ],
  }

  let error = t.throws(() => {
    prompt(configuration)
  })

  t.is(error.message, "Conditions of “character” component cannot be empty.")
})

test("color conditions not empty", (t) => {
  let configuration = {
    prompt: ["character"],
    components: [
      {
        key: "character",
        command: "whoami",
        color: {
          command: "whoami",
          conditions: {},
        }
      }
    ],
  }

  let error = t.throws(() => {
    prompt(configuration)
  })

  t.is(error.message, "Conditions for color of “character” component cannot be empty.")
})
