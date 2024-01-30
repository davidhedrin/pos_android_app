<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <img src="@/assets/img/mtsiconland.png" alt="" width="180"/>
        <component :is="loadingBlack"></component>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonIcon } from '@ionic/vue';
import { markRaw } from 'vue';
import LoadingBlack from '@/views/components/LoadingBlack.vue';

export default {
  components: {
    IonPage,
    IonIcon
  },
  name: 'SplashScreen',
  data(){
    return {
      local_storage: this.$root.local_storage,
      pages: this.$root.pages,
      firebase_conf: this.$root.firebase_conf,
      loadingBlack: markRaw(LoadingBlack),
    };
  },

  mounted() {
    setTimeout(() => this.$root.gotoReplace(this.pages.login), 2000);
  },
}
</script>

<style scoped>
  #container {
    display: flex;
    flex-direction: column;
    align-items: center;

    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
</style>