<template>
  <simple-form
    title="Add New Surgical Equipment Batch"
    :endpoint="`surgical-items/${(purchase.item || {})._id}/purchases`"
    :data="purchase"
  >
    <entity-selector
      class="span-2"
      endpoint="/surgical-items"
      :multiple="false"
      :selection="[]"
      title-selected="Selected Items"
      title-selector="Surgical Items"
      :columns-selected="columns"
      :columns-selector="columns"
      @selected="selectItem"
    />

    <v-text-field
      v-model="purchase.qty"
      dense
      outlined
      type="number"
      label="Quantity"
      :disabled="!purchase.item"
    />
    <v-text-field
      v-model="purchase.price"
      dense
      outlined
      type="number"
      label="Price"
      :disabled="!purchase.item"
    />
    <v-text-field
      v-model="purchase.batch"
      dense
      outlined
      :disabled="!purchase.item"
      label="Batch Number"
    />

    <v-text-field
      v-model="purchase.deserving"
      :disabled="!purchase.item"
      label="Price for Deserving"
      outlined
      dense
      :rules="priceRules"
      type="number"
      suffix="PKR"
    />
    <v-text-field
      v-model="purchase.poor"
      :disabled="!purchase.item"
      label="Price for Poor"
      outlined
      dense
      :rules="priceRules"
      type="number"
      suffix="PKR"
    />
    <v-text-field
      v-model="purchase.ycdo"
      :disabled="!purchase.item"
      label="Price for YCDO"
      outlined
      dense
      :rules="priceRules"
      type="number"
      suffix="PKR"
    />
    <v-text-field
      v-model="purchase.general"
      :disabled="!purchase.item"
      label="Price for General"
      outlined
      dense
      :rules="priceRules"
      type="number"
      suffix="PKR"
    />
    <v-text-field
      v-model="purchase.marketPrice"
      :disabled="!purchase.item"
      label="Market Price"
      outlined
      dense
      :rules="priceRules"
      type="number"
      suffix="PKR"
    />
    <v-text-field
      v-model="purchase.retailPrice"
      :disabled="!purchase.item"
      label="Retail Price"
      outlined
      dense
      :rules="priceRules"
      type="number"
      suffix="PKR"
    />
    <v-checkbox
      v-model="purchase.isExpireAble"
      :disabled="!purchase.item"
      label="Is Expire-able"
    />

    <v-text-field
      v-model="purchase.expiresAt"
      type="date"
      class="span-2"
      :disabled="!purchase.isExpireAble || !purchase.item"
      label="Expiry Date"
    />
  </simple-form>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import EntitySelector from '../../../common/ui/widgets/EntitySelector'
import { priceRules } from '../../../common/lib/validator'
import SimpleForm from '../../../common/ui/widgets/SimpleForm'
import { Purchase } from '../../../common/models/pharmacy/purchase'

export default defineComponent({
  name: 'SurgicalItems',
  components: { SimpleForm, EntitySelector },

  setup() {
    const purchase = ref(new Purchase())
    const columns = ref([{ text: 'Name', value: 'name' }])

    function selectItem(item) {
      const _purchase = purchase.value || {}

      _purchase.item = item
      _purchase.poor = item.poor
      _purchase.ycdo = item.ycdo
      _purchase.general = item.general
      _purchase.deserving = item.deserving
      _purchase.retailPrice = item.retailPrice
      _purchase.marketPrice = item.marketPrice

      purchase.value = _purchase
    }

    return { columns, purchase, priceRules, selectItem }
  }
})
</script>

<style lang="sass" scoped>
.flex-row
  display: flex !important
  flex-direction: row !important
</style>
