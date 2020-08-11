<template>
  <simple-form
    :data="doctor"
    endpoint="doctors"
    :method="isUpdate ? 'patch' : 'post'"
    title="Add new Doctor"
  >
    <v-text-field
      v-model="doctor.name"
      outlined
      dense
      class="span-2"
      :rules="[required]"
      label="User's Name"
    />

    <v-text-field
      v-model="doctor.email"
      outlined
      dense
      :rules="[required]"
      label="User's Email"
      @input="doctor.doctorname = doctor.email"
    />

    <v-text-field
      v-model="doctor.contact"
      v-mask="['### - #######', '#### - #######']"
      prefix="+92"
      outlined
      dense
      :rules="[required]"
      label="User's Contact #"
    />

    <v-text-field
      v-model="doctor.username"
      outlined
      dense
      class="span-2"
      :rules="[required]"
      label="User's Unique ID"
    />

    <v-text-field
      v-model="doctor.password"
      outlined
      dense
      type="password"
      :rules="[required]"
      label="User's Password"
    />

    <v-text-field
      outlined
      dense
      type="password"
      :rules="[v => v === doctor.password || 'Password not match']"
      label="Confirm Password"
    />

    <div class="separator span-2" />

    <v-select
      v-model="doctor.specializations"
      :items="specialities"
      label="Specialities"
      :rules="[required]"
      class="span-2"
      outlined
      multiple
      dense
    />
    <value-selector
      required
      label="Branch"
      endpoint="branches"
      @selected="branchSelected"
    >
      <template v-slot:item="item">
        {{ item.name }} [{{ item.code }}]
      </template>
    </value-selector>
    <value-selector
      required
      label="Rooms"
      :endpoint="roomsUrl"
      @selected="doctor.room = $event"
    >
      <template v-slot:item="item">
        {{ item.name }}
      </template>
    </value-selector>
    <v-menu
      v-model="menu"
      min-width="290px"
      transition="scale-transition"
      :close-on-content-click="false"
      :return-value.sync="doctor.joiningDate"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="formattedDate"
          label="Patient's Date of Birth"
          append-icon="mdi-calendar"
          class="span-2"
          readonly
          outlined
          dense
          v-on="on"
        />
      </template>
      <v-date-picker v-model="doctor.joiningDate" no-title scrollable>
        <v-spacer />
        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
        <v-btn color="primary" @click="$refs.menu.save(doctor.joiningDate)"
          >OK</v-btn
        >
      </v-date-picker>
    </v-menu>
  </simple-form>
</template>

<script>
import moment from 'moment'
import { ref, computed, defineComponent } from '@vue/composition-api'
import ValueSelector from '../../../common/ui/widgets/ValueSelector'
import SimpleForm from '../../../common/ui/widgets/SimpleForm'
import { Doctor } from '../../../common/models/administrator/doctor'
import { required } from '../../../common/lib/validator'

export default defineComponent({
  name: 'DoctorForm',
  components: {
    SimpleForm,
    ValueSelector
  },

  props: {
    branches: {
      type: Array,
      default: () => []
    },

    doctor: {
      type: Doctor,
      default: () => new Doctor()
    },

    isUpdate: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const menu = ref(false)
    const roomsUrl = ref('')
    const formattedDate = computed(() =>
      moment(props.doctor.joiningDate || Date.now()).format('ddd, MMM Do YYYY')
    )

    function branchSelected(event) {
      props.doctor.branch = event
      roomsUrl.value = 'rooms?branch=' + event._id
    }

    return {
      menu,
      formattedDate,
      branchSelected,
      required,
      roomsUrl,
      specialities: Doctor.SPECIALITIES
    }
  }
})
</script>

<style lang="sass">
.separator
  width: 100% !important
  height: 1px !important
  margin-bottom: 20px !important
  background: rgba(black, 0.14) !important
</style>
