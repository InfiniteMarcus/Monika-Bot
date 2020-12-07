# Monika bot

## Conceito
O projeto **Monika bot** se baseia na criação de um bot de propósito geral para a plataforma Discord, utilizando-se de do módulo [discord.js](https://github.com/discordjs/discord.js), em Node.js, para acessar a API da mesma e fornecer diversos comandos úteis para os usuários (principalmente do HackoonSpace).

Os principais intuitos deste programa são:
1. Aumentar o engajamento dos usuários nos servidores do Discord
2. Facilitar a interação entre usuários e/ou bots
3. Automatizar o uso de ferramentas já disponíveis em outros meios computacionais
4. Desenvolver novas funcionalidades úteis em geral

Além disso, a persona do bot é uma referência a personagem Monika, do jogo [Doki Doki Literature Club!](https://ddlc.moe/) (2017). O autor do projeto seguiu todos os direcionamentos e recomendações presentes no site da desenvolvedora do jogo, a [Team Salvato](http://teamsalvato.com/), sobre o uso de seus personagens em outras mídias e/ou formatos, bem como entrou em contato com a mesma para esclarecer eventuais dúvidas sobre o mesmo tema. Mais informações podem ser encontradas [aqui](http://teamsalvato.com/ip-guidelines/) (último acesso em: 07/12/2020).

O autor deste projeto deixa claro que não possui quaisquer direitos oficiais sobre a personagem Monika e/ou o jogo DDLC. O uso de quaisquer informações, imagens, referências ou detalhes deles neste software se baseiam apenas no desejo de contribuir com a comunidade de fãs deste jogo, não desejando prejudicar a empresa detentora dos direitos legais, Team Salvato. O autor sempre estará aberto para conversar e resolver quaisquer possíveis conflitos existentes no uso destas propriedades intelectuais com a respectiva desenvolvedora.

É possível jogar Doki Doki Literature Club! de graça oficialmente por [aqui](https://store.steampowered.com/app/698780/Doki_Doki_Literature_Club/).

## Funcionalidades

Dentre as funcionalidades atualmente implementadas, a Monika pode:
* Cumprimentar e realizar interações básicas com usuários (entrar em canais de voz, abraçar, enviar mensagens de texto aleatórias, etc)
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

Algumas funcionalidades utilizam acesso a banco de dados para armazenar, registrar e consultar dados dos usuários dos servidores aos quais o bot servirá. A tecnologia usada para tal fim foi o PostgreSQL.
  
## Passo a passo

## Instalação

## Execução

## Bugs/problemas conhecidos

Diante do desenvolvimento contínuo de novas funcionalidades para o bot, existem grandes chances de bugs e problemas futuros serem encontrados.

## Autores

* Marcus Vinícius N. Garcia ([Infinitemarcus](https://github.com/Infinitemarcus))

## Demais anotações e referências

## Imagens/screenshots
