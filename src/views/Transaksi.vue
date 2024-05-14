<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="d-flex align-items-center mb-2 mt-1">
        <span class="badge rounded me-3 ms-1 badge-subtle-primary">
          <span class="fas fa-chart-line fs-2 text-primary"></span>
        </span>
        <div class="col">
          <h5 class="mb-0 text-primary position-relative">
            <span class="dark__bg-1100 pe-3 fs-2">Transaksi</span>
          </h5>
          <p class="mb-0 fs--1"><a href="javascript:void(0)" class="text-dark">Martha Tilaar Shop</a> / Transaksi List</p>
        </div>
      </div>

      <ion-grid class="p-0 mb-3">
        <ion-row>
          <ion-col size="6" size-md="3" size-lg="3">
            <div class="card overflow-hidden">
              <div class="card-header p-3">
                <h6 class="mb-1">Transaksi</h6>
                <div class="display-4 fs-2 mb-1 fw-normal font-sans-serif">
                  {{ totalTransactionRow }}
                </div>
                <span class="fw-semi-bold fs--1 text-nowrap">
                  {{ $root.formatDate(dateRangeValueTr[0]) }} - {{ $root.formatDate(dateRangeValueTr[1]) }}
                </span>
              </div>
            </div>
          </ion-col>
          <ion-col size="6" size-md="3" size-lg="3">
            <div class="card overflow-hidden">
              <div class="card-header p-3">
                <h6 class="mb-1">Total Transaksi</h6>
                <div class="display-4 fs-2 mb-1 fw-normal font-sans-serif">
                  {{ dataTransactionReport ? dataTransactionReport.row_count : '-' }}
                </div>
                <span class="badge badge-subtle-warning rounded-pill fs--2">+ {{ dataTransactionReport ? dataTransactionReport.row_count_today : '0' }} Hari ini</span>
              </div>
            </div>
          </ion-col>
          <ion-col size="6" size-md="3" size-lg="3">
            <div class="card overflow-hidden">
              <div class="card-header p-3">
                <h6 class="mb-1">
                  {{ dataTransactionReport ? dataTransactionReport.amount_tr_month_now : '-' }}
                </h6>
                <div class="display-4 fs-2 mb-1 fw-normal font-sans-serif">
                  <span class="fs-1">Rp</span> 
                  {{ dataTransactionReport ? dataTransactionReport.total_value ? $root.formatPrice(dataTransactionReport.total_value) : '0' : '0' }}
                </div>
                <span class="fw-semi-bold fs--1 text-nowrap">
                  Total HET: Rp {{ dataTransactionReport ? dataTransactionReport.total_value ? $root.formatPrice(dataTransactionReport.total_value_het) : '0' : '0' }}
                </span>
              </div>
            </div>
          </ion-col>
          <ion-col size="6" size-md="3" size-lg="3">
            <div class="card overflow-hidden">
              <div class="card-header p-3">
                <h6 class="mb-1">Store User's</h6>
                <div class="display-4 fs-2 mb-1 fw-normal font-sans-serif">
                  {{ dataTransactionReport && dataTransactionReport.users_count }} Account
                </div>
                <a v-if="dataUserLogin && dataUserLogin.role_code == master_code.role.super_admin" class="fw-semi-bold fs--1 text-nowrap" href="javascript:void(0)" type="button" @click="openModalShowTransactionSA()">
                  Statistics 
                  <span class="fas fa-angle-right ms-1" data-fa-transform="down-1"></span>
                </a>
                <a v-else class="fw-semi-bold fs--1 text-secondary text-nowrap" href="javascript:void(0)">
                  Statistics 
                  <span class="fas fa-angle-right ms-1" data-fa-transform="down-1"></span>
                </a>
              </div>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>

      <div class="card mb-3">
        <div class="bg-holder bg-card" style="background-image:url('assets/img/illustration/corner-1-left.png'); background-position: left; background-size: cover;"></div>
        <div class="card-body position-relative">
          <div class="row align-items-center">
            <div class="col-md-8">
              <h5>Daftar transaksi</h5>
            </div>
            <div class="col-md-4 mb-3">
              <form @submit.prevent="fatchDataTransaction(1, true, true)" class="d-flex align-items-center">
                <VueDatePicker
                  v-model="dateRangeValueTr" range
                />
                <div class="ms-3">
                  <button class="btn btn-primary" type="submit">
                    <span class="fas fa-search"></span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <ion-grid class="d-block d-md-none p-0 mb-3">
            <ion-row>
              <ion-col v-if="dataAllTransaction.length == 0" size="12" size-md="3" size-lg="3">
                <div class="text-center">
                  <strong>
                    <i>Tidak ada transaksi ditemukan</i>
                  </strong>
                </div>
              </ion-col>
              <ion-col class="p-0 mb-3" v-for="(trans, index) in dataAllTransaction" :key="trans.ducNum" size="12" size-md="3" size-lg="3">
                <div class="card cursor-pointer" @click="getDataItemTransaction(trans)">
                  <div class="card-header d-flex justify-content-between">
                    <div>
                      <h5 class="m-0">
                        {{ trans.bonStruk }}
                      </h5>
                      <span>
                        {{ formatDateTime(trans.docDate) }}
                      </span>
                    </div>
                    <div>
                      <div class="text-end">
                        {{ trans.payment_type.nama }}
                        <img :src="'assets/img/po-img/' + trans.payment_type.image" style="width: 80px; height: 20px; object-fit: contain;" alt="">
                      </div>
                      <div class="text-warning text-end">
                        Rp {{ $root.formatPrice(trans.paymentAmount) }}
                      </div>
                    </div>
                  </div>
                </div>
              </ion-col>
            </ion-row>
          </ion-grid>

          <div class="d-none d-md-block table-responsive scrollbar mb-2">
            <table class="table table-hover overflow-hidden">
              <thead>
                <tr class="p-0">
                  <th class="py-1 bg-white">#</th>
                  <th class="py-1 bg-white">ID Transaksi</th>
                  <th class="py-1 bg-white">Nomor Bon</th>
                  <th class="py-1 bg-white">Sales By</th>
                  <th class="py-1 bg-white">Pembayaran</th>
                  <th class="py-1 bg-white">Total Jual</th>
                  <th class="py-1 bg-white">Waktu Transaksi</th>
                  <th class="py-1 bg-white">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="dataAllTransaction.length < 1">
                  <td colspan="8" class="text-center"><i>Tidak ada transaksi ditemukan</i></td>
                </tr>
                <tr v-for="(trans, index) in dataAllTransaction" :key="trans.ducNum">
                  <td>{{ (currentPageTr * perPageTr - perPageTr) + index + 1 }}</td>
                  <td>{{ trans.ducNum }}</td>
                  <td>{{ trans.bonStruk }}</td>
                  <td>{{ trans.sales_type.nama_sales }}</td>
                  <td>{{ trans.payment_type.nama }} <img :src="`${$root.API_ERP}/assets/po-img/${trans.payment_type.image}`" height="20" alt=""></td>
                  <td class="text-warning">Rp {{ $root.formatPrice(trans.paymentAmount) }}</td>
                  <td>{{ formatDateTime(trans.docDate) }}</td>
                  <td>
                    <button class="btn btn-link p-0 me-1" type="button" @click="getDataItemTransaction(trans)">
                      <span class="far fa-eye text-primary"></span>
                    </button>
                    <button class="btn btn-link p-0" type="button">
                      <span class="fas fa-print text-secondary"> </span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="totalPageTr > 1" class="d-flex justify-content-end">
            <nav aria-label="Page navigation example">
              <ul class="pagination pagination-sm mb-0">

                <li v-if="displayedPagesTr[0] > 1">
                  <a class="page-link fs-0" href="javascript:void(0)" @click="fatchDataTransaction(1, true)">First</a>
                </li>

                <li class="page-item" :class="{ 'disabled': currentPageTr === 1 }">
                  <a class="page-link fs-0" href="javascript:void(0)" aria-label="Previous" @click="fatchDataTransaction(currentPageTr - 1, true)">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>

                <li v-for="pageNumber in displayedPagesTr" :key="pageNumber" class="page-item" :class="{ 'active': pageNumber === currentPageTr }">
                  <a class="page-link fs-0" href="javascript:void(0)" @click="fatchDataTransaction(pageNumber, true)">{{ pageNumber }}</a>
                </li>

                <li class="page-item" :class="{ 'disabled': currentPageTr === totalPageTr }">
                  <a class="page-link fs-0" href="javascript:void(0)" aria-label="Next" @click="fatchDataTransaction(currentPageTr + 1, true)">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>

                <li v-if="displayedPagesTr[displayedPagesTr.length - 1] < totalPageTr">
                  <a class="page-link fs-0" href="javascript:void(0)" @click="fatchDataTransaction(totalPageTr, true)">Last</a>
                </li>

              </ul>
            </nav>
          </div>

          <hr>
          <div class="card-footer position-relative">
            <div class="row mb-4">
              <div class="col-md-6">
                <h5 class="mb-0">Payment Overview</h5>
                <span class="fs--1">{{ $root.formatDate(dateRangeValueTr[0]) }} - {{ $root.formatDate(dateRangeValueTr[1]) }}</span>
              </div>
              <div class="col-md-6 text-md-end">
                <strong>
                  Total Amount: <span class="text-warning">Rp {{ $root.formatPrice(totalAmountTrasactionRange) }}</span>
                </strong>
                <p class="m-0 fs--1">
                  <i>Total HET: Rp {{ $root.formatPrice(totalAmountTrasactionHet) }}</i>
                </p>
              </div>
            </div>

            <!-- <u>Payment List:</u> -->
            <div class="row g-2">
              <div v-for="payment in allPaymentMethod" class="col-md-2 col-md-4 mb-2 text-center">
                <div class="card">
                  <div class="card-header">
                    <img :src="`${$root.API_ERP}/assets/po-img/${payment.image}`" height="17" alt="">
                    <div>
                      <label class="m-0"><u>{{ payment.nama }}</u></label>
                    </div>
                    <div>
                      <label class="fs--1 m-0">
                        Total: 
                        <span :class="payment.total_amont > 0  && 'text-warning'">
                          Rp {{ $root.formatPrice(payment.total_amont) }}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>C
        </div>
      </div>

      <div class="modal fade" id="modalViewProduct" tabindex="0" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 1100px">
          <div class="modal-content position-relative">
            <div class="modal-body p-0">
              <div class="card">
                <div class="bg-holder bg-card" style="background-image:url('assets/img/illustration/corner-1i.png'); background-size: cover;"></div>
                <div class="card-body position-relative p-2">
                  <div v-if="selectedTrView" class="mb-3 mt-2">
                    <div class="row align-items-center text-center mx-0">
                      <div class="col-sm-6 text-sm-start">
                        <img src="@/assets/img/mtsiconland.png" alt="invoice" height="55">
                      </div>
                      <div class="col text-sm-end mt-3 mt-sm-0">
                        <h3>Detail Transaksi</h3>
                        <h6 class="mb-0"><u>Nomor Bon</u></h6>
                        <p class="fs-0 mb-0 fw-semi-bold">{{ selectedTrView.bonStruk }}</p>
                        <!-- <h6 class="mb-0"><u>Status Transfer Data</u></h6>
                        <span class="badge rounded-pill" :class="selectedTrView.confirm_transfer ? 'badge-subtle-success' : 'badge-subtle-secondary'">
                          {{ selectedTrView.confirm_transfer ? 'Transfered' : 'Not-Transfer' }}
                        </span> -->
                      </div>
                      <div class="col-12">
                        <hr class="my-3 my-sm-1">
                      </div>
                    </div>
                    
                    <div class="row align-items-start mx-0">
                      <div class="col text-center text-sm-start mb-3">
                        <h6 class="text-600 mb-0"><u>Member Overview</u></h6>
                        <div v-if="selectedTrView.memberId != null">
                          <h5 class="mb-0">{{ selectedTrView.memberName }}</h5>
                          <p class="fs--1 mb-0">
                            Member ID: {{ selectedTrView.memberId }}
                          </p>
                          <p class="fs--1 mb-0">
                            <a :href="`mailto:${selectedTrView.memberEmail}`">{{ selectedTrView.memberEmail }}</a>
                            <br>
                            <a :href="`tel:${selectedTrView.memberPhone}`">{{ selectedTrView.memberPhone }}</a>
                          </p>
                        </div>
                        <div v-else>
                          <h5 class="mb-0">-</h5>
                          <p class="fs--1 mb-0">
                            Member ID: -
                          </p>
                          <p class="fs--1 mb-0">
                            <span>Email: -</span>
                            <br>
                            <span>No Handphone: -</span>
                          </p>
                        </div>
                      </div>
                      <div class="col-sm-auto ms-auto">
                        <div class="table-responsive">
                          <table class="table table-sm table-borderless fs--1">
                            <tbody>
                              <tr>
                                <th class="text-end py-0">Sales By:</th>
                                <td class="p-0 text-sm-end">
                                  <span class="text-info fw-bold fs--1">{{ selectedTrView.sales_type.nama_sales }}</span>
                                </td>
                              </tr>
                              <tr>
                                <th class="text-end py-0">Waktu Transaksi:</th>
                                <td class="p-0 text-sm-end">
                                  {{ formatDateTime(selectedTrView.docDate) }}
                                </td>
                              </tr>
                              <tr>
                                <th class="text-end">Metode Bayar:</th>
                                <td class="p-0 text-sm-end">
                                  <div>
                                    {{ selectedTrView.payment_type.nama }}
                                  </div>
                                  <img :src="`${$root.API_ERP}/assets/po-img/${selectedTrView.payment_type.image}`" height="18" alt="">
                                </td>
                              </tr>
                              <tr v-if="selectedTrView.uniquePayment" class="align-middle">
                                <th class="text-end py-0">Unik Number:</th>
                                <td class="p-0 pb-2 text-sm-end">
                                  <span class="badge bg-dark dark__bg-dark">{{ selectedTrView.uniquePayment }}</span>
                                </td>
                              </tr>
                              <tr class="alert alert-success fw-bold">
                                <th class="text-success-emphasis text-end">Jumlah Bayar:</th>
                                <td class="text-success-emphasis text-sm-end">
                                  Rp {{ $root.formatPrice(selectedTrView.paymentAmount) }},00
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div class="table-scrollable-wrapper mb-2 fs--1 mx-3" style="min-height: 1vh; max-height: 26vh;">
                      <table class="table table-scrollable border-bottom table-sm">
                        <thead>
                          <tr>
                            <th class="text-white bg-primary py-1 border-0">#</th>
                            <th class="text-white bg-primary py-1 border-0 text-center">Image</th>
                            <th class="text-white bg-primary py-1 border-0">Products</th>
                            <th class="text-white bg-primary py-1 border-0 text-center">Quantity</th>
                            <th class="text-white bg-primary py-1 border-0 text-center">Harga</th>
                            <th class="text-white bg-primary py-1 border-0 text-center">Info</th>
                            <th class="text-white bg-primary py-1 border-0 text-end">Jumlah</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(data, index) in selectedTrView.all_data_tr_d1">
                            <td class="align-middle">{{ index + 1 }}</td>
                            <td class="align-middle text-center">
                              <img v-if="data.product.imageUrl == null || data.product.imageUrl.trim() == ''" class="img-product rounded-2" src="@/assets/img/product/no_image.jpg">
                              <img v-else class="img-product rounded-2" :src="data.product.imageUrl">
                            </td>
                            <td class="align-middle">
                              <h6 class="mb-0 text-nowrap">{{ data.product.itemName }}</h6>
                              <p class="mb-0">{{ data.product.itemCode }}</p>
                            </td>
                            <td class="align-middle text-center">x{{ data.qty }}</td>
                            <td class="align-middle text-center">Rp {{ $root.formatPrice(data.price) }}</td>
                            <td class="align-middle text-center">
                              <div v-if="data.isPromo">
                                <!-- 1 -->
                                <div v-if="data.dataPromoD3.tipe_promo == master_code.tipe_promo.product">
                                  <span class="badge rounded-pill bg-danger">
                                    FREE
                                  </span>
                                </div>
                                <!-- 2 -->
                                <div v-else-if="data.dataPromoD3.tipe_promo == master_code.tipe_promo.diskon">
                                  <span v-if="data.dataPromoD3.tipe_potongan == master_code.tipe_potongan.percent" class="badge rounded-pill bg-danger">
                                    Disc {{ data.dataPromoD3.percent }} % 
                                  </span>
                                </div>
                                <!-- 3 -->
                                <div v-else-if="data.dataPromoD3.tipe_promo == master_code.tipe_promo.bundling">
                                  <span class="badge rounded-pill bg-danger">
                                    FREE
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td class="align-middle text-end">
                              Rp
                              {{ $root.formatPrice(data.qty * data.price) }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div class="row justify-content-end mx-0">
                      <div class="col-12">
                        <table class="table table-sm table-borderless fs--1">
                          <tbody>
                            <tr>
                              <th class="text-1000 fs-0">Billing Detail:</th>
                            </tr>
                            <tr>
                              <th class="text-900">Subtotal</th>
                              <td class="fw-semi-bold text-end">Rp {{ $root.formatPrice(selectedTrView.subTotalAmount) }}</td>
                            </tr>
                            <tr v-if="selectedTrView.totalDicountAmount && selectedTrView.totalDicountAmount > 0" class="border-top">
                              <th class="text-900">Hemat Diskon</th>
                              <td class="fw-semi-bold text-end">Rp {{ $root.formatPrice(selectedTrView.totalDicountAmount) }}</td>
                            </tr>
                            <tr v-if="selectedTrView.extraDiscountAmount && selectedTrView.extraDiscountAmount > 0" class="border-top">
                              <th class="text-900">Diskon Reseller</th>
                              <td class="fw-semi-bold text-end">-Rp {{ $root.formatPrice(selectedTrView.extraDiscountAmount) }}</td>
                            </tr>
                            <tr v-if="selectedTrView.amountDiskonPoint && selectedTrView.amountDiskonPoint > 0" class="border-top">
                              <th class="text-900">Point Member</th>
                              <td class="fw-semi-bold text-end">-Rp {{ $root.formatPrice(selectedTrView.amountDiskonPoint) }}</td>
                            </tr>
                            <tr v-if="selectedTrView.discountPromoValue && selectedTrView.discountPromoValue > 0" class="border-top">
                              <th>Diskon Promo Value <span v-if="selectedTrView.discountPromoPercent && selectedTrView.discountPromoPercent > 0">({{ selectedTrView.discountPromoPercent }}%)</span></th>
                              <td class="fw-semi-bold text-end">-Rp {{ $root.formatPrice(selectedTrView.discountPromoValue) }}</td>
                            </tr>
                            <tr class="border-top border-top-2 fw-bolder">
                              <th class="text-900">Total Bayar</th>
                              <td class="text-end fs-0 text-dark">Rp {{ $root.formatPrice(selectedTrView.paymentAmount) }}</td>
                            </tr>
                            <tr v-if="selectedTrView.cashValue" class="border-top border-top-2 fw-bolder">
                              <th class="text-900">Tunai</th>
                              <td class="fw-semi-bold text-end">Rp {{ $root.formatPrice(selectedTrView.cashValue) }}</td>
                            </tr>
                            <tr v-if="selectedTrView.returnCashValue">
                              <th class="text-900">Kembalian</th>
                              <td class="fw-semi-bold text-end">Rp {{ $root.formatPrice(selectedTrView.returnCashValue) }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <!-- <div v-else class="text-center mb-5">
                    <div class="mt-5">
                      <img src="@/assets/img/mtsiconland.png" width="200" alt="" />
                    </div>
                    <h5 class="fs-0 mt-3">
                      Transaksi Tidak Ditemukan!
                    </h5>
                  </div> -->
                  <div v-if="selectedTrView" class="text-end px-sm-3 pb-2">
                    <!-- v-if="selectedTrView.memberId != null" selectedTrView.member.email -->
                    <button v-if="selectedTrView.memberId != null" @click="sendEmailInvoiceMember(selectedTrView.ducNum, selectedTrView.memberEmail)" class="btn btn-secondary btn-sm me-2">Struk by Email <span class="fas fa-envelope-open-text"></span></button>
                    <button class="btn btn-secondary btn-sm me-2">Struk by Print <span class="fas fa-print"></span></button>
                    <button class="btn btn-primary btn-sm" data-bs-dismiss="modal">Selesai</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div v-if="dataUserLogin && dataUserLogin.role_code == master_code.role.super_admin" class="modal fade" id="modalViewMoreReport" tabindex="0" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 1100px">
          <div class="modal-content position-relative">
            <div class="position-absolute top-0 end-0 mt-3 me-3 z-1">
              <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0">
              <div class="card">
                <div class="bg-holder bg-card" style="background-image:url('assets/img/illustration/corner-1i.png'); background-size: cover;"></div>
                <div class="card-body position-relative p-3">
                  <div class="rounded-top-3">
                    <h5 class="mb-1" id="modalExampleDemoLabel">Statistics {{ selectedStoreOutlet.store_outlet.storeName }}</h5>
                    <form @submit.prevent="fatchDataSalesTransactionSA(1, true, true)" class="row g-2">
                      <div class="col-md-2">
                        <select v-model="filterSelectedReportSearch" class="form-select bg-transparent border-1" style="border: 1px solid rgba(0, 0, 0, 0.3);" aria-label="Default select example">
                          <option value="" selected>Filter</option>
                          <option value="101">Date ASC</option>
                          <option value="102">Date DESC</option>
                        </select>
                      </div>
                      <div class="col-md-4">
                        <select v-model="selectBAReportSearchTrSA" class="form-select bg-transparent border-1" style="border: 1px solid rgba(0, 0, 0, 0.3);" aria-label="Default select example">
                          <option value="" selected>Select BA</option>
                          <option v-for="data in allDataUserInStore" :value="data.user_uuid">{{ data.user.nama_lengkap }}</option>
                        </select>
                      </div>
                      <div class="col-md-4 d-flex align-items-center">
                        <VueDatePicker
                          v-model="dateRangeValueTrSA" range
                        />

                        <div class="ms-2">
                          <button class="btn btn-sm btn-primary" type="submit">
                            <span class="fas fa-search"></span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div class="mt-3 mb-2">
                    <div class="table-responsive scrollbar">
                      <table class="table table-sm overflow-hidden">
                        <thead>
                          <tr class="p-0">
                            <th class="py-1 bg-white">#</th>
                            <th class="py-1 bg-white">BA Kasir</th>
                            <th class="py-1 bg-white">Waktu Transaksi</th>
                            <th class="py-1 bg-white">Nomor Bon</th>
                            <th class="py-1 bg-white">Sales By</th>
                            <th class="py-1 bg-white">Pembayaran</th>
                            <th class="py-1 bg-white">Total Jual</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(trans, idx) in dataAllTrSA">
                            <td>{{ (currentPageTrSA * perPageTrSA - perPageTrSA) + idx + 1 }}</td>
                            <td>{{ trans.user.nama_lengkap }}</td>
                            <td>{{ formatDateTime(trans.docDate) }}</td>
                            <td>{{ trans.bonStruk }}</td>
                            <td>{{ trans.sales_type.nama_sales }}</td>
                            <td>{{ trans.payment_type.nama }} <img :src="`${$root.API_ERP}/assets/po-img/${trans.payment_type.image}`" height="20" alt=""></td>
                            <td class="text-warning">Rp {{ $root.formatPrice(trans.paymentAmount) }}</td>
                          </tr>
                          <tr align="center" v-if="dataAllTrSA.length == 0">
                            <td class="py-5" colspan="7"><i>Data transaksi tidak ditemukan!</i></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div class="row">
                      <div class="col-md-6">
                        <div v-if="totalPageTrSA > 1">
                          <nav aria-label="Page navigation example">
                            <ul class="pagination pagination-sm mb-0">
        
                              <li v-if="displayedPagesTrSA[0] > 1">
                                <a class="page-link" href="javascript:void(0)" @click="fatchDataSalesTransactionSA(1, true)">First</a>
                              </li>
        
                              <li class="page-item" :class="{ 'disabled': currentPageTrSA === 1 }">
                                <a class="page-link" href="javascript:void(0)" aria-label="Previous" @click="fatchDataSalesTransactionSA(currentPageTrSA - 1, true)">
                                  <span aria-hidden="true">&laquo;</span>
                                </a>
                              </li>
        
                              <li v-for="pageNumber in displayedPagesTrSA" :key="pageNumber" class="page-item" :class="{ 'active': pageNumber === currentPageTrSA }">
                                <a class="page-link" href="javascript:void(0)" @click="fatchDataSalesTransactionSA(pageNumber, true)">{{ pageNumber }}</a>
                              </li>
        
                              <li class="page-item" :class="{ 'disabled': currentPageTrSA === totalPageTrSA }">
                                <a class="page-link" href="javascript:void(0)" aria-label="Next" @click="fatchDataSalesTransactionSA(currentPageTrSA + 1, true)">
                                  <span aria-hidden="true">&raquo;</span>
                                </a>
                              </li>
        
                              <li v-if="displayedPagesTrSA[displayedPagesTrSA.length - 1] < totalPageTrSA">
                                <a class="page-link" href="javascript:void(0)" @click="fatchDataSalesTransactionSA(totalPageTrSA, true)">Last</a>
                              </li>
        
                            </ul>
                          </nav>
                        </div>
                      </div>
                      <div class="col-md-6 text-end">
                        <strong>
                          Total Amount: <span class="text-warning">Rp {{ $root.formatPrice(totalAmountTrasactionRangeTrSA) }}</span>
                        </strong>
                        <p class="m-0 fs--1">
                          <i>Total HET: Rp {{ $root.formatPrice(totalAmountTrasactionHetTrSA) }}</i>
                        </p>
                      </div>
                    </div>

                    <hr />

                    <div class="scrollable-customize mb-3" style="min-height: 46vh; max-height: 46vh;">
                      <div class="row g-2 m-0">
                        <div v-for="payment in allPaymentMethodTrSA" class="col-lg-3 col-md-6 mb-1 text-center">
                          <div class="card">
                            <div class="card-header">
                              <img :src="`${$root.API_ERP}/assets/po-img/${payment.image}`" height="15" alt="">
                              <div>
                                <label class="m-0"><u>{{ payment.nama }}</u></label>
                              </div>
                              <div>
                                <label class="fs--1 m-0">
                                  <span :class="payment.total_amont > 0  && 'text-warning'">
                                    Rp {{ $root.formatPrice(payment.total_amont) }}
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- <div class="text-end">
                    <button class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Selesai</button>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Modal email berhasil dan selesai -->
      <div class="modal fade" id="modalSendEamilFinishSuccess" tabindex="0" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 400px">
          <div class="modal-content position-relative">
            <div class="modal-body p-0 pb-2">
              <div class="py-2 text-center">
                <div class="justify-content-center mb-0">
                  <img src="@/assets/img/icons/Gif/success-gif.gif" height="120" alt="">
                </div>
                <h3 class="mb-1">Kirim Email!</h3>
                <p class="m-0 px-4">
                  Success! Invoice email berhasil dikirim.
                </p>
              </div>
            </div>
            <div class="modal-footer d-flex justify-content-center">
              <button class="btn btn-success btn-sm" type="button" data-bs-dismiss="modal">Selesai</button>
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

export default {
  components: { IonPage },
  name: 'Transaksi',
  data() {
    return {
      local_storage: this.$root.local_storage,
      master_code: this.$root.master_code,
      dataUserLogin: null,

      dataAllTransaction: [],
      displayedPagesTr: [],
      totalDisplayedPagesTr: 3,
      currentPageTr: 1,
      perPageTr: 10,
      totalPageTr: 0,

      totalTransactionRow: 0,
      totalAmountTrasactionRange: 0,
      totalAmountTrasactionHet: 0,

      dataTransactionReport: null,
      dateRangeValueTr: [],
      selectedTrView: null,
      allPaymentMethod: [],
      allPaymentMethodTrSA: [],
      selectedStoreOutlet: this.$root.selectedStoreAccess,

      dateRangeValueTrSA: [],
      dataAllTrSA: [],
      displayedPagesTrSA: [],
      totalDisplayedPagesTrSA: 3,
      currentPageTrSA: 1,
      perPageTrSA: 10,
      totalPageTrSA: 0,
      
      allDataUserInStore: [],
      filterSelectedReportSearch: '',
      selectBAReportSearchTrSA: '',
      totalAmountTrasactionRangeTrSA: 0,
      totalAmountTrasactionHetTrSA: 0,
    };
  },

  async beforeMount(){
    const thisDate = new Date();
    const startOfDay = new Date(thisDate.getFullYear(), thisDate.getMonth(), thisDate.getDate(), 0, 0, 0);
    const endOfDay = new Date(thisDate.getFullYear(), thisDate.getMonth(), thisDate.getDate(), 23, 59, 59);
    this.dateRangeValueTr = [startOfDay, endOfDay];
    this.dateRangeValueTrSA = [startOfDay, endOfDay];

    const check_uuid = localStorage.getItem(this.local_storage.is_dynamic);
    const checkUserRegis = await this.$root.checkUserRegistered(check_uuid);
    this.dataUserLogin = checkUserRegis;

    await this.loadAllData();
  },

  methods: {
    loadAllData: async function(){
      this.$root.showLoading();

      const userLogin = JSON.parse(localStorage.getItem(this.local_storage.data_user));
      try{
        const requset = await axios({
          method: 'get',
          url: this.$root.API_ERP + '/pos/app/transaksi/',
          params: {
            user_uuid: userLogin.user_uuid,
          }
        });

        const reqData = requset.data;
        this.dataTransactionReport = reqData.dataTransactionReport;
        this.allPaymentMethodTrSA = reqData.allPaymentMethod.map(x => {
          return {...x, total_amont: 0}
        });
        this.allPaymentMethod = reqData.allPaymentMethod.map(x => {
          return {...x, total_amont: 0}
        });

        await this.fatchDataTransaction(this.currentPageTr, false, true);
      } catch (error) {
        console.log(error);
      }
    
      this.$root.hideLoading();
    },

    openModalShowTransactionSA: async function(){
      this.$root.showLoading();
      try{
        const thisDate = new Date();
        const startOfDay = new Date(thisDate.getFullYear(), thisDate.getMonth(), thisDate.getDate(), 0, 0, 0);
        const endOfDay = new Date(thisDate.getFullYear(), thisDate.getMonth(), thisDate.getDate(), 23, 59, 59);
        this.dateRangeValueTrSA = [startOfDay, endOfDay];

        const cacheStoreAccess = JSON.parse(localStorage.getItem(this.local_storage.access_store));
        const request = await axios({
          method: 'get',
          url: this.$root.API_ERP + '/pos/app/transaksi/getAllDataUserInStore',
          params: {
            store_code: cacheStoreAccess.store_outlet.storeCode,
          }
        });
        
        const reqData = request.data;
        this.allDataUserInStore = reqData;
        $('#modalViewMoreReport').modal('show');
      }catch(e){
        console.log(e);
      }
      this.$root.hideLoading();
    },

    fatchDataSalesTransactionSA: async function(page = 1, isLoading = false, isUpdate = false){
      if(isLoading) this.$root.showLoading();
      const startDate = this.formatToDateTimeRequest(new Date(this.dateRangeValueTrSA[0]));
      const endDate = this.formatToDateTimeRequest(new Date(this.dateRangeValueTrSA[1]));
      try{
        const getAllDataTr = await axios({
          method: 'get',
          url: this.$root.API_ERP + '/pos/getDataReportSalesTransaction',
          params: {
            page: page,
            per_page: this.perPageTrSA,
            date_start: startDate,
            date_end: endDate,
            store_code: this.selectedStoreOutlet.store_code,
            filter_select: this.filterSelectedReportSearch.trim(),
            ba_id: this.selectBAReportSearchTrSA.trim(),
          },
        });
        
        if(isUpdate) await this.fatchDataDetailPaymentAmountTrSA();

        const response = getAllDataTr.data;
        this.currentPageTrSA = response.current_page;
        this.totalPageTrSA = response.last_page;
        this.dataAllTrSA = response.data;

        this.updateDisplayedPagesTrSA();
      } catch (error) {
        console.log(error);
      }
      if(isLoading) this.$root.hideLoading();
    },

    fatchDataDetailPaymentAmountTrSA: async function(){
      const cacheStoreAccess = JSON.parse(localStorage.getItem(this.local_storage.access_store));
      const startDate = this.formatToDateTimeRequest(new Date(this.dateRangeValueTrSA[0]));
      const endDate = this.formatToDateTimeRequest(new Date(this.dateRangeValueTrSA[1]));
      try{
        const getAllDataTr = await axios({
          method: 'get',
          url: this.$root.API_ERP + '/pos/app/transaksi/getTrByUserDetailPaymentAmount/',
          params: {
            store_code: cacheStoreAccess.store_outlet.storeCode,
            date_start: startDate,
            date_end: endDate,
            ba_id: this.selectBAReportSearchTrSA.trim(),
          },
        });

        const reqData = getAllDataTr.data;
        this.allPaymentMethodTrSA.map(x => {
          let z = reqData.find(y => y.payment_type === x.slug);
          if (z) {
            x.total_amont = parseInt(z.total_payment);
            x.total_het = parseInt(z.total_het);
          }else{
            x.total_amont = 0;
            x.total_het = 0;
          }
          return x;
        });

        this.totalAmountTrasactionRangeTrSA = parseInt(this.allPaymentMethodTrSA.reduce((total, tr) => total + tr.total_amont, 0));
        this.totalAmountTrasactionHetTrSA = parseInt(this.allPaymentMethodTrSA.reduce((total, tr) => total + tr.total_het, 0));
      } catch (error) {
        console.log(error);
      }
    },

    updateDisplayedPagesTrSA: function() {
      try{
        const halfDisplayedPages = Math.floor(this.totalDisplayedPagesTrSA / 2);

        let startPage = Math.max(1, this.currentPageTrSA - halfDisplayedPages);
        let endPage = Math.min(this.totalPageTrSA, startPage + this.totalDisplayedPagesTrSA - 1);

        if (endPage - startPage + 1 < this.totalDisplayedPagesTrSA) {
          startPage = Math.max(1, endPage - this.totalDisplayedPagesTrSA + 1);
        }

        this.displayedPagesTrSA = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
      }catch(e){
        console.log(e);
      }
    },
    
    fatchDataTransaction: async function(page = 1, isLoading = false, isUpdate = false){
      if(isLoading) this.$root.showLoading();
      const startDate = this.formatToDateTimeRequest(new Date(this.dateRangeValueTr[0]));
      const endDate = this.formatToDateTimeRequest(new Date(this.dateRangeValueTr[1]));
      try{
        const userLogin = JSON.parse(localStorage.getItem(this.local_storage.data_user));
        const getAllDataTr = await axios({
          method: 'get',
          url: this.$root.API_ERP + '/pos/app/transaksi/getTrByUserLogin/' + userLogin.user_uuid,
          params: {
            page: page,
            per_page: this.perPageTr,
            date_start: startDate,
            date_end: endDate,
          },
        });
          
        if(isUpdate) await this.fatchDataTrUserDetailPaymentAmount();

        const response = getAllDataTr.data.data;
        this.currentPageTr = response.current_page;
        this.totalPageTr = response.last_page;
        this.dataAllTransaction = response.data;
        
        const dataTr = getAllDataTr.data.report_data[0];
        this.totalTransactionRow = dataTr.total_row_trans ? parseInt(dataTr.total_row_trans) : 0;
        this.totalAmountTrasactionRange = dataTr.total_amount_trans ? parseInt(dataTr.total_amount_trans) : 0;
        this.totalAmountTrasactionHet = dataTr.total_amout_het ? parseInt(dataTr.total_amout_het) : 0;

        this.updateDisplayedPagesTr();
      } catch (error) {
        console.log(error);
      }
      if(isLoading) this.$root.hideLoading();
    },

    fatchDataTrUserDetailPaymentAmount: async function(){
      const cacheStoreAccess = JSON.parse(localStorage.getItem(this.local_storage.access_store));
      const startDate = this.formatToDateTimeRequest(new Date(this.dateRangeValueTr[0]));
      const endDate = this.formatToDateTimeRequest(new Date(this.dateRangeValueTr[1]));
      try{
        const check_uuid = localStorage.getItem(this.local_storage.is_dynamic);
        const getAllDataTr = await axios({
          method: 'get',
          url: this.$root.API_ERP + '/pos/app/transaksi/getTrByUserDetailPaymentAmount/',
          params: {
            store_code: cacheStoreAccess.store_outlet.storeCode,
            date_start: startDate,
            date_end: endDate,
            ba_id: check_uuid,
          },
        });

        const reqData = getAllDataTr.data;
        this.allPaymentMethod.map(x => {
          let z = reqData.find(y => y.payment_type === x.slug);
          if (z) {
            x.total_amont = parseInt(z.total_payment);
          }else{
            x.total_amont = 0;
          } 
          return x;
        });
      } catch (error) {
        console.log(error);
      }
    },
    
    updateDisplayedPagesTr() {
      const halfDisplayedPages = Math.floor(this.totalDisplayedPagesTr / 2);

      let startPage = Math.max(1, this.currentPageTr - halfDisplayedPages);
      let endPage = Math.min(this.totalPageTr, startPage + this.totalDisplayedPagesTr - 1);

      if (endPage - startPage + 1 < this.totalDisplayedPagesTr) {
        startPage = Math.max(1, endPage - this.totalDisplayedPagesTr + 1);
      }

      this.displayedPagesTr = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    },
    
    getDataItemTransaction: async function(trans){
      this.selectedTrView = null;
      this.$root.showLoading();
      try{
        const reqData = await axios({
          method: 'get',
          url: this.$root.API_ERP + '/pos/app/transaksi/getDataItemTransaction/' + trans.id,
        });

        const resData = reqData.data;
        if(reqData.status == 200){
          this.showDetailTransaction(resData);
        }
      } catch (error) {
        console.log(error);
      }
      this.$root.hideLoading();
    },

    showDetailTransaction: function(trans){
      trans.all_data_tr_d1 = trans.all_data_tr_d1.map(x => {
        if(x.isPromo){
          x.dataPromoD3 = trans.all_data_tr_d3.find(y => y.id_tr_d1 == x.id);
        }

        return x;
      });
      this.selectedTrView = null;
      this.selectedTrView = trans;
      $('#modalViewProduct').modal('show');
    },

    formatDateRangeNow: function(endOfDay = false) {
      const date = new Date();
      
      if (endOfDay) {
        date.setHours(23, 59, 59, 999);
      } else {
        date.setHours(0, 0, 0, 0);
      }

      const localDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );

      return localDate.toISOString().slice(0, 16);
    },
      
    formatDateTime: function (dateTimeString) {
      const dateObj = new Date(dateTimeString);
      
      const day = String(dateObj.getDate()).padStart(2, '0');
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const year = dateObj.getFullYear();
      const hours = String(dateObj.getHours()).padStart(2, '0');
      const minutes = String(dateObj.getMinutes()).padStart(2, '0');
      const seconds = String(dateObj.getSeconds()).padStart(2, '0');
      
      const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}`;
      return formattedDateTime;
    },

    formatToDateTimeRequest: function (date) {
      return (
        date.getFullYear() +
        '-' +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + date.getDate()).slice(-2) +
        ' ' +
        ('0' + date.getHours()).slice(-2) +
        ':' +
        ('0' + date.getMinutes()).slice(-2) +
        ':' +
        ('0' + date.getSeconds()).slice(-2)
      );
    },

    sendEmailInvoiceMember: async function(docNum, email = null){
      this.$root.showLoading();
      try{
        if(email != null){
          const request = await this.$root.sendEmailInvoice(docNum, email);

          if(request.status == 200 || request.status == 201){
            $('#modalSendEamilFinishSuccess').modal('show');
          }
        }
      }catch(e){
        console.log(e);
      }
      this.$root.hideLoading();
    }
  },
}
</script>

<style scoped>
.img-product{
  height: 35px;
  width: 60px;
  object-fit: cover;
}
</style>