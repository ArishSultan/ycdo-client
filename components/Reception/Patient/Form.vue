<template>
  <simple-form
    :data="patient"
    endpoint="patients"
    title="Register New Patient"
    message="please provide correct information, since it will be used for analysis purposes"
    @reset="clear = true"
  >
    <v-text-field
      v-model="patient.name"
      label="Patient's Name"
      :rules="[required]"
      class="span-2"
      outlined
    />
    <v-text-field
      v-model="patient.cnic"
      v-mask="'##### - ####### - #'"
      :rules="[cnicRule]"
      label="Patient's CNIC #"
      outlined
      dense
    />
    <v-text-field
      v-model="patient.contact"
      v-mask="['### - #######', '#### - #######']"
      label="Patient's Contact #"
      :rules="[contactRule]"
      prefix="+92"
      outlined
      dense
    />
    <v-text-field
      v-model="patient.dob"
      type="date"
      class="span-2"
      label="Patient's Date of Birth"
    />
    <v-textarea
      v-model="patient.address"
      label="Patient's Address"
      class="span-2"
      outlined
      dense
    />

    <DigitalPersonaFingerprint
      :clear="clear"
      class="span-2"
      @finger="patient.fmd = $event"
    />
  </simple-form>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import SimpleForm from '../../../common/ui/widgets/SimpleForm'
import { Patient } from '../../../common/models/reception/patient'
import { required } from '../../../common/lib/validator'
import DigitalPersonaFingerprint from '../../../common/ui/widgets/DigitalPersonaFingerprint'

function cnicRule(value) {
  return (!!value && !(value.length < 19)) || 'CNIC is invalid'
}

function contactRule(value) {
  return (
    (!!value && (value.length === 14 || value.length === 13)) ||
    'Contact is invalid'
  )
}

export default defineComponent({
  name: 'PatientForm',
  components: { DigitalPersonaFingerprint, SimpleForm },

  props: {
    patient: {
      type: Patient,
      default: () => new Patient()
    }
  },

  setup() {
    const clear = ref(false)

    return { required, cnicRule, contactRule, clear }
  }
})
</script>
