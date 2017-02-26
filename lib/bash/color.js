const { raw } = String

const colors = {
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

const ansiColorCode = (color) => {
  if (typeof color === "string") {
    return colors[color]
  } else {
    return color
  }
}

export default (color) => {
  let code = ansiColorCode(color)

  return raw`'\[\e[38;5;${code}m\]'`
}
