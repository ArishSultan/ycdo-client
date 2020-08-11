<template>
  <data-viewer
    title="Branches"
    :columns="columns"
    endpoint="branches"
    change
    change-route="/administrator/branches/$id/edit"
    create
    create-route="/administrator/branches/add"
  />
</template>

<script>
import DataViewer from '../../../common/ui/widgets/DataViewer'

export default {
  name: 'BranchDataViewer',
  components: { DataViewer },
  data: () => ({
    columns: [
      { text: 'Name', value: 'name' },
      { text: 'Code', value: 'code' },
      { text: 'Contact', value: 'contact' },
      { text: 'Address', value: 'address' }
    ]
  })
}
</script>
