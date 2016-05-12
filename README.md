This plugin allows channels to define their own commands for AKP48Squared to respond to.

# Installation

This plugin is included by default on new installations of AKP48Squared. No further installation is needed.

# Usage
See the commands section below for detailed information on the usage of commands. The basics are pretty simple. You use `addCustom` to add your command, then your users can use the command. For example, in a default IRC instance, if you were to do `.addCustom test This is a test.`, users in the channel could then do `.test`, which would result in AKP48Squared responding to them, "This is a test."

# Commands

`addCustom`: Adds (or updates) a custom command.  
Usage: `addCustom <commandName> <responseText...>`  
Example: `addCustom test This is a test.`  
Required Permissions: `['AKP48.owner', 'AKP48.op', 'irc.channel.owner', 'irc.channel.op', 'irc.channel.halfop']`

`rmCustom`: Removes a custom command.  
Usage: `rmCustom <commandName>`  
Example: `rmCustom test`  
Required Permissions: `['AKP48.owner', 'AKP48.op', 'irc.channel.owner', 'irc.channel.op', 'irc.channel.halfop']`

# Config

custom-commands saves all of its command data to a file called `commands.json` in the root of the custom-commands directory (normally under node_modules in a default AKP48Squared installation). custom-commands can be configured solely using commands, without any manual JSON editing required.

# Issues

If you come across any issues, you can report them on this GitHub repo [here](https://github.com/AKP48Squared/custom-commands/issues).
