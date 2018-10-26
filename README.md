<h1 align="center">
	<br>
	<img src="media/logomark.svg?sanitize=true" width="300px" alt="PromptConfig">
	<br>
	<br>
  PromptConfig
	<br>
	<br>
</h1>

[![](https://badgen.net/travis/brandonweiss/promptconfig?icon=travis)](https://www.travis-ci.com/brandonweiss/promptconfig)
[![](https://badgen.net/npm/v/promptconfig?icon=npm)](https://www.npmjs.com/package/promptconfig)
![](https://badgen.net/npm/node/promptconfig)
[![](https://badgen.net/david/dep/brandonweiss/promptconfig)](https://david-dm.org/brandonweiss/promptconfig)
![](https://badgen.net/badge/documentation/lit/purple)

### What?

Craft a custom terminal prompt with JSON.

You describe your prompt expressively in JSON and then it gets compiled to Bash. A very simple prompt might look like this:

```json
{
  "prompt": ["character", "space"],
  "components": [
    {
      "key": "character",
      "value": "❯",
      "color": "magenta"
    }
  ]
}
```

And it will generate Bash that looks like this:

```bash
function _promptconfig_prompt() {
  local prompt=''
  prompt+='\[\e[38;5;5m\]'
  prompt+='❯'
  prompt+='\[\e[0m\]'
  prompt+=' '
  PS1=$prompt
}

PROMPT_COMMAND="_promptconfig_prompt; $PROMPT_COMMAND"
```

### Why?

Bash is hard. It’s an arcane language and environment with a steep learning curve. Most programmers wind up using it on a very superficial level, figuring out just enough to get done what they need to do.

Unfortunately, customizing your prompt correctly requires a disproportionately high understanding of how Bash and the terminal work relative to what you’re trying to actually do. The internet is filled with recommendations that will break your prompt in subtle ways that aren’t immediately obvious and later you might not understand are caused by your custom prompt. I’m speaking from personal experience. 😭

The bar It really shouldn’t have to be that complicated and hopefully

## Installation

Install it globally:

```shell
❯ npm install --global promptconfig
```

Or using Yarn:

```shell
❯ yarn global add promptconfig
```

## Usage

Once you’ve configured your prompt in JSON, run `promptconfig`, passing in the path to the JSON file.

```shell
❯ promptconfig <JSON configuration file>
```

You probably want to redirect the output to a Bash file, e.g.

```shell
❯ promptconfig prompt.json > ~/prompt.bash
```

Then put `source prompt.bash` in your `~/.bashrc` or `~/.bash_profile`, whichever you have/use. Open a new Terminal window and you should see your new prompt!

### Configuration

There are two parts to the configuration: `prompt` and `components`. `prompt` defines the structure/layout of your prompt using both built-in and custom components. `components` defines the custom components you use in `prompt`.

### Prompt

The simplest form of the `prompt` configuration is just an array of component keys.

```json
{
  "prompt": ["character", "space"]
}
```

The array represents one line of your prompt. If you want your prompt to appear on multiple lines, you can use the built-in `newline` component.

```json
{
  "prompt": ["working_directory", "newline", "character", "space"]
}
```

`prompt` can also be an array of arrays.

```json
{
  "prompt": [
    ["working_directory"],
    ["character", "space"]
  ]
}
```

Each array represents a line in the prompt. For multi-line prompts it’s a bit clearer than using the `newline` component.

If you want a blank line in your prompt to visually break up commands, you can use an empty array.

```json
{
  "prompt": [
    [],
    ["character", "space"]
  ]
}
```

### Components

There are two built-in components that are available as a convenience: `newline` and `space.` Any other component you want you’ll need to create.

Every component must have a `key` and `value`, `function`, or `command`. Optionally, some components can have `conditions` and `color`.

`key` is a unique string used to reference the component in the `prompt` configuration and control its position in the prompt.

`value`, `function`, and `command` are types that control how the component behaves.

#### Value

The simplest type is `value`. You can use it to output plain text.

```json
{
  "components": [
    {
      "key": "character",
      "value": "❯",
    }
  ]
}
```

#### Command

A more complex type is `command`. You can use it to execute arbitrary shell commands.

```json
{
  "components": [
    {
      "key": "username",
      "command": "whoami",
    }
  ]
}
```

**NB**: When writing commands with backslash escapes, remember to use _two_ backslashes, e.g. `"\\n"`. The first backslash is escaping the second backslash in the JSON and will not show up in the final Bash output. The second backslash is for Bash and will show up in the final Bash output.

#### Function

The last type is `function`. It allows you to use built-in, predefined commands.

```json
{
  "components": [
    {
      "key": "working_directory",
      "function": "working_directory",
    }
  ]
}
```

The available functions are:

* `working_directory`: Returns the current git branch name
* `git_branch_name`: Returns the current git branch name
* `git_behind_upstream`: Returns whether there are commits upstream waiting to be pulled
* `git_ahead_of_upstream`: Returns whether there are commits locally waiting to be pushed
* `exit_status`: Returns whether the previously executed command was successful

If there is a command that you think is generic and widely-used enough to be included as a function, please open a pull request!

You’ll notice that some functions like `working_directory` return text, while others like `git_behind_upstream` indicate true or false. You can make use of the boolean functions with `conditions`.

#### Conditions

Conditions allow you compare the return value of a command or function and return other plain text instead.

If the conditions are `true` and `false`, only `true`, or only `false`, then it’s assumed you want to check whether the command or function exited successfully or not.

```json
{
  "components": [
    {
      "key": "exit_status",
      "function": "exit_status",
      "conditions": {
        "true": "✅",
        "false": "❌"
      }
    }
  ]
}
```

If the conditions are anything else, it’s assumed you want to compare equality against what the command or function returned.

```json
{
  "components": [
    {
      "key": "username",
      "command": "whoami",
      "conditions": {
        "brandon": "👨‍💻",
        "root": "🔒"
      }
    }
  ]
}
```

#### Color

What would a prompt be without pretty colors? `color` can be an ANSI 16 color name or an ANSI 256 color code.

##### ANSI 16 color name

The actual color values these names represent are typically controlled by settings in your Terminal app. Most Terminal apps have the concept of “themes” that allow you to change these values. It’s generally preferable to use ANSI 16 color names to color your prompt so that your Terminal uses colors consistently.

1. `black`
2. `red`
3. `green`
4. `yellow`
5. `blue`
6. `magenta`
7. `cyan`
8. `white`
9. `bright_black`
10. `bright_red`
11. `bright_green`
12. `bright_yellow`
13. `bright_blue`
14. `bright_magenta`
15. `bright_cyan`
16. `bright_white`

```json
{
  "components": [
    {
      "key": "character",
      "value": "❯",
      "color": "magenta"
    }
  ]
}
```

##### ANSI 256 color code

If you have a very specific color you want to use you can choose any [ANSI 256 color code][ANSI 256]—a number between 0 and 255.

```json
{
  "components": [
    {
      "key": "character",
      "value": "❯",
      "color": 124
    }
  ]
}
```

##### Behavior

Defining `color` like that is actually a shorthand. For example, this:

```json
{
  "components": [
    {
      "key": "character",
      "value": "❯",
      "color": "magenta"
    }
  ]
}
```

Is equivalent to this:

```json
{
  "components": [
    {
      "key": "character",
      "value": "❯",
      "color": {
        "value": "magenta",
      }
    }
  ]
}
```

`color` has behavior in the same way `components` have behavior. That means `color` can have a `value`, `command`, or `function`, and optionally `conditions`.

```json
{
  "components": [
    {
      "key": "character",
      "value": "❯",
      "color": {
        "function": "exit_status",
        "conditions": {
          "true": "magenta",
          "false": "red"
        }        
      }
    }
  ]
}
```

This is an example of using the `exit_status` function to conditionally color the prompt character to “magenta” if the last command was successful or “red” if it was unsuccessful.

## Contributing

Bug reports and pull requests are welcome on [GitHub][github-promptconfig].

## License

The package is available as open source under the terms of the [MIT License][MIT-license].

[ANSI 256]: https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit
[github-promptconfig]: https://github.com/brandonweiss/promptconfig
[MIT-License]: http://opensource.org/licenses/MIT
