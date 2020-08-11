<template>
  <data-viewer
    :columns="headers"
    endpoint="messages-queue"
    title="Pending Messages"
  >
    <template #primary-action>
      <v-btn
        color="primary"
        elevation="0"
        style="padding: 0 15px 0 15px !important; border-radius: 4px; margin-right: 10px"
      >
        Send All
      </v-btn>
    </template>
  </data-viewer>
</template>

<script>
import DataViewer from '../../../common/ui/widgets/DataViewer'
export default {
  name: 'PendingData',
  components: { DataViewer },

  data: () => ({
    headers: [
      { text: 'Created At', value: 'createdAt' },
      { text: 'User', value: 'message.user.name' },
      { text: 'Collection Name', value: 'message.collectionName' },
      { text: 'Action', value: 'message.action' }
    ]
  })
}
</script>
