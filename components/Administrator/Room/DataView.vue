<template>
  <data-viewer
    create
    remove
    change
    change-route="/administrator/rooms/$id/edit"
    title="Rooms"
    endpoint="rooms"
    :columns="columns"
    create-route="/administrator/rooms/add"
  />
</template>

<script>
import DataViewer from '../../../common/ui/widgets/DataViewer'

export default {
  name: 'RoomDataView',
  components: { DataViewer },

  data: () => ({
    columns: [
      { text: 'Name', value: 'name' },
      { text: 'Type', value: 'type' }
    ]
  })
}
</script>

<style scoped></style>
