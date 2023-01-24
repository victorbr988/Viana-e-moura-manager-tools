# 📌 Sistema de gerenciamento de ferramentas com dashboard

Sistema de gerenciamento de ferramentas com dashboard dinâmico e controle de acessos
feito para auxiliar a logística não só das ferramentas utilizadas diariamente no estoque da 
Viana e Moura construções mas também utilizar relatórios como base para tomadas de decisões

<details>
  <summary>✅ Inicialização do projeto</summary>
  <hr/>
  Para facilitar a inicialização desse projeto, foi feito um docker-compose que roda toda a aplicação por um comando no terminal, para rodar o comando, é necessário que possua o <a href="https://docs.docker.com/engine/install/ubuntu/" target="_blank">Docker</a> em sua máquina. Caso queira utilizar a aplicação sem docker, basta preencher as variáveis de ambiente.
</details>

<details>
  <summary>🐳 Como utilizar o Docker</summary>
  <hr/>
  
  1. Clone o repositório
  
  ```sh
    git clone git@github.com:victorbr988/Viana-e-moura-manager-tools.git
  ```
  
  2. Intale as dependências
  
  ```sh
    npm install
  ```
  
  3. Utilize o comando para criar os contêineres
  
  ```sh
    docker-compose up -d --build
  ```
  <p>Este comando irá criar os contêineres necessários, frontend, backend e banco de dados.</p>
  <br />
  4. Utilize o comando para popular o banco de dados

  ```sh
    cd server && npx prisma migrate deploy
  ``` 
  ⚠️ <strong>O comando deve ser digitado no terminal da pasta principal do projeto.</strong>
  <br />

  5(opcional). Caso queira parar os serviços no Docker, baste utilizar na raiz do projeto

  ```sh
    docker-compose down
  ```
</details>
⚠️ <strong>É necessário que todas as variáveis de ambientes estejam devidamente preenchidas.</strong>

<details>
  <summary>⚙️ Detalhes dos serviços</summary>
   <br />
   
  <table>
    <tr>
      <th>Serviço</th>
      <th>Porta</th>
    </tr>
    <tr>
      <td>Backend</td>
      <td>3001</td>
    </tr>
    <tr>
      <td>frontend</td>
      <td>3000</td>
    </tr>
    <tr>
      <td>database</td>
      <td>3306</td>
    </tr>
  </table>
   <br/>
   Para ver os detalhes do servidor e estar a par de todas as rotas usadas e seus parâmetros necessários, veja <a href="https://github.com/victorbr988/Viana-e-moura-manager-tools/blob/main/server/README.md" target="_blank">Aqui</a>.
   <br />
  Para ver os detalhes da página web consulte  <a href="https://github.com/Viana-e-moura-manager-tools/web/README.md" target="_blank">Aqui</a>.
</details>
