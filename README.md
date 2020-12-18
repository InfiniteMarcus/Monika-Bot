# Monika bot

## Conceito
O projeto **Monika bot** se baseia na criação de um bot de propósito geral para a plataforma Discord, utilizando-se de do módulo [discord.js](https://github.com/discordjs/discord.js), em Node.js, para acessar a API da mesma e fornecer diversos comandos úteis para os usuários (principalmente do HackoonSpace).

Os principais intuitos deste programa são:
* Aumentar o engajamento dos usuários nos servidores do Discord
* Facilitar a interação entre usuários e/ou bots
* Automatizar o uso de ferramentas já disponíveis em outros meios computacionais
* Desenvolver novas funcionalidades úteis em geral

Além disso, a persona do bot é uma referência a personagem Monika, do jogo [Doki Doki Literature Club!](https://ddlc.moe/) (2017). O autor do projeto seguiu todos os direcionamentos e recomendações presentes no site da desenvolvedora do jogo, a [Team Salvato](http://teamsalvato.com/), sobre o uso de seus personagens em outras mídias e/ou formatos, bem como entrou em contato com a mesma para esclarecer eventuais dúvidas sobre o mesmo tema. Mais informações podem ser encontradas [aqui](http://teamsalvato.com/ip-guidelines/) (último acesso em: 07/12/2020).

O autor deste projeto deixa claro que não possui quaisquer direitos oficiais sobre a personagem Monika e/ou o jogo DDLC. O uso de quaisquer informações, imagens, referências ou detalhes deles neste software se baseiam apenas no desejo de contribuir com a comunidade de fãs deste jogo, não desejando prejudicar a empresa detentora dos direitos legais, Team Salvato. O autor sempre estará aberto para conversar e resolver quaisquer possíveis conflitos existentes no uso destas propriedades intelectuais com a respectiva desenvolvedora.

É possível jogar Doki Doki Literature Club! de graça oficialmente por [aqui](https://store.steampowered.com/app/698780/Doki_Doki_Literature_Club/).

## Funcionalidades

Dentre as funcionalidades atualmente implementadas, a Monika pode:
* Cumprimentar usuários, entrar em canais de voz, enviar abraços e enviar mensagens de texto aleatórias e outras 
* Mostrar uma lista completa de comandos (e fornecer mais detalhes sobre eles)
* Mostrar a previsão do tempo para um determinado lugar
* Enviar gifs aleatórios

## Recursos utilizados

Para o desenvolvimento deste projeto, o recurso utilizado mais importante foi o framework [Node.js](https://nodejs.org/en/), que possibilita o uso da linguagem Javascript para aplicações servidoras. No entanto, o gerenciador de pacotes [npm](https://www.npmjs.com/) também foi de suma importância, possibilitando a instalação de módulos fundamentais para a implementação dos comandos propostos.

Segue a lista atual de dependências do projeto:
* [@discordjs/opus](https://www.npmjs.com/package/@discordjs/opus)
* [axios](https://www.npmjs.com/package/axios)
* [discord.js](https://www.npmjs.com/package/discord.js)
* [ffmpeg-static](https://www.npmjs.com/package/ffmpeg-static)
* [pg](https://www.npmjs.com/package/pg)
* [remove-accents](https://www.npmjs.com/package/remove-accents)
* [tcp-ping](https://www.npmjs.com/package/tcp-ping)
* [ytdl-core-discord](https://www.npmjs.com/package/ytdl-core-discord)

Mais detalhes sobre as versões utilizadas de cada dependência e do framework em questão se encontram no arquivo package.json.

Outros recursos valiosos para o desenvolvimento deste projeto foram o tutorial disponível em [Discord.js Guide](https://discordjs.guide/), para melhor compreensão de como começar a construir bots para a plataforma Discord, e a documentação disponível em [discord.js.org](https://discord.js.org/#/docs/main/stable/general/welcome), para consultar mais informações sobre o módulo discord.js.

Algumas funcionalidades utilizam acesso a banco de dados para armazenar, registrar e consultar alguns dados dos usuários dos servidores aos quais o bot servirá. A tecnologia usada para tal fim foi o PostgreSQL, a partir do módulo pg, citado na lista de dependências. Atualmente, as credênciais de acesso ao banco se encontram no arquivo `database.js`, no diretório `functions`.

Também é importante observar que o comando de previsão do tempo necessita de um token para a [API](https://openweathermap.org/api) do site [OpenWeather](https://openweathermap.org/). Atualmente, isto pode ser adicionado ao modificar a o texto `MYAPIID` no arquivo `weather.js` no diretório `commands/utils`.
  
## Passo a passo

## Instalação

  ```
  1º Passo: Baixe e instale o Node.js, preferencialmente na mesma versão apresentada no arquivo `package.json`. Se tudo der certo, o gerenciador de pacotes npm será instalado automaticamente junto do Node
  ```
  
  ```
  2º Passo: Clone/copie todos os arquivos deste repositório em um diretório na sua máquina
  ```
  
  ```
  3º Passo: Execute o comando `npm install` para instalar todas as dependências presentes em `package.json`
  ```
  
  ```
  4º Passo: Preencha todos os campos necessários no arquivo `config.json`
  ```
  
  ```
  5º Passo: Preencha os demais campos com tokens e chaves de configuração do projeto:
  * process.env.BOT_TOKEN, no arquivo `index.js`
  * os campos de acesso ao banco de dados, em `functions/database.js`
  * o campo MYAPIID, na chamada da API Open Weather, em `commands/utils/weather.js`
  ```

  ```
  6º Passo: Crie as tabelas necessárias no mesmo banco de dados PostgreSQL das credenciais fornecidas na etapa anterior
  ```
  
Observação: espera-se, em futuras versões deste projeto, simplificar algumas etapas de instalação.

## Execução

  ```
  Execute o comando `npm start` ou `node .` para hospedar o bot na sua máquina. Se tudo der certo, a mensagem "Estou na sua realidade!" deve aparecer no seu terminal.
  ```

## Bugs/problemas conhecidos

Diante do desenvolvimento contínuo de novas funcionalidades para o bot, existem grandes chances de bugs e problemas futuros serem encontrados.

Até o momento, os problemas mais notórios a serem resolvidos são:
* O comando `-myinfo` possui alguns problemas de visualização em dispositivos móveis;
* O comando `-help`, a medida em que novas funcionalidades estão sendo implementadas, retorna uma lista bem extensa de comandos, não sendo muito amigável para ler;
* A busca por localidades com o comando `-weather` pode, em algumas situações, não funcionar. Isto ocorre por problemas envolvendo acentos e traduções de nomes de países, cidades e demais lugares, dado que a API que fornece os dados de previsão do tempo foi feita originalmente em inglês

## Autores

* Marcus Vinícius N. Garcia ([Infinitemarcus](https://github.com/Infinitemarcus))

## Demais anotações e referências

## Imagens/screenshots

![Imagem](https://github.com/Infinitemarcus/Monika-bot/blob/main/images/hello.png)

![Imagem](https://github.com/Infinitemarcus/Monika-bot/blob/main/images/help.png)

![Imagem](https://github.com/Infinitemarcus/Monika-bot/blob/main/images/help%20myinfo.png)

![Imagem](https://github.com/Infinitemarcus/Monika-bot/blob/main/images/myinfo.png)

![Imagem](https://github.com/Infinitemarcus/Monika-bot/blob/main/images/weather.png)
