<template>
  <div class="input-group">
    <div class="input-group-prepend">
      <div class="input-group-text">
        <span class="fa fa-search"></span>
      </div>
    </div>
    <input
      class="form-control search-input"
      :class="classes"
      type="text"
      v-model="mutableValue"
      @input="input(mutableValue)"
      :placeholder="placeholder"
      ref="search"
    />
  </div>
</template>

<script>
export default {
  name: 'search-component',
  props: {
    value: {
      type: String,
      default: '',
      desc: 'search value'
    },
    classes: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      timeout: 0,
      mutableValue: this.value ? this.value : ''
    }
  },
  methods: {
    input(val) {
      clearTimeout(this.timeout)
      this.$emit('input', val)
      this.timeout = setTimeout(() => {
        this.$emit('search')
      }, 500)
    }
  },
  watch: {
    value(val) {
      this.mutableValue = val
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-input{
    opacity: 0.7 !important;
  }

  .search-input:hover{
    opacity: 0.8;
  }

  .search-input:active{
    opacity: 1;
  }
</style>
