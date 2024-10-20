const sendAIRecommendation = async (sock, sender) => {
    const aiMessage = `🤖 Baseado em suas preferências, nossa I.A. recomenda o seguinte produto: [Produto Recomendado](https://exemplo.com/produto)`;
    await sock.sendMessage(sender, { text: aiMessage });
};

export default sendAIRecommendation;
