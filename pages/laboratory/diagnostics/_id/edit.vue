<template>
  <Form :diagnostic="diagnostics" :update="true" />
</template>

<script>
import Form from '../../../../components/Laboratory/Diagnostics/Form'
export default {
  components: { Form },

  async asyncData({ $axios, route }) {
    console.log(await $axios.$get('diagnostics/' + route.params.id))
    return {
      diagnostics: await $axios.$get('diagnostics/' + route.params.id)
    }
  }
}
</script>
