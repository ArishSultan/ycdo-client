<template>
  <transaction-form
    :data="token"
    endpoint="tokens"
    :transaction="token"
    title="Generate Token"
    @reset="reset"
    @response="handlePrint"
  >
    <entity-selector
      class="span-2"
      title-selector="Patients"
      title-selected="Selected Patient"
      endpoint="patients"
      :selection="token.patient ? [token.patient] : []"
      :columns-selector="columnsSelector"
      :columns-selected="columnsSelected"
      @selected="token.patient = $event"
    >
      <template v-slot:actions>
        <v-btn dark color="orange" small elevation="0" @click="toggleMatcher">
          <v-icon small>mdi-fingerprint</v-icon> Match
        </v-btn>
        <span style="padding: 5px" />
        <v-btn dark color="green" small elevation="0" @click="newPatient">
          <v-icon small>mdi-plus</v-icon> New
        </v-btn>
      </template>
    </entity-selector>

    <v-radio-group
      v-model="token.type"
      dense
      class="span-2"
      @change="typeChanged"
    >
      <v-radio value="poor" label="Poor" color="green" />
      <v-radio value="general" label="General" color="green" />
      <v-radio value="private" label="Private" color="green" />
    </v-radio-group>

    <value-selector
      required
      class="span-2"
      endpoint="doctors"
      label="Refer To (Doctor)"
      @selected="token.checkedBy = $event"
    >
      <template v-slot:item="item">
        <span style="color: black">{{ item.name }}</span>
      </template>
    </value-selector>

    <v-dialog v-model="matcher" width="400">
      <v-card class="card">
        <div v-if="state === 1">
          <digital-persona-fingerprint @finger="sendFinger" />
        </div>
        <v-progress-circular v-else-if="state === 2" indeterminate />
        <p v-else-if="state === 3">
          {{ error }}
        </p>
      </v-card>
    </v-dialog>
  </transaction-form>
</template>

<script>
import { defineComponent, ref, reactive, toRefs } from '@vue/composition-api'
import { Token } from '../../common/models/reception/token'
import { required } from '../../common/lib/validator'
import EntitySelector from '../../common/ui/widgets/EntitySelector'
import TransactionForm from '../../common/ui/widgets/TransactionForm'
import ValueSelector from '../../common/ui/widgets/ValueSelector'
import DigitalPersonaFingerprint from '../../common/ui/widgets/DigitalPersonaFingerprint'

export default defineComponent({
  name: 'GenerateToken',
  components: {
    DigitalPersonaFingerprint,
    ValueSelector,
    EntitySelector,
    TransactionForm
  },

  props: {
    doctors: {
      type: Array,
      default: () => []
    }
  },

  setup(props, context) {
    const token = ref(new Token())
    const columnsSelector = ref([{ text: 'Name', value: 'name' }])
    const columnsSelected = ref([{ text: 'Name', value: 'name' }])

    const matcherState = reactive({
      state: 1,
      error: '',
      matcher: false
    })

    async function sendFinger(finger) {
      matcherState.state = 2

      try {
        const formData = new FormData()
        formData.append('finger', finger)
        const data = await context.root.$axios.$post(
          'http://localhost:7070/match/',
          formData
        )

        if (data) {
          token.value.patient = await context.root.$axios.$get(
            '/patients/' + data
          )
          matcherState.matcher = false
        } else {
          matcherState.error = 'Not found, Close dialog and retry.'
          matcherState.state = 3
        }
      } catch (e) {
        matcherState.error = e
        matcherState.state = 3
      }
    }

    function toggleMatcher() {
      if (matcherState.matcher) {
        matcherState.matcher = false
      } else {
        matcherState.state = 1
        matcherState.matcher = true
      }
    }

    token.value.createdBy = context.root.$auth.user._id

    function typeChanged() {
      switch (token.value.type) {
        case 'poor':
          token.value.currentAmount = 30
          break
        case 'general':
          token.value.currentAmount = 40
          break
        case 'private':
          token.value.currentAmount = 50
          break
      }
    }

    function reset() {
      token.value = new Token()
      token.value.createdBy = context.root.$auth.user._id
    }

    function handlePrint(token) {
      window.open(
        'http://localhost:4000/tokens/report/' +
          token.data._id +
          '/' +
          context.root.$auth.user._id
      )
    }

    function newPatient() {
      context.root.$router.push('/reception/patients/add')
    }

    typeChanged()

    return {
      reset,
      token,
      required,
      newPatient,
      sendFinger,
      typeChanged,
      handlePrint,
      toggleMatcher,
      columnsSelector,
      columnsSelected,
      ...toRefs(matcherState)
    }
  }
})
</script>
