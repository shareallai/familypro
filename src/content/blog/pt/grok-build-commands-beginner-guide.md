---
locale: "pt"
translationKey: "grok-build-commands-beginner-guide"
title: "Grok Build: comandos e tutorial prático para iniciantes"
headline: "Comece no Grok Build: da instalação à primeira alteração de código"
description: "Aprenda a instalar e usar Grok Build, revisar planos e alterações, controlar permissões, gerenciar sessões e contexto e automatizar tarefas na CLI."
summary: "Um primeiro trabalho pequeno ajuda a entender os comandos: conhecer o projeto, revisar o plano, conferir o diff e executar os testes antes de aceitar a alteração."
category: "Ferramentas de desenvolvimento com IA"
pubDate: "2026-10-15"
updatedDate: 2026-10-15
author: "Mark"
service: "Grok"
tags: ["Grok", "xAI", "Grok Build", "CLI"]
relatedTranslationKeys: ["grok-plan-guide", "xai-grok-x-subscription-plan-guide", "grok-build-guide"]
draft: false
---

Entre em um projeto de código e execute `grok`: o Grok Build inicia naquele diretório. Você pode pedir que explique código, encontre um problema, altere arquivos e execute testes. O agente trabalha com o repositório disponível, não apenas com um trecho colado na conversa; suas ações dependem das permissões concedidas.

Para começar, escolha um problema pequeno, com resultado fácil de conferir. Corrigir uma mensagem ou adicionar um teste a uma função existente costuma ser mais útil do que pedir uma refatoração ampla. Depois de acompanhar leitura, plano, edição e validação, comandos como `/context` e `/resume` ganham uma finalidade concreta.

**Fatos e comandos verificados em 2026-10-15 com a documentação oficial.** Para posicionamento, modelos e acesso, consulte o [guia geral do Grok Build](../grok-build-guide/); para contratar, veja os [novos planos Grok](../xai-grok-x-subscription-plan-guide/).

## 1. Como o Grok Build funciona no dia a dia

Grok Build é um agente de programação no terminal. Ele lê e pesquisa o repositório e, com autorização, edita arquivos, chama comandos e reage aos resultados dos testes. A entrada mais comum é executar `grok` na pasta do projeto para abrir a TUI, a interface de terminal em tela cheia.

Há também execução sem interface, com `grok -p "..."`, e integração por ACP, com `grok agent stdio`. Aprenda primeiro a TUI; scripts e integrações podem vir quando existir uma necessidade concreta.

Em **2026-10-15**, a visão geral oficial apresenta `grok-4.7`. Confira `grok models` antes de escolher `/model <name>`; a conta e a configuração definem o que aparece. Grok 4.7 Fast é uma variante de custo maior em Cursor/Build, fora da API pública e do nível gratuito Build. Consulte os detalhes de preço e contexto no [guia geral](../grok-build-guide/). Se a interface divergir do texto, priorize `grok --help` e `/help` na TUI.

## 2. Instalar, autenticar e abrir o primeiro projeto

### 2.1 Instalação e versão

No macOS, Linux e WSL:

```bash
curl -fsSL https://x.ai/cli/install.sh | bash
```

No Windows PowerShell:

```powershell
irm https://x.ai/cli/install.ps1 | iex
```

Depois, confira o executável e a ajuda:

```bash
grok version
grok --help
grok update --check
```

Se `grok` não for encontrado, reabra o terminal e verifique se o diretório indicado pelo instalador está no `PATH`. A ajuda mostra os comandos realmente disponíveis naquela versão.

### 2.2 Login

No computador de uso interativo:

```bash
grok login
```

O fluxo padrão abre o navegador. Em SSH ou em outro ambiente sem navegador, a fonte descreve autenticação por código de dispositivo:

```bash
grok login --device-auth
```

Abra o endereço apresentado e informe o código em outro dispositivo. Para scripts ou CI, uma chave pode ser fornecida por variável de ambiente:

```bash
export XAI_API_KEY="xai-..."
grok -p "Explain this project"
```

Use um gerenciador de segredos quando apropriado. Não coloque uma chave real no repositório, em exemplos compartilhados ou em logs de CI. A forma de autenticação pode alterar a origem da cobrança e as políticas aplicáveis.

### 2.3 Abrir o diretório correto

```bash
cd path/to/your-project
grok inspect
grok
```

`grok inspect` mostra as configurações, arquivos de instruções, Skills, Plugins, Hooks e servidores MCP encontrados no diretório, sem abrir a sessão interativa. Isso ajuda a perceber regras ausentes ou uma pasta incorreta antes de começar. `grok inspect --json` produz saída para processamento; confira caminhos e configurações antes de compartilhá-la.

## 3. Por que os comandos têm formatos diferentes

| Tipo | Onde executar | Exemplo | Finalidade |
| --- | --- | --- | --- |
| Subcomando da CLI | Shell comum | `grok login`, `grok inspect` | Gerenciar cliente, autenticação e ambiente |
| Argumento de inicialização | Ao iniciar o cliente | `grok -p "..."`, `grok --cwd app` | Escolher tarefa, diretório e saída |
| Comando com barra | Dentro da TUI | `/plan`, `/context`, `/resume` | Controlar a sessão interativa |

Execute `grok models` no shell para listar modelos. Dentro da TUI, use `/model <name>` para mudar o modelo da sessão. Para dúvidas sobre a CLI, consulte `grok <subcommand> --help`; dentro da interface, use `/help`.

## 4. Concluir a primeira alteração de código

### 4.1 Ler o projeto antes de editar

Comece com um pedido como este:

```text
Leia AGENTS.md, README e package.json. Explique a estrutura do projeto,
os comandos de desenvolvimento e as restrições de alteração.
Ainda não modifique arquivos.
```

Para apontar um arquivo:

```text
@src/components/Search.tsx Explique o fluxo do estado de busca sem alterar código.
```

O objetivo é confirmar entradas, regras e comandos de validação. A fonte descreve a busca de `AGENTS.md` entre o diretório atual e a raiz Git. Comandos de build, estilo, diretórios protegidos e critérios de conclusão devem estar em instruções versionadas, acessíveis à equipe.

### 4.2 Revisar um plano quando houver decisões

Para uma tarefa que envolve vários arquivos:

```text
/plan Corrija o problema em que os resultados continuam visíveis após limpar a busca e adicione um teste de regressão.
```

`/plan [description]` entra no modo de planejamento; `/view-plan` reabre o plano. Plan explora o código e apresenta uma proposta revisável antes da edição. Confira os arquivos envolvidos, a preservação das interfaces, os testes previstos e como lidar com falhas.

Plan e ambiente somente de leitura não são equivalentes. Segundo a fonte, o modo restringe principalmente ferramentas de edição; terminal, leitura e MCP continuam sujeitos às permissões. Um comando shell ainda pode escrever por redirecionamento. Continue acompanhando chamadas de ferramentas e autorizações.

### 4.3 Conferir o resultado

Após revisar o plano:

```text
Execute o plano sem modificar arquivos não relacionados.
Rode os testes relevantes e informe os resultados e os riscos restantes.
```

Veja o Git diff e confirme que os comandos de teste, lint ou build realmente passaram. Se não houver testes automáticos, mantenha uma forma de reproduzir o resultado manualmente. Para encerrar:

```text
Revise o diff em busca de alterações fora do escopo, logs de depuração,
segredos e arquivos gerados. Apenas relate os achados, sem editar.
```

Esse limite evita ampliar uma tarefa já resolvida com uma nova rodada genérica de otimização.

## 5. Comandos que você usará com frequência

### 5.1 Sessões

| Comando | Quando usar |
| --- | --- |
| `/new` | Começar outra tarefa |
| `/resume` | Retomar uma sessão anterior |
| `/sessions` | Alternar, renomear ou fechar sessões ativas |
| `/rename <título>` | Dar um nome identificável à sessão |
| `/fork` | Abrir uma linha independente de exploração |
| `/rewind` | Voltar a um ponto anterior da conversa |
| `/export` | Exportar a conversa para arquivo ou área de transferência |

`/new` muda de tarefa; `/compact` resume o histórico para continuar a tarefa atual. Não trate `/rewind` como substituto de revisar o estado dos arquivos no Git.

### 5.2 Contexto e modelos

| Comando | Função |
| --- | --- |
| `/context` | Ver o consumo de contexto |
| `/compact [instruções]` | Resumir o histórico preservando objetivos e restrições |
| `/model <name>` | Alternar um modelo disponível na TUI |
| `grok models` | Listar modelos no shell comum |

Contexto é a informação que o modelo consegue ler naquele momento: conversa, trechos de arquivos e resultados de ferramentas. Não é memória permanente. Logs repetidos e arquivos irrelevantes ocupam espaço; quando respostas ignoram uma nova restrição, confira o contexto antes de continuar.

### 5.3 Extensões e ambiente

| Comando | Função |
| --- | --- |
| `/skills` | Abrir a aba de Skills |
| `/plugins` | Abrir a aba de Plugins |
| `/mcps` | Abrir a aba de servidores MCP |
| `/hooks` | Abrir a aba de Hooks |
| `grok inspect` | Conferir extensões e regras carregadas no diretório |

Os comandos com barra abrem abas da mesma interface de gerenciamento. Para diagnosticar MCP, a fonte apresenta `grok mcp doctor [name]`, executado no shell.

## 6. Conceitos importantes depois das primeiras tarefas

### 6.1 Plan e modos de permissão

Plan decide se haverá uma proposta antes da edição; permissões decidem se uma ferramenta precisa de aprovação. São controles independentes.

- **Ask:** modo padrão; ações não permitidas por regras pedem aprovação.
- **Auto:** um classificador aprova ferramentas consideradas seguras; operações de maior risco ainda podem pedir confirmação.
- **Always-approve:** pula aprovações comuns, mas regras deny e determinados Hooks ainda podem bloquear ações.

Para começar, Ask permite observar o que o agente faz. Mais tarde, crie regras allow específicas para comandos conhecidos. `grok --always-approve` não deve ser usado apenas para eliminar perguntas em um repositório desconhecido.

Permissão e sandbox também são diferentes: a primeira autoriza iniciar uma ação; a segunda limita arquivos e recursos de rede acessíveis durante sua execução.

### 6.2 Sessão, contexto e Memory

A sessão guarda um registro retomável; o contexto é o que o modelo pode ler agora; Memory preserva informação entre sessões. Fatos do projeto e restrições importantes devem estar em `AGENTS.md` versionado, sem depender apenas da memória do agente. O arquivo do usuário `~/.grok/config.toml` aceita modelos padrão e ajustes pessoais; `.grok/config.toml` no projeto cobre sobretudo MCP, Plugins e permissões, não todos os ajustes de usuário. Confira as fontes com `grok inspect`.

### 6.3 AGENTS.md, Skills, Plugins e MCP

`AGENTS.md` descreve regras do repositório. Skills guardam procedimentos reutilizáveis. Plugins podem agrupar Skills, agentes, Hooks e MCP. MCP conecta serviços e ferramentas externos.

Em um projeto pequeno, instruções claras podem bastar. Adicione extensões quando houver uma rotina repetida ou uma integração necessária, e confira suas fontes de configuração e permissões.

### 6.4 Login por conta e chave de API

Login por navegador ou dispositivo atende ao desenvolvimento interativo e permite renovação das credenciais. Chaves de API exigem gestão e rotação próprias e são usadas com frequência em scripts e CI. Embora ambos permitam chamadas ao modelo, cobrança, identidade e políticas de equipe podem ser diferentes.

### 6.5 TUI, execução sem interface e ACP

Use TUI para colaboração contínua no terminal; execução sem interface para tarefas avulsas ou automação; ACP para integrar o agente em outro programa. Não é preciso adotar as três formas ao mesmo tempo.

## 7. Como tornar as tarefas mais confiáveis

### 7.1 Informar objetivo, escopo e aceitação

Um pedido concreto permite verificar o resultado:

```text
Corrija a rolagem da página quando a navegação móvel estiver aberta.
Altere apenas o componente de navegação e seus testes, sem mudar o visual.
Execute os testes relevantes e o build. Informe diferenças entre navegadores
que não foram verificadas.
```

O pedido define problema, arquivos, restrição e validação. Uma falha fica mais fácil de localizar do que em “otimize o projeto”.

### 7.2 Usar Plan quando houver incerteza

Plan ajuda em tarefas ambíguas, com vários módulos ou consequências amplas. Uma correção pequena com caminho claro não precisa obrigatoriamente de um plano longo: planejar também consome tempo e contexto.

### 7.3 Incluir validação na tarefa

```text
Após editar, execute primeiro os testes da área alterada e depois o build.
Se houver falha, informe em qual etapa ocorreu e se está ligada à alteração.
```

Comece pelo conjunto relevante para detectar erros cedo e cumpra as verificações exigidas antes de entregar. Um diff gerado não equivale a um resultado validado.

### 7.4 Preferir regras específicas

A fonte descreve regras `--allow` e `--deny`, com deny prevalecendo em caso de conflito. Libere gradualmente comandos de leitura e testes conhecidos; mantenha controle explícito sobre exclusão, publicação e push. Uma regra pequena é mais fácil de revisar do que uma permissão ampla copiada de outro projeto.

### 7.5 Começar a automação com leitura

```bash
grok -p "List TODO comments and group them by directory"
```

Para saída processável:

```bash
grok --no-auto-update   -p "Review the current diff and return only actionable findings"   --output-format json
```

`plain` é saída legível; `json` retorna um objeto ao final; `streaming-json` emite eventos por linha. `--no-auto-update` evita verificações de atualização em segundo plano no fluxo de CI. Confira formato, tratamento de falhas e cobrança antes de permitir alterações automáticas.

### 7.6 Objetivos longos e Workflows

`/goal <objective>` mantém o trabalho em direção a uma conclusão verificável. Defina o problema, os testes necessários e os limites da alteração; ainda revise o diff e as evidências ao final.

`/create-workflow [description]` cria um fluxo salvo, `/workflow <name>` o executa e `/workflows` abre o acompanhamento. `/loop [interval] <prompt>` repete instruções; `/tasks` lista tarefas em segundo plano, subagentes e agendamentos. Delimite arquivos, operações e gastos antes de delegar trabalho longo. Primeiro conclua uma tarefa comum e depois avalie se precisa automatizá-la.

## 8. Por onde começar a investigar problemas

### 8.1 O shell não encontra grok

Reabra o terminal e confira o `PATH` indicado pelo instalador. Reinstalar sem ler a saída pode deixar versões diferentes em diretórios distintos.

### 8.2 O ambiente remoto não abre o navegador

Use `grok login --device-auth` e conclua em outro dispositivo. Reserve a chave de API para automação quando fizer sentido e evite expô-la em histórico, arquivos ou logs.

### 8.3 As regras do projeto não foram carregadas

Confirme o diretório e execute `grok inspect`. Veja quais instruções e configurações foram encontradas. Iniciar fora do repositório pode impedir a descoberta esperada de `AGENTS.md` ou `.grok/config.toml`.

### 8.4 Um modelo ou comando não aparece

Confira `grok version`, `grok update --check`, `grok --help` e `/help`. Recursos podem depender de versão, permissões da conta e configurações locais.

### 8.5 As respostas repetem conclusões antigas

Veja `/context`. Se a tarefa continua a mesma, use `/compact` e explicite objetivos, conclusões e validações a preservar. Se o objetivo mudou, abra uma sessão com `/new`.

## 9. Integrar ao desenvolvimento diário

No diretório correto, comece com `grok inspect`, peça a leitura das regras e do código relevante, e use `/plan` quando houver decisões ou alterações em vários arquivos. Depois revise o diff e execute os testes ou o build. Use `/context` e `/compact` para continuar uma sessão longa, e `/new` para outro trabalho.

Aprenda Workflows, subagentes, worktrees, Plugins e MCP à medida que o projeto precisar deles. Uma tarefa com limites claros e um resultado verificável vale mais do que uma grande alteração difícil de revisar.

## References

- [Grok Build: instalação e primeiros passos](https://docs.x.ai/build/overview)
- [Grok Build: referência da CLI](https://docs.x.ai/build/cli/reference)
- [Grok Build: modos e comandos](https://docs.x.ai/build/modes-and-commands)
- [Grok Build: modo Plan](https://docs.x.ai/build/features/plan-mode)
- [Grok Build: permissões](https://docs.x.ai/build/features/permissions)
- [Grok Build: execução sem interface e scripts](https://docs.x.ai/build/cli/headless-scripting)
- [Grok Build: configurações e seus escopos](https://docs.x.ai/build/settings)
- [Grok Build: Skills, Plugins e Marketplaces](https://docs.x.ai/build/features/skills-plugins-marketplaces)
- [Grok Build: servidores MCP](https://docs.x.ai/build/features/mcp-servers)

- [xAI: preços atuais da API e Fast](https://docs.x.ai/developers/pricing)
