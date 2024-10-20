const sendTechSupport = async (sock, sender) => {
    const techMessage = `🔧 Assistência técnica virtual: Como podemos ajudar com seu dispositivo?`;
    await sock.sendMessage(sender, { text: techMessage });
};

export default sendTechSupport;
