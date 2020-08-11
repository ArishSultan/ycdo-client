<template>
  <user-form :user="user" :is-update="true" />
</template>

<script>
import userForm from '../../../../components/Administrator/User/Form'

export default {
  layouts: 'form',
  components: { userForm },

  async asyncData({ $axios, route }) {
    return {
      user: await $axios.$get('users/' + route.params.id)
    }
  }
}
</script>
