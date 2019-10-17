# TP NODE


# Sommaire


- [TP NODE](#tp-node)
- [Sommaire](#sommaire)
- [Introduction](#introduction)
- [Prérequis](#pr%c3%a9requis)
- [Installation](#installation)
- [Hierachie](#hierachie)
- [Auteurs](#auteurs)

# Introduction

TP node système d'authenfication :)

# Prérequis

* [NVM](https://github.com/nvm-sh/nvm)

# Installation

Installer la version LTS de node
```bash
nvm install --tls
```

Utiliser la version LTS
```bash
nvm use --lts
```

Lancer le projet
```bash
yarn run dev
```
ou 
```bash
npm run dev
```

# Hierachie

* `src` : Contient tout l'écosystème du projet
* `src/controller`: Traitement des données envoyées aux vues
* `src/models`: Gestion des Schema Mongo
* `src/routes`: Organisation des routes
* `src/views`: Gestions des vues liée au controller
* `src/config.js`: Configuration des la gestion d'environnement
* `src/utils.js`: Librairie de fonction custom
* `src/server.js`: Point d'entrée et middleware de l'application

# Auteurs
* [Mehdi Fahim](@mehdi-fahim)
* [Yuval Abudarham](@FireWolfHound)
* [Saber Taby](@saber-dev)