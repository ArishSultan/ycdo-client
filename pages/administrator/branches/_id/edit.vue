<template>
  <branch-form :branch="branch" :is-update="true" />
</template>

<script>
import BranchForm from '../../../../components/Administrator/Branch/Form'
export default {
  layouts: 'form',
  components: { BranchForm },

  async asyncData({ $axios, route }) {
    return {
      branch: await $axios.$get('branches/' + route.params.id)
    }
  }
}
</script>
