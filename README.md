# Template de Bot WhatsApp usando Baileys

Este repositório fornece um template básico para iniciar um projeto de bot no WhatsApp utilizando a biblioteca [Baileys](https://github.com/adiwajshing/Baileys). O objetivo é facilitar o desenvolvimento de bots personalizados para interação com usuários no WhatsApp.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte maneira:

```
📂 auth_info/ # Armazena as informações de autenticação do WhatsApp 
📂 components/ 
┣ 📂 Connections/ # Gerencia a conexão com o WhatsApp 
┃ ┣ 📜 Connection.js # Configuração da conexão do bot com o WhatsApp 
┃ ┗ 📜 QRCode.js # Geração e exibição do QR Code para autenticação 
┣ 📂 Menu/ # Exibe o menu principal para o usuário 
┃ ┗ 📜 Menu.js # Lógica para enviar o menu de opções ao usuário 
┣ 📂 Messages/ # Gerencia as mensagens de boas-vindas 
┃ ┗ 📜 Welcome.js # Mensagem de boas-vindas ao usuário 
┗ 📂 Services/ # Contém os serviços relacionados às opções do menu 
┣ 📜 aiRecommendation.js # Serviço experimental de recomendação por IA 
┣ 📜 catalog.js # Exibe o catálogo de produtos para o usuário 
┣ 📜 exit.js # Lógica para o usuário sair do atendimento 
┣ 📜 salesSpecialist.js # Conecta o usuário com um especialista de vendas 
┗ 📜 techSupport.js # Assistência técnica virtual para o usuário 
📜 .gitignore # Arquivos e pastas ignorados no Git
📜 bot.js # Arquivo principal que inicia o bot e gerencia a lógica
📜 package-lock.json # Controle de versões do npm 
📜 package.json # Metadados do projeto e dependências 
📜 README.md # Documento de explicação do projeto
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

## Importantes

### 1. `startBot()`

Esta é a função principal que inicializa o bot. Ela gerencia a conexão com o WhatsApp e lida com as mensagens recebidas.

#### Fluxo da Função:
- **Inicializa a conexão**: Chama as funções `initializeQRCode` e `handleConnection` para estabelecer a conexão com o WhatsApp.
- **Verificação de atividade**: Define um intervalo de 5 segundos para verificar a atividade dos usuários. Se um usuário estiver inativo, o bot notifica que ele foi desconectado.
- **Recepção de mensagens**: Ouve as mensagens recebidas e processa a atividade do usuário. Se for a primeira interação ou se o usuário estiver inativo, envia uma mensagem de boas-vindas e o menu. Caso contrário, processa a escolha do menu.

### 2. `processMenuSelection(sock, sender, text)`

Esta função é responsável por processar a escolha do menu feita pelo usuário.

#### Funcionalidade:
- **Recebe**: `sock` (socket da conexão), `sender` (identificador do usuário) e `text` (opção selecionada pelo usuário).
- **Executa a ação correspondente**: Com base na escolha do usuário, chama a função apropriada para lidar com a solicitação (como exibir o catálogo ou conectar a um especialista de vendas).
- **Tratamento de entradas inválidas**: Se a opção selecionada não for válida, informa ao usuário e reexibe o menu.

### 3. `checkActivity(sock, sender)`

Esta função verifica a atividade do usuário e atualiza seu status.

#### Lógica:
- **Obtém o tempo atual**: Usa `Date.now()` para capturar o tempo em milissegundos.
- **Verifica se o usuário está ativo**: Compara a última atividade do usuário com o tempo atual. Se a diferença for maior que o limite definido, atualiza o status do usuário para inativo e envia uma mensagem de desconexão.
- **Retorna**: `true` se o usuário foi desconectado, caso contrário `false`.

### 4. `updateActivity(sender)`

Esta função atualiza a atividade do usuário toda vez que uma nova mensagem é recebida.

#### Funcionalidade:
- **Armazena a última atividade**: Registra o tempo atual como a última atividade do usuário.
- **Atualiza o estado**: Modifica o status do usuário para "ativo".

### 5. `sendWelcome(sock, sender)`

Envia uma mensagem de boas-vindas ao usuário quando ele inicia a interação com o bot.

#### Funcionalidade:
- **Recebe**: `sock` (socket da conexão) e `sender` (identificador do usuário).
- **Envia a mensagem**: Utiliza o socket para enviar uma mensagem de boas-vindas ao usuário.

### 6. `sendMenu(sock, sender)`

Exibe o menu principal para o usuário.

#### Funcionalidade:
- **Recebe**: `sock` (socket da conexão) e `sender` (identificador do usuário).
- **Envia o menu**: Utiliza o socket para enviar as opções disponíveis para o usuário.

### 7. Funções de Serviço

As funções na pasta `Services` realizam tarefas específicas de acordo com a opção selecionada pelo usuário.

#### Exemplos:
- **`sendCatalog(sock, sender)`**: Exibe o catálogo de produtos disponíveis.
- **`connectWithSalesSpecialist(sock, sender)`**: Conecta o usuário a um especialista de vendas.
- **`sendTechSupport(sock, sender)`**: Oferece assistência técnica ao usuário.
- **`sendAIRecommendation(sock, sender)`**: Sugere produtos com base em inteligência artificial.
- **`handleExit(sock, sender)`**: Permite que o usuário finalize a interação com o bot.

### 8. `activityChecker.js`

Este arquivo contém as funções relacionadas à verificação da atividade do usuário.

#### Principais Funções:
- **`checkActivity(sock, sender)`**: Verifica se o usuário está ativo ou inativo.
- **`updateActivity(sender)`**: Atualiza a última atividade do usuário.

#### Variáveis:
- **`userActivity`**: Um objeto que armazena a última atividade e o status (ativo ou inativo) de cada usuário.
- **`TIMEOUT_LIMIT`**: Define o limite de inatividade em milissegundos.


## Como Usar Este Template

Para usar este template como base para seu projeto:

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/SEU_USUARIO/nome_do_repositorio.git
   cd nome_do_repositorio

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
