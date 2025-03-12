# Spell Whisperer


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Spell Whisperer](#spell-whisperer)
  - [Disclaimer](#disclaimer)
  - [Introduction](#introduction)
  - [Deploy on Vercel](#deploy-on-vercel)
  - [Deploy on your own](#deploy-on-your-own)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Disclaimer

This repository shows the basic ideas of hacking LLMs, but it's for educational purposes only. I am not responsible for any misuse of this repository.

## Introduction

Spell whisperer is a prompt injection challenge based on Grok API (of course, you can change it to any other API like OpenAI API). There's five challenges now, probably more in the future.

## Deploy on Vercel

By clicking the following button, you will clone a repo from here and deploy your own app on Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/CX330Blake/Spell-Whisperer)

## Deploy on your own

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
