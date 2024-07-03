# Arquitetura

![Mapa de habilidades - Diagrama de arquitetura](https://github.com/unb-mds/2024-1-squad04/assets/110688069/815d2e6a-9d6f-4141-b297-b45334ba4ca8)

# Arquitetura do Sistema

## Visão Geral

Este documento descreve a arquitetura de um sistema que utiliza MySQL como banco de dados, um backend que controla as requisições e um frontend que interage por meio de uma API REST. A organização do código é detalhada a seguir.

## Banco de Dados

O sistema utiliza MySQL como banco de dados relacional, armazenando todos os dados necessários para a aplicação.

## Backend

O backend do sistema é responsável por orquestrar as requisições e interagir com o banco de dados. A estrutura de pastas do backend inclui:

- **Controllers**: Esta pasta contém os controladores, que são responsáveis por receber as requisições, processar os dados e retornar as respostas apropriadas.
- **Index**: O arquivo `index` orquestra todas as requisições, definindo as rotas e conectando os controladores às suas respectivas funções.

## API REST

A comunicação entre o backend e o frontend é feita por meio de uma API REST. A API expõe endpoints que permitem ao frontend realizar operações de leitura, criação, atualização e exclusão de dados.

## Frontend

O frontend do sistema é responsável pela interface com o usuário e pela interação com a API. A estrutura de pastas do frontend inclui:

- **Repositories**: Esta pasta contém os repositórios, que são responsáveis por interagir com a API e fazer as requisições necessárias.
- **Service**: A pasta `service` trata os dados retornados das requisições, aplicando as regras de negócios da aplicação.
- **Pages**: Esta pasta contém as diferentes páginas da aplicação.
- **Components**: A pasta `components` inclui componentes reutilizáveis que são usados em várias partes da aplicação.
- **Routes**: A pasta `routes` controla as rotas do sistema, definindo quais componentes e páginas devem ser carregados com base na URL.
- **Generals**: Esta pasta contém funções genéricas que são utilizadas em toda a aplicação.
- **App**: O arquivo `App` contém todas as views, centralizando a renderização da interface do usuário.

## Conclusão

A arquitetura descrita permite uma separação clara de responsabilidades, facilitando a manutenção e a escalabilidade do sistema. O backend se concentra na lógica de negócios e na interação com o banco de dados, enquanto o frontend se preocupa com a experiência do usuário e a interação com a API.


