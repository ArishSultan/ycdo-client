<template>
  <data-viewer
    create
    change
    remove
    :columns="columns"
    title="Lab Test Equipments"
    endpoint="lab-test-equipments"
    create-route="/pharmacy/medicines/add"
  />
</template>

<script>
import DataViewer from '../../../common/ui/widgets/DataViewer'

export default {
  name: 'LabTestEquipmentsDataView',
  components: { DataViewer },

  data: () => ({
    columns: [
      { text: 'Name', value: 'name', width: 250 },
      {
        text: 'Market Price',
        value: 'marketPrice',
        sortable: false,
        filterable: false
      },
      {
        text: 'Retail Price',
        value: 'retailPrice',
        sortable: false,
        filterable: false
      },
      { text: 'Poor', value: 'poor', sortable: false, filterable: false },
      {
        text: 'Deserving',
        value: 'deserving',
        sortable: false,
        filterable: false
      },
      { text: 'General', value: 'general', sortable: false, filterable: false },
      { text: 'YCDO', value: 'ycdo', sortable: false, filterable: false },
      {
        text: 'Fix Limit',
        value: 'fixLimit',
        sortable: false,
        filterable: false
      }
    ]
  })
}
</script>
