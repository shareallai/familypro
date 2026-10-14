---
locale: es
translationKey: chatgpt-go-plus-pro-codex-api-guide
title: "ChatGPT Go, Plus y Pro: Codex y facturación API explicados"
headline: ¿Qué son ChatGPT Go, Plus y Pro? Relación entre Codex y OpenAI API
description: "Compara ChatGPT Go, Plus y Pro, GPT-6.1 Sol, Astra y Luna, Codex y costes de API separados. Precios y modelos revisados el 14 de octubre de 2026."
summary: "Elige según tus tareas, conoce los nuevos modelos de Work/Codex y distingue el uso incluido en la suscripción de los cargos de la API."
category: Comparativas de suscripciones de IA
pubDate: 2026-03-31
updatedDate: 2026-10-14
author: Mark
service: General
tags:
  - ChatGPT Go
  - ChatGPT Plus
  - ChatGPT Pro
  - Codex
  - OpenAI API
  - Suscripción IA
relatedTranslationKeys:
  - google-ai-plan-guide
  - grok-plan-guide
  - codex-claude-cursor-instructions-guide
topOffer:
  title: "Planes de ChatGPT en familypro desde 5,5 USD"
  subtitle: "Mejor precio · Activación rápida · Soporte posventa"
  buttonText: "Ir ahora a familypro"
  buttonLink: https://familypro.io/en/products/chatgpt?invite=7Dfd94eb
draft: false
---

Para elegir ChatGPT Go, Plus o Pro, empieza por dónde lo usarás: conversaciones en Chat, un agente que trabaje con código y documentos o una integración en tu producto. Cada vía tiene condiciones de acceso y facturación distintas.

Planes, modelos y precios de API comprobados el **2026-10-14**. Los importes en USD son **orientativos**; mandan el checkout, los impuestos locales y la factura. La disponibilidad también depende del despliegue, el cliente y la configuración del espacio de trabajo.

## 1. Go, Plus y Pro: precios y elección

La [página oficial de precios de Work/Codex](https://learn.chatgpt.com/docs/pricing) recoge estos planes personales. Las recomendaciones no garantizan un número fijo de tareas.

| Plan | Precio mensual orientativo, USD | Cuándo valorarlo |
| --- | --- | --- |
| Free | $0 | Probar tareas ligeras antes de pagar |
| Go | $8 | Presupuesto ajustado y trabajo ligero con Codex |
| Plus | $20 | Trabajo habitual con agentes sobre código y documentos |
| Pro | $100 / $200 / $500 | Límites frecuentes o una necesidad concreta de mayor velocidad |

Pro tiene ahora tres niveles. Ya no basta con decir que existen dos planes con las mismas funciones: el acceso a **Ultrafast** figura en Pro $500 y depende del modelo y del cliente. Compara la oferta actual y los límites de tu cuenta; los antiguos valores 5x/20x no son multiplicadores universales de tareas.

Si buscas conversaciones normales, consulta los modelos y herramientas de Chat. Los permisos de Work/Codex no describen el selector de modelos de Chat.

## 2. Nuevos modelos: GPT-6.1 Sol, GPT-6 Astra y GPT-6 Luna

GPT-5.4 ya no es un buen ejemplo principal de los modelos nuevos. La [documentación actual](https://learn.chatgpt.com/docs/models) permite distinguir estos usos:

| Modelo | Tareas adecuadas | Por dónde empezar |
| --- | --- | --- |
| GPT-6.1 Sol | Trabajo de varios pasos con código, aplicaciones y documentos | Probarlo primero para tareas complejas habituales |
| GPT-6 Astra | Flujos exigentes que necesitan razonamiento y criterio sostenidos | Cuando la dificultad justifique un mayor consumo |
| GPT-6 Luna | Resúmenes, extracción, clasificación y cambios de código acotados | Tareas claras y repetitivas con menor presupuesto |

En ChatGPT, **GPT-6.1 Sol, GPT-6 Sol y GPT-6 Luna están disponibles en Work/Codex, no en Chat normal**. El despliegue inicial de GPT-6.1 Sol incluye Plus, Pro, Business, Enterprise y Edu; Free/Go quedan fuera al lanzamiento. Enterprise/Edu pueden requerir activación por un administrador. Comprueba tu cuenta y cliente.

OpenAI fijó para el **14 de octubre de 2026** la retirada de GPT-5.5 de ChatGPT, Work y Codex. La API no está afectada. Cambia las configuraciones, scripts o tareas programadas que lo seleccionen por un modelo disponible; no supongas que deja de funcionar en la API ese mismo día.

## 3. ¿Incluye Codex la suscripción? ¿Cómo se consume el uso?

Codex es un agente capaz de entender, modificar y ejecutar código. Los precios oficiales incluyen Free y Go, en lugar de describir su acceso únicamente como una promoción temporal. **Free/Go tienen GPT-6 Luna en la aplicación de escritorio, sujeto al despliegue**; Plus ofrece más vías, como web, CLI y extensión de IDE.

Work y Codex comparten uso. El modelo, contexto, razonamiento y herramientas afectan al consumo: un mensaje no representa una cantidad fija de trabajo. Los antiguos límites de Chat no permiten calcular tareas de Codex, ni los precios por token de API permiten deducir las tareas incluidas en un plan.

Consulta Usage para ver el uso restante y los reinicios. Plus/Pro pueden comprar créditos de ChatGPT al alcanzar sus límites; no son saldo de API. Prueba Luna para tareas concretas y Sol o Astra para las más difíciles antes de subir de plan.

## 4. Facturación de API y precios de los nuevos modelos

Las solicitudes con API key desde un producto, script o servicio se facturan por API. La suscripción no regala créditos de API automáticamente ni descuenta sus cargos. Codex con inicio de sesión de ChatGPT consume el plan; con API key, consume la facturación de API.

Estos son los **precios Standard de texto con contexto corto, comprobados el 2026-10-14**, en USD por millón de tokens y solo como referencia.

| ID de modelo API | Entrada | Entrada en caché | Escritura de caché | Salida |
| --- | --- | --- | --- | --- |
| `gpt-6.1-sol` | $2.00 | $0.10 | $2.50 | $10.00 |
| `gpt-6-astra` | $10.00 | $1.00 | $12.50 | $50.00 |
| `gpt-6-luna` | $0.10 | $0.01 | $0.125 | $0.50 |

Un millón de tokens de entrada sin caché y 200.000 de salida con Sol cuestan **$4** con estas tarifas, antes de escrituras de caché, herramientas y otros cargos. El contexto largo tiene otras tarifas; Batch, Flex, Fast y Ultrafast también pueden cambiar el precio. Calcula con la [tarifa actual de API](https://developers.openai.com/api/docs/pricing), no solo con esta tabla.

## 5. ¿Puede una aplicación externa usar el plan Plus/Pro?

Sí, cuando la aplicación lo admite y tu cuenta cumple los requisitos. [Sign in with ChatGPT](https://learn.chatgpt.com/docs/sign-in-with-chatgpt) permite autorizar a aplicaciones compatibles para consumir el uso existente de Work/Codex. **Iniciar sesión y permitir el consumo del plan son permisos distintos**: un botón de acceso con ChatGPT no demuestra que la suscripción pague las solicitudes.

No se añade otro cupo ni se obtiene una API key de uso general. La aplicación puede cobrar sus propias tarifas. Para una integración propia, comprueba si admite esta vía; las solicitudes convencionales con API key siguen teniendo facturación separada.

## 6. Decide según tus tareas reales

Para uso ligero, prueba Free o Go. Si trabajas con frecuencia en tareas complejas de Work/Codex, revisa Plus y la disponibilidad de GPT-6.1 Sol. Compara los tres niveles Pro cuando los límites interrumpan tu trabajo o necesites un modo Ultrafast compatible.

Para integrar un producto, calcula la API aparte: prueba Luna en lotes de tareas claras, Sol en trabajo complejo y Astra cuando la dificultad lo justifique. En ofertas de terceros, confirma el plan exacto, el modo de uso de la cuenta, el acceso a Codex y el soporte. Un precio bajo no acredita prestaciones oficiales de Pro ni acceso a todos los modelos.

## References

- [ChatGPT Work and Codex pricing](https://learn.chatgpt.com/docs/pricing)
- [Models and availability in Work and Codex](https://learn.chatgpt.com/docs/models)
- [GPT-6.1 Sol API model](https://developers.openai.com/api/docs/models/gpt-6.1-sol)
- [GPT-6 Astra API model](https://developers.openai.com/api/docs/models/gpt-6-astra)
- [GPT-6 Luna API model](https://developers.openai.com/api/docs/models/gpt-6-luna)
- [OpenAI API pricing](https://developers.openai.com/api/docs/pricing)
- [Sign in with ChatGPT](https://learn.chatgpt.com/docs/sign-in-with-chatgpt)
