<template>
  <ion-menu content-id="main-content" menuId="menuDrawerApp">
    <ion-header>
      <ion-toolbar>
        <ion-title class="pt-4 pb-3" style="background: url('assets/img/illustration/corner-2.png') center/cover;">
          <div class="avatar" style="height: 3.5rem; width: 3.5rem;">
            <img class="rounded-circle shadow-sm" src="@/assets/img/profile/avatar-male.png" alt="" />
          </div>
          <div class="lh-1">
            <h5 class="m-0 fs-0">David Simbolon</h5>
            <label class="">davidhedrin@gmail.com</label>
          </div>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <!-- <div class="text-center">
        <img src="@/assets/img/mtsiconland.png" alt="" width="150" />
      </div> -->
      <div class="mt-3">
        <ion-menu-toggle>
          <ion-list class="p-0">
            <ion-item class="fw-semi-bold text-secondary" @click="$root.gotoReplace(pages.home)">
              <span class="fas fa-chart-pie me-2"></span> Home
            </ion-item>
            <ion-item class="fw-semi-bold text-secondary" @click="$root.gotoReplace(pages.sales)">
              <span class="fas fa-cash-register me-2"></span> Catalog
            </ion-item>
            <ion-item class="fw-semi-bold text-secondary" @click="$root.gotoReplace(pages.transaksi)">
              <span class="fas fa-scroll me-2"></span> Report
            </ion-item>
            <!-- <ion-item class="fw-semi-bold text-secondary" @click="$root.gotoReplace('1')">
              <span class="fas fa-user me-2"></span> Profile
            </ion-item> -->
            <ion-item class="fw-semi-bold text-secondary" @click="$root.gotoReplace(pages.about)">
              <span class="fas fa-atlas me-2"></span> About
            </ion-item>
            <ion-item class="fw-semi-bold text-secondary" @click="$root.clearSessionLocalStorege()">
              <span class="fas fa-sign-out-alt me-2"></span> Logout
            </ion-item>
          </ion-list>
        </ion-menu-toggle>
      </div>
    </ion-content>
  </ion-menu>
</template>

<script>
import { IonPage, IonMenu, IonMenuToggle } from '@ionic/vue';

export default {
  components: {
    IonPage,
    IonMenu, 
    IonMenuToggle
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