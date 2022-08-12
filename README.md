# [Numenera Web Character Sheet](https://numenera-web-character-sheet.netlify.app)

[![Netlify Status](https://api.netlify.com/api/v1/badges/d909550b-8071-447e-bb1d-5691bbc49593/deploy-status)](https://app.netlify.com/sites/numenera-web-character-sheet/deploys)

An editable character sheet for Numenera on the web!
There is no backend for the app. The character sheet
data is saved to your browser's storage.

## Motivation

I wanted to practice React + TypeScript and wanted
a flexible Numenera character sheet.

## To Do

- Add error handling to file import dialog
- ~~Make sections after basic info and pools collapsible~~ I'll have to revisit this later. DaisyUI doesn't play well with nested `collapse`-able elements
- Add character types from Numenera Destiny
  - Alternatively, maybe just make the character type field a text field to allow for custom character types from Cypher System core
- See if I can split the reducer up into multiple reducers
- Extract utility classes into tailwind components

## 3rd Party Libraries (besides React)

- [ts-pattern](https://github.com/gvergnaud/ts-pattern) ✨
- [TailwindCSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com)
