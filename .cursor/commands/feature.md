# Full feature pipeline

Run the **full spec-driven pipeline** for the feature described in this chat message (below).

## Your job

1. Use the **feature-pipeline** subagent in **full** mode.
2. Pass the entire user message (feature description, designs, constraints) as the task.
3. Do not ask the user to invoke implementator, test-writer, or reviewers separately — the orchestrator runs all steps in order.
4. Do not create git commits unless the user explicitly asked in this message.

## Feature to build

<!-- User adds description after /feature — e.g. screens, flows, mock API notes -->

If the message above is empty, ask the user for a one-paragraph feature description and any screenshots before starting.
