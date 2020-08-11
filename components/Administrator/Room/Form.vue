<template>
  <simple-form
    return
    :data="room"
    endpoint="rooms"
    :method="isUpdate ? 'patch' : 'post'"
    title="Create new Room"
    message="Select Branch carefully"
  >
    <v-text-field
      v-model="room.name"
      label="Name of Room"
      :rules="[required]"
      class="span-2"
      outlined
      dense
    />

    <v-select
      v-model="room.type"
      :rules="[required]"
      :items="['Male', 'Female']"
      label="Room Type"
      class="span-2"
      outlined
      dense
    />

    <value-selector
      required
      label="Branch"
      class="span-2"
      endpoint="branches"
      @selected="room.branch = $event"
    >
      <template v-slot:item="item">
        {{ item.name }} [{{ item.code }}]
      </template>
    </value-selector>
  </simple-form>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import SimpleForm from '../../../common/ui/widgets/SimpleForm'
import { required } from '../../../common/lib/validator'
import { Room } from '../../../common/models/administrator/room'
import ValueSelector from '../../../common/ui/widgets/ValueSelector'

export default defineComponent({
  name: 'RoomForm',
  components: {
    SimpleForm,
    ValueSelector
  },

  props: {
    room: {
      type: Room,
      default: () => new Room()
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
