const sendCatalog = async (sock, sender) => {
    const catalogMessage = `🛒 Aqui está o link para nosso catálogo: [Catálogo](https://exemplo.com/catalogo)`;
    await sock.sendMessage(sender, { text: catalogMessage });
};

export default sendCatalog;
