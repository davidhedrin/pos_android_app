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
                  <button class="btn btn-secondary btn-sm px-3 ms-3" type="button" data-bs-toggle="modal" data-bs-target="#modalFormChangePassword">
                    Reset Password
                  </button>
                  <div class="border-bottom border-dashed my-4 d-lg-none"></div>
                </div>
              </div>
            </div>
            <div class="col-md-3 px-1 ps-lg-3 mt-2">
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
      
      <div class="modal fade" id="modalEditDataUser" tabindex="-1" data-bs-keyboard="false" data-bs-backdrop="static" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content position-relative border-0">
            <div class="position-absolute top-0 end-0 mt-2 me-2 z-1">
              <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0">
              <div class="card">
                <div class="bg-holder d-none d-lg-block bg-card" style="background-image:url('assets/img/illustration/corner-4-left.png'); background-position: left; background-size: cover;"></div>
                <div class="card-body position-relative p-0">
                  <div class="rounded-top-3 py-3 ps-4 pe-6">
                    <h5 class="mb-1">Edit Data Profile</h5>
                  </div>
                  <form @submit.prevent="">
                    <div class="p-4 pb-2 pt-1">
                      <div class="row" id="formEditDataUser">
                        <div class="col-md-12 mb-2">
                          <label class="form-label mb-0" for="input_alamat_email">Alamat Email <span class="text-danger">*</span></label>
                          <input :value="dataUser.email" class="form-control bg-transparent" id="input_alamat_email" type="email" placeholder="Masukkan alamat email" disabled>
                        </div>
                        <div class="col-md-12 mb-2">
                          <label class="form-label mb-0" for="input_nama_lengkap">Nama Lengkap <span class="text-danger">*</span></label>
                          <input :value="dataUser.nama_lengkap" class="form-control bg-transparent" id="input_nama_lengkap" type="text" placeholder="Masukkan nama lengkap" disabled>
                        </div>
                        <div class="col-md-12 mb-2">
                          <label class="form-label mb-0" for="input_no_hp">No Handphone <span class="text-danger">*</span></label>
                          <input :value="dataUser.no_hp" class="form-control bg-transparent" id="input_no_hp" type="text" placeholder="Masukkan nomor handphone" disabled>
                        </div>
                        <div class="col-md-12 mb-2">
                          <label class="form-label mb-0" for="select_gender">Gender <span class="text-danger">*</span></label>
                          <select v-model="dataUser.gender" class="form-select bg-transparent" id="select_gender" aria-label="Default select example">
                            <option value="">Pilih jenis kelamin</option>
                            <option value="1">Laki-laki</option>
                            <option value="2">Perempuan</option>
                          </select>
                        </div>
                        <div class="col-md-12 mb-2">
                          <label class="form-label mb-0" for="tanggal_lahir">Tanggal Lahir <span class="text-danger">*</span></label>
                          <input v-model="dataUser.tanggal_lahir" class="form-control bg-transparent" id="tanggal_lahir" type="date">
                        </div>
                        <div v-if="!dataUserRegister" class="col-md-12 mb-2">
                          <label class="form-label mb-0" for="input_username">Username <span class="text-danger">*</span></label>
                          <input v-model="dataUser.username" class="form-control bg-transparent" id="input_username" type="text" placeholder="Masukkan username">
                        </div>
                        <div v-if="!dataUserRegister" class="col-md-12 mb-2">
                          <label class="form-label mb-0" for="input_password">Password <span class="text-danger">*</span></label>
                          <input v-model="dataUser.password" class="form-control bg-transparent" id="input_password" type="password" placeholder="Masukkan nama lengkap">
                        </div>
                        <div v-if="!dataUserRegister" class="col-md-12 mb-2">
                          <label class="form-label mb-0" for="input_konfirmasi_password">Konfirmasi Password <span class="text-danger">*</span></label>
                          <input v-model="dataUser.konfirmasi_password" class="form-control bg-transparent" id="input_konfirmasi_password" type="password" placeholder="Masukkan nama lengkap">
                        </div>
                        <span v-if="!dataUserRegister" class="fs--1">Note: <u>Password digunakan untuk login di form login tanpa SSO dan tadak merubah password di SSO!</u></span>

                        <div class="col-md-12 mt-3 mb-2">
                          <i>Field dengan tanda <span class="text-danger">*</span> wajib untuk diisi</i>
                        </div>
                      </div>
                    </div>
                    <div class="text-end px-4 pt-0 pb-3">
                      <button class="btn btn-secondary me-2" type="button" data-bs-dismiss="modal">Close</button>
                      <!-- <button class="btn btn-primary" type="submit">Simpan</button> -->
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal fade" id="modalFormChangePassword" tabindex="0" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content position-relative">
            <Form @submit="openModalConfirmChangePassword()" :validation-schema="validateFormPassword" v-slot="{ errors }">
              <div class="modal-body p-0">
                <div class="rounded-top-3 py-3 bg-body-tertiary text-center">
                  <h3 class="mb-1">Ganti Password</h3>
                </div>
                <div class="py-3 p-4">
                  <div class="mb-2">
                    <label class="form-label mb-0">Password Lama</label>
                    <div class="input-group mb-3">
                      <Field v-model="dataResetPassword.oldPass" name="oldPass" class="form-control" :class="{'is-invalid' : errors.oldPass}" :type="toggleOldPass ? 'password' : 'text'" placeholder="Massukan password lama" />
                      <span class="input-group-text px-2 cursor-pointer" @click="toggleOldPass = !toggleOldPass">
                        <div v-if="toggleOldPass">
                          <span class="far fa-eye"></span>
                        </div>
                        <div v-else>
                          <span class="far fa-eye-slash"></span>
                        </div>
                      </span>
                    </div>
                    <div class="text-danger fs--2">{{ errors.oldPass }}</div>
                  </div>
                  <hr>
                  <div class="mb-2">
                    <label class="form-label mb-0">Password Baru</label>
                    <div class="input-group mb-3">
                      <Field v-model="dataResetPassword.newPass" name="newPass" class="form-control" :class="{'is-invalid' : errors.newPass}" :type="toggleNewPass ? 'password' : 'text'" placeholder="Masukkan password baru" />
                      <span class="input-group-text px-2 cursor-pointer" @click="toggleNewPass = !toggleNewPass">
                        <div v-if="toggleNewPass">
                          <span class="far fa-eye"></span>
                        </div>
                        <div v-else>
                          <span class="far fa-eye-slash"></span>
                        </div>
                      </span>
                    </div>
                    <div class="text-danger fs--2">{{ errors.newPass }}</div>
                  </div>
                  <div class="mb-2">
                    <label class="form-label mb-0">Konfirmasi Password Baru</label>
                    <div class="input-group mb-3">
                      <Field v-model="dataResetPassword.coNewPass" name="coNewPass" class="form-control" :class="{'is-invalid' : errors.coNewPass}" :type="toggleCoNewPass ? 'password' : 'text'" placeholder="Masukkan konfirmasi password baru" />
                      <span class="input-group-text px-2 cursor-pointer" @click="toggleCoNewPass = !toggleCoNewPass">
                        <div v-if="toggleCoNewPass">
                          <span class="far fa-eye"></span>
                        </div>
                        <div v-else>
                          <span class="far fa-eye-slash"></span>
                        </div>
                      </span>
                    </div>
                    <div class="text-danger fs--2">{{ errors.coNewPass }}</div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn btn-secondary btn-sm" type="button" data-bs-dismiss="modal">Batal</button>
                <button class="btn btn-primary btn-sm" type="submit">Lanjutkan</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      
      <div class="modal fade" id="modalConfirmChangeNewPassword" tabindex="0" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 400px">
          <div class="modal-content position-relative">
            <div class="modal-body p-0 pb-2">
              <div class="rounded-top-3 py-3 bg-body-tertiary text-center">
                <h4 class="mb-1" id="modalExampleDemoLabel">Konfirmasi Password</h4>
              </div>
              <div class="py-2 text-center">
                <div class="d-flex justify-content-center mb-2">
                  <img src="@/assets/img/icons/Gif/warning-icon-2.gif" height="60" alt="">
                </div>
                <h5 class="m-0 px-1">
                  Konfirmasi Merubah Password
                </h5>
                <p class="m-0 px-3">
                  Lanjutkan untuk mengubah password lama. Otomatis mengeluarkan untuk Relogin.
                </p>
              </div>
            </div>
            <div class="modal-footer d-flex justify-content-center">
              <button class="btn btn-secondary btn-sm" type="button" data-bs-dismiss="modal">Batal</button>
              <button class="btn btn-success btn-sm" type="button" @click="confirmChangePassword()">Konfirmasi</button>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import axios from "axios";
import { IonPage } from '@ionic/vue';
import { Device } from '@capacitor/device';
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

export default {
  components: { 
    IonPage,
    Form,
    Field 
    },
  name: 'About',
  
  data(){
    const validateFormPassword = Yup.object().shape ({
      oldPass: Yup.string().required('Masukkan password lama')
      .min(6, 'Password lama minimal 6 karakter'),
      newPass: Yup.string().required('Masukkan password baru')
      .min(6, 'Password baru minimal 6 karakter')
      .oneOf([Yup.ref('coNewPass')], 'Password baru dan konformasi password harus sama'),
      coNewPass: Yup.string().required('Masukkan konfirmasi password lama')
      .min(6, 'Password baru minimal 6 karakter')
      .oneOf([Yup.ref('newPass')], 'Password baru dan konformasi password harus sama'),
    });
    
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

      validateFormPassword,
      dataResetPassword: {
        oldPass: null,
        newPass: null,
        coNewPass: null,
      },

      toggleOldPass: true,
      toggleNewPass: true,
      toggleCoNewPass: true,
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
  },

  methods:{
    openModalConfirmChangePassword: function(){
      $('#modalConfirmChangeNewPassword').modal('show');
    },

    confirmChangePassword: async function(){
      $('#modalConfirmChangeNewPassword').modal('hide');
      this.$root.showLoading();
      const datas = {
        user_id: this.dataUserRegister.id,
        oldPass: this.dataResetPassword.oldPass,
        newPass: this.dataResetPassword.newPass,
        coNewPass: this.dataResetPassword.coNewPass,
      };

      try{
        const request = await axios({
          method: 'put',
          url: this.$root.API_ERP + '/pos/resetPasswordCurrentUser',
          data: datas
        });

        this.$root.hideLoading();
        const reqData = request.data;
        this.$root.clearSessionLocalStorege()
        // this.$root.showAlertFunction('success', 'Reset Password!', 'Ubah password terlah berhasil, Silahkan login kembali');
      }catch(e){
        if(e.response && e.response.data.status == 101){
          this.$root.showAlertFunction('warning', 'Reset Password!', `Reset Password Gagal! ${e.response.data.message}.`);
        }else{
          this.$root.showAlertFunction('warning', 'Reset Password!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
        }
        this.$root.hideLoading();
        console.log(e);
      }
    }
  }
}
</script>