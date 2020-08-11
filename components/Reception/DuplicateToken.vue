<template>
  <div class="_container">
    <v-card class="card range-input">
      <span class="card__title span--2">Search Token</span>

      <div>
        <v-text-field
          v-model="dateFrom"
          type="date"
          label="Date From"
          outlined
          dense
        />

        <v-text-field
          v-model="dateTo"
          type="date"
          label="Date To"
          outlined
          dense
        />
      </div>

      <v-btn width="100%" elevation="0" color="primary" @click="searchTokens">
        <v-icon small>mdi-magnify</v-icon>Search
      </v-btn>
    </v-card>
    <v-card class="token-results">
      <v-data-table
        dense
        :headers="columns"
        :items="tokens"
      >
        <template #item.action="{ item }">
          <v-btn @click="duplicateToken(item)" icon>
            <v-icon>mdi-printer</v-icon>
          </v-btn>
        </template>
        <template #item.createdAt="{ item }">
          {{ formatDate(item.createdAt) }}
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'
import {defineComponent, ref} from '@vue/composition-api'

export default defineComponent({
  name: 'DuplicateToken',

  setup(_, context) {
    const tokens = ref([])
    const dateTo = ref(new Date())
    const columns = ref([
      { text: 'Token #', value: 'number' },
      { text: 'Created At', value: 'createdAt' },
      { text: 'Action', value: 'action', width: '100', align: 'center' }
    ])
    const dateFrom = ref(new Date())

    async function searchTokens() {
      try {
        tokens.value = await context.root.$axios.$get(`tokens/range?start=${dateFrom.value}&end=${dateTo.value}`)
        console.log(tokens)
      } catch (e) {
      }
    }

    function formatDate(date) {
      return moment(date).format('dddd DD-MM-YYYY');
    }

    async function duplicateToken(item) {
      window.open(context.root.$axios.defaults.baseURL + `/tokens/printable?token=${item._id}&user=${context.root.$auth.user._id}`)
    }

    return {
      tokens,
      dateTo,
      columns,
      dateFrom,
      formatDate,
      searchTokens,
      duplicateToken
    }
  }
})
</script>

<style lang="sass" scoped>
._container
  width: 550px
  display: flex
  margin-top: 20px
  margin-left: auto
  margin-right: auto
  flex-direction: column

.range-input
  width: 100%
  margin-bottom: 20px

  div
    display: grid
    margin-top: 10px
    column-gap: 5px
    grid-template-columns: auto auto

.token-results
  width: 100%
</style>
