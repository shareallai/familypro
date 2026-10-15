---
locale: de
translationKey: grok-build-guide
title: "Grok Build Guide 2026: Pläne, Modelle, Limits und Befehle"
headline: Wie du Grok Build für deinen Engineering-Workflow bewertest
description: "Aktueller Grok-Build-Guide zu Tarifen, Grok 4.7 und Fast, Installation, Befehlen, gemeinsamem Wochenkontingent und separaten API-Kosten."
summary: Dieser Beitrag hilft Engineering-Teams bei der Entscheidung, ob Grok Build in den bestehenden Delivery-Workflow passt, inklusive praxisnaher Hinweise zu Zugriff, Onboarding und täglicher Nutzung.
category: KI-Tool-Analyse
pubDate: 2026-05-26
updatedDate: 2026-10-15
author: Mark
service: Grok
tags:
  - Grok Build
  - xAI
  - KI Coding Agent
  - CLI
  - Engineering Workflow
relatedTranslationKeys:
  - grok-plan-guide
  - codex-cursor-claude-code-local-dev-tools-guide
  - codex-claude-cursor-instructions-guide
draft: false
---

Grok Build verbindet Codeverständnis, Planung, Änderungen und Prüfung im Terminal. Unterscheide die Funktionen des Clients, tatsächlich verfügbare Modelle und die Abrechnung über Abo oder API.

**Fakten und Preise geprüft: 2026-10-15. USD-Preise dienen nur zur Orientierung, ohne anwendbare Steuern. Maßgeblich sind offizielle Preise und deine Rechnung.** Für Kauf und Wechsel siehe den [neuen Grok-Tarifguide](../xai-grok-x-subscription-plan-guide/).

## 1. Was Grok Build ist

Laut xAI-Dokumentation ist Grok Build ein Coding Agent für Terminalumgebungen mit drei primären Betriebsarten:

- Interaktive Fullscreen-TUI mit Mausunterstützung.
- Headless-CLI-Pfad für Skripte und Automatisierung (`grok -p ...`).
- ACP-Modus für die Integration in externe Anwendungen (`grok agent stdio`).

Praktisch ist das nicht nur eine Chat-Hülle über Shell-Befehle. Es ist eine durchgehende Ausführungskette aus Planung, Edits, Dateioperationen, Tool-Aufrufen und parallelen Subagenten.

## 2. Aktuelle Tarife und Zugang

Neukunden vergleichen The X Subscription: Free ist begrenzt; Plus kostet $8, Premium $30, Super $100 und Ultra $200 monatlich. Die Preisseite führt Grok Build unter Plus auf. Prüfe Modelle und Restkontingent nach dem Login; altes SuperGrok oder X Premium+ ist nicht mehr die einzige Kaufvoraussetzung.

Premium, Super und Ultra bieten 4x, 15x und 50x Plus-Nutzung, keine festen Aufgabenzahlen. Grok Bot beginnt bei Premium. Bestehende Abos können derzeit bleiben; führe Konten nicht bloß zum Test zusammen. Teams prüfen Sitzplatzzuweisung und Organisationsregeln.

## 3. Nutzung in der Praxis: schnelles Onboarding (ca. 5 Minuten)

### 3.1 Installation

macOS / Linux / WSL:

```bash
curl -fsSL https://x.ai/cli/install.sh | bash
```

Windows (PowerShell):

```powershell
irm https://x.ai/cli/install.ps1 | iex
```

### 3.2 Erste Authentifizierung

```bash
grok
```

Standardmäßig öffnet der erste Start die Browser-Authentifizierung. In Umgebungen ohne Browser (z. B. Remote-Hosts oder Container) nutze einen API-Key:

```bash
export XAI_API_KEY="xai-..."
grok
```

Kann die entfernte Umgebung keinen Browser öffnen, ist der Gerätecode eine Alternative, kein zusätzlicher Pflichtschritt nach dem Browser-Login.

```bash
grok login --device-auth
```

### 3.3 Start in einem Repository

```bash
cd your-project
grok inspect
grok
```

Nützliche erste Prompts in Produktions-Repositories:

- "Map this repository and identify boot paths."
- "Enter plan mode first, do not edit files yet."
- "List risks first, then propose edits."

### 3.4 Headless- und Automatisierungspfade

```bash
grok -p "Explain this codebase"
grok -p "Review this diff" --output-format json
```

Für IDE-Orchestrierung oder internes Tooling nutze ACP:

```bash
grok agent stdio
```

## 4. Unterstützt es CLI und GUI? Ist es ähnlich wie codex.app?

Kurzantwort: **Grok Build ist aktuell klar CLI/TUI-first und keine eigenständige Desktop-GUI-App.**

- CLI: ja, und das ist der Haupteinstieg.
- Interaktive Oberfläche: ja, aber terminalnativ (Fullscreen-TUI), nicht als Desktop-Fenster-GUI.
- codex.app-ähnlicher grafischer Flow: via ACP-Integration in andere Software möglich, heute aber nicht die Standard-Produktform.

Wenn dein Team primär visuelle Workspace-Werkzeuge bevorzugt, solltest du Grok Build als terminalzentrierte Agent-Plattform einordnen, nicht als 1:1-GUI-Ersatz.

## 5. Welche Plattformen unterstützt werden

Aus den offiziellen Getting-Started-Dokumenten sind folgende Setup-Umgebungen bestätigt:

- `macOS`
- `Linux`
- `WSL`
- `Windows PowerShell`

Auf Produktfamilien-Ebene decken Grok-Funktionen außerdem ab:

- `Web`
- `iOS`
- `Android`
- `X`

Wichtige Abgrenzung: Grok Build selbst ist als Terminal-Coding-Agent positioniert, nicht als mobile Chat-App.

## 6. Modelle und Konfiguration

### 6.1 Grok 4.7, Fast und ältere Modelle

Die aktuelle Build-Übersicht stellt `grok-4.7` vor; die API-Preisliste enthält weiterhin `grok-build-0.1`. Die alte ID belegt weder das einzige noch das voreingestellte Clientmodell. `grok-build` im Einstellungsbeispiel ist ein Konfigurationsname, nicht automatisch dieselbe API-Modell-ID.

Grok 4.7 Fast stellt dasselbe Modell auf schnellerer Infrastruktur bereit. Es ist nur in Cursor und Build verfügbar, wird über den dortigen Tarif abgerechnet und fehlt in der öffentlichen xAI-API sowie im kostenlosen Build-Tarif. Schnellere Antworten können höhere Nutzungskosten haben.

### 6.2 Konto und geladene Einstellungen prüfen

Nutze `grok models` im Shell und `/model <name>` in der TUI. Eigene Modelle und Standardmodell gehören in `~/.grok/config.toml` auf Nutzerebene. Projektweite `.grok/config.toml` unterstützt vor allem MCP, Plugins und Berechtigungsregeln, nicht alle Nutzereinstellungen. `grok inspect` zeigt die geladenen Quellen.

## 7. Gemeinsames Kontingent, API und Fast

### 7.1 Abo-Verbrauch

Jeder bezahlte Sitzplatz hat einen Wochenvorrat für berechtigte eigene Modelle über unterstützte Grok- und Cursor-Oberflächen. Aufgaben verbrauchen unterschiedlich viel; die Faktoren garantieren keine täglichen Nachrichten-, Coding- oder Videozahlen. Beobachte `/usage` und die Kontoverbrauchsansicht während einer normalen Woche.

Drittanbietermodelle in Cursor kosten ab der ersten Nutzung extra. Öffentliche Grok-API-Aufrufe werden separat abgerechnet und nutzen diesen Vorrat nicht. Eigene Endpunkte folgen ihrem Anbieter.

### 7.2 Aktuelle API-Raten und Fast

Globale Standard-Endpunktpreise für `grok-4.7` in USD je Million Tokens: Ab der Schwelle für langen Kontext gilt der entsprechende Preis für alle Tokens der Anfrage, nicht nur den Überschuss.

| Eingabekontext | Eingabe | Cache-Eingabe | Ausgabe |
| --- | --- | --- | --- |
| Unter 200k Tokens | $2.00 | $0.50 | $6.00 |
| Ab 200k Tokens | $4.00 | $1.00 | $12.00 |

Fast kostet innerhalb von Cursor/Build das 2-Fache der Standardraten bei kürzerem und das 1,5-Fache bei langem Kontext, über den Produkttarif abgerechnet. Tools können zusätzlich kosten; die alte pauschale Schätzung von $5 je tausend Aufrufen für jedes Tool ist ungeeignet. **Datenstand: 2026-10-15, nur Orientierung. Regionale Endpunkte, Modelle, Tools und Abrechnungsregeln beeinflussen den Gesamtpreis.**

## 8. Befehle für den Alltag und längere Arbeit

`/model <name>` wechselt das Modell, `/plan [description]` startet Plan mode, `/view-plan` öffnet den Plan. `/usage` zeigt Verbrauch, `/context` den Kontext und `/compact` komprimiert ihn. `/new` und `/resume` starten oder setzen Sitzungen fort; `/rewind` springt zu einer früheren Gesprächsrunde. `/skills`, `/plugins` und `/mcps` öffnen Erweiterungsregister.

`/goal <objective>` ist für längere Arbeit mit prüfbarem Ziel. `/create-workflow` erstellt einen Ablauf, `/workflow <name>` führt ihn aus, `/workflows` öffnet die Laufübersicht. `/loop` wiederholt Prompts, `/tasks` listet Hintergrundarbeit. Prüfe Berechtigungen, Kosten und lokale `/help`.

Plans Dateisperre gilt unabhängig vom Berechtigungsmodus: Vor Freigabe darf nur die Plandatei editiert werden. Bash und MCP folgen weiter ihren Berechtigungen; Shell-Aufrufe können schreiben. Plan ist keine schreibgeschützte Sandbox.

## 9. Häufige Grok-Funktionen und wo sie relevant sind

### 9.1 Echtzeit-Informationssuche (Web + X)

Ein zentraler Differenzpunkt ist die kombinierte Nutzung von Echtzeit-Websuche und X-Suche innerhalb derselben Antwortkette. Das ist besonders nützlich bei zeitkritischer Recherche.

### 9.2 Agentischer Coding-Workflow

Über reine Codeantworten hinaus kann Grok Build Repository-Scanning, Planerstellung, Codeänderungen und Diff-Erklärung ausführen, sobald passende Berechtigungen gesetzt sind.

### 9.3 Parallele Subagenten

Bei großen Aufgaben lässt sich Arbeit in mehrere parallele Erkundungsspuren teilen, was bei komplexer Incident-Diagnose und Multi-Modul-Analyse hilft.

### 9.4 Skills-, Plugin- und MCP-Ökosystem

Grok Build kann lokale Regeln und Skill-Verzeichnisse erkennen und über Plugins sowie MCP-Integrationen erweitert werden. Das erleichtert Migrationen aus bestehenden Agent-Ökosystemen.

### 9.5 Multimodale Fähigkeiten in derselben Produktfamilie

Zur Grok-Produktfamilie gehören außerdem Bild-/Video-Generierung und Verständnisfunktionen, hilfreich für Dokumentation, Demos und inhaltsorientierte Workflows.

## 10. Einführung sinnvoll prüfen

Teste eine begrenzte Aufgabe mit bekanntem Konto, Modell und Abrechnungsweg. Lies Projektregeln, prüfe Plan und Diff und führe passende Tests oder den Build aus. Wähle den Tarif anhand gemessener Nutzung statt alter Abo-Namen.

Wer eine Desktop-GUI braucht, testet die konkrete Integration. Bestehende Abläufe sollten Ergebnisse, Gesamtkosten und Wechselaufwand derselben Aufgabe vergleichen. Werkzeugzugang ersetzt keine Abnahme.

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
