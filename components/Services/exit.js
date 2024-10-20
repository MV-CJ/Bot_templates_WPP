const handleExit = async (sock, sender) => {
    const exitMessage = `👋 Obrigado por nos contatar! Se precisar de mais alguma coisa, estamos à disposição. Até mais!`;
    await sock.sendMessage(sender, { text: exitMessage });
};

export default handleExit;
