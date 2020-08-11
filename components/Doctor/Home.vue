<template>
  <div style="display: flex; flex-direction: column">
    <v-btn
      width="100%"
      color="white"
      elevation="4"
      style="margin-top: 40px; margin-bottom: 20px; border-radius: 8px"
      @click="state.tokensDrawer = !state.tokensDrawer"
    >
      Toggle Tokens Panel
    </v-btn>

    <v-card v-if="selected.main" class="card" elevation="4">
      <span class="card__title" style="margin-bottom: 20px">
        Patient Checkup
      </span>

      <v-text-field
        v-model="selected.main.symptoms"
        outlined
        class="span-2"
        label="Symptoms"
        hint="Provide Comma separated values"
      />

      <entity-selector
        multiple
        class="span-2"
        :map="mapDiagnostics"
        title-selected="Tests"
        endpoint="diagnostics"
        title-selector="Assigned Tests"
        :comparator="
          (item1, item2) => {
            if (item1.diagnostic) {
              return item1.diagnostic._id === item2.diagnostic._id
            } else {
              return item1._id === item2.diagnostic._id
            }
          }
        "
        :selection="selected.main.diagnostics"
        :columns-selected="headers.diagnosticsSelected"
        :columns-selector="headers.diagnosticsSelector"
        @selected="selectedDiagnostic"
      />

      <v-text-field
        v-model="selected.main.diseases"
        label="Diseases"
        outlined
      />

      <entity-selector
        multiple
        class="span-2"
        :map="mapMedicine"
        endpoint="medicines"
        title-selected="Medicines"
        title-selector="Prescribed Medicines"
        :comparator="
          (item1, item2) => {
            if (item1.medicine) {
              return item1.medicine._id === item2.medicine._id
            } else {
              return item1._id === item2.medicine._id
            }
          }
        "
        :selection="selected.main.medicines"
        :columns-selected="headers.medicinesSelected"
        :columns-selector="headers.medicinesSelector"
        @selected="selectedMedicine"
      />

      <v-btn
        color="primary"
        elevation="0"
        width="100%"
        @click="state.submitDialog = true"
        >Submit</v-btn
      >

      <v-dialog v-model="state.confirmationDialog" width="450">
        <v-card style="padding: 20px">
          <span class="card__sub-title">
            You haven't submitted current token checkup, if the select another
            than the current checkup detail will be lost
          </span>

          <div
            style="display: flex; justify-content: flex-end; margin-top: 20px;"
          >
            <v-btn
              width="100px"
              elevation="0"
              color="green"
              @click="
                () => {
                  selected.main = selected.temp
                  state.confirmationDialog = false
                }
              "
            >
              <span style="color: white">Continue</span>
            </v-btn>
            <v-btn
              color="red"
              width="100px"
              elevation="0"
              style="margin-left: 20px"
              @click="state.confirmationDialog = false"
            >
              <span style="color: white">Cancel</span>
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
      <v-dialog v-model="state.submitDialog" width="450" persistent>
        <v-card style="padding: 20px; text-align: center">
          <span class="card__title">
            Set Token State
          </span>

          <div
            style="display: flex; justify-content: space-evenly; margin-top: 40px"
          >
            <v-btn
              width="120px"
              color="orange"
              elevation="0"
              @click="saveToken('for-sale')"
            >
              <span style="color: white">Done</span>
            </v-btn>
            <v-btn
              width="120px"
              color="green"
              elevation="0"
              @click="saveToken('pending')"
            >
              <span style="color: white">Pending</span>
            </v-btn>
            <v-btn
              width="120px"
              color="red"
              elevation="0"
              @click="state.submitDialog = false"
            >
              <span style="color: white">Cancel</span>
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </v-card>

    <v-card v-else style="padding: 20px" elevation="4">
      No Token is currently selected, Select a Token from the Panel
    </v-card>

    <v-navigation-drawer v-model="state.tokensDrawer" app right>
      <v-tabs grow>
        <v-tab>
          Tokens
        </v-tab>
        <v-tab>
          Pending
        </v-tab>

        <v-tab-item>
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
            :items="state.newTokens"
            :headers="headers.tokens"
            @click:row="tokenSelected"
          >
            <template v-slot:item.createdAt="{ item }">
              {{ parseDate(item) }}
            </template>
          </v-data-table>
        </v-tab-item>

        <v-tab-item>
          <div style="padding: 5px">
            <v-btn
              color="primary"
              width="100%"
              elevation="0"
              @click="loadTokens(false)"
            >
              Refresh
            </v-btn>
          </div>

          <v-data-table
            dense
            hide-default-footer
            :items="state.pendingTokens"
            :headers="headers.tokens"
            @click:row="tokenSelected"
          >
            <template v-slot:item.createdAt="{ item }">
              {{ parseDate(item) }}
            </template>
          </v-data-table>
        </v-tab-item>
      </v-tabs>
    </v-navigation-drawer>
  </div>
</template>

<script>
import moment from 'moment'
import { defineComponent, reactive, onMounted } from '@vue/composition-api'
import { required } from '../../common/lib/validator'
import EntitySelector from '../../common/ui/widgets/EntitySelector'

export default defineComponent({
  name: 'DoctorHome',

  components: {
    EntitySelector
  },

  setup(_, context) {
    const state = reactive({
      newTokens: [],
      pendingTokens: [],

      tokensDrawer: false,
      submitDialog: false,
      confirmationDialog: false
    })

    const selected = reactive({
      temp: null,
      main: null
    })

    const headers = reactive({
      tokens: [
        { text: 'Number', value: 'number', sortable: false, filterable: false },
        { text: 'Date', value: 'createdAt', sortable: false, filterable: false }
      ],
      medicinesSelected: [
        { text: 'Name', value: 'medicine.name', width: '90%' },
        { text: 'Consumption', value: 'consumption', width: '100px' }
      ],
      medicinesSelector: [
        { text: 'Name', value: 'name', width: '90%' },
        { text: 'Qty in stock', value: 'quantity', width: '100px' }
      ],
      diagnosticsSelected: [
        { text: 'Name', value: 'diagnostic.name' },
        { text: 'Result', value: 'result' }
      ],
      diagnosticsSelector: [
        { text: 'Name', value: 'name' },
        { text: 'Qty in stock', value: 'quantity' }
      ]
    })

    function parseDate(date) {
      return moment(date).format('DD - MMM - YYYY')
    }
    function loadTokens(flag) {
      context.root.$axios
        .$get(`tokens/${flag ? 'running' : 'pending'}`)
        .then(tokens => {
          if (flag) state.newTokens = tokens
          else state.pendingTokens = tokens
        })
        .catch(window.console.log)
    }
    function mapMedicine(item) {
      return {
        medicine: item,
        consumption: 'od'
      }
    }
    function mapDiagnostics(item) {
      return {
        diagnostic: item,
        result: 'Not Done Yet'
      }
    }
    function tokenSelected(token) {
      if (selected.main) {
        if (selected.main._id === token._id) return

        selected.temp = token
        state.confirmationDialog = true
      }

      selected.main = token
    }
    function selectedMedicine(items) {
      selected.main.medicines = items
    }
    function selectedDiagnostic(items) {
      selected.main.diagnostics = items
    }
    async function saveToken(tokenState) {
      selected.main.state = tokenState

      await context.root.$axios.$patch('/tokens', selected.main)
      selected.main = null
      state.submitDialog = false

      loadTokens(true)
      loadTokens(false)
    }

    onMounted(() => {
      loadTokens(true)
      loadTokens(false)
    })

    return {
      state,
      headers,
      selected,
      required,
      parseDate,
      saveToken,
      loadTokens,
      mapMedicine,
      tokenSelected,
      mapDiagnostics,
      selectedMedicine,
      selectedDiagnostic
    }
  }
})
</script>
