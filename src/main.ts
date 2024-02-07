import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { 
  IonicVue,
  IonPage,
  IonTitle,
  IonCardTitle,
  IonBackButton,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonButtons,
  IonButton,
  IonCard,
  IonCardContent,
  IonToolbar,
  IonHeader,
  IonFooter,
  IonCardSubtitle,
  IonCardHeader,
  IonImg,
  IonAvatar,
  IonMenuButton,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  // IonModal,
  IonFab,
  IonFabButton,
  IonList,
  IonItem,
} from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

// /* Theme variables */
import './theme/variables.css';

// Import CSS files
import './assets/css/fonts.css';
import './assets/vendor/css/simplebar.min.css';
import './assets/css/theme.min.css';

// Import JS files
import './assets/vendor/js/jquery.min.js';
import './assets/vendor/js/simplebar.min.js';
import './assets/vendor/js/all.min.js';

import './assets/vendor/js/popper.min.js';
import './assets/vendor/js/bootstrap.min.js';
import './assets/vendor/js/lodash.min.js';

// import './assets/js/config.js';
// import './assets/vendor/js/anchor.min.js';
// import './assets/vendor/js/is.min.js';
// import './assets/js/theme.js';

// Select2
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import "@/assets/css/custom-datepicker.css";

const app = createApp(App)
  .use(IonicVue)
  .use(router);

app.component('ion-page', IonPage);
app.component('ion-content', IonContent);
app.component('ion-grid', IonGrid);
app.component('ion-row', IonRow);
app.component('ion-col', IonCol);
app.component('ion-icon', IonIcon);
app.component('ion-buttons', IonButtons);
app.component('ion-button', IonButton);
app.component('ion-card', IonCard);
app.component('ion-card-content', IonCardContent);
app.component('ion-back-button', IonBackButton);
app.component('ion-title', IonTitle);
app.component('ion-card-title', IonCardTitle);
app.component('ion-toolbar', IonToolbar);
app.component('ion-header', IonHeader);
app.component('ion-footer', IonFooter);
app.component('ion-card-subtitle', IonCardSubtitle);
app.component('ion-card-header', IonCardHeader);
app.component('ion-img', IonImg);
app.component('ion-avatar', IonAvatar);
app.component('ion-menu-button', IonMenuButton);
app.component('ion-label', IonLabel);
app.component('ion-segment', IonSegment);
app.component('ion-segment-button', IonSegmentButton);
// app.component('ion-modal', IonModal);
app.component('ion-fab', IonFab);
app.component('ion-fab-button', IonFabButton);
app.component('ion-list', IonList);
app.component('ion-item', IonItem);

app.component("VueDatePicker", VueDatePicker);
app.component("v-select", vSelect);
  
router.isReady().then(() => {
  app.mount('#app');
});