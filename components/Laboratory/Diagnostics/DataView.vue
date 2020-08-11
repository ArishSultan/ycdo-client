<template>
  <DataViewer
    :columns="columns"
    endpoint="diagnostics"
    title="Diagnostics"
    create
    create-route="/laboratory/diagnostics/add"
    remove
    change
    change-route="diagnostics/$id/edit"
    remove-route="diagnostics/$id"
  />
</template>

<script>
import DataViewer from '../../../common/ui/widgets/DataViewer'

export default {
  name: 'DiagnosticsDataView',
  components: { DataViewer },

  data: () => ({
    columns: [
      { text: 'Name', value: 'name' },
      { text: 'Time Required', value: 'timeRequired' }
    ]
  })
}
</script>
