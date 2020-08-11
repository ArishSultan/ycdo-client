<template>
  <Form :surgical-item="surgicalItem" :update="true" />
</template>

<script>
import Form from '../../../../components/Pharmacy/SurgicalItems/Form'
export default {
  components: { Form },
  async asyncData({ $axios, route }) {
    return {
      surgicalItem: await $axios.get('surgical-items/' + route.params.id)
    }
  }
}
</script>
