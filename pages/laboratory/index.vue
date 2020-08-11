<template>
  <div>
    <simple-form title="Update Test Report" endpoint="tokens" :data="{}">
      <entity-selector
        title-selector="Assigned Tests"
        title-selected="None"
        endpoint=""
      />
    </simple-form>

    <v-btn @click="drawer = true">Open token</v-btn>
    <v-navigation-drawer v-model="drawer" app right>
      <v-tabs grow>
        <v-tab>
          Tokens
        </v-tab>
        <v-tab>
          In Progress
        </v-tab>

        <v-tab-item>
          <div style="padding: 5px">
            <v-btn
              color="primary"
              width="100%"
              elevation="0"
              @click="loadTokens"
            >
              Refresh
            </v-btn>
          </div>

          <v-data-table
            dense
            :items="tokens"
            :headers="tokensHeader"
            hide-default-footer
          >
            <template v-slot:item.createdAt="{ item }">
              {{ parseDate(item) }}
            </template>
          </v-data-table>
        </v-tab-item>
        <v-tab-item>
          <div style="padding: 5px">
            <v-btn color="primary" width="100%" elevation="0">
              Refresh
            </v-btn>
          </div>

          <v-data-table hide-default-footer />
        </v-tab-item>
      </v-tabs>
    </v-navigation-drawer>
  </div>
</template>

<script>
import moment from 'moment'
import SimpleForm from '../../common/ui/widgets/SimpleForm'
import EntitySelector from '../../common/ui/widgets/EntitySelector'

export default {
  components: {
    SimpleForm,
    EntitySelector
  },

  data: () => ({
    tokensHeader: [
      { text: 'Number', value: 'number', sortable: false, filterable: false },
      { text: 'Date', value: 'createdAt', sortable: false, filterable: false }
    ],
    inProgressHeader: [
      { text: 'Number', value: 'number', sortable: false, filterable: false },
      { text: 'Date', value: 'createdAt', sortable: false, filterable: false }
    ],
    inProgress: [],
    tokens: [],
    drawer: false
  }),

  mounted() {
    this.loadTokens()
    this.loadInProgress()
  },

  methods: {
    parseDate(date) {
      return moment(date).format('DD - MMM - YYYY')
    },

    loadTokens() {
      this.$axios
        .$get('tokens')
        .then(tokens => (this.tokens = tokens))
        .catch(console.log)
    },

    loadInProgress() {
      this.$axios
        .$get('tokens')
        .then(tokens => (this.inProgress = tokens))
        .catch(console.log)
    }
  }
}
</script>
