<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button :auto-hide="false"></ion-menu-button>
      </ion-buttons>
      <!-- <ion-searchbar></ion-searchbar> -->
      <ion-title class="px-5 text-center">
        <img src="@/assets/img/mtsiconland.png" alt="" width="150" />
      </ion-title>
      <ion-buttons slot="end" class="pe-1" @click="$root.clearSessionLocalStorege()">
        <ion-icon :icon="logOutOutline" class="fs-3"></ion-icon>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script>
import { IonPage, IonIcon } from '@ionic/vue';
import { logOutOutline } from 'ionicons/icons';

export default {
  components: {
    IonPage,
    IonIcon,
  },
  setup() {
    return {
      logOutOutline,
    };
  },
  data(){
    return{
      pages: this.$root.pages,
    };
  },
  methods: {
  }
}
</script>