<template>
  <data-viewer
    title="Patients"
    :columns="columns"
    endpoint="patients"
    create-route="/form/patient"
  />
</template>

<script>
import DataViewer from '../../../common/ui/widgets/DataViewer'

export default {
  name: 'PatientsDataView',
  components: { DataViewer },

  data: () => ({
    columns: [{ text: 'Name', value: 'name' }]
  })
}
</script>

<style scoped></style>
