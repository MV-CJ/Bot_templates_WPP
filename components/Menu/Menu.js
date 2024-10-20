// Menu.js
const sendMenu = async (sock, sender) => {
    const menu = `🤖: *Escolha uma das seguintes opções:* ⤵️\n
1️⃣ - Ver catálogo / Fazer Pedido
2️⃣ - Falar com especialista de vendas 
3️⃣ - Assistência Técnica-Virtual
4️⃣ - I.A Recomenda *(experimental)*
5️⃣ - Sair`;
    
    await sock.sendMessage(sender, { text: menu });
};

// Exportação padrão
export default sendMenu;
