<template>
  <div class="center-children">
   <v-card width="800" height="600">

     <div class="face-registerer">
       <div style="border-right: 1px solid rgba(0, 0, 0, 0.14)">
         <v-text-field
           dense
           outlined
           style="margin: 10px"
           label="Search by name"
         />
         <v-data-table
           v-model="selectedUser"
           single-select
           show-select
           :items="users"
           :headers="columns"
           hide-default-header
           hide-default-footer
           disable-pagination
           item-key="_id"
         />
       </div>
       <div class="image-picker" v-if="selectedUser.length > 0">
         <div class="image-picker__main-area"></div>
         <v-btn
           fab
           color="orange"
           elevation="0"
           small
           dark
           style="margin: 0 auto"
           @click="startCamera"
         >
           <v-icon>mdi-camera</v-icon>
         </v-btn>
       </div>

       <div v-else>Select a User</div>
     </div>

     <v-dialog v-model="cameraOpen" width="642">
       <v-card width="650" height="482">
         <canvas ref="canvas" width="640" height="480" style="display: none" />
         <video
           ref="video"
           width="640"
           height="480"
           autoplay
           style="border-radius: 8px"
         />

         <v-btn
           icon
           large
           outlined
           color="white"
           @click="captureImage"
           style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%)"
         >
           <v-icon>mdi-camera</v-icon>
         </v-btn>
       </v-card>
     </v-dialog>
   </v-card>
  </div>
</template>

<script>
export default {
  name: "register-user-faces",

  data: () => ({
    columns: [
      { text: 'Name', value: 'name' }
    ],
    images: [],
    loading: false,
    cameraOpen: false,
    selectedUser: []
  }),

  mounted() {
    console.log(this.users)
  },

  watch: {
    selectedUser() {
      this.userChanged()
    },

    cameraOpen() {
      if (!this.cameraOpen) {
        this.$refs.video.srcObject.getTracks().forEach(track => track.stop())
      }
    }
  },

  methods: {
    async startCamera() {
      this.cameraOpen = true

      this.$refs.video.srcObject = await navigator.mediaDevices.getUserMedia({
        video: true, audio: false
      })
    },

    async captureImage() {
      this.$refs.canvas.getContext('2d')
          .drawImage(this.$refs.video, 0, 0, 640, 480)

      await this.$axios.$post('users/face-image', {
        user: this.selectedUser[0]._id,
        image: this.$refs.canvas.toDataURL()
      })
    },

    async userChanged() {
      this.loading = true

      this.images = [] /// TODO: Add images route here.

      this.loading = false
    }
  },

  async asyncData({ $axios }) {
    return {
      users: await $axios.$get('/users')
    }
  }
}
</script>

<style lang="sass" scoped>
.center-children
  display: flex
  margin-top: 50px
  justify-content: center

.face-registerer
  display: grid
  height: 100%
  grid-template-columns: 1fr 2fr

.image-picker
  width: 100%
  height: 100%
  display: flex
  padding: 10px
  flex-direction: column

  &__main-area
    flex: 1 auto
    border-radius: 8px
    margin-bottom: 20px
    background: rgba(0, 0, 0, .2)
</style>
