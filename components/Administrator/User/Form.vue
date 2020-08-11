<template>
  <simple-form
    :data="user"
    endpoint="users"
    :method="isUpdate ? 'patch' : 'post'"
    title="Create a new User"
    message="provide details of user and select privileges"
  >
    <v-text-field
      v-model="user.name"
      outlined
      dense
      class="span-2"
      :rules="[required]"
      label="User's Name"
    />

    <v-text-field
      v-model="user.email"
      outlined
      dense
      :rules="[required]"
      label="User's Email"
      @input="user.username = user.email"
    />

    <v-text-field
      v-model="user.contact"
      v-mask="['### - #######', '#### - #######']"
      prefix="+92"
      outlined
      dense
      :rules="[required]"
      label="User's Contact #"
    />

    <v-text-field
      v-model="user.username"
      outlined
      dense
      class="span-2"
      :rules="[required]"
      label="User's Unique ID"
    />

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
      :rules="[v => v === user.password || 'Password not match']"
      label="Confirm Password"
    />

    <span class="header span-2">User Scope</span>
    <div class="wrapper span-2">
      <v-btn-toggle
        v-model="user.scope"
        dense
        class="center"
        mandatory
      >
        <v-btn v-for="(scope, i) of scopes" :key="i">{{ scope }}</v-btn>
      </v-btn-toggle>
    </div>
  </simple-form>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import SimpleForm from '../../../common/ui/widgets/SimpleForm.vue'
import { User } from '../../../common/models/administrator/user'
import { scopes } from '../../../utils/constants'
import { required } from '../../../common/lib/validator'

export default defineComponent({
  name: 'UserForm',
  components: { SimpleForm },

  props: {
    user: {
      type: User,
      default: () => new User()
    },

    isUpdate: {
      type: Boolean,
      default: false
    }
  },

  setup() {
    return { required, scopes }
  }
})
</script>

<style lang="sass" scoped>
.header
  font-family: google-sans, sans-serif !important

.wrapper
  height: 100px
  position: relative

.center
  top: 20px
  left: 50%
  position: absolute
  transform: translateX(-50%)
</style>
