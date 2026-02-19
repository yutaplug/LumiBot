const HOIST_CHARS = /^[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?0-9\s]+/;

module.exports = {
  name: 'dehoist',
  async execute(client) {
    // Listen for new members joining
    client.on('guildMemberAdd', async (member) => {
      await dehoistMember(member);
    });

    // Listen for member updates (username/nickname changes)
    client.on('guildMemberUpdate', async (oldMember, newMember) => {
      if (oldMember.displayName !== newMember.displayName) {
        await dehoistMember(newMember);
      }
    });

    console.log('Dehoist module initialized');
  }
};

async function dehoistMember(member) {
  const name = member.displayName;
  if (HOIST_CHARS.test(name)) {
    const newName = name.replace(HOIST_CHARS, '').trim();
    const finalName = newName || 'Unhoisted User';
    
    try {
      if (member.manageable) {
        await member.setNickname(finalName, 'Dehoisting - Illegal characters at start of name');
      }
    } catch (err) {
      console.error(`Failed to dehoist ${member.user.tag}:`, err);
    }
  }
}
