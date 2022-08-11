# [Numenera Web Character Sheet](https://numenera-web-character-sheet.netlify.app)

[![Netlify Status](https://api.netlify.com/api/v1/badges/d909550b-8071-447e-bb1d-5691bbc49593/deploy-status)](https://app.netlify.com/sites/numenera-web-character-sheet/deploys)

An editable character sheet for Numenera on the web!
There is no backend for the app. The character sheet
data is saved to your browser's storage.

## Motivation

I wanted to practice React + TypeScript and wanted
a flexible Numenera character sheet.

## To Do

- Add confirmation for sheet reset (maybe also for collection item deletion)
- Add ability to import character sheet from a json file
- Make sections after basic info and pools collapsible
- Add character types from Numenera Destiny
  - Alternatively, maybe just make the character type field a text field to allow for custom character types from Cypher System core
- See if I can split the reducer up into multiple reducers
- Probably just make the sheet the root of the app state

## 3rd Party Libraries (besides React)

- [ts-pattern](https://github.com/gvergnaud/ts-pattern) ✨
