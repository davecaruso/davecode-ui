# @davecode/ui

my own ui library for making svelte applications. it has these keys

- polished and good feeling to interact with
- themeable and customizable, dark and light
- simplistic and small but large enough to cover any possible need
- "modern", but that word is thrown around too much

it's overall style can be described as a "Less Corporate" version of Material Design, with my own
design ideals thrown in. we use simple lch-generated palettes over hct tonal ones, playful animation
with extreme attention to detail is encouraged, etc. you can peek at [the component playground][1]
for more information.

[1]: https://davecode.net/ui/components

## getting started

After installing, include the base css. I promise it's as minimal as possible, providing only what
you need to get `@davecode/ui` looking how it should. Throw this in your layout's global style tag:

```css
@import '@davecode/ui/base.css';
```

```svelte
<script lang='ts'>
  import { ThemeRoot } from '@davecode/ui';
</script>

<ThemeRoot>
  <main>
    <!-- Your app... -->
  </main>
</ThemeRoot>
```

## component reference
