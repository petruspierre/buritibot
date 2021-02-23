import { prefix } from '../../../config.json';

function listemTelegramCommands(bot, client) {
  bot.on('message', async (msg) => {
    if (msg.text) {
      const content = msg.text.toLowerCase();
      if (!content.startsWith(prefix)) return;

      const args = content.slice(prefix.length).split(/ +/);
      const commandName = args.shift().toLowerCase();

      const command = client.commands.get(commandName)
        || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

      if (!command) return bot.sendMessage(msg.chat.id, 'Não entendi, tem certeza que esse comando existe?');

      if (!command.telegram) return bot.sendMessage(msg.chat.id, 'Desculpe, esse comando não está disponível para o Telegram');

      if (command.disabled) return bot.sendMessage(msg.chat.id, 'Desculpe, esse comando está desativado');

      if (command.args && !args.length) {
        let reply = 'Preciso de mais informações para executar esse comando!';

        if (command.usage) {
          reply += `\nA maneira correta é: \`\`\` ${prefix}${command.name} ${command.usage}\`\`\``;
        }

        return bot.sendMessage(msg.chat.id, reply, { parse_mode: 'Markdown' });
      }

      try {
        command.execute_telegram(bot, msg, args, client.commands);
      } catch (error) {
        console.error(error);
        bot.sendMessage(msg.chat.id, 'ocorreu um erro ao tentar executar esse comando');
      }
    }
  });
}

export default listemTelegramCommands;
