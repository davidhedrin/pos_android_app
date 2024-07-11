<template>
  <ion-page>
    <ion-content>
      <div class="card shadow-none px-4 pb-2">
        <div class="bg-holder bg-card" style="background-image:url('assets/img/illustration/reports-bg.png');"></div>
        <div class="card-header z-1">
          <div class="row flex-between-center gx-0">
            <div class="col-md-4 d-flex align-items-center">
              <img class="img-fluid" src="@/assets/img/illustration/reports-greeting.png" alt="">
              <div class="ms-x1">
                <h6 class="mb-1 text-primary">Welcome to</h6>
                <h4 class="mb-0 text-primary fw-bold"><span class="text-primary fw-medium">Martha Tilaar Shop </span>Sales POS</h4>
              </div>
            </div>

            <div class="col-md-auto">
              <div class="row">
                <div class="col-lg-auto pt-3 pt-lg-0">
                  <div class="row flex-lg-column flex-xxl-row gx-3 gy-2 align-items-center align-items-lg-start align-items-xxl-center">
                    <div class="col-auto">
                      <h6 class="text-700 mb-0">Store Active: </h6>
                    </div>
                    <div class="col-md-auto position-relative">
                      <div class="input-group">
                        <input :value="selectedStoreOutlet ? `${selectedStoreOutlet.store_outlet.storeName} (${selectedStoreOutlet.store_code})` : ''" class="form-control datetimepicker flatpickr-input" type="text" readonly="readonly">
                        <button class="btn btn-primary btn-sm card-link" type="button" data-bs-toggle="modal" data-bs-target="#modalSelectAccessStoreDashboard">
                          <span class="me-1">Pindah</span> <span class="fas fa-store-alt"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-auto pt-3 pt-lg-0">
                  <div class="row flex-lg-column flex-xxl-row gx-3 gy-2 align-items-center align-items-lg-start align-items-xxl-center">
                    <div class="col-auto">
                      <h6 class="text-700 mb-0">Tanggal: </h6>
                    </div>
                    <div class="col-md-auto position-relative">
                      <input :value="dateNow" class="form-control datetimepicker ps-4 flatpickr-input" type="text" readonly="readonly">
                      <span class="fas fa-calendar-alt text-primary position-absolute top-50 translate-middle-y ms-2"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ion-padding">
        <div class="card bg-transparent-50 mb-3 overflow-hidden">
          <div class="card-header position-relative">
            <div class="bg-holder d-none d-md-block bg-card z-1"
              style="background-image:url('assets/img/ecommerce-bg.png');background-size:230px;background-position:right bottom;z-index:-1;">
            </div><!--/.bg-holder-->
            <div class="position-relative z-2">
              <div>
                <h3 class="text-primary fw-light overflow-hidden mb-0">
                  Wellcome,
                  <span class="typed-text fw-bold ms-1">{{ dataUserLogin && dataUserLogin.nama_lengkap + '!' }}</span>
                </h3>
                <p>Here's what happening with your store today</p>
              </div>
              <div class="d-flex py-1">
                <div class="pe-3">
                  <p class="text-600 fs--1 fw-medium">Transaction</p>
                  <h4 class="text-800 mb-0">{{ dataUserLogin && dataUserLogin.trans_targets ? dataUserLogin.trans_targets : '-' }}</h4>
                </div>
                <div class="ps-3">
                  <p class="text-600 fs--1">Month Incentive</p>
                  <h4 class="text-800 mb-0">
                    Rp {{ dataUserLogin && dataUserLogin.incentive_targets ? $root.formatPrice(parseInt(dataUserLogin.incentive_targets)) : '-' }}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body p-0">
            <ul class="mb-0 list-unstyled list-group font-sans-serif">
              <li class="list-group-item mb-0 rounded-0 py-3 px-x1 list-group-item-warning border-x-0 border-top-0">
                <div class="row flex-between-center">
                  <div class="col">
                    <div class="d-flex">
                      <div class="fas fa-circle mt-1 fs--2"></div>
                      <p class="fs--1 ps-2 mb-0"><strong>5 products</strong> didn't publish to your Facebook page
                      </p>
                    </div>
                  </div>
                  <div class="col-auto d-flex align-items-center">
                    <a class="fs--1 fw-medium text-warning-emphasis" href="#!">View products <i class="fas fa-chevron-right ms-1 fs--2"></i></a>
                  </div>
                </div>
              </li>
              <li class="list-group-item mb-0 rounded-0 py-3 px-x1 greetings-item text-700 border-x-0 border-top-0">
                <div class="row flex-between-center">
                  <div class="col">
                    <div class="d-flex">
                      <div class="fas fa-circle mt-1 fs--2 text-primary"></div>
                      <p class="fs--1 ps-2 mb-0"><strong>7 orders</strong> have payments that need to be captured
                      </p>
                    </div>
                  </div>
                  <div class="col-auto d-flex align-items-center"><a class="fs--1 fw-medium" href="#!">
                    View payments <i class="fas fa-chevron-right ms-1 fs--2"></i></a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
  
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="text-primary mb-0">
              <span class="typed-text fw-bold ms-1">{{ $root.selectedStoreAccess ? $root.selectedStoreAccess.storeName : '' }}</span>
            </h5>
            <div class="row align-items-center">
              <div class="col-md-6 mb-2">
                <span v-if="$root.selectedStoreAccess" class="fs--1">
                  Alamat: {{ $root.selectedStoreAccess.store_outlet.address }}
                </span>
              </div>
              <div class="col-md-3 mb-3">
                <!-- selectedWhsCode != null && fatchDataProduct(currentPageProduct) -->
                <v-select 
                v-model="selectedWhsCode" 
                :options="allDataMasterWhs"
                label="whsName"
                value="whsCode"
                placeholder="Pilih warehouse"
                >
                  <template v-slot:option="option">
                    {{ option.whsName }} ({{ option.whsCode }})
                  </template>
                </v-select>
              </div>
              <div class="col-md-3 mb-3">
                <form @submit.prevent="fatchDataProduct(1)">
                  <div class="input-group">
                    <input v-model="inputSearchProduct" @input="inputSearchProduct.trim() == '' && fatchDataProduct(currentPageProduct)" class="form-control search-input fuzzy-search" type="search" placeholder="Search...">
                    <button class="btn btn-primary card-link" type="submit" style="z-index: 1"><span class="fas fa-search"></span></button>
                  </div>
                </form>
              </div>
            </div>
  
            <div class="table-responsive scrollbar mb-2">
              <table class="table table-hover table-striped overflow-hidden mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th scope="col">Kode</th>
                    <th scope="col">Name</th>
                    <th scope="col">Stok</th>
                    <th scope="col">Harga</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="align-middle" v-for="(product, index) in dataAllProduct">
                    <td>{{ index + 1 }}</td>
                    <td class="text-nowrap">{{ product.itemCode }}</td>
                    <td class="text-nowrap">
                      {{ product.itemName }}
                    </td>
                    <td class="text-nowrap text-success fw-semi-bold">{{ product.all_inventory_stok[0].onHand }}</td>
                    <td class="text-nowrap">Rp {{ $root.formatPrice($root.filterPriceProduct(product).price) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div v-if="totalPageProduct > 1" class="d-flex justify-content-end">
              <nav aria-label="Page navigation example">
                <ul class="pagination pagination-sm">
  
                  <li v-if="displayedPagesProduct[0] > 1">
                    <a class="page-link fs-0" href="javascript:void(0)" @click="fatchDataProduct(1)">First</a>
                  </li>
  
                  <li class="page-item" :class="{ 'disabled': currentPageProduct === 1 }">
                    <a class="page-link fs-0" href="javascript:void(0)" aria-label="Previous" @click="fatchDataProduct(currentPageProduct - 1)">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
  
                  <li v-for="pageNumber in displayedPagesProduct" :key="pageNumber" class="page-item" :class="{ 'active': pageNumber === currentPageProduct }">
                    <a class="page-link fs-0" href="javascript:void(0)" @click="fatchDataProduct(pageNumber)">{{ pageNumber }}</a>
                  </li>
  
                  <li class="page-item" :class="{ 'disabled': currentPageProduct === totalPageProduct }">
                    <a class="page-link fs-0" href="javascript:void(0)" aria-label="Next" @click="fatchDataProduct(currentPageProduct + 1)">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
  
                  <li v-if="displayedPagesProduct[displayedPagesProduct.length - 1] < totalPageProduct">
                    <a class="page-link fs-0" href="javascript:void(0)" @click="fatchDataProduct(totalPageProduct)">Last</a>
                  </li>
  
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="modalSelectAccessStoreDashboard" tabindex="0" data-bs-keyboard="false" data-bs-backdrop="static" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 400px">
          <div class="modal-content position-relative">
            <form @submit.prevent="selesaiSelectStoreAccessBtn()" id="formApproveUserDashboard">
              <div class="modal-body p-0">
                <div class="py-3 text-center">
                  <div class="d-flex justify-content-center mb-2 mt-2">
                    <img src="@/assets/img/ecommerce-bg.png" height="160" alt="">
                  </div>
                  <h5 class="m-0 px-1 mb-0">
                    Pilih akses store!
                  </h5>
                  <p class="m-0 px-3 mb-2">
                    Lanjutkan pilih store/outlet untuk diakses.
                  </p>
                  <div class="m-0 px-3">
                    <v-select id="select_access_store_outlet"
                      v-model="selectedStoreOutlet"
                      :options="handleFormatStoreOutlet" 
                      value="store_code" 
                      label="storeName"
                      placeholder="Pilih store outlet"
                    />
                  </div>
                </div>
              </div>
              <div class="modal-footer d-flex justify-content-center">
                <button v-if="currentActiveStoreOutlet == null" class="btn btn-secondary btn-sm" type="button" @click="logoutModalSelectStoreBtn()">Logout <span class="fas fa-sign-out-alt"></span></button>
                <button v-else class="btn btn-secondary btn-sm" type="button" data-bs-dismiss="modal">Batal</button>
                <button class="btn btn-primary btn-sm" type="submit">Selesai</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import axios from "axios";
import { IonPage } from '@ionic/vue';

export default {
  components: { IonPage },
  name: 'Home',
  data(){
    return{
      master_code: this.$root.master_code,
      master_coll: this.$root.master_coll,
      local_storage: this.$root.local_storage,
      pages: this.$root.pages,

      dateNow: null,
      dataUserLogin: null,
      accessStoreUser: [],
      allDataMasterWhs: [],

      dataAllProduct: [],
      displayedPagesProduct: [],
      totalDisplayedPagesProduct: 3,
      currentPageProduct: 1,
      perPageProduct: 10,
      totalPageProduct: 0,
      inputSearchProduct: '',

      selectedWhsCode: null,

      selectedStoreOutlet: null,
      currentActiveStoreOutlet: null,
    };
  },
  
  computed: {
    handleFormatStoreOutlet(){
      return this.accessStoreUser.map(store => {
        store.storeName = store.store_outlet.storeName;
        return store;
      });
    }
  },

  async beforeMount(){
    this.dateNow = this.$root.formatDateIdn(new Date());
    this.currentActiveStoreOutlet = JSON.parse(localStorage.getItem(this.local_storage.access_store));
    await this.loadAllDatas();
  },
  
  // async mounted(){
  // },

  methods: {
    loadAllDatas: async function(){
      this.$root.showLoading();
      try{
        const loadData = await axios({
          method: 'get',
          url: this.$root.API_ERP + '/pos/app/dashboard',
        });
        
        const resLoadData = loadData.data;
        this.allDataMasterWhs = resLoadData.allDataWhs;

        const userLogin = JSON.parse(localStorage.getItem(this.local_storage.data_user));
        this.dataUserLogin = userLogin;
        this.accessStoreUser = userLogin.access_store_outlet;

        const cacheStoreAccess = JSON.parse(localStorage.getItem(this.local_storage.access_store));
        if(cacheStoreAccess){
          localStorage.setItem(this.local_storage.access_store, JSON.stringify(cacheStoreAccess));
          this.selectedStoreOutlet = cacheStoreAccess;
          await this.fatchDataProduct(this.currentPageProduct);
        }else{
          if(this.accessStoreUser.length > 1) {
            $('#modalSelectAccessStoreDashboard').modal('show');
          }else{
            const firstUserStoreAccess = this.accessStoreUser[0];
            firstUserStoreAccess.storeName = firstUserStoreAccess.store_outlet.storeName;
            this.$root.selectedStoreAccess = firstUserStoreAccess;
            localStorage.setItem(this.local_storage.access_store, JSON.stringify(firstUserStoreAccess));
  
            this.selectedStoreOutlet = firstUserStoreAccess;
            this.currentActiveStoreOutlet = firstUserStoreAccess;
            await this.fatchDataProduct(this.currentPageProduct);
          }
        }
      } catch (error) {
        console.log(error);
      }
      this.$root.hideLoading();
    },

    fatchDataProduct: async function(page){
      const cacheStoreAccess = JSON.parse(localStorage.getItem(this.local_storage.access_store));
      this.$root.showLoading();
      try{
        const store = await axios({
          method: 'get',
          url: this.$root.API_ERP + '/pos/app/dashboard/getAllProduct',
          params: {
            page: page,
            per_page: this.perPageProduct,
            store_outlet: cacheStoreAccess.store_outlet,
            search: this.inputSearchProduct.trim(),
            whs_code: this.selectedWhsCode != null ? this.selectedWhsCode.whsCode : cacheStoreAccess.store_outlet.whsCode,
          },
        });

        const response = store.data;
        this.currentPageProduct = response.current_page;
        this.totalPageProduct = response.last_page;
        this.dataAllProduct = response.data;
        
        this.updateDisplayedPages();
      } catch (error) {
        console.log(error);
      }
      this.$root.hideLoading();
    },

    updateDisplayedPages() {
      const halfDisplayedPages = Math.floor(this.totalDisplayedPagesProduct / 2);

      let startPage = Math.max(1, this.currentPageProduct - halfDisplayedPages);
      let endPage = Math.min(this.totalPageProduct, startPage + this.totalDisplayedPagesProduct - 1);

      if (endPage - startPage + 1 < this.totalDisplayedPagesProduct) {
        startPage = Math.max(1, endPage - this.totalDisplayedPagesProduct + 1);
      }

      this.displayedPagesProduct = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    },
    
    selesaiSelectStoreAccessBtn: async function(){
      if(this.selectedStoreOutlet == null){
        $('#select_access_store_outlet').addClass('border-red');
        return false;
      }

      $('#modalSelectAccessStoreDashboard').modal('hide');
      this.$root.showLoading();
      this.$root.selectedStoreAccess = this.selectedStoreOutlet;
      this.currentActiveStoreOutlet = this.selectedStoreOutlet;
      localStorage.setItem(this.local_storage.access_store, JSON.stringify(this.selectedStoreOutlet));

      await this.fatchDataProduct(this.currentPageProduct);
      this.$root.hideLoading();
    },
    
    logoutModalSelectStoreBtn: function(){
      $('#modalSelectAccessStoreDashboard').modal('hide');
      this.$root.clearSessionLocalStorege();
    }
  }
}
</script>