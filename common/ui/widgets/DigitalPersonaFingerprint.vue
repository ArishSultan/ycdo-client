<template>
  <div class="fp">
    <div class="fp__image">
      <img :src="image" alt="" width="150" height="200" />
    </div>

    <v-text-field
      v-model="result"
      readonly
      :rules="[v => !!v || 'No Finger is provided']"
    />

    <p class="fp__message">
      {{ message }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'DigitalPersonaFingerprint',

  props: {
    clear: {
      type: Boolean,
      default: false
    },
    generator: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    result: '',
    image: '',
    socket: null,
    message: 'Use Left Hand Thumb'
  }),

  watch: {
    clear() {
      if (this.clear) {
        this.image = ''
      }
    }
  },

  mounted() {
    this.socket = new WebSocket('ws://localhost:7070/fingerprint')

    this.socket.onopen = () => {
      window.dp.onDeviceConnected = () =>
        window.console.log('A Device was connected')
      window.dp.onDeviceDisconnected = () =>
        window.console.log('A Device was disconnected')

      window.dp.enumerateDevices().then(devices => {
        if (devices.length > 1) {
          window.console.log(
            'More than one devices are connected [Connect only one]'
          )
        } else if (devices.length === 0) {
          window.console.log('No device was connected')
        } else {
          window.dp.onSamplesAcquired = samples => {
            const _samples = JSON.parse(samples.samples)

            const image = window.fp.b64UrlTo64(_samples[0])

            this.socket.send(image)
            this.image = `data:image/png;base64,${image}`
          }

          window.dp
            .startAcquisition(window.fp.SampleFormat.PngImage)
            .then(() => (this.started = true))
        }
      })
    }

    this.socket.onmessage = message => {
      if (message !== 'INVALID_FINGER') {
        this.result = message.data
        this.$emit('finger', message.data)
      }
    }

    this.socket.onerror = () =>
      (this.message =
        'Currently no Connection to Thumbprint server is available')
  }
}
</script>

<style lang="sass" scoped>
.fp
  width: 100%
  display: flex
  align-items: center
  flex-direction: column

  &__image
    width: 150px
    height: 200px
    background: red
    border-radius: 4px
    box-shadow: 0 0 10px rgba(black, 0.4)

  &__message
    font-size: 15px
    padding-top: 15px
    font-family: "Roboto Condensed"
</style>
