<template>
  <ion-footer>
    <ion-toolbar class="px-2">
      <ion-segment :value="$root.activeRoute">
        <ion-segment-button class="px-3" value="Home" @click="$root.gotoReplace(pages.home)">
          <ion-label class="fs-1">
            <ion-icon :icon="pieChartOutline" class="fs-2"></ion-icon>
          </ion-label>
          Home
        </ion-segment-button>
        <ion-segment-button class="px-3" value="Sales" @click="$root.gotoReplace(pages.sales)">
          <ion-label class="fs-1">
            <ion-icon :icon="basketOutline" class="fs-2"></ion-icon>
          </ion-label>
          Catalog
        </ion-segment-button>
        <ion-segment-button class="px-3" value="Transaksi" @click="$root.gotoReplace(pages.transaksi)">
          <ion-label class="fs-1">
            <ion-icon :icon="receiptOutline" class="fs-2"></ion-icon>
          </ion-label>
          Report
        </ion-segment-button>
      </ion-segment>
    </ion-toolbar>
  </ion-footer>
</template>

<script>
import { IonPage, IonIcon } from '@ionic/vue';
import { pieChartOutline, basketOutline, receiptOutline } from 'ionicons/icons';

export default {
  components: {
    IonPage,
    IonIcon
  },
  setup() {
    return {
      pieChartOutline,
      basketOutline,
      receiptOutline,
    };
  },
  data(){
    return {
      pages: this.$root.pages,
    };
  },
}
</script>