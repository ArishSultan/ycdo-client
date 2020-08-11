<template>
  <div style="width: 100%">
    <data-viewer
      :endpoint="endpoint"
      :columns="columns"
      :create="false"
      :change="false"
      :remove="false"
      :title="title"
    >
      <template v-slot:actions="{ item }">
        <v-icon small @click="showData(item)">mdi-eye</v-icon>
      </template>
    </data-viewer>
    <v-dialog v-model="dialog" width="600">
      <v-card>
        <v-data-table
          v-if="!loading"
          height="200"
          dense
          hide-default-footer
          :items="purchases"
          :headers="purchasesColumn"
        />
        <v-progress-circular v-else />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import DataViewer from '../../common/ui/widgets/DataViewer'

export default {
  name: 'Stock',
  components: { DataViewer },

  props: {
    title: {
      type: String,
      required: true
    },
    endpoint: {
      type: String,
      required: true
    }
  },

  data: () => ({
    columns: [
      { text: 'Name', value: 'name', width: '90%' },
      { text: 'Fix Limit', value: 'fixLimit', width: 130 },
      { text: 'Qty', value: 'quantity', width: 130 }
    ],
    purchasesColumn: [
      { text: 'Batch #', value: 'batch' },
      { text: 'Quantity', value: 'qty' },
      { text: 'Price', value: 'price' },
      { text: 'Expires At', value: 'expiresAt' },
      { text: 'Purchased At', value: 'purchasedAt' }
    ],
    data: [],
    dialog: false,
    loading: false,
    purchases: []
  }),

  methods: {
    showData(item) {
      this.dialog = true
      this.loading = true
      this.$axios
        .$get(`${this.endpoint}/${item._id}/purchases`)
        .then(data => {
          this.loading = false
          this.purchases = data.map(item => {
            item.expiresAt = item.expiresAt
              ? moment(item.expiresAt).format('DD - MMM - YYYY')
              : 'NONE'

            item.purchasedAt = moment(item.purchasedAt).format(
              'DD - MMM - YYYY'
            )

            return item
          })
        })
        .catch(console.log)
    }
  }
}
</script>
