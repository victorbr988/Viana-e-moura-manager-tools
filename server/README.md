# Viana & Moura Construções
### Backend do sistema de gerenciamento de ferramentas que fiz para Viana e Moura Construções, Utilizei Prisma como ORM, Typescript como principal stack, juntamente com NodeJs.

## Documentação da API

### Endpoints
<br />
<details>
  <summary>Ferramentas</summary>
  <hr />

  #### Buscar todas as ferramentas
  ```shel
  GET /tools
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

#### Retorna o Id da ferramenta editada

```shel
  PUT /tools/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. O ID do item que você quer |
| `name`      | `string` | **Obrigatório**. O nome do item que você quer |

#### Deletar uma ferramenta

```shel
  Delete /tools/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. O ID do item que você quer |

#### Adicionar uma ferramenta

```shel
  POST /tools/
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. O nome do item que você quer |
</details>

<details>
  <summary>Supervisores</summary>
  <hr />

  #### Buscar por todos os supervisores

```shel
  GET /supervisors
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

#### Retorna o Id do supervisor editado

```shel
  PUT /supervisors/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. O ID do item que você quer |
| `name`      | `string` | **Obrigatório**. O nome do supervisor que você quer |
| `sector`      | `string` | **Obrigatório**. O nome do setor do supervisor |

#### Deletar um supervisor

```shel
  Delete /supervisors/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. O ID do item que você quer |

#### Adicionar um supervisor

```shel
  POST /supervisors
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. O nome do supervisor que você quer |
| `sector`      | `string` | **Obrigatório**. O nome do setor do supervisor |
</details>

<details>
  <summary>Empreendimentos</summary>
  <hr/>

  #### Buscar todos os empreendimentos

```shel
  GET /enterprises
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

#### Retorna o Id do empreendimento editado

```shel
  PUT /enterprises/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. O ID do item que você quer |
| `name`      | `string` | **Obrigatório**. O nome do item que você quer |

#### Deletar um empreendimento

```shel
  Delete /enterprises/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. O ID do item que você quer |

#### Adicionar um empreendimento

```shel
  POST /enterprises
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. O nome do item que você quer |
</details>

<details>
  <summary>Entrada de ferramentas</summary>
  <hr/>

### Buscar todas as entradas

```shel
  GET /entrance
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

#### Retorna o Id da entrada modificada

```shel
  PUT /entrance/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. O ID do item que você quer |
| `toolName`| `number` | **Obrigatório**. O nome do item que você quer |
| `addedAt`| `datetime` | **Obrigatório**. A data de entrada do item |
| `supervisorName`| `string` | **Obrigatório**. O nome do supervisor |
| `quantity`| `number` | **Obrigatório**. A quantidade de itens |
| `unitPrice`| `float` | **Obrigatório**. O valor unitário |

#### Deletar uma entrada de ferramentas

```shel
  Delete /entrance/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. O ID do item que você quer |

#### Adicionar uma entrada de ferramentas

```shel
  POST /entrance
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `toolName`| `number` | **Obrigatório**. O nome do item que você quer |
| `addedAt`| `datetime` | **Obrigatório**. A data de entrada do item |
| `supervisorName`| `string` | **Obrigatório**. O nome do supervisor |
| `quantity`| `number` | **Obrigatório**. A quantidade de itens |
| `unitPrice`| `float` | **Obrigatório**. O valor unitário |

</details>

<details>
  <summary>Saída de ferramentas</summary>
  <hr/>

### Buscar todas as saídas de ferramentas

```shel
  GET /exit
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

#### Retorna o Id da saída modificada

```shel
  PUT /exit/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. O ID do item que você quer |
| `status`| `string` | **Obrigatório**. O status do item que você quer |
| `requester`| `string` | **Obrigatório**. O nome da pessoa que requisitou a ferramenta |
| `toolName`| `string` | **Obrigatório**. O nome do item |
| `requestedAt`| `datetime` | **Obrigatório**. A data que a ferramente foi solicitada |
| `responseAt`| `datetime` | **Obrigatório**. A data que a ferramenta foi liberada |
| `enterpriseName`| `string` | **Obrigatório**. O nome do empreendimento de destino |
| `quantity`| `string` | **Obrigatório**. Quantidade de ferramentas liberadas |
| `account`| `string` | **Obrigatório**. O nome da conta |
| `subAccount`| `string` | **Obrigatório**. O nome da subconta |

#### Deletar uma saída de ferramentas

```shel
  Delete /exit/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. O ID do item que você quer |

#### Adicionar uma saída de ferramentas

```shel
  POST /exit
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `status`| `string` | **Obrigatório**. O status do item que você quer |
| `requester`| `string` | **Obrigatório**. O nome da pessoa que requisitou a ferramenta |
| `toolName`| `string` | **Obrigatório**. O nome do item |
| `requestedAt`| `datetime` | **Obrigatório**. A data que a ferramente foi solicitada |
| `responseAt`| `datetime` | **Obrigatório**. A data que a ferramenta foi liberada |
| `enterpriseName`| `string` | **Obrigatório**. O nome do empreendimento de destino |
| `quantity`| `string` | **Obrigatório**. Quantidade de ferramentas liberadas |
| `account`| `string` | **Obrigatório**. O nome da conta |
| `subAccount`| `string` | **Obrigatório**. O nome da subconta |
</details>

### Diagrama de entidades
<hr/>

<img src="https://github.com/victorbr988/Viana-e-moura-manager-tools/blob/d4380837b9a9b6e3853e41c33d7c34dd99cb2600/server/Diagrama_entidade.png" />
