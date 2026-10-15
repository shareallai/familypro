---
locale: "pt"
translationKey: "grok-build-guide"
title: "Grok Build 2026: guia de planos, modelos e comandos"
headline: "Grok Build no desenvolvimento: acesso, instalação e uso no terminal"
description: "Guia Grok Build atualizado: planos, Grok 4.7 e Fast, instalação, comandos, cota semanal compartilhada e cobrança separada da API."
summary: "Guia atualizado para avaliar Grok Build: modelos disponíveis, login, comandos, permissões e custos de assinatura ou API."
category: "Ferramentas de desenvolvimento com IA"
pubDate: "2026-10-15"
updatedDate: 2026-10-15
author: "Mark"
service: "Grok"
tags: ["Grok", "xAI", "Grok Build", "CLI"]
relatedTranslationKeys: ["grok-plan-guide", "xai-grok-x-subscription-plan-guide", "grok-build-commands-beginner-guide"]
draft: false
---

Grok Build reúne leitura de código, planejamento, alterações e verificação no terminal. Separe as funções do cliente, os modelos realmente disponíveis na conta e a cobrança por assinatura ou API.

**Fatos e preços verificados: 2026-10-15. Valores em dólares são uma referência, sem impostos aplicáveis. Confira preços oficiais e sua fatura.** Para contratar ou migrar, consulte o [guia da nova assinatura Grok](../xai-grok-x-subscription-plan-guide/). Para uma primeira tarefa, veja o [tutorial de comandos](../grok-build-commands-beginner-guide/).

## 1. O que é Grok Build

É um agente de programação com três formas principais de operação: TUI interativa em tela cheia, com suporte ao mouse; CLI sem interface para scripts, usando `grok -p ...`; e integração por Agent Client Protocol, com `grok agent stdio`.

No mesmo trabalho, ele pode ler o repositório, elaborar um plano, editar arquivos, chamar ferramentas e dividir explorações entre subagentes, respeitando as permissões disponíveis. Não se limita a responder perguntas sobre trechos copiados para uma conversa.

## 2. Planos atuais e acesso

Novos clientes comparam The X Subscription: Free é limitado; Plus custa US$ 8/mês, Premium US$ 30, Super US$ 100 e Ultra US$ 200. A página de preços lista Grok Build em Plus. Confira modelos e saldo após entrar; SuperGrok e X Premium+ antigos já não são o único requisito de compra.

Premium, Super e Ultra incluem 4x, 15x e 50x o uso Plus, não quantidades fixas de tarefas. Grok Bot começa em Premium. Assinantes atuais podem manter seu plano por enquanto; não unifique contas apenas para testar Build. Equipes também precisam conferir licenças e políticas da organização.

## 3. Instalação e primeiro uso

### 3.1 Instalar

No macOS, Linux e WSL, o procedimento documentado usa o instalador oficial:

```bash
curl -fsSL https://x.ai/cli/install.sh | bash
```

No Windows PowerShell:

```powershell
irm https://x.ai/cli/install.ps1 | iex
```

### 3.2 Autenticar

Ao executar `grok`, o fluxo inicial abre a autenticação no navegador. A fonte também descreve uma chave de API para ambientes sem navegador:

```bash
export XAI_API_KEY="xai-..."
grok
```

Não grave uma chave real no código ou no Git. Login por conta e autenticação por API podem ter cobrança e políticas diferentes. O [tutorial para iniciantes](../grok-build-commands-beginner-guide/) também apresenta o login por código de dispositivo descrito na documentação de agosto.

Se o ambiente remoto não abre o navegador, o código de dispositivo é uma alternativa, não uma etapa obrigatória após o login normal.

```bash
grok login --device-auth
```

### 3.3 Começar dentro do repositório

```bash
cd seu-projeto
grok inspect
grok
```

Um bom primeiro pedido é explicar a estrutura, localizar as instruções do projeto e identificar testes e comandos de build. Para uma alteração com várias decisões, peça um plano antes de editar e defina como o resultado será verificado.

### 3.4 Usar scripts e integração

```bash
grok -p "Explain this codebase"
grok -p "Review this diff" --output-format json
```

Para integrar o agente a outra aplicação por ACP:

```bash
grok agent stdio
```

## 4. CLI, TUI e interface gráfica

Na documentação de referência, Grok Build é orientado a CLI e TUI. A interface interativa ocupa o terminal; não é uma janela gráfica independente. O ACP permite conexão com outros programas, mas não transforma a instalação padrão em um aplicativo desktop.

Se o fluxo da equipe depende de uma interface visual, avalie a integração concreta com o editor em vez de presumir que o terminal substitui todas as funções desse ambiente.

## 5. Plataformas documentadas

Os procedimentos de instalação abrangem macOS, Linux, WSL e Windows PowerShell. A família Grok também tem produtos Web, iOS, Android e integração ao X, mas isso não significa que o agente de terminal seja uma aplicação móvel.

## 6. Modelos e configuração

### 6.1 Grok 4.7, Fast e modelos anteriores

A visão geral atual do Build apresenta `grok-4.7`; a tabela API ainda lista `grok-build-0.1`. O identificador antigo não demonstra qual é o modelo único ou padrão do cliente. `grok-build` no exemplo de ajustes é um nome de configuração, não necessariamente o mesmo ID de modelo API.

Grok 4.7 Fast oferece o mesmo modelo em infraestrutura mais rápida. Só está disponível em Cursor e Build, com cobrança pelo plano do produto, não na API pública xAI. O nível gratuito Build não o inclui. Mais velocidade pode exigir mais orçamento.

### 6.2 Conferir conta e configurações carregadas

Use `grok models` no shell e `/model <name>` na TUI. Modelos personalizados e padrão ficam em `~/.grok/config.toml`, no escopo do usuário. O arquivo de projeto `.grok/config.toml` cobre principalmente MCP, Plugins e permissões, não todos os ajustes pessoais. `grok inspect` mostra as fontes carregadas.

## 7. Cota compartilhada, API e custo Fast

### 7.1 Consumo da assinatura

Cada licença paga tem uma reserva semanal para uso elegível dos modelos do fornecedor nas interfaces Grok e Cursor compatíveis. O consumo varia por tarefa; os fatores não garantem mensagens, tarefas de código ou vídeos por dia. Observe `/usage` e o painel de uso durante uma semana normal.

Modelos de terceiros no Cursor são cobrados desde o primeiro uso. A API pública Grok também é separada e não consome essa cota. Um endpoint personalizado segue a cobrança do seu fornecedor.

### 7.2 Tarifas API atuais e Fast

Valores do endpoint global padrão para `grok-4.7`, em dólares por milhão de tokens. Ao atingir o limite de contexto longo, a tarifa correspondente vale para todos os tokens da requisição, não apenas para o excedente.

| Contexto de entrada | Entrada | Entrada em cache | Saída |
| --- | --- | --- | --- |
| Abaixo de 200k tokens | US$ 2,00 | US$ 0,50 | US$ 6,00 |
| A partir de 200k tokens | US$ 4,00 | US$ 1,00 | US$ 12,00 |

Fast custa 2 vezes a tarifa padrão no contexto curto e 1,5 vez no longo dentro de Cursor/Build, pela cobrança do plano do produto. Ferramentas podem acrescentar custos; a antiga estimativa uniforme de US$ 5 por mil chamadas para toda ferramenta não serve. **Data dos dados: 2026-10-15, apenas referência. Endpoints regionais, modelos, ferramentas e condições de cobrança mudam o total.**

## 8. Comandos diários e tarefas longas

`/model <name>` troca o modelo; `/plan [description]` entra em Plan e `/view-plan` mostra o plano. `/usage` mostra consumo, `/context` o contexto e `/compact` resume o histórico. `/new` e `/resume` iniciam ou retomam sessões; `/rewind` volta a uma rodada anterior. `/skills`, `/plugins` e `/mcps` abrem as abas de extensões.

`/goal <objective>` atende a trabalho longo com conclusão verificável. `/create-workflow` cria um fluxo, `/workflow <name>` o executa e `/workflows` abre o acompanhamento. `/loop` repete instruções e `/tasks` lista trabalho em segundo plano. Confira permissões, custos e `/help` local.

A restrição de edição de Plan é independente do modo de permissão: antes da aprovação, só o arquivo do plano pode ser editado. Bash e MCP continuam seguindo permissões; o shell ainda pode escrever. Plan não é uma sandbox somente de leitura.

## 9. Onde os recursos fazem diferença

### 9.1 Pesquisa na Web e no X

A combinação de busca na Web e no X ajuda em pesquisas dependentes de informação recente. Ainda é necessário verificar as fontes apresentadas antes de transformar uma resposta em decisão técnica.

### 9.2 Trabalho de programação

Com as permissões necessárias, o agente pode ler o projeto, planejar, editar e explicar o diff. A verificação final continua dependendo dos testes e do build do repositório.

### 9.3 Subagentes

Tarefas grandes podem ser divididas em linhas de investigação paralelas. O recurso pode ajudar em diagnósticos de vários módulos, desde que exista uma revisão conjunta dos resultados.

### 9.4 Skills, Plugins e MCP

Regras locais, Skills e integrações MCP permitem reutilizar procedimentos e conectar ferramentas. Antes de adicionar extensões, confira quais instruções e permissões elas carregam.

### 9.5 Recursos multimodais

A família Grok inclui recursos de imagem e vídeo úteis para documentação e demonstrações. A disponibilidade em cada interface deve ser confirmada; não presuma que todo recurso do aplicativo aparece automaticamente no terminal.

## 10. Decidir pela adoção

Teste uma tarefa limitada depois de conferir conta, modelo e origem da cobrança. Leia regras, revise plano e diff, e execute testes ou build. Escolha o nível por consumo medido, não por suposições sobre nomes de planos antigos.

Se uma GUI desktop for essencial, teste a integração concreta. Um fluxo estabelecido deve comparar resultados, custo total e esforço de migração na mesma tarefa. Acesso a ferramentas não substitui a validação da entrega.

## References

- [Grok Build overview](https://docs.x.ai/build/overview)
- [CLI reference](https://docs.x.ai/build/cli/reference)
- [Modes and commands](https://docs.x.ai/build/modes-and-commands)
- [Plan mode](https://docs.x.ai/build/features/plan-mode)
- [Permissions](https://docs.x.ai/build/features/permissions)
- [Headless and scripting](https://docs.x.ai/build/cli/headless-scripting)
- [Settings](https://docs.x.ai/build/settings)
- [Skills, Plugins and Marketplaces](https://docs.x.ai/build/features/skills-plugins-marketplaces)
- [API pricing and Grok 4.7 Fast](https://docs.x.ai/developers/pricing)
- [The X Subscription pricing](https://x.ai/pricing)
- [Monthly and annual prices](https://docs.x.ai/x-subscription/pricing)
- [Weekly usage limits](https://docs.x.ai/x-subscription/usage-limits)
