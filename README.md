## parcel-plugin-vue-compact

> Supports a compact mode for Vue single file component (SFC) files.

### SFC (single file component) support

A powerful idea from [Vue](https://vuejs.org) is the
[SFC (single file component)](https://vuejs.org/v2/guide/single-file-components.html). These are
files that have a section for the HTML called the `template`, another
section for the JS called the `script`, and multiple CSS sections that
are indicated by `style` sections. Each of these supports multiple
different languages. For example, if you like pug, CoffeeScript, and
Stylus, then you can use these tags: `<template lang='pug'>...</template>`,
`<script lang='coffee'>...</script>`, and `<script lang='stylus'></script>`.
The following image shows what this looks like in Vue:

<img width="729" alt="Vue component" src="https://user-images.githubusercontent.com/142875/52330016-8216e700-29b1-11e9-91cc-1c24b2429e66.png">

### What this Parcel plugin does

As huge fans of [succinctness](http://www.paulgraham.com/power.html), we've chosen `pug`, `coffee`, and `stylus` for our Vue SFC's. This plugin just does one thing: It let's you specify just the `lang` left-justified, instead of having to embed it in angle brackets. That's it.

<img width="729" alt="Vue component" src="https://user-images.githubusercontent.com/142875/52465955-c931e300-2b3d-11e9-85d0-3d7293237e1c.png">
