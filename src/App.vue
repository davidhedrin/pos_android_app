<template>
  <div id="firebaseNotifErp" class="position-fixed bottom-0 start-0" style="z-index: 9999"></div>
  <div v-if="isLoading" class="loading">
    <div class="center-content-loading">
      <component :is="loadingWhite"></component>
      <img src="@/assets/img/mtsiconland-white.png" width="200" alt="" />
    </div>
  </div>
  <component :is="alert" :status="alertParam.status" :title="alertParam.title" :msg="alertParam.msg" :show-alert="showAlert"  @close-alert="showAlert = false"></component>

  <ion-app>
    <Header v-if="!minuHideHeaderFooter.includes(activeRoute)"></Header>
    <ion-content>
      <ion-router-outlet />
    </ion-content>
    <Footer v-if="!minuHideHeaderFooter.includes(activeRoute)"></Footer>
  </ion-app>
</template>

<script>
import axios from "axios";

import { markRaw } from 'vue';
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { useRoute, useRouter } from "vue-router";
import { Device } from '@capacitor/device';

import { master_code, master_coll, local_storage, pages, firebase_conf } from '@/scripts/collections.js';
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import firebaseConfig from "@/firebase/init.js";

import LoadingWhite from '@/views/components/LoadingWhite.vue';
import Alert from '@/views/components/Alert.vue';
import Header from '@/views/components/Header.vue';
import Footer from '@/views/components/Footer.vue';

export default {
  components: {
    IonApp,
    IonRouterOutlet,
    Header,
    Footer
  },
  data() {
    const route = useRoute();
    const router = useRouter();
    // const API_ERP = 'https://ipos-tpsmtg.com:8087/';
    // const API_ERP = 'http://178.1.7.230:8062/';
    const API_ERP = 'http://localhost:8085/';
    
    return {
      API_ERP: API_ERP,
      activeRoute: route.name,
      
      master_code: master_code,
      master_coll: master_coll,
      local_storage: local_storage,
      pages: pages,
      firebase_conf: firebase_conf,

      route: route,
      router: router,

      isLoading: false,
      loadingWhite: markRaw(LoadingWhite),

      alert: markRaw(Alert),
      showAlert: false,
      alertParam: {
        status: '',
        title: '',
        msg: '',
      },

      minuHideHeaderFooter: [
        'Login',
        'Splash'
      ],
      
      selectedStoreAccess: null,
      dataAuthToken: null,
      deviceInfo: null,
      deviceInfoAccess: null,
      
      docFirebase: doc,
      getDocFirebase: getDoc,
      onSnapshotFirebase: onSnapshot,
      updateDocFirebase: updateDoc,
      firebaseConfig: firebaseConfig,
    }
  },

  mounted(){
    this.selectedStoreAccess = JSON.parse(localStorage.getItem(this.local_storage.access_store));
    this.dataAuthToken = JSON.parse(localStorage.getItem(this.local_storage.data_user));
    this.deviceInfo = JSON.parse(localStorage.getItem(this.local_storage.device_info));
    this.deviceInfoAccess = JSON.parse(localStorage.getItem(this.local_storage.device_info_access));
  },

  async created(){
    await this.setupAppConfig();
  },
  
  computed: {
    filterPriceProduct(){
      return (product) => {
        if (this.selectedStoreAccess) {
          return product.all_product_price.find(price => price.priceCode === this.selectedStoreAccess.store_outlet.priceCode);
        }
      }
    },
    filterStokProduct(){
      return (product) => {
        if (this.selectedStoreAccess) {
          return product.all_inventory_stok.find(stok => stok.whsCode === this.selectedStoreAccess.store_outlet.whsCode);
        }
      }
    },
    filterDiskonProduct(){
      return (product) => {
        if (this.selectedStoreAccess) {
          return product.all_product_diskon.find(diskon => diskon.discCode === this.selectedStoreAccess.store_outlet.discCode);
        }
      }
    }
  },

  methods: {
    setupAppConfig: async function() {
      onSnapshot(
        doc(firebaseConfig, this.firebase_conf.collection.device_sales, this.firebase_conf.doc_id.update_status), async (snap) => {
          const resData = snap.data();
          if(this.dataAuthToken != null && this.deviceInfoAccess != null){
            if(resData.model == this.deviceInfo.model){
              localStorage.setItem(this.local_storage.device_info_access, JSON.stringify(this.deviceInfoAccess));
              this.deviceInfoAccess.isActive = resData.status;
              // if(resData.status == false){
              //   this.clearSessionLocalStorege();
              // }
            }
          }
        }
      );
    },
    
    loadDataDevice: async function(){
      const deviceInfo = await Device.getInfo();
      localStorage.setItem(this.local_storage.device_info, JSON.stringify(deviceInfo));
      this.deviceInfo = deviceInfo;

      try{
        const request = await axios({
          method: 'get',
          url: this.API_ERP + '/pos/getDataDeviceByModel',
          params: {
            model: deviceInfo.model,
            manufacture: deviceInfo.manufacturer
          }
        });

        const reqData = request.data;
        localStorage.setItem(this.local_storage.device_info_access, JSON.stringify(reqData));
        this.deviceInfoAccess = reqData;
      }catch(e){
        console.log(e);
      }
    },

    goto: function(page){
      this.$router.push({ name: page });
      this.activeRoute = page;
    },
    
    gotoReplace: function(page){
      this.$router.replace({ name: page }, 'forward');
      this.activeRoute = page;
    },

    showLoading: function(){
      this.isLoading = true;
    },

    hideLoading: function(){
      this.isLoading = false;
    },
    
    showAlertFunction: function(status, title, msg){
      this.alertParam.status = status;
      this.alertParam.title = title;
      this.alertParam.msg = msg;
      this.showAlert = true;
    },

    clearSessionLocalStorege: function(){
      this.gotoReplace(this.pages.login);
      localStorage.clear();
    },

    trimString: function(string){
      return string.trim();
    },
    
    copyTextClipboard: function(text, title = null) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      var generateMsgAlert = title ? title : 'Text';
      this.showAlertFunction('info', 'Well Done', generateMsgAlert + ' telah berhasil disalin');
    },
    
    formatPrice: function(price) {
      if (price !== null && price !== undefined) {
        const number = parseFloat(price);
        if (isNaN(number)) {
          return;
        }
        
        const formattedPrice = number.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return formattedPrice;
      }
    },

    inputTextFormatPrice: function(event){
      const price = event.target.value;
      const numericPrice = price.replace(/[^0-9]/g, '');
      
      if (numericPrice === null || numericPrice.trim() === "") {
        return;
      }
      
      const number = parseFloat(numericPrice);

      const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'decimal',
        minimumFractionDigits: 0,
      }).format(number);

      return formattedPrice;
    },

    formatCurrencyRemoveSeparator: function(price){
      return price.replace(/\./g, '');
    },
    
    formatDate: function(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },

    formatDateIdn: function(dateString) {
      const date = new Date(dateString);
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      return date.toLocaleDateString('id-ID', options);
    },

    formatPhoneNumber: function(phoneNumber) {
      // Memformat nomor telepon dengan format tiap 4 digit
      const formatted = phoneNumber.replace(/(\d{4})(?=\d)/g, "$1.");
      return formatted;
    },

    formatDateTime: function (dateTimeString) {
      const isTFormat = dateTimeString.includes('T');
      const separator = isTFormat ? 'T' : ' ';
      const [datePart, timePart] = dateTimeString.split(separator);
      const [year, month, day] = datePart.split('-');
      const [hour, minute] = timePart.split(':');

      const formattedDate = `${day}/${month}/${year}`;
      const formattedTime = `${hour}:${minute}`;

      return `${formattedDate} ${formattedTime}`;
    },
    
    removeRedBorder(selectId) {
      const selectElement = document.getElementById(selectId);
      selectElement.classList.remove('border-red');
    },

    convertToLowerCase(text) {
      return text.toLowerCase();
    },

    convertToInteger(doubleValue) {
      return parseInt(doubleValue, 10);
    },
    
    sendEmailInvoice: async function(docNum, email = null, isNotif = false){
      try{
        const request = await axios({
          method: 'post',
          url: this.API_ERP + '/pos/sendEmailInvoice',
          data:{
            email_to: email ?? null,
            doc_num: docNum,
            user_login: this.dataAuthToken.user_uuid
          }
        });

        if(isNotif) this.showAlertFunction('success', 'Email Notif!', 'Success! Invoice email berhasil dikirim.');
        return request;
      }catch(e){
        if(isNotif) this.showAlertFunction('warning', 'Email Notif!', 'Terjadi kesalahan!! Invoice email gagal dikirim.');
        console.log(e);
        return null;
      }
    },
  }
}
</script>

<style>
/* ion-modal.custom-modal {
  --width: fit-content;
  --height: fit-content;
  --border-radius: 5px;
  --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}
ion-modal.custom-modal .wrapper {
  margin: 25px;
} */

.hide-input-btn::-webkit-inner-spin-button,
.hide-input-btn::-webkit-outer-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}

.loading {
  background: #1c1c1cc6;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  z-index: 9999;
  text-align: center;
}

.center-content-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tr-middle {
  vertical-align: middle;
}
</style>