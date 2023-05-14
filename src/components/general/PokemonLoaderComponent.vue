<template>
  <div :class="classes">
    <img
        :width="width"
        :height="height"
        src="https://i.gifer.com/5Q0v.gif"
        alt="pokemon-loading"
    />
  </div>
</template>

<script>
export default {
  name: 'pokemon-loader-component',
  props: {
    classes: {
      type: String,
      default: 'text-center'
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 80
    }
  }
}
</script>
