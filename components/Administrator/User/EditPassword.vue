<template>
  <simple-form>
    <v-text-field
      v-model="user.password"
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
      :rules="[(v) => v === user.password || 'Password not match']"
      label="Confirm Password"
    />
  </simple-form>
</template>

<script>
import SimpleForm from '~/common/widgets/forms/simple-form/SimpleForm'

export default {
  name: 'EditPassword',
  components: { SimpleForm },

  data: () => ({
    user: {}
  })
}
</script>
