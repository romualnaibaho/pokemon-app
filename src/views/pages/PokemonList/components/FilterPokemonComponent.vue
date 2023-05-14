<template>
  <div class="form-group">
    <div class="row col-12">
      <div class="col-6">
        <select @change="selectClassification" class="custom-select">
          <option value=''>All Classification</option>
          <option
            v-for="(item, index) in classifications"
            :key="index"
            :value="item"
          >
            {{ item }}
          </option>
        </select>
      </div>
      <div class="col-6">
          <select @change="selectType" class="custom-select">
          <option value=''>All Types</option>
          <option
            v-for="(item, index) in types"
            :key="index"
            :value="item"
          >
            {{ item }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'filter-pokemon-component',
  props: {
    classifications: {
      type: Array,
      default: () => {
        return []
      }
    },
    types: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    selectClassification(event) {
      this.$emit('select-classification', event.target.value)
    },
    selectType(event) {
      this.$emit('select-type', event.target.value)
    }
  }
}
</script>
