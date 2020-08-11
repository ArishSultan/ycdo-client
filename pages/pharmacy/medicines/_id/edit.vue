<template>
  <Form :medicine="medicine" :update="true" />
</template>

<script>
import Form from '../../../../components/Pharmacy/Medicines/Form'
export default {
  components: { Form },

  async asyncData({ $axios, route }) {
    return {
      medicine: await $axios.get('medicines/' + route.params.id)
    }
  }
}
</script>
