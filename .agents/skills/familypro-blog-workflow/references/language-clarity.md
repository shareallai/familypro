# Language Clarity and Fluency Checklist

Use this reference when writing, rewriting, localizing, or reviewing blog content in any language and on any topic.

## Goal

- Make prose read naturally for native readers of the target language.
- Remove ambiguity in facts, scope, timelines, quantities, and reasoning.
- Keep content concise without sounding abrupt or mechanical.

## Default pass order

1. Clarify meaning first, then polish rhythm.
2. Ensure each section answers one clear reader question.
3. Keep one core claim per sentence.
4. Re-check numbers, units, dates, versions, and scope labels.
5. Do one final readability pass from top to bottom.

## Hard rules

- Do not leave unclear referents in key statements when multiple entities are in context.
- For any quantity, include unit and time window when relevant.
- For time-sensitive claims, include an explicit date (`as of YYYY-MM-DD`).
- Write in a reader-facing tone for users trying to understand the post topic and decide what to do next; avoid detached report style.
- Distinguish clearly between:
  - verified fact
  - currently observed behavior
  - recommendation or inference
- Keep core terminology stable within one article; avoid frequent synonym swaps for the same concept.
- Avoid absolute wording (`always`, `never`, `guaranteed`) unless it is verified and scoped.
- Avoid AI-sounding repetition, mechanical transitions, and over-templated paragraph cadence.

## Editorial style defaults

- Prefer a written, concise, gently literary style: clear enough for quick execution, but not clipped, chatty, promotional, or report-like. Let sentences breathe when a slightly fuller transition improves the reading experience.
- Lead with the user's actual scenario or decision point, not with broad setup, generic definitions, or "this article will explain" framing.
- Keep only the use cases that matter to the current article. Do not expand into adjacent scenarios just to make the post feel comprehensive.
- Use bullets, numbered lists, FAQs, and tables only when they improve scanning. Do not turn every section into "three points," "three checks," or a formulaic FAQ.
- Prefer connected paragraphs over mechanical sequencing such as "first / second / third" when the section is short or explanatory.
- Remove filler transitions and generic conclusions such as "in summary," "what really matters is," and repeated "it is worth noting" phrasing unless they add a concrete condition.
- Make the final article feel edited: compact sections, no repeated claims, no inflated adjectives, and no obvious AI cadence.

## Avoiding mechanical prose

- Establish a narrative line—problem, change, practical response, and consequence—before dividing the article into sections. Headings should mark real turns in the argument, not act as labels for every fact.
- Avoid repeating the same information as a definition, a bullet list, and a closing summary. Once a point is clear, move the article forward.
- Vary paragraph shape according to meaning. Several consecutive sections should not all follow the same “what it is / what it supports / what it does not support” template unless readers genuinely need a fixed comparison.
- Keep related commands in one operational sequence. Introduce a command block with enough context to use it, then explain only the non-obvious consequence; avoid alternating one short instruction sentence with one small code block throughout a section.
- Use authorial judgment where it helps the reader choose, but label personal observation, recommendation, and verified fact distinctly. A restrained first-person sentence can be more credible than impersonal verdicts.
- Prefer natural transitions that express cause, contrast, or consequence. Avoid stock framing such as “the core is,” “the responsibilities are clear,” “this solution solves,” or “how to choose” when the surrounding prose already conveys that relationship.
- End after the reader's practical question has been answered. Do not add a generic recap merely to create a conclusion section.

## Information-value pass

Use this pass to detect mechanical or model-like prose without relying on a blacklist of phrases. Apply the test in the target language; wording alone is not evidence of a problem.

1. Classify what each sentence contributes: a fact, reason, condition, consequence, decision criterion, action, or necessary navigation.
2. Flag a sentence for review when it mainly announces the document's structure, labels the act of explaining, or tells the reader that a conclusion is important without adding subject-matter information.
3. Run a deletion test: remove the sentence mentally. If the paragraph keeps the same meaning and logical connection, the sentence is likely filler or duplicate navigation.
4. Run a specificity test on abstract conclusions. Confirm that the sentence names the actual actor, benefit, constraint, comparison baseline, or next action instead of referring vaguely to value, importance, a core idea, or an obvious answer.
5. Compare section openings and endings. Repeated rhetorical shapes can make prose feel generated even when every sentence is grammatical; vary them according to the underlying logic, not for cosmetic variety.
6. Rewrite by moving the useful information forward. Replace meta-commentary with the fact, tradeoff, condition, or consequence the reader needs at that point.

Do not remove navigation automatically. A roadmap can be useful in a long or technically complex document when it helps readers choose a path, understand prerequisites, or avoid a costly mistake. Keep it only when the navigation itself changes how the reader uses the document.

## Sentence-level checks

- Subject is explicit where omission may cause confusion.
- Each sentence expresses one main action/outcome.
- Modifiers are close to the terms they modify.
- Parallel items use consistent grammar.
- Negation is explicit and not double-negative.

## Paragraph-level checks

- Topic sentence appears early in each paragraph.
- Each paragraph advances one sub-point of the section.
- Transitions reflect real logic (contrast, cause, condition, sequence), not decorative filler.
- Comparison sections use fixed dimensions across compared items.
- FAQ answers start with a direct conclusion, then brief conditions/explanation.

## Ambiguity hotspots (topic-agnostic)

- Scope words (`some`, `most`, `often`, `many`): add boundaries or criteria.
- Comparative claims (`better`, `faster`, `safer`, `cheaper`): specify baseline and metric.
- Causal claims (`because`, `therefore`): include evidence or mark as hypothesis.
- Time references (`recently`, `now`, `soon`): replace with absolute dates or periods.
- Capability claims (`supports`, `works with`): clarify conditions and exclusions.

## Quick rewrite patterns (generic templates)

- Vague: “This approach performs better.”
- Clear: “In [context], this approach improved [metric] from [A] to [B].”

- Vague: “It supports more scenarios.”
- Clear: “It supports [scenario 1], [scenario 2], and [scenario 3]; it does not support [excluded case].”

- Vague: “Users can finish this quickly.”
- Clear: “Most users can finish this in about [time] under [conditions].”

- Vague: “This may fail in some cases.”
- Clear: “This fails when [condition]; use [fallback] in that case.”

## Localization checks (when translating)

- Keep facts, numbers, names, and constraints exactly aligned with the source.
- Adapt sentence rhythm and idioms to the target language instead of literal mapping.
- Preserve intent and CTA while allowing natural phrasing in the target language.

## Final pre-submit check

- Read the full article once without editing and mark any sentence that needs re-reading.
- Rewrite marked sentences until each can be understood in one pass.
- Ensure key conclusions can be quoted alone without losing conditions.
- Check whether the article can be shortened without losing the user's scenario, commands, facts, or decision guidance; if yes, shorten it.
- Look at paragraph and section openings in sequence. Rewrite them if too many begin with the same grammatical pattern, product name, or explanatory formula.
- Remove any list or recap that merely restates the paragraph immediately before it.
- Run the information-value pass on the introduction, transitions, section openings, and conclusion; these positions accumulate meta-commentary most easily.
