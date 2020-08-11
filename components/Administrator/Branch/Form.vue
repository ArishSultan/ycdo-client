<template>
  <simple-form
    return
    :data="branch"
    :method="isUpdate ? 'patch' : 'post'"
    endpoint="branches"
    title="Create new Branch"
  >
    <v-text-field
      v-model="branch.name"
      :rules="[required]"
      label="Branch Name"
      class="span-2"
      outlined
      dense
    />
    <v-text-field
      v-model="branch.code"
      :rules="[required]"
      label="Branch Code"
      outlined
      dense
    />
    <v-text-field
      v-model="branch.contact"
      :rules="[required]"
      label="Branch Contact"
      outlined
      dense
    />
    <v-textarea
      v-model="branch.address"
      label="Branch Address"
      :rules="[required]"
      class="span-2"
      outlined
      dense
    />
  </simple-form>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import SimpleForm from '../../../common/ui/widgets/SimpleForm'
import { Branch } from '../../../common/models/administrator/branch'
import { required } from '../../../common/lib/validator'

export default defineComponent({
  name: 'BranchForm',
  components: { SimpleForm },

  props: {
    branch: {
      type: Object,
      default: () => new Branch()
    },

    isUpdate: {
      type: Boolean,
      default: false
    }
  },

  setup() {
    return { required }
  }
})
</script>
