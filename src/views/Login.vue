<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="row min-vh-100 flex-center g-0">
        <div class="col-lg-8 col-xxl-5 py-3 position-relative">
          <img class="bg-auth-circle-shape" src="@/assets/img/auth/bg-shape.png" alt="" width="250">
          <img class="bg-auth-circle-shape-2" src="@/assets/img/auth/shape-1.png" alt="" width="150">
          <div class="card overflow-hidden z-1">
            <div class="card-body p-0">
              <div class="row g-0 h-100">
                <div class="col-md-6 text-center bg-card-gradient">
                  <div class="position-relative p-4 pt-md-6" data-bs-theme="light">
                    <div class="bg-holder bg-auth-card-shape" style="background-image: url('assets/img/auth/half-circle.png');"></div>
                    <div class="z-1 position-relative">
                      <a class="link-light pb-5 font-sans-serif fs-4 d-inline-block fw-bolder" href="javascript:void(0)">
                        <img src="@/assets/img/mtsiconland-white.png" alt="" width="300"/>
                      </a>
                      <p class="opacity-75 text-white">
                        Martha Tilaar Shop dikelola oleh PT Tara Parama Semesta, perusahaan kecantikan ternama yang berdiri sejak tahun 1978. 
                      </p>
                    </div>
                  </div>
                  <div class="mt-1 mb-4" data-bs-theme="light">
                    <img src="@/assets/img/tps-mtg-logo-text-white.png" width="130" alt="">
                  </div>
                </div>
                <div class="col-md-6 d-flex flex-center">
                  <div class="px-4 py-4 flex-grow-1">
                    <form @submit.prevent="executeLogin">
                      <div class="mb-3">
                        <label class="form-label" for="card-email">Email address</label>
                        <input v-model="dataLogin.email" class="form-control py-2" id="card-email" type="email" placeholder="Enter email address" required />
                      </div>
                      <div class="mb-3">
                        <label class="form-label" for="card-password">Password</label>
                        <div class="input-group mb-3">
                          <input v-model="dataLogin.password" class="form-control py-2" :type="togglePassword ? 'password' : 'text'" placeholder="***********" id="card-password" required />
                          <span class="input-group-text cursor-pointer pb-0" @click="togglePasswordAction()">
                            <div v-if="togglePassword">
                              <ion-icon :icon="eyeOutline" class="fs-2"></ion-icon>
                            </div>
                            <div v-else>
                              <ion-icon :icon="eyeOffOutline" class="fs-2"></ion-icon>
                            </div>
                          </span>
                        </div>
                      </div>
                      <div class="row flex-between-center">
                        <div class="col-auto"><a class="fs--1" href="javascript:void(0)">Forgot Password?</a></div>
                      </div>
                      <div class="mb-4">
                        <button type="submit" class="btn btn-primary d-block w-100 mt-3 py-2">Login</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import axios from "axios";
import { IonPage, IonIcon } from '@ionic/vue';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';

export default {
  components: {
    IonPage,
    IonIcon
  },
  setup() {
    return {
      eyeOutline,
      eyeOffOutline,
    };
  },
  data() {
    return {
      local_storage: this.$root.local_storage,
      pages: this.$root.pages,

      dataLogin: {
        email: null,
        password: null,
      },

      togglePassword: true,
    };
  },
  methods: {
    executeLogin: async function(){
      this.$root.showLoading();
      try{
        const store = await axios({
          method: 'post',
          url: this.$root.API_ERP + '/pos/login',
          data: this.dataLogin
        });

        await this.$root.loadDataDevice();

        const dataUser = store.data;
        if(dataUser.flag_active == true){
          localStorage.setItem(this.local_storage.data_user, JSON.stringify(dataUser));
          this.$root.dataAuthToken = dataUser;
          this.$root.gotoReplace(this.pages.home);
          this.$root.showAlertFunction('success', 'Login Success!', 'Selamat datang di Martha Tilaar Shop.');
        }
        this.$root.hideLoading();
      } catch (error) {
        this.$root.hideLoading();
        this.$root.showAlertFunction('warning', 'Login Gagal!', error);

        if(error.response.status == 404){
          const responseData = error.response.data;
          this.$root.showAlertFunction('warning', 'Login Gagal!', responseData.message);
        } else if(error.response.status == 408){
          this.$root.showAlertFunction('danger', 'Login Gagal!', 'Percobaan login telah mencapai batas, tunggu dalam waktu ' + responseData.minute + ' menit');
        } else{
          this.$root.showAlertFunction('warning', 'Login Fatal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
        }
      }
    },

    togglePasswordAction: function(){
      if(this.togglePassword == true){
        this.togglePassword = false;
      }else{
        this.togglePassword = true;
      }
    }
  }
}
</script>