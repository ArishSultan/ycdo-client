<template>
  <div class="center-content-parent">
    <simple-form
      :data="medicine"
      endpoint="medicines"
      class="center-content"
      title="Create New Medicine"
      :method="update ? 'patch' : 'post'"
      message="provide required details of Medicine"
    >
      <v-text-field
        v-model="medicine.name"
        label="Medicine's Name"
        class="span-2"
        outlined
        :rules="[required]"
      />
      <v-text-field
        v-model="medicine.deserving"
        label="Price for Deserving"
        outlined
        dense
        :rules="priceRules"
        type="number"
        suffix="PKR"
      />
      <v-text-field
        v-model="medicine.poor"
        label="Price for Poor"
        outlined
        dense
        :rules="priceRules"
        type="number"
        suffix="PKR"
      />
      <v-text-field
        v-model="medicine.ycdo"
        label="Price for YCDO"
        outlined
        dense
        :rules="priceRules"
        type="number"
        suffix="PKR"
      />
      <v-text-field
        v-model="medicine.general"
        label="Price for General"
        outlined
        dense
        :rules="priceRules"
        type="number"
        suffix="PKR"
      />
      <v-text-field
        v-model="medicine.marketPrice"
        label="Market Price"
        outlined
        dense
        :rules="priceRules"
        type="number"
        suffix="PKR"
      />
      <v-text-field
        v-model="medicine.retailPrice"
        label="Retail Price"
        outlined
        dense
        :rules="priceRules"
        type="number"
        suffix="PKR"
      />
      <v-text-field
        v-model="medicine.fixLimit"
        label="Fix Limit"
        outlined
        dense
        :rules="priceRules"
        type="number"
        suffix="Piece(s)"
      />
      <v-checkbox
        v-model="medicine.isOd"
        color="green"
        style="margin-top: 5px"
        dense
        label="is Od"
      />
      <v-select
        v-model="medicine.category"
        label="Medicine's Category"
        :rules="[required]"
        :items="['Bandage', 'Tablet']"
        filled
      />
      <v-select
        v-model="medicine.unit"
        label="Unit"
        :rules="[required]"
        :items="['ml', 'mg', 'piece']"
        filled
      />
      <v-radio-group v-model="medicine.isPaid" dense>
        <v-radio label="Always Paid" :value="true" color="green" />
        <v-radio label="Not Paid (Free)" :value="false" color="green" />
      </v-radio-group>
    </simple-form>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import SimpleForm from '../../../common/ui/widgets/SimpleForm'
import { Medicine } from '../../../common/models/pharmacy/medicine'
import { priceRules, required } from '../../../common/lib/validator'

export default defineComponent({
  name: 'MedicineForm',
  components: { SimpleForm },

  props: {
    medicine: {
      type: Medicine,
      default: () => new Medicine()
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
