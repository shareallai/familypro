---
locale: es
translationKey: grok-build-guide
title: "Guía Grok Build 2026: planes, modelos, límites y comandos"
headline: Cómo evaluar Grok Build para tu flujo de ingeniería
description: "Guía Grok Build actualizada: planes, Grok 4.7 y Fast, instalación, comandos, cuota semanal compartida y costes separados de la API."
summary: Este artículo ayuda a equipos técnicos a decidir si Grok Build encaja en su operación de desarrollo, con criterios prácticos sobre acceso, incorporación y uso diario.
category: Análisis de herramientas IA
pubDate: 2026-05-26
updatedDate: 2026-10-15
author: Mark
service: Grok
tags:
  - Grok Build
  - xAI
  - Agente de codificación IA
  - CLI
  - Flujo de ingeniería
relatedTranslationKeys:
  - grok-plan-guide
  - codex-cursor-claude-code-local-dev-tools-guide
  - codex-claude-cursor-instructions-guide
draft: false
---

Grok Build reúne lectura del código, planificación, cambios y verificación en el terminal. Distingue las funciones del cliente, los modelos disponibles en tu cuenta y la facturación mediante suscripción o API.

**Hechos y precios comprobados: 2026-10-15. Precios en dólares orientativos, sin impuestos aplicables. Consulta tarifas oficiales y tu factura.** Para comprar o migrar, revisa la [guía de los nuevos planes Grok](../xai-grok-x-subscription-plan-guide/).

## 1. Qué es Grok Build

Según la documentación de xAI, Grok Build es un agente de codificación que se ejecuta en terminal, con tres modos principales:

- Una TUI interactiva en pantalla completa, con soporte de mouse.
- Un camino headless para scripts y automatización (`grok -p ...`).
- Modo ACP para integrar con aplicaciones externas (`grok agent stdio`).

En la práctica, no es solo un chat que lanza comandos. Es una cadena de ejecución única que combina planificación, edición, operaciones de archivos, llamadas a herramientas y subagentes en paralelo.

## 2. Planes actuales y acceso

Los nuevos clientes comparan The X Subscription: Free es limitado; Plus cuesta $8/mes, Premium $30, Super $100 y Ultra $200. La página de precios incluye Grok Build en Plus. Comprueba modelos y cuota disponible al iniciar sesión; el antiguo SuperGrok o X Premium+ ya no es el único requisito de compra.

Premium, Super y Ultra incluyen 4x, 15x y 50x el uso de Plus, no cantidades fijas de tareas. Grok Bot empieza en Premium. Los usuarios actuales pueden mantener su plan; no unifiques cuentas solo para probar Build. Los equipos deben comprobar plazas y políticas de organización.

## 3. Cómo usarlo: onboarding rápido (unos 5 minutos)

### 3.1 Instalación

macOS / Linux / WSL:

```bash
curl -fsSL https://x.ai/cli/install.sh | bash
```

Windows (PowerShell):

```powershell
irm https://x.ai/cli/install.ps1 | iex
```

### 3.2 Primera autenticación

```bash
grok
```

Por defecto, el primer arranque abre autenticación en navegador. En entornos sin navegador (por ejemplo, hosts remotos o contenedores), usa API key:

```bash
export XAI_API_KEY="xai-..."
grok
```

Si el entorno remoto no puede abrir el navegador, el código de dispositivo es una alternativa, no un paso obligatorio tras el acceso normal.

```bash
grok login --device-auth
```

### 3.3 Arranque dentro de un repositorio

```bash
cd your-project
grok inspect
grok
```

Prompts útiles para repositorios de producción:

- "Map this repository and identify boot paths."
- "Enter plan mode first, do not edit files yet."
- "List risks first, then propose edits."

### 3.4 Caminos headless y automatización

```bash
grok -p "Explain this codebase"
grok -p "Review this diff" --output-format json
```

Para orquestación desde IDE o tooling interno, usa ACP:

```bash
grok agent stdio
```

## 4. ¿Soporta CLI y GUI? ¿Se parece a codex.app?

Respuesta corta: **hoy Grok Build es principalmente CLI/TUI, no una app de escritorio GUI independiente**.

- CLI: sí, y es la vía principal.
- Interfaz interactiva: sí, pero nativa de terminal (TUI fullscreen), no ventana GUI de escritorio.
- Flujo tipo codex.app: posible vía integración ACP en otro software, pero no es el formato por defecto del producto.

Si tu equipo prioriza entornos visuales de workspace, conviene tratar Grok Build como una plataforma agentic centrada en terminal, no como reemplazo 1:1 de una GUI.

## 5. Qué plataformas están soportadas

Según la documentación oficial de Getting Started, los entornos de configuración confirmados son:

- `macOS`
- `Linux`
- `WSL`
- `Windows PowerShell`

A nivel de familia de producto, las capacidades de Grok también cubren:

- `Web`
- `iOS`
- `Android`
- `X`

Distinción clave: Grok Build está posicionado como agente de codificación en terminal, no como app de chat móvil.

## 6. Modelos y configuración

### 6.1 Grok 4.7, Fast y modelos anteriores

La presentación actual de Build introduce `grok-4.7`; la tabla API aún incluye `grok-build-0.1`. El identificador antiguo no demuestra que sea el modelo único ni el predeterminado del cliente. `grok-build` en el ejemplo de ajustes es un nombre de configuración, no necesariamente el mismo identificador API.

Grok 4.7 Fast sirve el mismo modelo en infraestructura más rápida. Solo está en Cursor y Build, con cobro mediante el plan del producto; no está en la API pública xAI ni incluido en el nivel gratuito de Build. La mayor velocidad puede consumir más presupuesto.

### 6.2 Comprobar la cuenta y los ajustes

Usa `grok models` en el shell y `/model <name>` en la TUI. Modelos personalizados y predeterminado se configuran en `~/.grok/config.toml`, a nivel de usuario. El archivo de proyecto `.grok/config.toml` cubre principalmente MCP, Plugins y reglas de permisos, no todos los ajustes personales. `grok inspect` muestra las fuentes cargadas.

## 7. Cuota compartida, API y coste de Fast

### 7.1 Consumo de la suscripción

Cada plaza de pago tiene una reserva semanal para uso elegible de modelos propios en las interfaces Grok y Cursor admitidas. El consumo depende de la tarea; los multiplicadores no garantizan mensajes, tareas de programación o vídeos diarios. Observa `/usage` y el panel de consumo durante una semana normal.

Los modelos de terceros en Cursor se cobran desde el primer uso. La API pública Grok se factura aparte y no consume esa reserva. Un endpoint personalizado sigue las condiciones de su proveedor.

### 7.2 Tarifas API actuales y Fast

Precios de `grok-4.7` en el endpoint global estándar, en dólares por millón de tokens. Al alcanzar el umbral de contexto largo, sus tarifas se aplican a todos los tokens de la solicitud, no solo al exceso.

| Contexto de entrada | Entrada | Entrada en caché | Salida |
| --- | --- | --- | --- |
| Menos de 200k tokens | $2.00 | $0.50 | $6.00 |
| Desde 200k tokens | $4.00 | $1.00 | $12.00 |

Dentro de Cursor/Build, Fast cuesta 2 veces la tarifa estándar en contexto corto y 1,5 veces en contexto largo, mediante el plan del producto. Las herramientas pueden añadir cargos; la antigua estimación uniforme de $5 por mil llamadas para todas ellas no sirve. **Fecha de datos: 2026-10-15, solo referencia. Endpoints regionales, modelos, herramientas y reglas de cobro afectan al total.**

## 8. Comandos diarios y trabajos largos

`/model <name>` cambia el modelo, `/plan [description]` entra en Plan y `/view-plan` muestra el plan. `/usage` muestra consumo, `/context` el contexto y `/compact` lo resume. `/new` y `/resume` inician o recuperan sesiones; `/rewind` vuelve a un turno anterior. `/skills`, `/plugins` y `/mcps` abren las pestañas de extensiones.

`/goal <objective>` sirve para trabajo largo con un final verificable. `/create-workflow` crea un flujo, `/workflow <name>` lo ejecuta y `/workflows` abre el seguimiento. `/loop` repite instrucciones y `/tasks` lista tareas en segundo plano. Comprueba permisos, costes y `/help` local.

La restricción de edición de Plan es independiente de los permisos: antes de aprobar solo se edita el archivo del plan. Bash y MCP siguen sus permisos y el shell puede escribir. Plan no es una sandbox de solo lectura.

## 9. Capacidades frecuentes de Grok y dónde aportan valor

### 9.1 Recuperación de información en tiempo real (Web + X)

Un diferenciador claro es combinar búsqueda web en tiempo real y búsqueda en X dentro del mismo flujo de respuesta. Esto aporta valor en contextos con alta sensibilidad temporal.

### 9.2 Flujo de codificación agentic

Además de responder preguntas de código, Grok Build puede ejecutar exploración del repositorio, generación de planes, cambios de código y explicación de diffs cuando tiene permisos adecuados.

### 9.3 Subagentes en paralelo

En tareas grandes, permite dividir trabajo en varias líneas de exploración paralelas, útil para diagnóstico de incidentes complejos y análisis multi-módulo.

### 9.4 Ecosistema de skills, plugins y MCP

Grok Build puede descubrir reglas locales y directorios de skills, y ampliarse vía plugins e integraciones MCP, lo que facilita migraciones desde otros ecosistemas de agentes.

### 9.5 Capacidades multimodales en la misma familia de producto

La familia Grok también incluye rutas de generación y comprensión de imagen/video, útiles para documentación técnica, demos y flujos orientados a contenido.

## 10. Decidir si incorporarlo

Prueba una tarea limitada con cuenta, modelo y cobro identificados. Lee las reglas, revisa plan y diff, y ejecuta pruebas o build. Elige el plan por consumo medido, no por suposiciones sobre nombres antiguos.

Si necesitas una GUI de escritorio, prueba la integración concreta. Un flujo existente debe comparar resultados, coste total y esfuerzo de migración con la misma tarea. Disponer de herramientas no sustituye la validación del resultado.

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
