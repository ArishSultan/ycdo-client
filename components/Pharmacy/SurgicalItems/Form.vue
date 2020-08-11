<template>
  <div class="center-content-parent">
    <simple-form
      :data="surgicalItem"
      endpoint="surgical-items"
      class="center-content"
      title="Create New Surgical item"
      :method="update ? 'patch' : 'post'"
      message="provide required details of Surgical item"
    >
      <v-text-field
        v-model="surgicalItem.name"
        label="Surgical Item's Name"
        class="span-2"
        outlined
        :rules="[required]"
      />
      <v-text-field
        v-model="surgicalItem.deserving"
        label="Price for Deserving"
        outlined
        dense
        :rules="priceRules"
        type="number"
        suffix="PKR"
      />
      <v-text-field
        v-model="surgicalItem.poor"
        label="Price for Poor"
        outlined
        dense
        :rules="priceRules"
        type="number"
        suffix="PKR"
      />
      <v-text-field
        v-model="surgicalItem.ycdo"
        label="Price for YCDO"
        outlined
        dense
        :rules="priceRules"
        type="number"
        suffix="PKR"
      />
      <v-text-field
        v-model="surgicalItem.general"
        label="Price for General"
        outlined
        dense
        :rules="priceRules"
        type="number"
        suffix="PKR"
      />
      <v-text-field
        v-model="surgicalItem.marketPrice"
        label="Market Price"
        outlined
        dense
        :rules="priceRules"
        type="number"
        suffix="PKR"
      />
      <v-text-field
        v-model="surgicalItem.retailPrice"
        label="Retail Price"
        outlined
        dense
        :rules="priceRules"
        type="number"
        suffix="PKR"
      />
      <v-text-field
        v-model="surgicalItem.fixLimit"
        label="Fix Limit"
        outlined
        dense
        :rules="priceRules"
        type="number"
        suffix="Piece(s)"
      />
      <v-select
        v-model="surgicalItem.unit"
        label="Unit"
        :rules="[required]"
        :items="['ml', 'mg', 'piece']"
        filled
      />
      <v-radio-group v-model="surgicalItem.isPaid" dense>
        <v-radio label="Always Paid" :value="true" color="green" />
        <v-radio label="Not Paid (Free)" :value="false" color="green" />
      </v-radio-group>
    </simple-form>
  </div>
</template>

<script>
import SimpleForm from '../../../common/ui/widgets/SimpleForm'
import { priceRules, required } from '../../../common/lib/validator'
import { SurgicalItem } from '../../../common/models/pharmacy/surgical-item'

export default {
  name: 'SurgicalItemForm',
  components: { SimpleForm },

  props: {
    surgicalItem: {
      type: SurgicalItem,
      default: () => new SurgicalItem()
    },
    update: {
      type: Boolean,
      default: false
    }
  },

  setup() {
    return { required, priceRules }
  }
}
</script>
