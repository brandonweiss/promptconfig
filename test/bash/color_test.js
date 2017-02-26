import test from "ava"
import color from "../../lib/bash/color"
const { raw } = String

test("accepts ANSI 16 color names", (t) => {
  const colorNamesAndCodes = {
    black:          "0",
    red:            "1",
    green:          "2",
    yellow:         "3",
    blue:           "4",
    magenta:        "5",
    cyan:           "6",
    white:          "7",
    bright_black:   "8",
    bright_red:     "9",
    bright_green:   "10",
    bright_yellow:  "11",
    bright_blue:    "12",
    bright_magenta: "13",
    bright_cyan:    "14",
    bright_white:   "15",
  }

  Object.entries(colorNamesAndCodes).forEach(([name, code]) => {
    t.is(color(name), raw`'\[\e[38;5;${code}m\]'`)
  })
})

test("accepts ANSI 256 color codes", (t) => {
  t.is(color(124), raw`'\[\e[38;5;124m\]'`)
})
