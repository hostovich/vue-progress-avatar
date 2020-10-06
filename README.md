## Expamle
![Progress Avatar example](https://raw.githubusercontent.com/hostovich/vue-progress-avatar/master/img/vue-progress-avatar.gif)

## Install

```sh
# using in your project
npm i vue-progress-avatar
```

## Nuxt

```sh
import Vue from 'vue';
import VueProgressAvatar from 'vue-progress-avatar';

Vue.use(VueProgressAvatar);
```

## Props

| Name            | Type            | Description                                | Default                      |
| --------------- | --------------- | ------------------------------------------ | ---------------------------- |
| `image`         | `String`        | Image inside circle   | `''` |
| `radius`        | `Number`        | Circle radius | `40` |
| `totalPoits`    | `Number`        | Full fill target. | `100` |
| `progress`      | `Number`        | Circle progress. | `0` |
| `stroke`        | `Number`        | Stroke width. | `4` |
| `strokeLinecap` | `String`        | Rounding the corners of a stroke. | `round` |
| `fillColor`     | `String`        | Circle background color. | `#f5f5f5` |
| `strokeColor`   | `String`        | Progress stroke color. | `#BBEE29` |
| `innerStrokeColor` | `String`     | Back stroke color. | `#dedede` |
