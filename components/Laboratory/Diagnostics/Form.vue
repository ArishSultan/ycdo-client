<template>
  <simple-form
    title="Create new Diagnostic"
    endpoint="diagnostics"
    :method="update ? 'patch' : 'post'"
    :data="data"
  >
    <v-text-field
      v-model="diagnostic.name"
      label="Name of Diagnostic"
      class="span-2"
      outlined
    />
    <entity-selector
      required
      multiple
      class="span-2"
      :map="mapData"
      :columns-selected="columns2"
      :columns-selector="columns1"
      :selection="diagnostic.equipments"
      endpoint="diagnostic-equipments"
      title-selector="Equipments"
      title-selected="Selected Equipments"
      @selected="selected"
    >
      <template v-slot:consumption="{ bind }">
        {{ bind }}
        <input
          v-model="bind.consumption"
          type="number"
          min="1"
          style="width: 100px; border: 1px solid black"
        />
      </template>
    </entity-selector>
    <v-text-field
      v-model="diagnostic.timeRequired"
      v-mask="'##:##:##'"
      label="Time Taken"
      hint="Format is (HH:MM:SS)"
      class="span-2"
      outlined
      dense
    />
  </simple-form>
</template>

<script>
import SimpleForm from '../../../common/ui/widgets/SimpleForm'
import { Diagnostic } from '../../../common/models/laboratory/diagnostic'
import EntitySelector from '../../../common/ui/widgets/EntitySelector'

export default {
  name: 'DiagnosticForm',
  components: { SimpleForm, EntitySelector },

  props: {
    diagnostic: {
      type: [Diagnostic, Object],
      default: () => new Diagnostic()
    },
    update: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    columns1: [{ text: 'Name', value: 'name', width: '80%' }],
    columns2: [
      { text: 'Name', value: 'equipment.name' },
      { text: 'Consumption', value: 'consumption', width: 100 }
    ]
  }),

  methods: {
    mapData(data) {
      return {
        equipment: data,
        consumption: 1
      }
    },

    data() {
      let poorPrice = 0
      let generalPrice = 0
      let privatePrice = 0

      for (const equipment of this.diagnostic.equipments) {
        poorPrice += equipment.equipment.poor * (equipment.consumption || 1)

        generalPrice +=
          equipment.equipment.general * (equipment.consumption || 1)

        privatePrice +=
          equipment.equipment.marketPrice * (equipment.consumption || 1)
      }

      this.diagnostic.poor = poorPrice
      this.diagnostic.general = generalPrice
      this.diagnostic.private = privatePrice

      console.log(this.diagnostic)

      return this.diagnostic
    },

    selected(items) {
      this.diagnostic.equipments = items
    }
  }
}
</script>
