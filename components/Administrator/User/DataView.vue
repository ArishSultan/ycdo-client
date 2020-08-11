<template>
  <data-viewer
    create
    title="Users"
    endpoint="users"
    change
    change-route="/administrator/users/$id/edit"
    :columns="columns"
    create-route="/administrator/users/add"
  />
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import DataViewer from '../../../common/ui/widgets/DataViewer.vue'

export default defineComponent({
  name: 'UsersDataView',
  components: { DataViewer },

  setup() {
    const columns = ref([
      { text: 'Name', value: 'name' },
      { text: 'Email', value: 'email' },
      { text: 'Contact', value: 'contact' },
      { text: 'Scope', value: 'scope' }
    ])

    return { columns }
  }
})
</script>
