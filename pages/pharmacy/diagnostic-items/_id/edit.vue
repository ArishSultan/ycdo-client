<template>
  <Form :lab-test-equipment="diagnosticItem" :update="true" />
</template>

<script>
import Form from '../../../../components/Pharmacy/LabTestEquipments/Form'
export default {
  components: { Form },

  async asyncData({ $axios, route }) {
    return {
      diagnosticItem: await $axios.get(
        'diagnostic-equipments/' + route.params.id
      )
    }
  }
}
</script>
