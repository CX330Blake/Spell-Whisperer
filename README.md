# Spell Whisperer

<img width="1470" alt="opengraph-image" src="https://github.com/user-attachments/assets/349c20dd-fd3a-4b72-acc7-5788002a4268" />

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Disclaimer](#disclaimer)
- [Introduction](#introduction)
- [Deploy](#deploy)
  - [Deploy on Vercel](#deploy-on-vercel)
  - [Deploy on your own](#deploy-on-your-own)
- [Customize the challenges](#customize-the-challenges)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Disclaimer

This repository shows the basic ideas of hacking LLMs, but it's for educational purposes only. I am not responsible for any misuse of this repository.

## Introduction

Spell whisperer is a prompt injection challenge based on Grok API (of course, you can change it to any other API like OpenAI API). There's five challenges now, probably more in the future.

## Deploy

### Deploy on Vercel

By clicking the following button, you will clone a repo from here and deploy your own app on Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/CX330Blake/Spell-Whisperer)

### Deploy on your own

1. Clone/Fork this repository
2. Install all the dependencies

    ```bash
    npm install
    ```

3. Export your Grok/OpenAI API Key using this command

    ```bash
    export XAI_API_KEY=YOUR_API_KEY
    ```

4. Run `npm build && npm start` to start the server

## Customize the challenges

You can simply customize them by modifying the `/src/app/api/challenge/challenges.json`. You'll see everything you need there.

## Star History

<a href="https://www.star-history.com/#CX330Blake/Spell-Whisperer&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=CX330Blake/Spell-Whisperer&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=CX330Blake/Spell-Whisperer&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=CX330Blake/Spell-Whisperer&type=Date" />
 </picture>
</a>

## TODO

1. Leaderboard
2. Challenges page refactor & add scoring system
3. Add flag prefix
4. Other challenges (not just flag stealer)
5. Show others solutions 
