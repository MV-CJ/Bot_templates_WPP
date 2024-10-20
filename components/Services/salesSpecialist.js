const connectWithSalesSpecialist = async (sock, sender) => {
    const salesMessage = `📞 Um especialista de vendas estará com você em breve. Por favor, aguarde!`;
    await sock.sendMessage(sender, { text: salesMessage });
};

export default connectWithSalesSpecialist;
