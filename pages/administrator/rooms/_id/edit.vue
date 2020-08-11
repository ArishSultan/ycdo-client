<template>
  <room-form :room="room" :is-update="true" />
</template>

<script>
import RoomForm from '../../../../components/Administrator/Room/Form'

export default {
  layouts: 'form',
  components: { RoomForm },

  async asyncData({ $axios, route }) {
    return {
      room: await $axios.$get('rooms/' + route.params.id)
    }
  }
}
</script>
