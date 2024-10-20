# Template de Bot WhatsApp usando Baileys

Este repositório fornece um template básico para iniciar um projeto de bot no WhatsApp utilizando a biblioteca [Baileys](https://github.com/adiwajshing/Baileys). O objetivo é facilitar o desenvolvimento de bots personalizados para interação com usuários no WhatsApp.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte maneira:

```
📂 auth_info/               # Armazena as informações de autenticação do WhatsApp
📂 components/
 ┣ 📂 Connections/           # Gerencia a conexão com o WhatsApp
 ┃ ┣ 📜 Connection.js        # Configuração da conexão do bot com o WhatsApp
 ┃ ┗ 📜 QRCode.js            # Geração e exibição do QR Code para autenticação
 ┣ 📂 Menu/                  # Exibe o menu principal para o usuário
 ┃ ┗ 📜 Menu.js              # Lógica para enviar o menu de opções ao usuário
 ┣ 📂 Messages/              # Gerencia as mensagens de boas-vindas
 ┃ ┗ 📜 Welcome.js           # Mensagem de boas-vindas ao usuário
 ┗ 📂 Services/              # Contém os serviços relacionados às opções do menu
   ┣ 📜 aiRecommendation.js  # Serviço experimental de recomendação por IA
   ┣ 📜 catalog.js           # Exibe o catálogo de produtos para o usuário
   ┣ 📜 exit.js              # Lógica para o usuário sair do atendimento
   ┣ 📜 salesSpecialist.js   # Conecta o usuário com um especialista de vendas
   ┗ 📜 techSupport.js       # Assistência técnica virtual para o usuário
📜 .gitignore                # Arquivos e pastas ignorados no Git
📜 bot.js                    # Arquivo principal que inicia o bot e gerencia a lógica
📜 package-lock.json         # Controle de versões do npm
📜 package.json              # Metadados do projeto e dependências
📜 README.md                 # Documento de explicação do projeto

```

## Como Funciona

Este projeto foi desenvolvido para ser um ponto de partida para criar um bot personalizado no WhatsApp. O bot é capaz de receber mensagens dos usuários e responder com um menu de opções, permitindo que eles escolham o que desejam fazer. Cada opção leva a um serviço específico.

### Conexão com o WhatsApp

A pasta `Connections` contém os arquivos necessários para gerenciar a conexão do bot com o WhatsApp:

- **Connection.js**: Gerencia a configuração de conexão do bot usando a biblioteca Baileys.
- **QRCode.js**: Exibe o QR Code necessário para autenticar a sessão do bot.

### Menu e Boas-Vindas

- **Menu.js**: Quando o usuário envia uma mensagem, o bot exibe um menu com várias opções, como visualizar o catálogo, falar com um especialista ou acessar a assistência técnica.
- **Welcome.js**: Envia uma mensagem de boas-vindas quando o bot recebe uma mensagem pela primeira vez.

### Serviços do Menu

A pasta `Services` contém as lógicas associadas às opções do menu:

- **aiRecommendation.js**: Recomenda produtos com base em uma IA experimental.
- **catalog.js**: Mostra o catálogo de produtos.
- **exit.js**: Permite que o usuário saia do atendimento.
- **salesSpecialist.js**: Conecta o usuário a um especialista de vendas.
- **techSupport.js**: Oferece assistência técnica virtual ao usuário.

### Respostas Personalizadas

Se o usuário enviar uma mensagem que não corresponde a uma das opções do menu, o bot informará que não entendeu o comando e exibirá o menu novamente.

## Como Usar Este Template

Para usar este template como base para seu projeto:

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/SEU_USUARIO/nome_do_repositorio.git
   cd nome_do_repositorio
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Configure o projeto**:

   Adicione suas configurações específicas (como chaves de API ou informações do banco de dados) conforme necessário.

4. **Execute o bot**:

   ```bash
   node bot.js
   ```

5. **Escaneie o QR Code** para autenticar a conexão com o WhatsApp.

## Contribuição

Sinta-se à vontade para fazer melhorias ou adicionar novas funcionalidades ao bot. Para isso, basta criar um fork do repositório, fazer suas alterações e enviar um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
