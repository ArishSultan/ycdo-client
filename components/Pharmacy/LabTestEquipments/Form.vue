<template>
  <div class="center-content-parent">
    <simple-form
      class="center-content"
      :data="labTestEquipment"
      endpoint="diagnostic-equipments"
      title="Create New Lab Equipment"
      :method="update ? 'patch' : 'post'"
      message="provide required details of Lab Test Equipments"
    >
      <v-text-field
        v-model="labTestEquipment.name"
        label="Items's Name"
        :rules="[required]"
        class="span-2"
        outlined
      />
      <v-text-field
        v-model="labTestEquipment.deserving"
        label="Price for Deserving"
        outlined
        dense
        :rules="priceRules"
        type="number"
        suffix="PKR"
      />
      <v-text-field
        v-model="labTestEquipment.poor"
        label="Price for Poor"
        outlined
        dense
        :rules="priceRules"
        type="number"
        suffix="PKR"
      />
      <v-text-field
        v-model="labTestEquipment.ycdo"
        label="Price for YCDO"
        outlined
        dense
        :rules="priceRules"
        type="number"
        suffix="PKR"
      />
      <v-text-field
        v-model="labTestEquipment.general"
        label="Price for General"
        outlined
        dense
        :rules="priceRules"
        type="number"
        suffix="PKR"
      />
      <v-text-field
        v-model="labTestEquipment.marketPrice"
        label="Market Price"
        outlined
        dense
        :rules="priceRules"
        type="number"
        suffix="PKR"
      />
      <v-text-field
        v-model="labTestEquipment.retailPrice"
        label="Retail Price"
        outlined
        dense
        :rules="priceRules"
        type="number"
        suffix="PKR"
      />
      <v-text-field
        v-model="labTestEquipment.fixLimit"
        label="Fix Limit"
        :rules="priceRules"
        outlined
        type="number"
        suffix="Piece(s)"
      />
      <v-select
        v-model="labTestEquipment.unit"
        label="Unit"
        :rules="[required]"
        :items="['ml', 'mg', 'piece']"
        filled
      />
    </simple-form>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { DiagnosticItem } from '../../../common/models/pharmacy/diagnostic-item'
import { priceRules, required } from '../../../common/lib/validator'
import SimpleForm from '~/common/ui/widgets/SimpleForm.vue'

export default defineComponent({
  name: 'LabTestEquipmentForm',
  components: { SimpleForm },

  props: {
    labTestEquipment: {
      type: DiagnosticItem,
      default: () => new DiagnosticItem()
    },
    update: {
      type: Boolean,
      default: false
    }
  },

  setup() {
    return { required, priceRules }
  }
})
</script>

<style scoped></style>
