const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName('Install Plugin')
    .setType(ApplicationCommandType.Message),
  
  async execute(interaction) {
    try {
      const message = interaction.targetMessage;
      const content = message.content;
      
      // Check if this is a valid plugins list message
      if (!content.includes('[') || !content.includes('](')) {
        return await interaction.reply({
          content: '❌ No plugins found in this message. Use this on a plugin list.',
          flags: 64 // Ephemeral
        });
      }

      // Parse plugin links from the message
      const plugins = [];
      const lines = content.split('\n\n');
      
      for (const line of lines) {
        const match = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (match) {
          plugins.push({
            name: match[1],
            url: match[2]
          });
        }
      }

      if (plugins.length === 0) {
        return await interaction.reply({
          content: '❌ No plugins found.',
          flags: 64
        });
      }

      // Create plugin list for user
      let pluginList = '**Plugins available:**\n';
      plugins.forEach((plugin, index) => {
        pluginList += `${index + 1}. [${plugin.name}](${plugin.url})\n`;
      });

      pluginList += `\n**Total: ${plugins.length} plugin${plugins.length !== 1 ? 's' : ''}**`;

      await interaction.reply({
        content: pluginList,
        flags: 64 // Ephemeral - only visible to the user
      });
    } catch (err) {
      console.error('Error in install context menu:', err);
      await interaction.reply({
        content: '❌ Error processing plugins.',
        flags: 64
      });
    }
  }
};
