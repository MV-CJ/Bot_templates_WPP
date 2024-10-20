# Template de Bot WhatsApp usando Baileys

Este repositório fornece um template básico para iniciar um projeto de bot no WhatsApp utilizando a biblioteca [Baileys](https://github.com/adiwajshing/Baileys). O objetivo é facilitar o desenvolvimento de bots personalizados para interação com usuários no WhatsApp.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte maneira:

```
/projeto
│
├── /components
│   ├── /connections
│   │   ├── connection.js      # Gerencia a conexão com o WhatsApp
│   │   └── qrcode.js          # Gera e exibe o QR Code para autenticação
│   │
│   ├── /Messages
│   │   ├── Welcome.js          # Envia uma mensagem de boas-vindas ao usuário
│   │   └── Menu.js             # Exibe um menu de opções para o usuário
│   │
│   └── app.js                  # Ponto de entrada do bot
│
└── package.json                 # Gerenciador de dependências do projeto
```

## Funcionalidades do Bot

### 1. Conexão com WhatsApp

O bot inicia gerando um QR Code que deve ser escaneado pelo usuário. O arquivo `connection.js` gerencia essa conexão.

### 2. Mensagem de Boas-vindas

Assim que o usuário enviar uma mensagem, o bot responde com uma saudação através do componente `Welcome.js`. O objetivo é acolher o usuário e informá-lo sobre as opções de atendimento disponíveis.

### 3. Menu de Opções

Após a saudação, o bot exibe um menu de opções utilizando o componente `Menu.js`. O menu contém as seguintes opções:

```
1️⃣ - Ver catálogo / Fazer Pedido
2️⃣ - Falar com especialista de vendas
3️⃣ - Assistência Técnica-Virtual
4️⃣ - I.A Recomenda *(experimental)*
5️⃣ - Sair
```

### 4. Interação do Usuário

O bot espera que o usuário escolha uma opção digitando o número correspondente. Se o usuário enviar um texto que não corresponda a uma das opções, o bot informa que não entendeu e reexibe o menu.

### 5. Respostas Baseadas na Escolha do Usuário

Dependendo da opção escolhida pelo usuário, o bot pode chamar outras funções específicas para continuar o atendimento. Isso permite que o bot seja facilmente expandido com novas funcionalidades.

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
   node components/app.js
   ```

5. **Escaneie o QR Code** para autenticar a conexão com o WhatsApp.

## Contribuição

Sinta-se à vontade para fazer melhorias ou adicionar novas funcionalidades ao bot. Para isso, basta criar um fork do repositório, fazer suas alterações e enviar um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
