# 📊Canguro - Painel de Ações (Angular)

Projeto frontend desenvolvido em Angular para exibição de ações da bolsa, integrado à API brapi.dev.

[Visite o painel online!](https://canguro-painel-acoes.vercel.app/)

✨ Funcionalidades

- Listagem de ações em formato de tabela

- Ordenação por colunas ( preço, variação, etc.)

- Filtro por código da ação (ex: BBAS3)

- Linha expansível (accordion) para exibir detalhes da ação

## 🧠 Decisões de implementação

-  Valores numéricos são mantidos em formato bruto (number) para ordenação e regras

- Versões formatadas (string) são usadas apenas para exibição no template

- Detalhes da ação são carregados sob demanda ao clicar na linha

- Componentes e serviços organizados para facilitar manutenção e leitura

## 🛠️ Tecnologias

- Angular

- TypeScript

- HTML / CSS

- Consumo de API REST

### ▶️ Como executar
npm install
ng serve
