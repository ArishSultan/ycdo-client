<template>
  <div style="display: flex; flex-direction: column; align-items: center">
    <v-btn
      width="550px"
      color="white"
      elevation="4"
      style="margin-top: 40px; margin-bottom: 20px; border-radius: 8px"
      @click="state.tokensDrawer = !state.tokensDrawer"
    >
      Toggle Token Panel
    </v-btn>

    <transaction-form
      v-if="selected.main"
      :transaction="selected.main"
      title="Third Turn"
      endpoint=""
      :data="selected.main"
    >
      <span v-if="selected.freeMedicines.length > 0">Free Medicines</span>
      <v-card
        v-if="selected.freeMedicines.length > 0"
        class="span-2"
        style="margin-bottom: 20px"
      >
        <v-data-table
          dense
          disable-pagination
          hide-default-footer
          :items="selected.freeMedicines"
          :headers="headers.freeMedicines"
        >
          <template #body.append><span></span></template>
        </v-data-table>
      </v-card>

      <span v-if="selected.paidMedicines.length > 0">Paid Medicines</span>
      <v-card
        v-if="selected.paidMedicines.length > 0"
        class="span-2"
        style="margin-bottom: 20px"
      >
        <v-data-table
          dense
          disable-pagination
          hide-default-footer
          :items="selected.paidMedicines"
          :headers="headers.paidMedicines"
        >
          <template #item.price="{ item }">
            {{ item[match(selected.main.type)] }}
          </template>
          <template #body.append>
            <td style="font-weight: bold">Total</td>
            <td style="text-align: right">
              {{ selected.totalAmountOfMedicines }}
            </td>
          </template>
        </v-data-table>
      </v-card>

      <span v-if="selected.main.diagnostics.length > 0">Diagnostics</span>
      <v-card
        v-if="selected.main.diagnostics.length > 0"
        class="span-2"
        style="margin-bottom: 20px"
      >
        <v-data-table
          dense
          disable-pagination
          hide-default-footer
          :items="selected.main.diagnostics"
          :headers="headers.diagnostics"
        >
          <template #item.price="{ item }">
            {{ item[match(selected.main.type)] }}
          </template>
          <template #body.append>
            <td style="font-weight: bold">Total</td>
            <td style="text-align: right">
              {{ selected.totalAmountOfDiagnostics }}
            </td>
          </template>
        </v-data-table>
      </v-card>
    </transaction-form>

    <v-card v-else style="padding: 20px; width: 550px" elevation="4">
      No Token is currently selected, Select a Token from the Panel
    </v-card>

    <v-navigation-drawer v-model="state.tokensDrawer" app right>
      <div style="padding: 5px">
        <v-btn
          color="primary"
          width="100%"
          elevation="0"
          @click="loadTokens(true)"
        >
          Refresh
        </v-btn>
      </div>

      <v-data-table
        dense
        hide-default-footer
        :items="state.tokens"
        :headers="headers.tokens"
        @click:row="tokenSelected"
      >
        <template v-slot:item.createdAt="{ item }">
          {{ parseDate(item) }}
        </template>
      </v-data-table>
    </v-navigation-drawer>
  </div>
</template>

<script>
import moment from 'moment'
import { defineComponent, reactive, onMounted } from '@vue/composition-api'
import TransactionForm from '../../common/ui/widgets/TransactionForm'
import { required } from '../../common/lib/validator'
import SimpleForm from '../../common/ui/widgets/SimpleForm'
import EntitySelector from '../../common/ui/widgets/EntitySelector'

export default defineComponent({
  name: 'ThirdTurn',

  components: {
    SimpleForm,
    EntitySelector,
    TransactionForm
  },

  setup(_, context) {
    const state = reactive({
      tokens: [],
      tokensDrawer: false,
      submitDialog: false,
      confirmationDialog: false
    })

    const selected = reactive({
      temp: null,
      main: null,

      freeMedicines: [],
      paidMedicines: [],
      totalAmountOfMedicines: 0,
      totalAmountOfDiagnostics: 0
    })

    function match(str) {
      switch (str) {
        case 'poor':
          return 'poor'
        case 'general':
          return 'general'
        case 'private':
          return 'retailsPrice'
      }
    }

    const headers = reactive({
      tokens: [
        { text: 'Number', value: 'number', sortable: false, filterable: false },
        { text: 'Date', value: 'createdAt', sortable: false, filterable: false }
      ],
      freeMedicines: [
        { text: 'Name', value: 'medicine.name', width: '90%' },
        {
          text: 'Consumption',
          value: 'consumption',
          width: '100px',
          sortable: false
        }
      ],
      paidMedicines: [
        { text: 'Name', value: 'medicine.name', width: '50%' },
        {
          text: 'Price',
          value: 'price',
          align: 'right',
          width: '100px',
          sortable: false
        },
        {
          text: 'Consumption',
          value: 'consumption',
          width: '100px',
          sortable: false
        }
      ],
      diagnostics: [
        { text: 'Name', value: 'diagnostic.name' },
        { text: 'Result', value: 'result', sortable: false, align: 'right' }
      ]
    })

    function parseDate(date) {
      return moment(date).format('DD - MMM - YYYY')
    }

    function loadTokens() {
      context.root.$axios
        .$get('tokens/for-sale')
        .then(tokens => (state.tokens = tokens))
        .catch(window.console.log)
    }

    function tokenSelected(token) {
      if (selected.main) {
        if (selected.main._id === token._id) return

        selected.temp = token
        state.confirmationDialog = true
      }

      selected.freeMedicines = []
      selected.paidMedicines = []
      selected.totalAmountOfMedicines = 0

      selected.main = token

      for (const medicine of selected.main.medicines) {
        if (medicine.isPaid) {
          selected.paidMedicines.push(medicine)

          selected.totalAmountOfMedicines += parseInt(
            medicine[match(selected.main.type)]
          )
        } else {
          selected.freeMedicines.push(medicine)
        }
      }

      for (const diagnostic of selected.main.diagnostics) {
        selected.totalAmountOfDiagnostics += parseInt(
          diagnostic.diagnostic[match(selected.main.type)]
        )
      }

      selected.main.currentAmount =
        selected.totalAmountOfMedicines + selected.totalAmountOfDiagnostics
    }

    function saveToken(tokenState) {
      selected.main.state = tokenState
      context.root.$axios
        .$patch('/tokens', selected.main)
        .then(() => {
          selected.main = null
          state.submitDialog = false
        })
        .catch(console.log)
    }

    onMounted(loadTokens)

    return {
      state,
      match,
      headers,
      selected,
      required,
      parseDate,
      saveToken,
      loadTokens,
      tokenSelected
    }
  }
})
</script>
