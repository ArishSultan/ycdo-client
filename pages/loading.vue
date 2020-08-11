<template>
  <div class="loading-container">
    <div class="loading-container__logo">
      <div class="loader" />
      <img src="~/assets/logo.png" style="position: absolute" />
    </div>

    <h2 class="loading-container__message">Loading Components ...</h2>

    <div style="position: relative">
      <video
        id="video"
        ref="video"
        width="600"
        height="480"
        autoplay
        muted
        @playing="startDetection"
      />

      <canvas
        ref="canvas"
        width="600"
        height="480"
        style="position: absolute; z-index: 100; left: 0"
      />
    </div>
  </div>
</template>

<script>
import {
  draw,
  nets,
  resizeResults,
  detectSingleFace,
  TinyFaceDetectorOptions
} from 'face-api.js'

export default {
  layout: 'none',

  mounted() {
    this.loadApi().then(this.startCamera)
  },

  methods: {
    async loadApi() {
      await Promise.all([nets.tinyFaceDetector.loadFromUri('/models')])
    },

    async startCamera() {
      if (navigator.mediaDevices) {
        this.$refs.video.srcObject = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        })
      } else {
        this.$refs.video = await new Promise((resolve, reject) => {
          ;(navigator.getUserMedia || navigator.msGetUserMedia)(
            {
              video: true,
              audio: false
            },
            resolve,
            reject
          )
        })
      }
    },

    startDetection() {
      setInterval(this._getUserMedia, 1000)
    },

    async _getUserMedia() {
      const detections = await detectSingleFace(
        this.$refs.video,
        new TinyFaceDetectorOptions()
      ).run()

      if (detections) {
        const resizedDetections = await resizeResults(detections, {
          width: 600,
          height: 480
        })
        await this.$refs.canvas
          .getContext('2d')
          .clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height)
        await draw.drawDetections(this.$refs.canvas, resizedDetections)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.loading-container
  width: 100%
  height: calc(100vh - 50px)
  display: flex
  align-items: center
  flex-direction: column
  justify-content: center

  &__logo
    width: 120px
    height: 120px
    display: flex
    position: relative
    align-items: center
    justify-content: center

  &__message
    font-size: 17px
    padding-top: 15px
    font-weight: normal
    font-family: "Roboto Condensed", sans-serif

.loader
  width: 100%
  height: 100%
  position: absolute
  border-radius: 100%
  background: rebeccapurple
  animation-name: loading
  animation-duration: 2s
  animation-iteration-count: infinite

@keyframes loading
  0%
    transform: scale(0)
    opacity: 0.7
  100%
    transform: scale(1)
    opacity: 0
</style>
