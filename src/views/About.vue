<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="card mb-3">
        <div class="bg-holder bg-card" style="background-image:url('assets/img/illustration/corner-4.png'); background-size: cover;"></div>
        <div class="card-body position-relative px-5">
          <div class="row">
            <div class="col-md-9">
              <div class="row text-center">
                <div class="col text-md-start">
                  <div class="avatar avatar-5xl">
                    <img class="rounded-circle img-thumbnail shadow-sm mb-2" src="@/assets/img/profile/avatar-male.png" width="200" alt="">
                  </div>
                </div>
                <div class="col-md-9 text-md-start mt-2 px-0">
                  <h4 class="mb-1">
                    {{ dataUser.nama_lengkap ? dataUser.nama_lengkap : 'nama lengkap' }}
                    <span v-if="dataUserRegister && dataUserRegister.flag_active == true" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Verified" data-bs-original-title="Verified">
                      <small class="fa fa-check-circle text-primary" data-fa-transform="shrink-4 down-2"></small>
                    </span> 
                    <span v-else data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Waiting-Verified" data-bs-original-title="Waiting Verified">
                      <small class="fa fa-check-circle text-secondary" data-fa-transform="shrink-4 down-2"></small>
                    </span>
                  </h4>
                  <h5 class="fs-0 fw-normal">{{ dataUser.email  }}</h5>
                  <p class="text-500 fs--1 m-0">{{ dataUser.no_hp }},</p>
                  <p class="text-500 fs--1 m-0">{{ dataUser.gender ? dataUser.gender == '1' ? 'Laki-laki' : 'Perempuan' : 'gander'}},</p>
                  <p class="text-500 fs--1">{{ dataUser.tanggal_lahir ? $root.formatDateIdn(dataUser.tanggal_lahir) : 'day month year' }}</p>
                  <button class="btn btn-falcon-primary btn-sm px-3" type="button" data-bs-toggle="modal" data-bs-target="#modalEditDataUser">
                    Edit <span class="far fa-edit ms-1"></span>
                  </button>
                  <div class="border-bottom border-dashed my-4 d-lg-none"></div>
                </div>
              </div>
            </div>
            <div class="col-auto px-1 ps-lg-3 mt-2">
              <div class="d-flex align-items-center mb-2">
                <span class="fas fa-user-circle fs-2 me-2 text-700" data-fa-transform="grow-2"></span>
                <div class="flex-1">
                  <h5 class="mb-0">Personal Info</h5>
                </div>
              </div>
              <div class="mb-2">
                <div class="d-flex align-items-end">
                  <h6 class="m-0">Role: 
                    <span v-if="dataUserRegister">
                      <span v-if="dataUserRegister.flag_active != null" class="badge rounded-pill badge-subtle-primary ms-1 fs--1">
                        {{ dataUserRegister.role ? dataUserRegister.role.nama_role : '?' }}
                      </span>
                      <i v-else>Waiting For <span class="badge rounded-pill badge-subtle-warning ms-1">Approved</span></i>
                    </span>
                    <span v-else><i>Waiting For <span class="badge rounded-pill badge-subtle-secondary ms-1">Registred</span></i></span>
                  </h6>
                </div>
              </div>
              <div class="mb-2">
                <div class="d-flex align-items-center">
                  <h6 class="m-0">Status: 
                    <span v-if="dataUserRegister">
                      <span v-if="dataUserRegister.flag_active != null" :class="dataUserRegister.flag_active == 1 ? 'text-success' : 'text-danger'">
                        {{ dataUserRegister.flag_active == 1 ? 'Active' : 'Inactive' }}
                      </span>
                      <i v-else>Waiting For <span class="badge rounded-pill badge-subtle-warning ms-1">Approved</span></i>
                    </span>
                    <span v-else><i>Waiting For <span class="badge rounded-pill badge-subtle-secondary ms-1">Registred</span></i></span>
                  </h6>
                </div>
              </div>
              <div class="mb-2">
                <div class="d-flex align-items-end">
                  <h6 class="m-0">Login SSO: </h6>
                  <span class="badge rounded-pill bg-success fs--2 ms-1">YES</span>
                </div>
              </div>
              <div class="mb-2">
                <div class="d-flex">
                  <h6 class="m-0">Access Store: <br>
                    <span v-if="dataUserRegister">
                      <span v-if="dataUserRegister.flag_active != null">
                        <span v-if="dataUserRegister.access_store_outlet.length > 0">
                          <span v-for="(store, index) in dataUserRegister.access_store_outlet">
                            {{ index + 1 }}.
                            {{ store.store_outlet.storeName }}{{ index == dataUserRegister.access_store_outlet.length - 1 ? '' : ', ' }} 
                          </span>
                        </span>
                        <span v-else>-</span>
                      </span>
                      <i v-else>Waiting For <span class="badge rounded-pill badge-subtle-warning ms-1">Approved</span></i>
                    </span>
                    <span v-else><i>Waiting For <span class="badge rounded-pill badge-subtle-secondary ms-1">Registred</span></i></span>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header px-4">
          <div class="d-flex align-items-center mb-2">
            <span class="fas fa-mobile-alt fs-2 me-2 text-700" data-fa-transform="grow-2"></span>
            <div class="flex-1">
              <h5 class="mb-0">Device Info</h5>
            </div>
          </div>

          <div>
            <label class="m-0">Device:</label>
            {{ deviceInfos ? deviceInfos.name ?? '-' : '-' }}
          </div>
          <div>
            <label class="m-0">Model:</label>
            {{ deviceInfos ? deviceInfos.model ?? '-' : '-' }}
          </div>
          <div>
            <label class="m-0">Manufacture:</label>
            {{ deviceInfos ? deviceInfos.manufacturer ?? '-' : '-' }}
          </div>
          <div>
            <label class="m-0">Oprating System:</label>
            {{ deviceInfos ? deviceInfos.osVersion ?? '-' : '-' }}
          </div>
          <div>
            <label class="m-0">Platform:</label>
            {{ deviceInfos ? deviceInfos.platform ?? '-' : '-' }}
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage } from '@ionic/vue';
import { Device } from '@capacitor/device';

export default {
  components: { IonPage },
  name: 'About',
  
  data(){
    return{
      master_code: this.$root.master_code,
      master_coll: this.$root.master_coll,
      local_storage: this.$root.local_storage,
      pages: this.$root.pages,

      dataUserRegister: null,
      dataUser: {
        uuid: null,
        nama_lengkap: null,
        no_hp: null,
        gender: '',
        tanggal_lahir: null,
        username: null,
        password: null,
        konfirmasi_password: null,
      },
      deviceInfos: null,
    };
  },

  async beforeMount(){
    this.$root.showLoading();
    const userLogin = JSON.parse(localStorage.getItem(this.local_storage.data_user));
    this.dataUserRegister = userLogin;

    this.dataUser.email = userLogin.email;
    this.dataUser.nama_lengkap = userLogin.nama_lengkap;
    this.dataUser.no_hp = userLogin.no_hp;
    
    const deviceInfo = await Device.getInfo();
    this.deviceInfos = deviceInfo;
    this.$root.hideLoading();
  }
}
</script>