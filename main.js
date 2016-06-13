'use strict';

class Custom extends global.AKP48.pluginTypes.MessageHandler {
  constructor(AKP48) {
    super(AKP48, 'CustomCmds');
  }

  load() {
    if(!this._config.commands) {
      global.logger.error(`${this.name}: No config loaded.`);
      this._config.commands = [];
    }
  }
}

Custom.prototype.handleCommand = function (context) {
  global.logger.silly(`${this.name}: Received command.`);

  var command = context.command();

  if(command.toLowerCase() === 'addcustom') {
    return context.reply(this.addCustom(context));
  }

  if(command.toLowerCase() === 'rmcustom') {
    return context.reply(this.rmCustom(context));
  }

  for (var i = 0; i < this._config.commands.length; i++) {
    var cmd = this._config.commands[i];
    if(cmd.name.toLowerCase() === command.toLowerCase() &&
       cmd.instanceId === context.instanceId() && cmd.channel === context.to()) {

      global.logger.silly(`${this.name}: Handling ${cmd.name}`);
      var out = this._config.commands[i].response;

      if(context.argText().length) {
        out = `${context.argText()}: ${out}`;
        context.setCustomData('noPrefix', true);
      }

      return context.reply(out);
    }
  }
};

Custom.prototype.addCustom = function (context) {
  global.logger.silly(`${this.name}: Handling addCustom.`);
  //TODO: permissions check.
  var resp = context.rawArgs();
  var cmdName = resp.shift();
  resp = resp.join(' ');

  var cmd = {
    name: cmdName,
    response: resp,
    instanceId: context.instanceId(),
    channel: context.to()
  };

  this._config.commands.push(cmd);

  this.saveCmds();

  return `Added command "${cmdName}"`;
};

Custom.prototype.rmCustom = function (context) {
  global.logger.silly(`${this.name}: Handling rmCustom.`);
  //TODO: permissions check.
  var cmdName = context.rawArgs()[0];
  var changed = false;

  for (var i = 0; i < this._config.commands.length; i++) {
    var cmd = this._config.commands[i];
    if(cmd.name.toLowerCase() === cmdName.toLowerCase() &&
       cmd.instanceId === context.instanceId() && cmd.channel === context.to()) {
      this._config.commands.splice(i, 1);
      changed = true;
    }
  }

  if(changed) {
    this.saveCmds();
    return `Removed command "${cmdName}"`;
  } else {
    return `No commands by that name were found!`;
  }
};

Custom.prototype.saveCmds = function () {
  if(this.disableSaving) {
    global.logger.silly(`${this.name}: Refusing to save; saving is disabled.`);
    return;
  }

  this.saveConfig();
};

module.exports = Custom;
