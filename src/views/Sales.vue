<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="row g-3">
        <div class="col-xl-9">
          <div class="card mb-2 py-1">
            <div class="bg-holder bg-card" style="background-image:url('assets/img/illustration/corner-4.png'); background-size: cover;"></div>
            <div class="row g-2 card-header position-relative align-items-center py-2">
              <div class="col-md-2">
                <div class="dropdown font-sans-serif">
                  <button class="btn card-link dropdown-toggle dropdown-caret-none" type="button" id="filter_product_view" data-bs-toggle="dropdown" data-boundary="viewport" aria-haspopup="true" aria-expanded="false">
                    <span class="fas fa-filter fs--1"></span>
                    <span class="fs-0">Filter</span>
                    <!-- <span class="fs-0 notification-indicator notification-indicator-warning notification-indicator-fill">
                      <span class="notification-indicator-number">1</span>
                    </span> -->
                  </button>
                  <div class="dropdown-menu dropdown-menu-end border py-2 ps-3" aria-labelledby="filter_product_view" style="">
                    <!-- <a class="dropdown-item" href="#!">Configure inbox</a> -->
                    <!-- <div class="dropdown-divider"></div> -->
                    <div class="dropdown-item form-check form-check-inline mr-0">
                      <input v-model="checkboxProducts.bestSellerAll" class="form-check-input" id="checkBoxBestSellerAll" type="checkbox" value="" />
                      <label class="form-check-label mb-0" for="checkBoxBestSellerAll">Best Seller All</label>
                    </div>
                    <div class="dropdown-item form-check form-check-inline mr-0">
                      <input v-model="checkboxProducts.bestSellerToko" class="form-check-input" id="checkBoxBestSellerToko" type="checkbox" value="" />
                      <label class="form-check-label mb-0" for="checkBoxBestSellerToko">Best Seller Toko</label>
                    </div>
                    <div class="dropdown-item form-check form-check-inline mr-0">
                      <input v-model="checkboxProducts.topThisMonth" class="form-check-input" id="checkBoxTopThisMonth" type="checkbox" value="" />
                      <label class="form-check-label mb-0" for="checkBoxTopThisMonth">Top This Month</label>
                    </div>
        
                    <div class="dropdown-item form-check form-check-inline mr-0">
                      <input v-model="checkboxProducts.promo" class="form-check-input" id="checkBoxPromo" type="checkbox" value="" />
                      <label class="form-check-label mb-0" for="checkBoxPromo">Promo</label>
                    </div>
                    <div class="dropdown-item form-check form-check-inline mr-0">
                      <input v-model="checkboxProducts.flushOut" class="form-check-input" id="checkBoxFlushOut" type="checkbox" value="" />
                      <label class="form-check-label mb-0" for="checkBoxFlushOut">Flush Out</label>
                    </div>
                    <div v-if="isCheckBoxKaryawan && memberOverview != null && memberOverview.tipe_konsumen.slug == master_code.tipeKonsumen.karyawan" class="dropdown-item form-check form-check-inline mr-0">
                      <input v-model="checkboxProducts.promoKaryawan" class="form-check-input" id="checkBoxPromoKaryawan" type="checkbox" value="" />
                      <label class="form-check-label mb-0" for="checkBoxPromoKaryawan">Promo Karyawan</label>
                    </div>
                    <!-- <div v-if="isCheckBoxPromo" class="dropdown-item form-check form-check-inline mr-0">
                      <input v-model="checkboxProducts.promo" class="form-check-input" id="checkBoxPromo" type="checkbox" value="" />
                      <label class="form-check-label mb-0" for="checkBoxPromo">Promo</label>
                    </div>
                    <div v-if="isCheckBoxFlushOut" class="dropdown-item form-check form-check-inline mr-0">
                      <input v-model="checkboxProducts.flushOut" class="form-check-input" id="checkBoxFlushOut" type="checkbox" value="" />
                      <label class="form-check-label mb-0" for="checkBoxFlushOut">Flush Out</label>
                    </div>
                    <div v-if="isCheckBoxKaryawan && memberOverview != null && memberOverview.tipe_konsumen.slug == master_code.tipeKonsumen.karyawan" class="dropdown-item form-check form-check-inline mr-0">
                      <input v-model="checkboxProducts.promoKaryawan" class="form-check-input" id="checkBoxPromoKaryawan" type="checkbox" value="" />
                      <label class="form-check-label mb-0" for="checkBoxPromoKaryawan">Promo Karyawan</label>
                    </div> -->
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <v-select 
                  v-model="selectedFilterBrand" 
                  :options="filteredOptionsInfoProduct(this.master_code.productOptInfo.brand_code)"
                  label="optDtlName"
                  value="optDtlCode"
                  placeholder="Pilih brand"
                />
                <!-- <select v-model="selectedFilterBrand" class="form-select">
                  <option value="">Pilih Brand</option>
                  <option v-for="brand in dataMasterOptionInfo" :id="brand.optDtlCode" :value="brand.optDtlCode">{{ brand.optDtlName }}</option>
                </select> -->
              </div>
              <div class="col-md-3">
                <form @submit.prevent="btnSearchSubmitProduct()">
                  <div class="input-group">
                    <input v-model="inputSearchProduct" class="form-control search-input fuzzy-search" type="search" placeholder="Search...">
                    <button class="btn btn-primary card-link" type="submit" style="z-index: 1"><span class="fas fa-search"></span></button>
                  </div>
                </form>
              </div>
              <div class="col-md-4 d-flex justify-content-end">
                <button class="btn btn-secondary btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#modalFindProductFree">
                  Free
                </button>
                <button class="btn btn-info btn-sm ms-2" type="button" data-bs-toggle="modal" data-bs-target="#modalSelectProductForTicket">
                  <span class="fas fa-ticket-alt"></span>
                  <span class="ms-2 me-1">Ticket</span>
                  <span v-if="listDataProductForCreateTicket.length > 0" class="badge rounded-pill bg-danger py-1">{{ listDataProductForCreateTicket.length }}</span>
                </button>
                <button class="btn btn-outline-warning btn-sm ms-2" type="button" @click="fatchAllDataProduct()">
                  Semua <span class="fas fa-cloud-download-alt"></span>
                </button>
              </div>
            </div>
          </div>
          
          <div class="row mx-0">
            <div v-if="$root.selectedStoreAccess" class="mb-1 col-6 col-md-2 col-sm-6 p-1" v-for="product in filteredProducts" :key="product.itemCode">
              <div class="border rounded-1 h-100 d-flex flex-column justify-content-between">
                <div class="overflow-hidden">
                  <div class="position-relative rounded-top overflow-hidden cursor-pointer" @click="validateModalBatchProduct(product)">
                    <div class="d-block text-center">
                      <div v-if="product.promo_product_id">
                        <img v-if="product.for_product.imageUrl != null && product.for_product.imageUrl.trim() != ''" class="img-fluid rounded-top" :src="product.for_product.imageUrl" style="width: 100%; height: 140px;" alt="">
                        <img v-else class="img-fluid rounded-top" src="@/assets/img/product/no_image.jpg" style="width: 100%; height: 140px;" alt="">
                      </div>
                      <div v-else>
                        <img v-if="product.imageUrl != null && product.imageUrl.trim() != ''" class="img-fluid rounded-top" :src="product.imageUrl" style="width: 100%; height: 140px;" alt="">
                        <img v-else class="img-fluid rounded-top" src="@/assets/img/product/no_image.jpg" style="width: 100%; height: 140px;" alt="">
                      </div>
                      <div class=" position-absolute mt-1 me-2 z-2 top-0 end-0">
                        <div v-if="product.promo_product_id">
                          <span class="badge rounded-pill p-1 fs--3 me-1" :class="'bg-' + product.master_promo_product.master_kode_promo_product.badge">
                            {{ product.master_promo_product.master_kode_promo_product.nama_promo }}
                          </span>
                          <span v-if="product.master_promo_product.tipe_promo == master_coll.tipePromo.bundle" class="badge bg-warning rounded-pill p-1 fs--3">
                            {{ product.master_promo_product.buy_item }} Get {{ product.master_promo_product.get_item }}
                          </span>
                          <span v-if="product.master_promo_product.tipe_promo == master_coll.tipePromo.percent" class="badge bg-danger rounded-pill p-1 fs--3"> -{{ product.master_promo_product.percent }}% </span>
                        </div>
                        <div v-else>
                          <span v-if="$root.filterDiskonProduct(product).discCode != master_code.diskon.tanpa_diskon_code" class="badge bg-danger rounded-pill p-1 fs--3"> -{{ $root.filterDiskonProduct(product).discount }}% </span>
                        </div>
                      </div>
                      <span class="badge badge-subtle-secondary position-absolute mb-1 ms-2 z-2 px-1 bottom-0 start-0 fs--2 fw-bold" style="font-weight: normal;">{{ product.promo_product_id ? product.for_product.itemCode : product.itemCode }}</span>
                      <span class="badge badge-subtle-success position-absolute mb-1 me-2 z-2 px-1 bottom-0 end-0 fs--2" style="font-weight: normal;">{{ product.promo_product_id ? product.for_product.all_inventory_stok[0].onHand : $root.filterStokProduct(product).onHand }}</span>
                    </div>
                  </div>
                  <div class="p-2 pb-1 text-center">
                    <button v-on:click="productShowDetail = product" class="btn btn-sm p-0 ps-1" data-bs-toggle="offcanvas" data-bs-target="#canvasShowDetailProduct" aria-controls="canvasShowDetailProduct">
                      <h5 class="fs-0 mb-0">
                        <div class="text-1100">
                          <span class="d-inline-block text-truncate max-width-text-truncate">
                            {{ product.promo_product_id ? product.for_product.itemName : product.itemName }}
                          </span>
                        </div>
                      </h5>
                    </button>
                    <div v-if="product.promo_product_id">
                      <strong class="fs-0 text-warning mb-0 text-center"> Rp {{ $root.formatPrice(product.for_product.all_product_price[0].price - (product.for_product.all_product_price[0].price * (product.master_promo_product.percent/100))) }}
                        <del v-if="product.master_promo_product.tipe_promo == master_coll.tipePromo.percent" class="text-secondary fs-0">
                          {{ $root.formatPrice(product.for_product.all_product_price[0].price) }}
                        </del>
                      </strong>
                    </div>
                    <div v-else>
                      <div v-if="$root.filterDiskonProduct(product).discCode == master_code.diskon.tanpa_diskon_code">
                        <strong class="fs-0 text-warning mb-0 text-center"> Rp {{ $root.formatPrice($root.filterPriceProduct(product).price) }}
                        </strong>
                      </div>
                      <div v-else>
                        <strong class="fs-0 text-warning mb-0 text-center"> Rp {{ $root.formatPrice($root.filterPriceProduct(product).price - ($root.filterPriceProduct(product).price * ($root.filterDiskonProduct(product).discount/100))) }}
                          <del class="text-secondary fs-0">{{ $root.formatPrice($root.filterPriceProduct(product).price) }}</del>
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- data-bs-toggle="offcanvas" data-bs-target="#filterOffcanvas" aria-controls="filterOffcanvas" -->
        <div class="col-xl-3">
          <aside class="scrollbar-overlay font-sans-serif p-4 p-xl-3 ps-xl-0 offcanvas offcanvas-start offcanvas-filter-sidebar top-0" tabindex="-1" id="filterOffcanvas" aria-labelledby="filterOffcanvasLabel" data-simplebar="init">
            <div class="simplebar-wrapper" style="margin: -16px -16px -16px 0px;">
              <div class="simplebar-height-auto-observer-wrapper">
                <div class="simplebar-height-auto-observer"></div>
              </div>
              <div class="simplebar-mask">
                <div class="simplebar-offset" style="right: 0px; bottom: 0px;">
                  <div class="simplebar-content-wrapper" tabindex="0" role="region" aria-label="scrollable content" style="height: 100%; overflow: hidden scroll;">
                    <div class="simplebar-content p-3 p-xl-0">
                      <h5 class="card-title text-center mb-1 fs-0">Member Overview</h5>
                      
                      <div class="text-center mb-2">
                        <button @click="openModalFindOrRegis()" class="btn btn-outline-primary btn-sm me-1" type="button">
                          Find Member
                          <span class="fas fa-search"></span>
                        </button>
                        <button @click="memberOverview = null; switchBoxSendEamil = false" class="btn btn-outline-secondary btn-sm me-1" type="button">
                          <span class="fas fa-redo-alt"></span>
                        </button>
                      </div>

                      <div class="card mb-3" :class="{'border-red' : invalidMemberSelect}">
                        <div class="bg-holder bg-card" style="background-image:url('assets/img/illustration/corner-4.png'); background-size: cover;"></div>
                        <div class="card-body position-relative p-2">
                          <div class="d-flex justify-content-between mb-0">
                            <p class="mb-0 fs--1">No.Member</p>
                            <span class="text-dark">{{ memberOverview ? memberOverview.member_id : "-" }}</span>
                          </div>
                          <div class="d-flex justify-content-between mb-0">
                            <p class="mb-0 fs--1">Nama</p>
                            <span class="text-dark">{{ memberOverview ? memberOverview.nama : "-" }}</span>
                          </div>
                          <div class="d-flex justify-content-between mb-0">
                            <p class="mb-0 fs--1">No Hp</p>
                            <span class="text-dark">
                              {{ memberOverview ? $root.formatPhoneNumber(memberOverview.no_hp) : "-" }}
                              <button v-if="memberOverview" v-on:click="$root.copyTextClipboard(memberOverview.no_hp, 'Nomor handphone')" class="btn btn-sm p-0 ps-1" style="border: none;">
                                <span class="fas fa-copy"></span>
                              </button>
                            </span>
                          </div>
                          <div class="d-flex justify-content-between mb-0">
                            <p class="mb-0 fs--1">Point</p>
                            <span class="text-dark">{{ memberOverview ? $root.formatPrice(memberOverview.point) : "-" }}</span>
                          </div>
                          <div class="d-flex justify-content-between mb-0">
                            <p class="mb-0 fs--1">Tipe Member</p>
                            <span v-if="memberOverview" class="badge rounded-pill" :class="memberOverview.tipe_konsumen.slug == master_code.tipeKonsumen.member ? 'badge-subtle-success' : memberOverview.tipe_konsumen.slug == master_code.tipeKonsumen.reseller ? 'badge-subtle-primary' : memberOverview.tipe_konsumen.slug == master_code.tipeKonsumen.karyawan ? 'badge-subtle-warning' : ''">
                              {{ memberOverview.tipe_konsumen.nama_tipe }}
                            </span>
                            <span class="text-dark" v-else>-</span>
                          </div>
                        </div>
                      </div>
                      
                      <h5 class="card-title text-center mb-1 fs-0">Billing Detail</h5>
                      <div class="input-group mb-3">
                        <input class="form-control" type="text" placeholder="Voucher code">
                        <button class="btn btn-primary card-link">Rp</button>
                      </div>
                      <hr class="m-0">
                      <table class="table fs-0 mb-1">
                        <tbody>
                          <tr class="border-bottom">
                            <th class="ps-0 py-1" style="font-weight: normal;">Subtotal</th>
                            <th class="pe-0 py-1 text-end text-dark">Rp {{ $root.formatPrice(subTotalPrice) }}</th>
                          </tr>
                          <tr class="border-bottom">
                            <th class="ps-0 py-1" style="font-weight: normal;">Diskon Voucher </th>
                            <th class="pe-0 py-1 text-end text-dark">
                              <span v-if="diskonPrice > 0">-Rp {{ $root.formatPrice(diskonPrice) }}</span>
                              <span v-else>-</span>
                            </th>
                          </tr>
                          <tr class="border-bottom">
                            <th class="ps-0 py-1" style="font-weight: normal;">Total </th>
                            <th class="pe-0 py-1 text-end text-warning">Rp {{ $root.formatPrice(totalBayarPrice) }}</th>
                          </tr>
                        </tbody>
                      </table>
                      
                      <div class="mb-3">
                        <div>
                          <label class="form-label mb-0 fs--1" for="selectSalesBy">Sales By:</label>
                          <select v-model="selectSalesBy" @change="selectMethodPayment = ''" class="form-select mb-0" id="selectSalesBy">
                            <option v-for="sales in dataAllMasterSalesBy" :value="sales.slug">{{ sales.nama_sales }}</option>
                          </select>
                        </div>
                        <div>
                          <label class="form-label mb-0 fs--1" for="selectMethodPayment">Metode Pembayaran:</label>
                          <select v-model="selectMethodPayment" class="form-select mb-0" :class="{'border-red' : invalidMetodePembayaran}" v-on:change="onChangeSelectedMetodeBayar" id="selectMethodPayment">
                            <option value="">Pilih Metode Bayar</option>
                            <option v-if="selectSalesBy == master_code.salesBy.wi" :value="metodeBayarCash.id">{{ metodeBayarCash.nama }}</option>
                            <option v-if="memberOverview != null && memberOverview.tipe_konsumen.slug == master_code.tipeKonsumen.karyawan" :value="metodeBayarKaryawan.id">
                              {{ metodeBayarKaryawan.nama }}
                            </option>
                            <option v-if="memberOverview != null" :value="metodeBayarRedeemPoint.id">{{ metodeBayarRedeemPoint.nama }}</option>
                            <optgroup label="Transfer Bank">
                              <option v-for="metode in dataMetodeBayarTF" :value="metode.id">{{ metode.nama }}</option>
                            </optgroup>
                            <optgroup v-if="selectSalesBy != master_code.salesBy.selly" label="E-Wallet">
                              <option v-for="metode in dataMetodeBayarEWal" :value="metode.id">{{ metode.nama }}</option>
                            </optgroup>
                            <optgroup v-if="selectSalesBy != master_code.salesBy.selly" label="Kartu Kredit">
                              <option v-for="metode in dataMetodeBayarCC" :value="metode.id">{{ metode.nama }}</option>
                            </optgroup>
                          </select>
                        </div>
                        <div>
                          <label class="form-label mb-0 fs--1" for="keterangan_detail">Keterangan:</label>
                          <input v-model="keteranganTransaksi" class="form-control" id="keterangan_detail" placeholder="Keterangan jika ada" />
                        </div>
                      </div>

                      <div v-if="$root.deviceInfoAccess != null && $root.deviceInfoAccess.isActive == true">
                        <div class="d-grid gap-2">
                          <button class="btn btn-success" type="submit" @click="checkConfirmationPayment()">Confirm &amp; Pay</button>
                        </div>
                        <hr class="mb-2 mt-2">
                      </div>
                      <div class="d-grid gap-2">
                        <button class="btn btn-info" type="button" data-bs-toggle="modal" data-bs-target="#modalSelectProductForTicket">
                          <span class="fas fa-ticket-alt"></span>
                          <span class="ms-2 me-1">Buatkan Tiket</span>
                          <span v-if="listDataProductForCreateTicket.length > 0" class="badge rounded-pill bg-danger py-1">{{ listDataProductForCreateTicket.length }}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="simplebar-placeholder" style="width: auto; height: 1045px;"></div>
            </div>
            <div class="simplebar-track simplebar-horizontal" style="visibility: hidden;">
              <div class="simplebar-scrollbar" style="width: 0px; display: none;"></div>
            </div>
            <div class="simplebar-track simplebar-vertical" style="visibility: visible;">
              <div class="simplebar-scrollbar" style="height: 525px; transform: translate3d(0px, 0px, 0px); display: block;"></div>
            </div>
          </aside>
        </div>
      </div>

      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button v-if="$root.deviceInfoAccess != null && $root.deviceInfoAccess.isActive == true" class="mb-2" color="secondary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasListOrderProduct" aria-controls="offcanvasListOrderProduct">
          <span class="fas fa-shopping-cart"></span>
          <span class="badge rounded-pill bg-danger px-1 fs--1">
            {{ dataProductInList.length > 0 ? dataProductInList.length : '0' }}
          </span>
        </ion-fab-button>
        <!-- <ion-fab-button @click="clickScrollToChecout()">
          <span class="fas fa-donate fs-1"></span>
        </ion-fab-button> -->
      </ion-fab>

      
      <div class="modal fade" id="modalFindMember" tabindex="-1" aria-hidden="true" data-bs-keyboard="false" data-bs-backdrop="static">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document" :style="!memberFindOrRegis ? 'max-width: 450px' : 'max-width: 850px'">
          <div class="modal-content position-relative border-0">
            <div class="modal-body p-0">
              <div class="card">
                <div class="bg-holder bg-card" style="background-image:url('assets/img/illustration/corner-5i.png'); background-position: left; background-size: cover;"></div>
                <div class="card-body position-relative p-0">
                  <div class="position-absolute top-0 end-0 mt-3 me-3 z-1">
                    <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="card-header rounded-top-3 py-3 ps-3 pe-6">
                    <h5 class="mb-0" id="modalFindMemberLabel">{{ memberFindOrRegis ? "Temukan" : "Daftarkan" }} Member</h5>
                    <button v-on:click="this.memberFindOrRegis = !this.memberFindOrRegis" class="btn btn-outline-primary btn-sm me-1 mb-1" type="button">
                      <p class="fs--2 mb-0">{{ memberFindOrRegis ? "Daftarkan member" : "Temukan member" }}</p>
                    </button>
                  </div>
                  <div class="px-4 pt-0">
                    <div v-if="memberFindOrRegis">
                      <div class="row align-items-center">
                        <div class="col-md-8">
                          <h5 class="mb-2 fs-0"><u>Daftar Member:</u></h5>
                        </div>
                        <div class="col-md-4">
                          <input v-model="inputSearchMember" class="form-control search-input fuzzy-search mb-3" type="search" placeholder="Search..." aria-label="Search">
                        </div>
                      </div>
                      <hr class="p-0 m-0">

                      <div class="row d-block d-md-none p-0 mb-3">
                        <div class="scrollable-customize" style="min-height: 1vh; max-height: 55vh;">
                          <div v-for="member in filteredMembers" class="col-12 col-md-3 col-lg-3 mb-3">
                            <div class="card" @click="selectMemberOverview(member)">
                              <div class="bg-holder bg-card" style="background-image:url('assets/img/illustration/pro-member-bg.png');"></div>
                              <div class="card-header d-flex justify-content-between">
                                <div>
                                  <h5 class="m-0">{{ member.nama }}</h5>
                                  <p class="m-0 fs--1">{{ member.no_hp }}</p>
                                  <p class="m-0 fs--1">{{ member.email }}</p>
                                </div>
                                <div>
                                  <span class="fs--1">
                                    {{ $root.formatDate(member.tanggal_lahir) }}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="d-none d-md-block table-scrollable-wrapper" style="min-height: 3vh; max-height: 30vh;">
                        <table class="table table-scrollable table-sm table-hover">
                          <thead>
                            <tr>
                              <!-- <th class="bg-white">Tipe</th> -->
                              <th class="bg-white">Name</th>
                              <th class="bg-white">Email</th>
                              <th class="bg-white">Phone</th>
                              <th class="bg-white">Tanggal Lahir</th>
                              <th class="bg-white text-end">Aksi</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-if="filteredMembers.length == 0">
                              <td class="text-center py-3" colspan="5">
                                <h5 class="fs-0"><i>Data member tidak ditemukan</i></h5>
                              </td>
                            </tr>
                            <tr v-for="member in filteredMembers" :id="member.member_id" class="align-middle">
                              <!-- <td class="text-nowrap" v-on:click="selectMemberOverview(member)" style="cursor: pointer;">
                                <span class="badge rounded-pill" :class="member.tipe_konsumen.slug == master_code.tipeKonsumen.member ? 'badge-subtle-success' : member.tipe_konsumen.slug == master_code.tipeKonsumen.reseller ? 'badge-subtle-warning' : member.tipe_konsumen.slug == master_code.tipeKonsumen.karyawan ? 'badge-subtle-primary' : ''">
                                  {{ member.tipe_konsumen.nama_tipe }}
                                </span>
                              </td> -->
                              <td class="text-nowrap" v-on:click="selectMemberOverview(member)" style="cursor: pointer;">{{ member.nama }}</td>
                              <td class="text-nowrap" v-on:click="selectMemberOverview(member)" style="cursor: pointer;">{{ member.email }}</td>
                              <td class="text-nowrap" v-on:click="selectMemberOverview(member)" style="cursor: pointer;">{{ member.no_hp }}</td>
                              <td class="text-nowrap" v-on:click="selectMemberOverview(member)" style="cursor: pointer;">{{ $root.formatDate(member.tanggal_lahir) }}</td>
                              <td class="text-end">
                                <button class="btn btn-link p-0" type="button" v-on:click="selectEditMemberForm(member)">
                                  <span class="fas fa-edit text-warning"></span>
                                </button>
                                <!-- <button class="btn btn-link p-0 ms-2" type="button">
                                  <span class="fas fa-trash-alt text-danger"></span>
                                </button> -->
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      <div v-if="totalPageMember > 1" class="d-flex justify-content-end mt-2">
                        <nav aria-label="Page navigation example">
                          <ul class="pagination pagination-sm">
                            <li class="page-item" :class="{ 'disabled': currentPageMember === 1 }">
                              <a class="page-link" href="javascript:void(0)" aria-label="Previous" @click="fatchDataMember(currentPageMember - 1)">
                                <span aria-hidden="true">&laquo;</span>
                              </a>
                            </li>

                            <li v-for="pageNumber in totalPageMember" :key="pageNumber" class="page-item"  :class="{ 'active': pageNumber === currentPageMember }">
                              <a class="page-link" href="javascript:void(0)" @click="fatchDataMember(pageNumber)">{{ pageNumber }}</a>
                            </li>

                            <li class="page-item" :class="{ 'disabled': currentPageMember === totalPageMember }">
                              <a class="page-link" href="javascript:void(0)" aria-label="Next" @click="fatchDataMember(currentPageMember + 1)">
                                <span aria-hidden="true">&raquo;</span>
                              </a>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                    <div v-else>
                      <form @submit.prevent="storeNewMember">
                        <div class="mb-1">
                          <label class="form-label mb-0" for="nama_member">Name<span class="text-danger">*</span></label>
                          <input v-model="dataInputMember.nama" class="form-control bg-transparent" id="nama_member" type="text" placeholder="Masukkan nama lengkap" required>
                        </div>
                        <div class="mb-1">
                          <label class="form-label mb-0" for="no_hp_member">No Hp<span class="text-danger">*</span></label>
                          <input v-model="dataInputMember.no_hp" class="form-control bg-transparent" id="no_hp_member" type="text" placeholder="Masukkan nomor handpone" required>
                        </div>
                        <div class="mb-1">
                          <label class="form-label mb-0" for="email_member">Email address<span class="text-danger">*</span></label>
                          <input v-model="dataInputMember.email" class="form-control bg-transparent" id="email_member" type="email" placeholder="email@example.com" required>
                        </div>
                        <div class="mb-1">
                          <label class="form-label mb-0" for="select_jk_member">Jenis Kelamin</label>
                          <select v-model="dataInputMember.jenis_kelamin" class="form-select bg-transparent" id="select_jk_member">
                            <option value="">Pilih jenis kelamin</option>
                            <option value="male">Laki-laki</option>
                            <option value="female">Perempuan</option>
                            <option value="other">Lainnya</option>
                          </select>
                        </div>
                        <div class="mb-3">
                          <label class="form-label mb-0" for="tanggal_lahir">Tanggal Lahir</label>
                          <input v-model="dataInputMember.tanggal_lahir" class="form-control bg-transparent" id="tanggal_lahir" type="date">
                        </div>
                        <div class="mb-3 text-end">
                          <button class="btn btn-primary btn-sm" type="submit">Submit</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal fade" id="modalEditMember" tabindex="-1" aria-hidden="true" data-bs-keyboard="false" data-bs-backdrop="static">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content position-relative border-0">
            <div class="modal-body p-0">
              <div class="card">
                <div class="bg-holder bg-card" style="background-image:url('assets/img/illustration/corner-5i.png'); background-position: left; background-size: auto;"></div>
                <div class="card-body position-relative p-0">
                  <div class="position-absolute top-0 end-0 mt-3 me-3 z-1">
                    <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="card-header rounded-top-3 py-3 ps-3 pe-6">
                    <h5 class="mb-0" id="modalFindMemberLabel">Edit Member</h5>
                    <button class="btn btn-outline-primary btn-sm me-1 mb-1" type="button" v-on:click="openModalFindOrRegis()">
                      <p class="fs--2 mb-0">Temukan member</p>
                    </button>
                  </div>
                  <div class="p-4 pt-0">
                    <form @submit.prevent="updateEditDataMember">
                      <div class="mb-1">
                        <label class="form-label mb-0" for="edit_nama_member">Name <span class="text-danger">*</span></label>
                        <input v-model="dataInputMember.nama" class="form-control bg-transparent" id="edit_nama_member" type="text" placeholder="Masukkan nama lengkap">
                      </div>
                      <div class="mb-1">
                        <label class="form-label mb-0" for="edit_no_hp_member">No Hp <span class="text-danger">*</span></label>
                        <input v-model="dataInputMember.no_hp" class="form-control bg-transparent" id="edit_no_hp_member" type="text" placeholder="Masukkan nomor handpone">
                      </div>
                      <div class="mb-1">
                        <label class="form-label mb-0" for="edit_email_member">Email address <span class="text-danger">*</span></label>
                        <input v-model="dataInputMember.email" class="form-control bg-transparent" id="edit_email_member" type="email" placeholder="email@example.com">
                      </div>
                      <div class="mb-1">
                        <label class="form-label mb-0" for="edit_select_jk_member">Jenis Kelamin</label>
                        <select v-model="dataInputMember.jenis_kelamin" class="form-select bg-transparent" id="edit_select_jk_member">
                          <option value="">Pilih jenis kelamin</option>
                          <option value="male">Laki-laki</option>
                          <option value="female">Perempuan</option>
                          <option value="other">Lainnya</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label class="form-label mb-0" for="edit_tanggal_lahir">Tanggal Lahir</label>
                        <input v-model="dataInputMember.tanggal_lahir" class="form-control bg-transparent" id="edit_tanggal_lahir" type="date">
                      </div>
                      <div class="text-end">
                        <button class="btn btn-primary btn-sm" type="submit">Simpan</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal rincian dan detail pesanan -->
      <div class="modal fade" id="modalConfirmPay" ref="modalConfirmPay" data-bs-keyboard="false" data-bs-backdrop="static" tabindex="-1" aria-labelledby="modalConfirmPayLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 500px">
          <div class="modal-content border-0">
            <div class="modal-body p-0">
              <div class="card">
                <div class="bg-holder bg-card" style="background-image:url('assets/img/illustration/corner-1-left.png'); background-position: left; background-size: cover;"></div>
                <div class="card-body position-relative p-0">
                  <div class="rounded-top-3 py-3 text-center">
                    <img src="@/assets/img/mtsiconland.png" width="200" alt="" />
                  </div>
                  <div class="p-3 py-0">
                    <hr class="p-0 m-0 mb-2">
                    <div class="d-flex justify-content-between fs--1 mb-0">
                      <p class="fs--1 m-0">
                        BSC: {{ this.$root.dataAuthToken ? this.$root.dataAuthToken.nama_lengkap : '' }}
                      </p>
                      <span class="fs--1">{{ formattedDateNow }}</span>
                    </div>
                    <div class="d-flex justify-content-between fs--1 mb-2">
                      <p class="fs--1 m-0">
                        Member: {{ memberOverview ? memberOverview.nama : '' }}
                        {{ memberOverview ? `(${$root.formatPrice(memberOverview.point)} Point)` : '-' }}
                      </p>
                      <span class="fs--1">{{ formattedTimeNow }}</span>
                    </div>
        
                    <div class="mb-3">
                      <label class="form-label mb-0">Ringkasan Produk:</label>
                      <hr class="m-0">
                      <div class="scrollable-customize" style="max-height: 150px;">
                        <div v-for="data in dataProductListForStruk" :id="data.product.itemCode" class="d-flex justify-content-between fs--1 mb-1">
                          <p class="mb-0 text-dark me-4"><strong>{{ data.qty }} x </strong>{{ data.product.itemName }}</p>
                          <span class="text-dark">
                            <strong v-if="data.is_free_product">FREE</strong>
                            <strong v-else>{{ $root.formatPrice(data.qty * data.product.all_product_price[0].price) }}</strong>
                          </span>
                        </div>
                      </div>
                      <hr class="mb-1 mt-0">
                      <div class="d-flex justify-content-between fs--1 mb-0">
                        <p class="mb-0 text-dark"><strong>Total</strong></p>
                        <span class="text-dark"><strong>Rp {{ $root.formatPrice(totalPriceRingkasanProduct) }}</strong></span>
                      </div>
                      <hr class="m-0 mt-1">
                    </div>
        
                    <label class="form-label mb-0">Billing Detail:</label>
                    <!-- <div class="form-check form-switch mb-1 mt-1">
                      <input v-model="checkboxMemberPotonganPoint" @change="changeCheckboxMemberPotonganPoint()" class="form-check-input" id="flexSwitchCheckDefault" type="checkbox" />
                      <label class="form-check-label mb-0" for="flexSwitchCheckDefault">
                        Gunakan Potongan Point ({{ memberOverview ? $root.formatPrice(memberOverview.point) : '' }} pt)
                      </label>
                    </div>
                    <hr class="m-0"> -->
                    
                    <table class="table fs--1 mb-2">
                      <tbody>
                        <tr v-if="totalHematDiskon > 0" class="border-bottom">
                          <th class="ps-0 py-1" style="font-weight: normal;">Hemat Diskon </th>
                          <th class="pe-0 py-1 text-end text-dark">-Rp {{ $root.formatPrice(totalHematDiskon) }}</th>
                        </tr>
                        <tr class="border-bottom">
                          <th class="ps-0 py-1" style="font-weight: normal;">Total Belanja </th>
                          <th class="pe-0 py-1 text-end text-dark">Rp {{ $root.formatPrice(totalBayarPrice) }}</th>
                        </tr>
                        <tr v-if="getCheckGelarPembelian" class="border-bottom">
                          <th class="ps-0 py-1" style="font-weight: normal;">
                            Reseller (Extra Diskon) 
                            <span v-if="getCheckGelarPembelian.slug == master_code.gelarBeli.silver" class="badge badge-subtle-danger px-1 fs--2">
                              {{ getCheckGelarPembelian.amount }}%
                            </span>
                            <img class="py-0" src="@/assets/img/illustration/rewords-payment.png" alt="invoice" width="20">
                          </th>
                          <th class="pe-0 py-1 text-end text-dark">
                            <span v-if="getCheckGelarPembelian.slug == master_code.gelarBeli.silver">
                              -Rp {{ $root.formatPrice(totalDiskonPercentReseller) }}
                            </span>
                            <span v-else-if="getCheckGelarPembelian.slug == master_code.gelarBeli.gold" class="badge badge-subtle-warning px-1 fs--2">
                              Buy {{ getCheckGelarPembelian.amount }} Get 1
                            </span>
                          </th>
                        </tr>
                        <!-- <tr class="border-bottom">
                          <th class="ps-0 py-1" style="font-weight: normal;">Diskon Voucher </th>
                          <th class="pe-0 py-1 text-end text-dark">-Rp 5.000</th>
                        </tr> -->
                        <tr v-if="selectedActivePromo != null" class="border-bottom">
                          <th class="ps-0 py-1" style="font-weight: normal;">
                            {{ selectedActivePromo.nama_promo.toUpperCase() }}
                            ({{ selectedActivePromo.percent }}%)
                          </th>
                          <th class="pe-0 py-1 text-end text-dark">-Rp {{ $root.formatPrice(totalDiscountPromo) }}</th>
                        </tr>
                        <tr v-if="selectedActivePromo != null && selectedActivePromo.percent_after_dic != null && selectedActivePromo.percent_after_dic > 0" class="border-bottom">
                          <th class="ps-0 py-1" style="font-weight: normal;">
                            After Diskon
                            ({{ selectedActivePromo.percent_after_dic }}%)
                          </th>
                          <th class="pe-0 py-1 text-end text-dark">-Rp {{ $root.formatPrice(afterDiscountPromo) }}</th>
                        </tr>
                        <tr v-if="selectedActivePromo != null && selectedActivePromo.percent_additional != null && selectedActivePromo.percent_additional > 0" class="border-bottom">
                          <th class="ps-0 py-1" style="font-weight: normal;">
                            Diskon Additional
                            ({{ selectedActivePromo.percent_additional }}%)
                          </th>
                          <th class="pe-0 py-1 text-end text-dark">-Rp {{ $root.formatPrice(discountPromoAdditional) }}</th>
                        </tr>
                        <tr class="border-bottom">
                          <th class="ps-0 py-1" style="font-weight: normal;">Total Bayar </th>
                          <th class="pe-0 fs-0 py-0 text-end text-warning">Rp {{ $root.formatPrice(calculateTotalBayarPrice) }}</th>
                        </tr>
                      </tbody>
                    </table>
        
                    <!-- Logic add metode pembayaran -->
                    <!-- <div class="d-flex align-items-center justify-content-between mb-1">
                      <label class="form-label mb-0">Metode Pembayaran: </label>
                      <div class="btn-group" role="group">
                        <button v-if="validasiMetodePembayaran.length > 0" class="btn btn-sm p-0 ms-2 text-primary dropdown-toggle" id="btnGroupTambahMetode" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Tambah Metode
                        </button>
                        <button v-else class="btn btn-sm p-0 ms-2 text-primary" type="button" disabled>
                          Tambah Metode <span class="fas fa-caret-down"></span>
                        </button>
                        <div class="dropdown-menu py-0" aria-labelledby="btnGroupTambahMetode">
                          <a v-for="metode in validasiMetodePembayaran" class="dropdown-item" v-on:click="addMoreMetodeBayar(metode)" href="javascript:void(0)">{{ metode.nama }}</a>
                        </div>
                      </div>
                    </div> -->
                    <label class="form-label mb-0">Payment Detail:</label>
                    <div v-if="selectedMetodeBayar != null" class="d-flex align-items-center justify-content-between rounded-3 bg-body-tertiary ps-2 py-1 px-2">
                      <div class="w-35">
                        <img class="img-icon-po2" :src="'assets/img/po-img/' + selectedMetodeBayar.image" />
                      </div>
                      <div v-if="selectedMetodeBayar.kode == master_code.metodeBayar.redeem" class="w-60 text-end">
                        <label class="form-label fw-normal mb-0">Member Point: <strong class="text-dark">Rp {{ $root.formatPrice(memberOverview.point) }}</strong></label>
                      </div>
                      <div v-else class="w-60 d-flex">
                        <div class="w-50 me-2 text-end">
                          <input v-if="selectedMetodeBayar.kode != master_code.metodeBayar.cash && selectedMetodeBayar.kode != master_code.metodeBayar.karyawan" v-model="modelInputSelectedMetodeBayar" id="inputSelectedMetodeBayar" @input="modelInputSelectedMetodeBayar = onChangeCheckNumberVal($event)" class="form-control form-control-sm" type="text" placeholder="4 digit nomor" />
                          <i v-if="selectedMetodeBayar.kode == master_code.metodeBayar.cash" class="fs--1">Pembayaran Cash</i>
                          <i v-if="selectedMetodeBayar.kode == master_code.metodeBayar.karyawan" class="fs--1">Karyawan</i>
                        </div>
                        <div class="w-50">
                          <input class="form-control form-control-sm text-end" id="inputSelectedNominalMetode" @input="onChangeCheckVal($event)" type="text" :value="$root.formatPrice(calculateTotalBayarPrice)" disabled />
                        </div>
                      </div>
                    </div>
                    
                    <!-- Logic add metode pembayaran -->
                    <!-- <div v-for="(metode, index) in dataMoreMetodeBayar" :key="index" class="d-flex align-items-center justify-content-between rounded-3 bg-body-tertiary ps-2 py-1 mt-1">
                      <div class="w-35 d-flex align-items-center">
                        <a href="javascript:void(0)" class="text-secondary me-1" v-on:click="removeMoreMetodeBayar(metode, index)">
                          <span class="fas fa-window-close fs--1"></span>
                        </a>
                        <img class="img-icon-po1" :src="'assets/img/po-img/' + metode.image" />
                      </div>
                      <div class="w-40 me-2 text-end">
                        <input v-if="metode.kode != 'cash' && metode.kode != 'karyawan'" v-model="modelInputMoreMetodeBayar[index]" class="form-control form-control-sm" :id="'inputMoreMetodeBayar_' + index" @input="modelInputMoreMetodeBayar[index] = onChangeCheckNumberVal($event)" type="text" :placeholder="metode.kode == 'ewal' ? 'Nomor telepon' : '4 digit nomor' " />
                        <i v-if="metode.kode == 'cash'" class="fs--1">Pembayaran Cash</i>
                        <i v-if="metode.kode == 'karyawan'" class="fs--1">Karyawan</i>
                      </div>
                      <div class="w-25">
                        <input v-model="nominalMoreMetodeBayar[index]" @input="nominalMoreMetodeBayar[index] = formatCalculatePriceMoreMetode($event, index)" :id="'inputNominalMoreMetodeBayar_' + index" class="form-control form-control-sm text-end" type="text" placeholder="Nominal"/>
                      </div>
                    </div> -->

                    <!-- <div class="d-flex align-items-center justify-content-between mb-2">
                      <label class="form-label mb-0">Metode Pembayaran: </label>
                      <div>
                        <img class="img-icon-po1" :src="'/img/po-img/' + selectedMetodeBayar.image" />
                      </div>
                    </div> -->
                    
                    <div v-if="checkMetodeCashSelect">
                      <hr class="m-0 mt-2 mb-2">
                      <div class="row">
                        <div class="col-md-6">
                          <input v-model="inputNominalMethodCash" @input="inputNominalMethodCash = checkInputNominalMethodCash()" id="inputNominalMethodCash" class="form-control form-control-sm" type="text" placeholder="Cash diberikan" />
                        </div>
                        <div class="col-md-6 d-flex align-items-end justify-content-end">
                          <label class="form-lable mb-0 me-1">Kembalian:</label>
                          <label class="form-lable mb-0 fs-0">Rp {{ $root.formatPrice(totalKembalianMetodeCash) }}</label>
                        </div>
                      </div>
                    </div>
                    
                    <hr class="m-0 mt-2">
        
                    <div v-if="selectSalesBy == master_code.salesBy.wa" class="mb-2 mt-2">
                      <label class="form-label mb-0" for="selectSalesBy">Sales By WA:</label>
                      <select v-model="selectedBscWa" v-on:change="invalidSelectSalesBsc = false" class="form-select mb-0" :class="{'border-red' : invalidSelectSalesBsc}" id="selectedBscWa">
                        <option value="">Pilih BSC WA</option>
                        <option value="1">David Simbolon</option>
                        <option value="2">Jonatan Hudson</option>
                        <option value="3">Surya Hasan</option>
                      </select>
                    </div>

                    <div class="form-check form-switch mb-1 mt-1">
                      <input v-model="switchBoxSendEamil" class="form-check-input" id="switchBoxSendEamil" type="checkbox" :disabled="memberOverview == null" />
                      <label class="form-check-label mb-0" for="switchBoxSendEamil">
                        Kirim invoice email (Optional)
                      </label>
                    </div>
                    
                    <label class="form-label mb-0">Keterangan: </label>
                    <div class="scrollable-customize" style="max-height: 7vh">
                      <p class="fs--1 mb-0 pb-0">
                        {{ keteranganTransaksi ? $root.trimString(keteranganTransaksi) == '' ? '-' : $root.trimString(keteranganTransaksi) : '-' }}
                      </p>
                    </div>
                  </div>
                  <div class="text-end px-3 pt-0 pb-3">
                    <button class="btn btn-secondary me-2 btn-sm" type="button" @click="openModalCancelConfirm()">Batal</button>
                    <button class="btn btn-primary btn-sm" type="button" @click="openModalCheckoutConfirm()">Checkout <span class="fas fa-shopping-basket"></span></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Modal konfirmasi menyelesaikan pesanan atau checkout -->
      <div class="modal fade" id="modalCheckoutConfirm" tabindex="0" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 400px">
          <div class="modal-content position-relative">
            <div class="modal-body p-0 pb-2">
              <div class="rounded-top-3 py-3 bg-body-tertiary text-center">
                <h3 class="mb-1" id="modalExampleDemoLabel">Konfirmasi Pesanan</h3>
              </div>
              <div class="py-2 text-center">
                <div class="d-flex justify-content-center mb-2">
                  <img src="@/assets/img/icons/Gif/warning-icon-2.gif" height="60" alt="">
                </div>
                <h5 class="m-0 px-1">
                  Pastikan konsumen telah membayar!
                </h5>
                <p class="m-0 px-3">
                  Produk yang telah dibeli tidak dapat dikembalikan kembali.
                </p>
              </div>
            </div>
            <div class="modal-footer d-flex justify-content-center">
              <button class="btn btn-secondary btn-sm" type="button" data-bs-dismiss="modal">Batal</button>
              <button class="btn btn-primary btn-sm" type="button" data-bs-dismiss="modal" v-on:click="checkoutBtn">Konfirmasi</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal konfirmasi untuk menutup modal rincian pesanan -->
      <div class="modal fade" id="modalBatalConfirm" tabindex="0" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 400px">
          <div class="modal-content position-relative">
            <div class="modal-body p-0 pb-2">
              <div class="rounded-top-3 py-3 bg-body-tertiary text-center">
                <h3 class="mb-1" id="modalExampleDemoLabel">Batalkan Konfirmasi</h3>
              </div>
              <div class="py-2 text-center">
                <div class="d-flex justify-content-center mb-2">
                  <img src="@/assets/img/icons/Gif/info-icon.gif" height="60" alt="">
                </div>
                <h5 class="m-0 px-1">
                  Yakin ingin menutup konfirmasi?
                </h5>
                <p class="m-0 px-3">
                  Semua perubahan billing detail akan diatur ualng kembali ke awal!!!
                </p>
              </div>
            </div>
            <div class="modal-footer d-flex justify-content-center">
              <button class="btn btn-secondary btn-sm" type="button" data-bs-dismiss="modal">Tidak</button>
              <button class="btn btn-danger btn-sm" type="button" v-on:click="batalModalCheckoutConfirm()">Ya</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Modal transaksi berhasil dan selesai -->
      <div class="modal fade" id="modalTransactionFinishSuccess" tabindex="0" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 400px">
          <div class="modal-content position-relative">
            <div class="modal-body p-0 pb-2">
              <div class="py-2 text-center">
                <div class="justify-content-center mb-0">
                  <img src="@/assets/img/icons/Gif/success-gif.gif" height="120" alt="">
                </div>
                <h3 class="mb-1">Transaksi selesai!</h3>
                <p class="m-0 px-4">
                  Selamat! Transaksi telah berhasil disimpan.
                </p>
              </div>
            </div>
            <div class="modal-footer d-flex justify-content-center">
              <button class="btn btn-success btn-sm" type="button" data-bs-dismiss="modal">Selesai</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal menampilkan product yang dicari lebih dari 1 -->
      <div class="modal fade" id="modalSearchFoundProductMore" tabindex="-1" aria-hidden="true" data-bs-keyboard="false" data-bs-backdrop="static">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
          <div class="modal-content position-relative border-0">
            <div class="modal-body p-0">
              <div class="card">
                <div class="bg-holder bg-card" style="background-image:url('assets/img/illustration/corner-4i.png'); background-size: cover;"></div>
                <div class="card-body position-relative p-0">
                  <div class="position-absolute top-0 end-0 mt-3 me-3 z-1">
                    <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="card-header rounded-top-3 py-3 ps-3 pe-6">
                    <h5 class="mb-0">Product lebih ditemukan</h5>
                  </div>
                  <div class="p-0">
                    <div class="table-scrollable-wrapper" style="max-height: 34vh;">
                      <table class="table table-hover table-scrollable">
                        <thead>
                          <tr>
                            <td>#</td>
                            <td>Nama</td>
                            <td>Info</td>
                            <td>Harga</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(product, index) in allProductFindSearchBtn" :key="index" style="cursor: pointer" @click="validateModalBatchProduct(product)">
                            <td>{{ index + 1 }}</td>
                            <td>
                              {{ product.master_promo_id ? product.for_product.itemName : product.itemName }}
                              <span v-if="product.master_promo_id" class="badge rounded-pill p-1 px-2 fs--3 ms-1" :class="'bg-' + product.master_promo_product.master_kode_promo_product.badge">
                                {{ product.master_promo_product.master_kode_promo_product.nama_promo }}
                              </span>
                            </td>
                            <td>
                              <div v-if="product.master_promo_id">
                                <span v-if="product.master_promo_product.tipe_promo == master_coll.tipePromo.bundle" class="badge bg-warning rounded-pill p-1 fs--3">
                                  {{ product.master_promo_product.buy_item }} Get {{ product.master_promo_product.get_item }}
                                </span>
                                <span v-if="product.master_promo_product.tipe_promo == master_coll.tipePromo.percent" class="badge bg-danger rounded-pill p-1 fs--3">
                                  -{{ product.master_promo_product.percent }}%
                                </span>
                              </div>
                              <div v-else>
                                <span v-if="$root.filterDiskonProduct(product).discCode != master_code.diskon.tanpa_diskon_code" class="badge bg-danger rounded-pill p-1 fs--3">
                                  -{{ $root.filterDiskonProduct(product).discount }}%
                                </span>
                                <span v-else>-</span>
                              </div>
                            </td>
                            <td>
                              Rp
                              <span v-if="product.master_promo_id">
                                <span v-if="product.master_promo_product.tipe_promo == master_coll.tipePromo.bundle">
                                  {{ $root.formatPrice($root.filterPriceProduct(product.for_product).price) }}
                                </span>
                                <span v-if="product.master_promo_product.tipe_promo == master_coll.tipePromo.percent">
                                  {{ $root.formatPrice($root.filterPriceProduct(product.for_product).price - ($root.filterPriceProduct(product.for_product).price * (product.master_promo_product.percent/100))) }}
                                </span>
                              </span>
                              <span v-else>
                                <span v-if="$root.filterDiskonProduct(product).discCode == master_code.diskon.tanpa_diskon_code">
                                  {{ $root.formatPrice($root.filterPriceProduct(product).price) }}
                                </span>
                                <span v-else>
                                  {{ $root.formatPrice($root.filterPriceProduct(product).price - ($root.filterPriceProduct(product).price * ($root.filterDiskonProduct(product).discount/100))) }}
                                </span>
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="card-footer position-relative text-end">
                  <button class="btn btn-primary btn-sm" data-bs-dismiss="modal" @click="allProductFindSearchBtn = []">Selesai</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal select promo active -->
      <div class="modal fade" id="modalShowActivePromoDiskon" data-bs-keyboard="false" data-bs-backdrop="static" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
          <div class="modal-content border-0">
            <div class="position-absolute top-0 end-0 mt-3 me-3 z-1">
              <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0">
              <div class="rounded-top-3 bg-body-tertiary py-3 ps-4 pe-6">
                <h5 class="mb-0" id="staticBackdropLabel">Aktif Promo Diskon</h5>
                <p class="fs--1 mb-0">
                  <strong>
                    {{ dataActiveMasterPromo.length }} 
                  </strong>
                  Promo aktif ditemukan.
                </p>
              </div>
              <div class="p-4 py-2">
                <form @submit.prevent="fatchDataPromoDiskon()" class="mb-2">
                  <div class="input-group">
                    <input v-model="inputSearchKodePromo" @input="inputSearchKodePromo.trim() == '' && fatchDataPromoDiskon(currentPagePromoDiskon)" class="form-control search-input fuzzy-search" type="search" placeholder="Masukkan Kode Promo">
                    <button class="btn btn-primary card-link" type="submit" style="z-index: 1"><span class="fas fa-search"></span></button>
                  </div>
                </form>

                <div class="row" v-if="dataActiveMasterPromo.length > 0">
                  <div class="col-md-12">
                    <label class="form-label mb-0">List Promo Aktif:</label>
                    <hr class="m-0 mb-3">
                  </div>
                  <div v-for="promo in dataActiveMasterPromo" class="col-md-6 mb-3">
                    <div class="card cursor-pointer" @click="clickPromoConfirmationPromo(promo)">
                      <div class="bg-holder bg-card" style="background-image:url('assets/img/illustration/discount-i.png');"></div>
                      <div class="card-header position-relative">
                        <strong>
                          {{ promo.nama_promo.toUpperCase() }}
                        </strong>
                        <h3 class="mb-0">
                          Diskon {{ promo.percent }}%
                        </h3>
                        <u class="fs--1">Syarat & Ketentuan Berlaku:</u>
                        <div class="row">
                          <div class="col-md-6">
                            <div class="fs--2">
                              <span class="far fa-check-circle text-success"></span>
                              Konsumen {{ promo.promo_member_for }}
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="fs--2">
                              <span class="far fa-check-circle" :class="promo.min_buy && 'text-success'"></span>
                              Minimal Pcs 
                              <strong>{{ promo.min_buy ?? '-' }}</strong>
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="fs--2">
                              <span class="far fa-check-circle" :class="promo.min_value && 'text-success'"></span>
                              Minimal Value 
                              <strong>Rp {{ promo.min_value ? $root.formatPrice(promo.min_value) : '-' }}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-else class="text-center mt-3">
                  <label class="form-label fst-italic">Promo Tidak Ditemukan!</label>
                </div>

                <div v-if="totalPagePromoDiskon > 1" class="d-flex justify-content-end">
                  <nav aria-label="Page navigation example">
                    <ul class="pagination pagination-sm">

                      <li v-if="displayedPagesPromoDiskon[0] > 1">
                        <a class="page-link" href="javascript:void(0)" @click="fatchDataPromoDiskon()">First</a>
                      </li>

                      <li class="page-item" :class="{ 'disabled': currentPageTr === 1 }">
                        <a class="page-link" href="javascript:void(0)" aria-label="Previous" @click="fatchDataPromoDiskon(currentPageTr - 1)">
                          <span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>

                      <li v-for="pageNumber in displayedPagesPromoDiskon" :key="pageNumber" class="page-item" :class="{ 'active': pageNumber === currentPageTr }">
                        <a class="page-link" href="javascript:void(0)" @click="fatchDataPromoDiskon(pageNumber)">{{ pageNumber }}</a>
                      </li>

                      <li class="page-item" :class="{ 'disabled': currentPageTr === totalPagePromoDiskon }">
                        <a class="page-link" href="javascript:void(0)" aria-label="Next" @click="fatchDataPromoDiskon(currentPageTr + 1)">
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>

                      <li v-if="displayedPagesPromoDiskon[displayedPagesPromoDiskon.length - 1] < totalPagePromoDiskon">
                        <a class="page-link" href="javascript:void(0)" @click="fatchDataPromoDiskon(totalPagePromoDiskon)">Last</a>
                      </li>

                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Batal</button>
              <button class="btn btn-success btn-sm" data-bs-dismiss="modal" @click="confirmationPayment()">
                Lanjut tanpa promo
                <span class="far fa-arrow-alt-circle-right"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal GWP first (Single GWP) -->
      <div class="modal fade" id="modalProductSingleGwp" tabindex="-1" role="dialog" aria-hidden="true" data-bs-keyboard="false" data-bs-backdrop="static">
        <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 500px">
          <div class="modal-content position-relative">
            <div class="position-absolute top-0 end-0 mt-2 me-2 z-1">
              <button @click="closeModalSelectActivePromo()" class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0">
              <div class="rounded-top-3 py-3 ps-4 pe-6 bg-body-tertiary">
                <h5 class="mb-0" id="modalExampleDemoLabel">Promo Gift With Purchese </h5>
                <p class="fs--1 mb-0">Promo <strong class="text-success">{{ selectedActivePromo != null && selectedActivePromo.nama_promo.toUpperCase() }}</strong> dengan Gift With Purchese</p>
              </div>
              <div class="px-3">
                <div v-if="productSingleGWP != null" class="card-header py-3 px-3">
                  <img v-if="productSingleGWP.imageUrl != null && productSingleGWP.imageUrl.trim() != ''" class="rounded-3 mb-2" :src="productSingleGWP.imageUrl" alt="" style="width: 100%; height: 155px; object-fit: cover;">
                  <img v-else class="img-fluid rounded" src="@/assets/img/product/no_image.jpg" style="width: 100%; height: 155px; object-fit: cover;" alt="" />
                  <span class="badge badge-subtle-secondary fs--1 fw-bold mb-1" style="font-weight: normal;">
                    {{ productSingleGWP.itemCode }}
                  </span>
                  <h5>{{ productSingleGWP.itemName }}</h5>
                  <del><strong>Rp {{ $root.formatPrice(productSingleGWP.all_product_price[0].price) }}</strong></del> -> 
                  <span class="badge rounded-pill bg-danger mb-2">FREE</span>

                  <div v-if="productSingleGWP.all_inventory_batch.length === 0" class="card mb-2">
                    <div class="bg-holder bg-card" style="background-image:url('assets/img/illustration/corner-4.png'); background-size: auto;"></div>
                    <div class="card-header py-2 px-3">
                      <span><i>Product Batch Not Found!</i></span>
                    </div>
                  </div>
                  <div v-else class="mb-3">
                    <label class="fs--1 mb-0">Pilih batch product: </label>
                    <hr class="m-0 mb-2"/>
                    <div class="scrollable-customize" style="min-height: 1vh; max-height: 35vh;">
                      <div v-for="batch in productSingleGWP.all_inventory_batch" class="card cursor-pointer mb-2" @click="clickAddToListSingleGwpProduct(productSingleGWP, batch)">
                        <div class="bg-holder bg-card" style="background-image:url('assets/img/illustration/corner-4.png'); background-size: auto;"></div>
                        <div class="card-header py-2 px-3">
                          <div class="row align-items-center">
                            <div class="col-md-4">
                              <span class="fs--2"><u>Batch Number:</u></span>
                              <h4 class="mb-0">{{ batch.batchNo ?? '-' }}</h4>
                            </div>
                            <div class="col-md-8 text-end fs--1">
                              <p class="m-0">Exp Date: <strong>{{ batch.expiredDate ? $root.formatDate(batch.expiredDate) : '-' }}</strong></p>
                              <p class="m-0">Warehouse: <strong>{{ batch.master_warehouse ? `${batch.master_warehouse.whsName} (${batch.master_warehouse.whsCode})` : '-' }}</strong></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal select product fo free gwp -->
      <div class="modal fade" id="modalSelectProductFreeGwp" tabindex="-1" role="dialog" aria-hidden="true" data-bs-keyboard="false" data-bs-backdrop="static">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
          <div class="modal-content border-0">
            <div class="position-absolute top-0 end-0 mt-3 me-3 z-1">
              <button @click="closeModalSelectActivePromo()" class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0">
              <div class="rounded-top-3 bg-body-tertiary py-3 ps-4 pe-4">
                <h5 class="mb-0" id="staticBackdropLabel">Promo Gift With Purchese</h5>
                <p v-if="selectedActivePromo != null" class="fs--1 mb-0">
                  Promo <strong class="text-success">{{ selectedActivePromo.nama_promo.toUpperCase() }}</strong>
                  <span v-if="selectedActivePromo.tipe_gwp == master_coll.tipe_gwp.secound">
                    Free Total Product Maksimal <strong class="text-danger">Rp {{ $root.formatPrice(selectedActivePromo.min_value_product) }}</strong>
                  </span>
                  <span v-if="selectedActivePromo.tipe_gwp == master_coll.tipe_gwp.three">
                    Pilih Product Maksimal <strong class="text-danger fs-0">{{ selectedActivePromo.mix_get_pcs_gwp }}</strong> Piece<span v-if="selectedActivePromo.mix_get_pcs_gwp > 1">s</span>
                  </span>
                </p>
                <div class="scrollable-customize" style="min-height: 1vh; max-height: 15vh;">
                  <span v-for="(data, index) in selectedAllPromoMinValGwp" class="badge badge-subtle-primary fw-bold mb-1 me-2" style="font-weight: normal;">
                    {{ data.product.itemCode }} - {{ data.product.itemNameShort }}
                    <span class="cursor-pointer" @click="deleteDataProductMinValGwp(data, index)">
                      <span class="fas fa-window-close text-danger ms-1"></span>
                    </span>
                    <div class="row align-items-center">
                      <label class="col-form-label col-sm-2 py-0">Pieces:</label>
                      <div class="col-sm-10 p-0">
                        <input class="form-control py-0 pe-0 ps-2 fs--1 w-15 me-2" type="number" min="1" :value="data.qty" @change="updateQtySelectProductGwp($event, data, selectedActivePromo)" />
                      </div>
                    </div>
                  </span>
                </div>
              </div>
              <div class="p-3 py-2">
                <form v-if="selectedActivePromo != null && selectedActivePromo.tipe_gwp == master_coll.tipe_gwp.secound" @submit.prevent="fatchDataProductMinValueGwp()" class="mb-2">
                  <div class="input-group">
                    <input v-model="inputSearchProductInMinValGwp" @input="inputSearchProductInMinValGwp.trim() == '' && fatchDataProductMinValueGwp(currentPageMinValGwp)" class="form-control search-input fuzzy-search" type="search" placeholder="Masukkan item code">
                    <button class="btn btn-primary card-link" type="submit" style="z-index: 1"><span class="fas fa-search"></span></button>
                  </div>
                </form>

                <div v-if="dataAllProductsMinValGwp.length > 0" class="scrollable-customize mb-3" style="min-height: 1vh; max-height: 67vh;">
                  <div class="row m-0">
                    <div v-for="product in dataAllProductsMinValGwp" class="col-md-6 p-2" :key="product.itemCode">
                      <div class="card">
                        <div class="bg-holder bg-card" style="background-image:url('assets/img/illustration/corner-1.png'); background-size: cover;"></div>
                        <div class="card-header position-relative d-flex cursor-pointer" @click="validateModalBatchProductMinValGwp(product)">
                          <div class="me-2">
                            <img v-if="product.imageUrl != null && product.imageUrl.trim() != ''" class="img-fluid rounded-3" :src="product.imageUrl" style="width: 100%; height: 70px;" alt="">
                            <img v-else class="img-fluid rounded-3" src="@/assets/img/product/no_image.jpg" style="width: 100%; height: 70px;" alt="">
                          </div>
                          <div>
                            <span class="badge badge-subtle-secondary fw-bold mb-1" style="font-weight: normal;">{{ product.itemCode }}</span>
                            <span v-if="product.isSelectedGwpMinVal == true" class="badge rounded-pill fw-medium badge-subtle-success ms-2">
                              <span class="fas fa-check"></span> Dipilih
                            </span>
                            <h5 class="fs-0 mb-0">
                              <div class="text-1100">
                                <span class="d-inline-block text-truncate" style="max-width: 250px;">
                                  {{ product.itemName }}
                                </span>
                              </div>
                            </h5>
                            <strong class="fs-md-0 text-warning mb-0 text-center">
                              Rp {{ $root.formatPrice($root.filterPriceProduct(product).price) }}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="text-center">
                  <label><i>Product Not Found!</i></label>
                </div>
                
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <button @click="closeModalSelectActivePromo()" class="btn btn-sm btn-secondary me-2" type="button" data-bs-dismiss="modal">Batal</button>
                    <button @click="btnContinueSelectMinValGwp()" class="btn btn-sm btn-primary" type="button">Lanjutkan</button>
                  </div>
                  
                  <nav v-if="selectedActivePromo != null && selectedActivePromo.tipe_gwp == master_coll.tipe_gwp.secound && totalPageMinValGwp > 1" aria-label="Page navigation example">
                    <ul class="pagination pagination-sm mb-0">

                      <li v-if="displayedPagesMinValGwp[0] > 1">
                        <a class="page-link" href="javascript:void(0)" @click="fatchDataProductMinValueGwp()">First</a>
                      </li>

                      <li class="page-item" :class="{ 'disabled': currentPageMinValGwp === 1 }">
                        <a class="page-link" href="javascript:void(0)" aria-label="Previous" @click="fatchDataProductMinValueGwp(currentPageMinValGwp - 1)">
                          <span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>

                      <li v-for="pageNumber in displayedPagesMinValGwp" :key="pageNumber" class="page-item" :class="{ 'active': pageNumber === currentPageMinValGwp }">
                        <a class="page-link" href="javascript:void(0)" @click="fatchDataProductMinValueGwp(pageNumber)">{{ pageNumber }}</a>
                      </li>

                      <li class="page-item" :class="{ 'disabled': currentPageMinValGwp === totalPageMinValGwp }">
                        <a class="page-link" href="javascript:void(0)" aria-label="Next" @click="fatchDataProductMinValueGwp(currentPageMinValGwp + 1)">
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>

                      <li v-if="displayedPagesMinValGwp[displayedPagesMinValGwp.length - 1] < totalPageMinValGwp">
                        <a class="page-link" href="javascript:void(0)" @click="fatchDataProductMinValueGwp(totalPageMinValGwp)">Last</a>
                      </li>

                    </ul>
                  </nav>

                  <nav v-if="selectedActivePromo != null && selectedActivePromo.tipe_gwp == master_coll.tipe_gwp.three && totalPageDetailPromoDiskon > 1" aria-label="Page navigation example">
                    <ul class="pagination pagination-sm mb-0">

                      <li v-if="displayedPagesDetailPromoDiskon[0] > 1">
                        <a class="page-link" href="javascript:void(0)" @click="fatchDataProductMultiGwp(selectedActivePromo)">First</a>
                      </li>

                      <li class="page-item" :class="{ 'disabled': currentPageDetailPromoDiskon === 1 }">
                        <a class="page-link" href="javascript:void(0)" aria-label="Previous" @click="fatchDataProductMultiGwp(selectedActivePromo, currentPageDetailPromoDiskon - 1)">
                          <span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>

                      <li v-for="pageNumber in displayedPagesDetailPromoDiskon" :key="pageNumber" class="page-item" :class="{ 'active': pageNumber === currentPageDetailPromoDiskon }">
                        <a class="page-link" href="javascript:void(0)" @click="fatchDataProductMultiGwp(selectedActivePromo, pageNumber)">{{ pageNumber }}</a>
                      </li>

                      <li class="page-item" :class="{ 'disabled': currentPageDetailPromoDiskon === totalPageDetailPromoDiskon }">
                        <a class="page-link" href="javascript:void(0)" aria-label="Next" @click="fatchDataProductMultiGwp(selectedActivePromo, currentPageDetailPromoDiskon + 1)">
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>

                      <li v-if="displayedPagesDetailPromoDiskon[displayedPagesDetailPromoDiskon.length - 1] < totalPageDetailPromoDiskon">
                        <a class="page-link" href="javascript:void(0)" @click="fatchDataProductMultiGwp(selectedActivePromo, totalPageDetailPromoDiskon)">Last</a>
                      </li>

                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal show batch product min val gwp -->
      <div class="modal fade" id="modalShowBatchProductMinValGwp" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 500px">
          <div class="modal-content position-relative">
            <div class="position-absolute top-0 end-0 mt-2 me-2 z-1">
              <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0">
              <div class="rounded-top-3 py-3 ps-4 pe-6 bg-body-tertiary">
                <h5 class="mb-1" id="modalExampleDemoLabel">Batch product </h5>
              </div>
              <div v-if="productSelectBatchMinValGwp != null" class="px-4 pb-4">
                <!-- For Regular Product -->
                <div v-if="productSelectBatchMinValGwp.product.all_inventory_batch.length > 0" class="card cursor-pointer mt-3" v-for="batch in productSelectBatchMinValGwp.product.all_inventory_batch" @click="selectBatchProductMinValGwp(productSelectBatchMinValGwp.product, batch, productSelectBatchMinValGwp.qty)">
                  <div class="bg-holder bg-card" style="background-image:url('assets/img/illustration/corner-4.png'); background-size: auto;"></div>
                  <div class="card-header position-relative py-2 px-3">
                    <div class="row align-items-center">
                      <div class="col-md-4">
                        <span class="fs--2"><u>Batch Number:</u></span>
                        <h4 class="mb-0">{{ batch.batchNo ?? '-' }}</h4>
                      </div>
                      <div class="col-md-8 text-end fs--1">
                        <p class="m-0">Exp Date: <strong>{{ batch.expiredDate ? $root.formatDate(batch.expiredDate) : '-' }}</strong></p>
                        <p class="m-0">Warehouse: <strong>{{ batch.master_warehouse ? `${batch.master_warehouse.whsName} (${batch.master_warehouse.whsCode})` : '-' }}</strong></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="text-center mt-3">
                  <span><i>Product Batch Not Found!</i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal show batch product -->
      <div class="modal fade" id="modalShowBatchProduct" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 500px">
          <div class="modal-content position-relative">
            <div class="position-absolute top-0 end-0 mt-2 me-2 z-1">
              <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0">
              <div class="rounded-top-3 py-3 ps-4 pe-6 bg-body-tertiary">
                <h5 class="mb-1" id="modalExampleDemoLabel">Batch product </h5>
              </div>
              <div v-if="productSelectBatch != null" class="px-3 pb-3">
                <div class="scrollable-customize mb-2" style="min-height: 1vh; max-height: 70vh;">
                  <!-- For Promo Product -->
                  <div v-if="productSelectBatch.product.promo_product_id">
                    <div v-if="productSelectBatch.product.for_product.all_inventory_batch.length > 0" class="card cursor-pointer mt-3" v-for="batch in productSelectBatch.product.for_product.all_inventory_batch" @click="addProductToList(productSelectBatch.product, batch, productSelectBatch.qty)">
                      <div class="bg-holder bg-card" style="background-image:url('assets/img/illustration/corner-4.png'); background-size: auto;"></div>
                      <div class="card-header position-relative py-2 px-3">
                        <div class="row align-items-center">
                          <div class="col-md-4">
                            <span class="fs--2"><u>Batch Number:</u></span>
                            <h4 class="mb-0">{{ batch.batchNo ?? '-' }}</h4>
                          </div>
                          <div class="col-md-8 text-end fs--1">
                            <p class="m-0">Exp Date: <strong>{{ batch.expiredDate ? $root.formatDate(batch.expiredDate) : '-' }}</strong></p>
                            <p class="m-0">Warehouse: <strong>{{ batch.master_warehouse ? `${batch.master_warehouse.whsName} (${batch.master_warehouse.whsCode})` : '-' }}</strong></p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else class="text-center mt-3">
                      <span><i>Product Batch Not Found!</i></span>
                    </div>
                  </div>
      
                  <!-- For Regular Product -->
                  <div v-else>
                    <div v-if="productSelectBatch.product.all_inventory_batch.length > 0" class="card cursor-pointer mt-3" v-for="batch in productSelectBatch.product.all_inventory_batch" @click="addProductToList(productSelectBatch.product, batch, productSelectBatch.qty)">
                      <div class="bg-holder bg-card" style="background-image:url('assets/img/illustration/corner-4.png'); background-size: auto;"></div>
                      <div class="card-header position-relative py-2 px-3">
                        <div class="row align-items-center">
                          <div class="col-md-4">
                            <span class="fs--2"><u>Batch Number:</u></span>
                            <h4 class="mb-0">{{ batch.batchNo ?? '-' }}</h4>
                          </div>
                          <div class="col-md-8 text-end fs--1">
                            <p class="m-0">Exp Date: <strong>{{ batch.expiredDate ? $root.formatDate(batch.expiredDate) : '-' }}</strong></p>
                            <p class="m-0">Warehouse: <strong>{{ batch.master_warehouse ? `${batch.master_warehouse.whsName} (${batch.master_warehouse.whsCode})` : '-' }}</strong></p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else class="text-center mt-3">
                      <span><i>Product Batch Not Found!</i></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="modal-footer">
              <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Close</button>
              <button class="btn btn-primary" type="button">Understood </button>
            </div> -->
          </div>
        </div>
      </div>
      
      <!-- Loading penarikan data -->
      <div class="modal fade" id="modalLoadingGetProduct" tabindex="-1" role="dialog" aria-hidden="true" data-bs-keyboard="false" data-bs-backdrop="static">
        <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 500px">
          <div class="modal-content position-relative">
            <!-- <div class="position-absolute top-0 end-0 mt-2 me-2 z-1">
              <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
            </div> -->
            <div class="modal-body p-0">
              <div class="rounded-3 py-3 p-4 bg-body-tertiary">
                <h5 class="mb-0" id="modalExampleDemoLabel">Loading Product...</h5>
                <p class="m-0 mb-1 fs--1">
                  Proses penarikan semua product
                </p>
                <div class="progress" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" id="progress-toggle" style="width: 100%"></div>
                </div>
                <!-- <div class="text-end mt-3">
                  <button class="btn btn-secondary btn-sm" type="button" data-bs-dismiss="modal">Batal</button>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal find free product -->
      <div class="modal fade" id="modalFindProductFree" tabindex="-1" role="dialog" aria-hidden="true" data-bs-keyboard="false" data-bs-backdrop="static">
        <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 500px">
          <div class="modal-content position-relative">
            <div class="position-absolute top-0 end-0 mt-2 me-2 z-1">
              <button @click="inputSearchFreeProduct = ''; allDataFindProductFree = []" class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0">
              <div class="rounded-top-3 py-3 ps-4 pe-6 bg-body-tertiary">
                <h5 class="mb-1" id="modalExampleDemoLabel">Find product free </h5>
              </div>
              <div class="px-3 pt-3">
                <form @submit.prevent="inputSearchFreeProduct != '' && findDataProductFree()" class="mb-3">
                  <div class="input-group">
                    <input v-model="inputSearchFreeProduct" @input="inputSearchFreeProduct == '' && (allDataFindProductFree = [])" class="form-control search-input fuzzy-search" type="search" placeholder="Masukkan item code product...">
                    <button class="btn btn-primary card-link" type="submit" style="z-index: 1"><span class="fas fa-search"></span></button>
                  </div>
                </form>

                <div v-if="allDataFindProductFree.length < 1" class="text-center pb-4">
                  <span>
                    No Product Found!!
                  </span>
                </div>
                <hr v-else />
                <div v-for="product in allDataFindProductFree" class="py-2 px-3">
                  <img class="rounded-3 mb-2" :src="product.imageUrl" alt="" style="width: 100%; height: 155px; object-fit: cover;">
                  <span class="badge badge-subtle-secondary fs--1 fw-bold mb-1" style="font-weight: normal;">
                    {{ product.itemCode }}
                  </span>
                  <h5>{{ product.itemName }}</h5>
                  <del><strong>Rp {{ $root.formatPrice(product.all_product_price[0].price) }}</strong></del> -> 
                  <span class="badge rounded-pill bg-danger mb-2">FREE</span>

                  <div v-if="product.all_inventory_batch.length === 0" class="card mb-2">
                    <div class="bg-holder bg-card" style="background-image:url('assets/img/illustration/corner-4.png'); background-size: auto;"></div>
                    <div class="card-header py-2 px-3">
                      <span><i>Product Batch Not Found!</i></span>
                    </div>
                  </div>
                  <div v-else class="mb-3">
                    <label class="fs--1 mb-0">Pilih batch product: </label>
                    <hr class="m-0 mb-2"/>
                    <div class="scrollable-customize" style="min-height: 1vh; max-height: 35vh;">
                      <div v-for="batch in product.all_inventory_batch" class="card cursor-pointer mb-2" @click="clickAddToListFreeProduct(product, batch)">
                        <div class="bg-holder bg-card" style="background-image:url('assets/img/illustration/corner-4.png'); background-size: auto;"></div>
                        <div class="card-header py-2 px-3">
                          <div class="row align-items-center">
                            <div class="col-md-4">
                              <span class="fs--2"><u>Batch Number:</u></span>
                              <h4 class="mb-0">{{ batch.batchNo ?? '-' }}</h4>
                            </div>
                            <div class="col-md-8 text-end fs--1">
                              <p class="m-0">Exp Date: <strong>{{ batch.expiredDate ? $root.formatDate(batch.expiredDate) : '-' }}</strong></p>
                              <p class="m-0">Warehouse: <strong>{{ batch.master_warehouse ? `${batch.master_warehouse.whsName} (${batch.master_warehouse.whsCode})` : '-' }}</strong></p>
                            </div>
                          </div>
                          <!-- <span class="far fa-check-circle text-success"></span> -->
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- clickAddToListFreeProduct(product) -->
                  <!-- <div v-if="product.all_inventory_batch.length > 0" class="d-flex">
                    <input class="form-control p-0 ps-2 me-2" type="number" value="1" min="1" style="width: 60px;">
                    <button class="btn btn-sm btn-primary px-2" type="button" @click="">
                      Tambah <span class="fas fa-cart-plus" data-fa-transform="shrink-3"></span>
                    </button>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Modal info check plafon member karyawan -->
      <div class="modal fade" id="modalInfoCheckPlafonKaryawan" tabindex="0" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 400px">
          <div class="modal-content position-relative">
            <div class="modal-body p-0 pb-2">
              <div class="rounded-top-3 py-3 bg-body-tertiary text-center">
                <h3 class="mb-1" id="modalExampleDemoLabel">Plafon Info</h3>
              </div>
              <div class="py-2 text-center">
                <div class="d-flex justify-content-center mb-2">
                  <img src="@/assets/img/icons/Gif/info-icon.gif" height="60" alt="">
                </div>
                <h5 class="m-0 px-1">
                  {{ headerModalInfoPlafon }}
                </h5>
                <p class="m-0 px-3">
                  {{ bodyModalInfoPlafon }}
                </p>
              </div>
            </div>
            <div class="modal-footer d-flex justify-content-center">
              <button class="btn btn-secondary btn-sm" type="button" data-bs-dismiss="modal">Tutup</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal select product for create ticket -->
      <div class="modal fade" id="modalSelectProductForTicket" tabindex="-1" role="dialog" aria-hidden="true" data-bs-keyboard="false" data-bs-backdrop="static">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document" style="max-width: 850px">
          <div class="modal-content position-relative">
            <div class="position-absolute top-0 end-0 mt-2 me-2 z-1">
              <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0">
              <div class="rounded-top-3 py-3 ps-4 pe-6 bg-body-tertiary">
                <h5 class="mb-1">Select Product Order Ticket</h5>
              </div>
              <div class="px-3">
                <ul class="nav nav-tabs" id="navTabProductOrderTicket" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link py-1 px-2" :class="tabActivePillTicketOrder == listPillTicketOrder.reguler && 'active'" id="pillRegulerTab" data-bs-toggle="tab" href="#pillTabRegulerProduct" role="tab" aria-controls="pillTabRegulerProduct" aria-selected="true" @click="tabActivePillTicketOrder = listPillTicketOrder.reguler">
                      <span class="fas fa-solar-panel"></span> Reguler
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link py-1 px-2" :class="tabActivePillTicketOrder == listPillTicketOrder.promo && 'active'" id="pillPromoTab" data-bs-toggle="tab" href="#pillTabPromoProduct" role="tab" aria-controls="pillTabPromoProduct" aria-selected="false" @click="tabActivePillTicketOrder = listPillTicketOrder.promo">
                      <span class="fas fa-gifts"></span> Promo
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link py-1 px-2" :class="tabActivePillTicketOrder == listPillTicketOrder.listadd && 'active'" id="pillListAddProductTab" data-bs-toggle="tab" href="#pillTabListAddProduct" role="tab" aria-controls="pillTabListAddProduct" aria-selected="false" @click="tabActivePillTicketOrder = listPillTicketOrder.listadd">
                      <span class="fas fa-shopping-basket"></span> List Add
                      <span class="badge rounded-pill bg-danger">{{ listDataProductForCreateTicket.length > 0 ? listDataProductForCreateTicket.length : '0' }}</span>
                    </a>
                  </li>
                </ul>
                <div class="tab-content mt-2" id="pillTabProductOrderTicket">
                  <!-- Pill Tab Content Reguler -->
                  <div class="tab-pane fade" :class="tabActivePillTicketOrder == listPillTicketOrder.reguler && 'active show'" id="pillTabRegulerProduct" role="tabpanel" aria-labelledby="home-tab">
                    <div class="row mb-3 px-2 justify-content-end">
                      <div class="col-md-12">
                        <form @submit.prevent="fatchDataProductOrderTicket()">
                          <div class="input-group">
                            <input v-model="inputSearchProductOrderTicket" @input="inputSearchProductOrderTicket.trim() == '' && fatchDataProductOrderTicket()" class="form-control form-control-sm search-input fuzzy-search" type="search" placeholder="Search...">
                            <button class="btn btn-primary card-link" type="submit" style="z-index: 1"><span class="fas fa-search"></span></button>
                          </div>
                        </form>
                      </div>
                    </div>
                    
                    <div class="scrollable-customize" style="min-height: 1vh; max-height: 50vh;">
                      <div class="row m-0">
                        <div class="col-6 col-sm-6 col-md-3 px-2 pb-3" v-for="product in dataAllProductOrderTicket">
                          <div class="border rounded-1 h-100 d-flex flex-column justify-content-between">
                            <div class="overflow-hidden">
                              <div class="position-relative rounded-top overflow-hidden">
                                <div class="d-block text-center">
                                  <div class="cursor-pointer" @click="clickAddProductOrderTicket(product)">
                                    <img v-if="product.imageUrl != null && product.imageUrl.trim() != ''" class="img-fluid rounded-top" :src="product.imageUrl" style="width: 100%; height: 90px;" alt="">
                                    <img v-else class="img-fluid rounded-top" src="@/assets/img/product/no_image.jpg" style="width: 100%; height: 90px;" alt="">
                                  </div>
                                  <div class=" position-absolute mt-1 me-2 z-2 top-0 end-0">
                                    <span v-if="$root.filterDiskonProduct(product).discCode != master_code.diskon.tanpa_diskon_code" class="badge bg-danger rounded-pill p-1 fs--3">
                                      -{{ $root.filterDiskonProduct(product).discount }}%
                                    </span>
                                  </div>
                                  <div class="position-absolute mb-1 ms-2 z-2 bottom-0 start-0">
                                    <div v-if="product.isSelectedProductTicket == true">
                                      <span class="badge rounded-pill fw-medium badge-subtle-success py-1">
                                        <span class="fas fa-check fs--2"></span> <span class="fs--2 me-1">Dipilih</span>
                                        <a href="javascript:void(0)" class="text-danger" @click="deleteProductFromListOrderTicket(product)">
                                          <span class="fas fa-window-close"></span>
                                        </a>
                                      </span>
                                    </div>
                                    <div>
                                      <span class="badge badge-subtle-secondary px-1 fs--2 fw-bold" style="font-weight: normal;">
                                        {{ product.itemCode }}
                                      </span>
                                    </div>
                                  </div>
                                  <span class="badge badge-subtle-success position-absolute mb-1 me-2 z-2 px-1 bottom-0 end-0 fs--2" style="font-weight: normal;">{{ $root.filterStokProduct(product).onHand }}</span>
                                </div>
                              </div>
                              <div class="p-2 text-center">
                                <h5 class="fs-0 mb-0">
                                  <div class="text-1100">
                                    <span class="d-inline-block text-truncate max-width-text-truncate">
                                      {{ product.itemName }}
                                    </span>
                                  </div>
                                </h5>
                                <div>
                                  <div v-if="$root.filterDiskonProduct(product).discCode == master_code.diskon.tanpa_diskon_code">
                                    <strong class="fs-md-0 text-warning mb-0 text-center">
                                      Rp {{ $root.formatPrice($root.filterPriceProduct(product).price) }}
                                    </strong>
                                  </div>
                                  <div v-else>
                                    <strong class="fs-md-0 text-warning mb-0 text-center">
                                      Rp {{ $root.formatPrice($root.filterPriceProduct(product).price - ($root.filterPriceProduct(product).price * ($root.filterDiskonProduct(product).discount/100))) }}
                                      <del class="text-secondary fs--1">{{ $root.formatPrice($root.filterPriceProduct(product).price) }}</del>
                                    </strong>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Pill Tab Content Promo -->
                  <div class="tab-pane fade" :class="tabActivePillTicketOrder == listPillTicketOrder.promo && 'active show'" id="pillTabPromoProduct" role="tabpanel" aria-labelledby="profile-tab">
                    <div class="scrollable-customize" style="min-height: 1vh; max-height: 50vh;">
                      <div class="row m-0">
                        <div class="col-6 col-sm-6 col-md-3 px-2 pb-3" v-for="product in dataAllPromoProductOrderTicket">
                          <div class="border rounded-1 h-100 d-flex flex-column justify-content-between">
                            <div class="overflow-hidden">
                              <div class="position-relative rounded-top overflow-hidden">
                                <div class="d-block text-center">
                                  <div class="cursor-pointer" v-if="product.promo_product_id" @click="clickAddProductOrderTicket(product)">
                                    <img v-if="product.for_product.imageUrl != null && product.for_product.imageUrl.trim() != ''" class="img-fluid rounded-top" :src="product.for_product.imageUrl" style="width: 100%; height: 90px;" alt="">
                                    <img v-else class="img-fluid rounded-top" src="@/assets/img/product/no_image.jpg" style="width: 100%; height: 90px;" alt="">
                                  </div>
                                  <div class=" position-absolute mt-1 me-2 z-2 top-0 end-0">
                                    <div v-if="product.promo_product_id">
                                      <span class="badge rounded-pill p-1 fs--3 me-1" :class="'bg-' + product.master_promo_product.master_kode_promo_product.badge">
                                        {{ product.master_promo_product.master_kode_promo_product.nama_promo }}
                                      </span>
                                      <span v-if="product.master_promo_product.tipe_promo == master_coll.tipePromo.bundle" class="badge bg-warning rounded-pill p-1 fs--3">
                                        {{ product.master_promo_product.buy_item }} Get {{ product.master_promo_product.get_item }}
                                      </span>
                                      <span v-if="product.master_promo_product.tipe_promo == master_coll.tipePromo.percent" class="badge bg-danger rounded-pill p-1 fs--3">
                                        -{{ product.master_promo_product.percent }}%
                                      </span>
                                    </div>
                                  </div>
                                  <div class="position-absolute mb-1 ms-2 z-2 bottom-0 start-0">
                                    <div v-if="product.isSelectedProductTicket == true">
                                      <span class="badge rounded-pill fw-medium badge-subtle-success py-1">
                                        <span class="fas fa-check fs--2"></span> <span class="fs--2 me-1">Dipilih</span>
                                        <a href="javascript:void(0)" class="text-danger" @click="deleteProductFromListOrderTicket(product)">
                                          <span class="fas fa-window-close"></span>
                                        </a>
                                      </span>
                                    </div>
                                    <div>
                                      <span class="badge badge-subtle-secondary px-1 fs--2 fw-bold" style="font-weight: normal;">
                                        {{ product.promo_product_id && product.for_product.itemCode }}
                                      </span>
                                    </div>
                                  </div>
                                  <span class="badge badge-subtle-success position-absolute mb-1 me-2 z-2 px-1 bottom-0 end-0 fs--2" style="font-weight: normal;">{{ product.promo_product_id && product.for_product.all_inventory_stok[0].onHand }}</span>
                                </div>
                              </div>
                              <div class="p-2 text-center">
                                <h5 class="fs-0 mb-0">
                                  <div class="text-1100">
                                    <span class="d-inline-block text-truncate max-width-text-truncate">
                                      {{ product.promo_product_id && product.for_product.itemName }}
                                    </span>
                                  </div>
                                </h5>
                                <div v-if="product.promo_product_id">
                                  <strong class="fs-md-0 text-warning mb-0 text-center">
                                    Rp {{ $root.formatPrice(product.for_product.all_product_price[0].price - (product.for_product.all_product_price[0].price * (product.master_promo_product.percent/100))) }}
                                    <del v-if="product.master_promo_product.tipe_promo == master_coll.tipePromo.percent" class="text-secondary fs--1">
                                      {{ $root.formatPrice(product.for_product.all_product_price[0].price) }}
                                    </del>
                                  </strong>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Pill Tab List Added Product -->
                  <div class="tab-pane fade" :class="tabActivePillTicketOrder == listPillTicketOrder.listadd && 'active show'" id="pillTabListAddProduct" role="tabpanel" aria-labelledby="profile-tab">
                    <div class="d-block d-md-none pt-2">
                      <div v-if="!listDataProductForCreateTicket || listDataProductForCreateTicket.length === 0" class="my-5 text-center">
                        <img class="pb-2" src="@/assets/img/mtsiconland.png" width="200" alt="" />
                        <p class="m-0 fs--1">No product added to Ticket</p>
                      </div>

                      <div v-else class="scrollable-customize" style="min-height: 1vh; max-height: 50vh;">
                        <div v-for="(data, index) in listDataProductForCreateTicket" class="card mb-3">
                          <div class="bg-holder bg-card" style="background-image:url('assets/img/illustration/corner-4.png'); background-size: cover;"></div>
                          <div class="card-header position-relative p-2">
                            <div class="row">
                              <div class="col-4">
                                <div v-if="data.is_promo_product">
                                  <img v-if="data.product.for_product.imageUrl != null && data.product.for_product.imageUrl.trim() != ''" class="img-fluid rounded-top" :src="data.product.for_product.imageUrl" style="width: 100%; height: 100px;" alt="">
                                  <img v-else class="img-fluid rounded-top" src="@/assets/img/product/no_image.jpg" style="width: 100%; height: 100px;" alt="">
                                </div>
                                <div v-else>
                                  <img v-if="data.product.imageUrl != null && data.product.imageUrl.trim() != ''" class="img-fluid rounded-top" :src="data.product.imageUrl" style="width: 100%; height: 100px;" alt="">
                                  <img v-else class="img-fluid rounded-top" src="@/assets/img/product/no_image.jpg" style="width: 100%; height: 100px;" alt="">
                                </div>
                              </div>
                              <div class="col-8">
                                <span class="badge badge-subtle-secondary px-1 fs--2 fw-bold" style="font-weight: normal;">
                                  {{ data.is_promo_product ? data.product.for_product.itemCode : data.product.itemCode }}
                                </span>
                                <span v-if="data.product.master_promo_product" class="ms-2">
                                  <span class="badge rounded-pill fs--3 me-1" :class="'bg-' + data.product.master_promo_product.master_kode_promo_product.badge">
                                    {{ data.product.master_promo_product.master_kode_promo_product.nama_promo }}
                                  </span>
                                  <span v-if="data.product.master_promo_product.tipe_promo == master_coll.tipePromo.bundle" class="badge bg-warning rounded-pill fs--3">
                                    {{ data.product.master_promo_product.buy_item }} Get {{ data.product.master_promo_product.get_item }}
                                  </span>
                                  <span v-if="data.product.master_promo_product.tipe_promo == master_coll.tipePromo.percent" class="badge bg-danger rounded-pill fs--3">
                                    {{ data.product.master_promo_product.percent }}%
                                  </span>
                                </span>
                                <h5 class="m-0">{{ data.is_promo_product ? data.product.for_product.itemName : data.product.itemName }}</h5>
      
                                <div class="d-flex justify-content-between">
                                  <div class="text-warning fw-semi-bold">
                                    Rp {{ $root.formatPrice(data.is_promo_product ? data.product.for_product.all_product_price[0].price : data.product.all_product_price[0].price) }}
                                  </div>
                                  <div class="d-flex">
                                    <input v-model="data.qty" class="form-control p-0 ps-2 set-text-bold" type="number" min="1" style="width: 60px;">
                                    <a href="javascript:void(0)" @click="deleteProductFromListOrderTicket(data.product)" class="p-0 ms-2 text-danger">
                                      <span class="fas fa-window-close"></span>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="d-none d-md-block table-scrollable-wrapper" style="min-height: 1vh; max-height: 55vh;">
                      <table class="table table-scrollable table-sm">
                        <div v-if="!listDataProductForCreateTicket || listDataProductForCreateTicket.length === 0"></div>
                        <thead v-else>
                          <tr class="p-0">
                            <th class="py-1 bg-white ps-0">#</th>
                            <th class="py-1 bg-white">SKU</th>
                            <th class="py-1 bg-white">Produk</th>
                            <th class="py-1 bg-white">Harga</th>
                            <th class="py-1 bg-white">Banyak</th>
                            <th class="py-1 bg-white">Info</th>
                            <th class="text-end py-1 pe-1 bg-white">
                              <a href="javascript:void(0)" @click="clearAllAddedProductListOrderTicket()" class="p-0 ms-2 text-danger">
                                <span class="fas fa-trash-alt"></span>
                              </a>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-if="!listDataProductForCreateTicket || listDataProductForCreateTicket.length === 0">
                            <td class="text-center" style="border: none;" colspan="7">
                              <img class="pt-5 pb-2" src="@/assets/img/mtsiconland.png" width="200" alt="" />
                              <p class="m-0 fs--1">No product added to Ticket</p>
                            </td>
                          </tr>
                          <tr v-else v-for="(data, index) in listDataProductForCreateTicket">
                            <td class="ps-0">{{ index + 1 }}</td>
                            <td>
                              {{ data.is_promo_product ? data.product.for_product.itemCode : data.product.itemCode }}
                            </td>
                            <td>
                              {{ data.is_promo_product ? data.product.for_product.itemName : data.product.itemName }}
                            </td>
                            <td>Rp {{ $root.formatPrice(data.is_promo_product ? data.product.for_product.all_product_price[0].price : data.product.all_product_price[0].price) }}</td>
                            <td>
                              <input v-model="data.qty" class="form-control p-0 ps-2 set-text-bold" type="number" min="1" style="width: 60px;">
                            </td>
                            <td>
                              <div v-if="data.product.master_promo_product" class="mb-1">
                                <span class="badge rounded-pill fs--3 me-1" :class="'bg-' + data.product.master_promo_product.master_kode_promo_product.badge">
                                  {{ data.product.master_promo_product.master_kode_promo_product.nama_promo }}
                                </span>
                                <span v-if="data.product.master_promo_product.tipe_promo == master_coll.tipePromo.bundle" class="badge bg-warning rounded-pill fs--3">
                                  {{ data.product.master_promo_product.buy_item }} Get {{ data.product.master_promo_product.get_item }}
                                </span>
                                <span v-if="data.product.master_promo_product.tipe_promo == master_coll.tipePromo.percent" class="badge bg-danger rounded-pill fs--3">
                                  {{ data.product.master_promo_product.percent }}%
                                </span>
                              </div>
                              <div v-else>-</div>
                            </td>
                            <td class="text-end pe-1">
                              <a href="javascript:void(0)" @click="deleteProductFromListOrderTicket(data.product)" class="p-0 ms-2 text-danger">
                                <span class="fas fa-window-close"></span>
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div class="row pt-2 px-2">
                      <div class="col-md-4 px-2">
                        <div class="mb-1">
                          <label class="form-label mb-0">Priority</label>
                          <select v-model="selectPriorityOrderTicket" class="form-select bg-transparent">
                            <option value="">Pilih priority</option>
                            <option class="text-danger" value="1">Highest</option>
                            <option class="text-warning" value="2">Middled</option>
                            <option class="text-secondary" value="3">Lowest</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-8 px-2">
                        <label class="form-label mb-0">Catatan:</label>
                        <textarea v-model="descriptionOrderTicket" class="form-control" rows="1" placeholder="Tambahkan keterangan jika ada"></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer d-flex align-items-center justify-content-between mb-1">
              <div>
                <nav v-if="tabActivePillTicketOrder == listPillTicketOrder.reguler && totalPageProductOrderTicket > 1" aria-label="Page navigation example">
                  <ul class="pagination pagination-sm m-0">
      
                    <li v-if="displayedPageProductOrderTicket[0] > 1">
                      <a class="page-link" href="javascript:void(0)" @click="fatchDataProductOrderTicket()">First</a>
                    </li>
      
                    <li class="page-item" :class="{ 'disabled': currentPageProductOrderTicket === 1 }">
                      <a class="page-link" href="javascript:void(0)" aria-label="Previous" @click="fatchDataProductOrderTicket(currentPageProductOrderTicket - 1)">
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>
      
                    <li v-for="pageNumber in displayedPageProductOrderTicket" :key="pageNumber" class="page-item" :class="{ 'active': pageNumber === currentPageProductOrderTicket }">
                      <a class="page-link" href="javascript:void(0)" @click="fatchDataProductOrderTicket(pageNumber)">{{ pageNumber }}</a>
                    </li>
      
                    <li class="page-item" :class="{ 'disabled': currentPageProductOrderTicket === totalPageProductOrderTicket }">
                      <a class="page-link" href="javascript:void(0)" aria-label="Next" @click="fatchDataProductOrderTicket(currentPageProductOrderTicket + 1)">
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
      
                    <li v-if="displayedPageProductOrderTicket[displayedPageProductOrderTicket.length - 1] < totalPageProductOrderTicket">
                      <a class="page-link" href="javascript:void(0)" @click="fatchDataProductOrderTicket(totalPageProductOrderTicket)">Last</a>
                    </li>
      
                  </ul>
                </nav>
              </div>

              <div v-if="tabActivePillTicketOrder == listPillTicketOrder.listadd">
                <button class="btn btn-secondary btn-sm" type="button" data-bs-dismiss="modal" aria-label="Close">Tutup</button>
                <button class="btn btn-sm ms-2" :class="listDataProductForCreateTicket.length > 0 ? 'btn-success' : 'btn-secondary'" type="button" :disabled="listDataProductForCreateTicket.length == 0" @click="btnContinueCreateTicketOrder()">Selesai</button>
              </div>
              <div v-else>
                <button class="btn btn-secondary btn-sm" type="button" data-bs-dismiss="modal" aria-label="Close">Tutup</button>
                <button class="btn btn-sm btn-success ms-2" type="button" @click="tabActivePillTicketOrder = listPillTicketOrder.listadd">Lanjut</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Modal konfirmasi untuk lanjut membuatkan tiket booking -->
      <div class="modal fade" id="modalConfirmCreateTicket" tabindex="0" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 400px">
          <div class="modal-content position-relative">
            <div class="modal-body p-0 pb-2">
              <div class="rounded-top-3 py-3 bg-body-tertiary text-center">
                <h3 class="mb-1" id="modalExampleDemoLabel">Konfirmasi Buat Tiket</h3>
              </div>
              <div class="py-2 text-center">
                <div class="d-flex justify-content-center mb-2">
                  <img src="@/assets/img/icons/Gif/info-icon.gif" height="60" alt="">
                </div>
                <h5 class="m-0 px-1">
                  Yakin ingin lanjut membuat tiket?
                </h5>
                <p class="m-0 px-3">
                  Pastikan bahwa konsumen mengingat nomor tiket.
                </p>
              </div>
            </div>
            <div class="modal-footer d-flex justify-content-center">
              <button class="btn btn-secondary btn-sm" type="button" data-bs-dismiss="modal">Batal</button>
              <button class="btn btn-primary btn-sm" type="submit" @click="confirmasiBuatTiket()">Buat</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal menunjukkan nomor tiket -->
      <div class="modal fade" id="showCreateNoTicket" tabindex="0" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 400px">
          <div class="modal-content position-relative">
            <div class="modal-body p-0 pb-2">
              <div class="py-2 text-center">
                <div class="d-flex justify-content-center mb-0">
                  <img src="@/assets/img/icons/Gif/success-gif.gif" height="120" alt="">
                </div>
                <u class="m-0">No Tiket:</u>
                <h2 class="m-0 mb-2 px-1">
                  "{{ numberTicketOrder }}"
                </h2>
                <p class="m-0 px-4">
                  Tiket order berhasil dibuat! Pastikan bahwa konsumen mengingat nomor tiket.
                </p>
              </div>
            </div>
            <div class="modal-footer d-flex justify-content-center">
              <button class="btn btn-success btn-sm" type="button" data-bs-dismiss="modal">Selesai</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal show list ticket active -->
      <div class="modal fade" id="modalListTicket" tabindex="-1" aria-hidden="true" data-bs-keyboard="false" data-bs-backdrop="static">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document" style="max-width: 700px;">
          <div class="modal-content position-relative border-0">
            <div class="modal-body p-0">
              <div class="card">
                <div class="bg-holder bg-card" style="background-image:url('assets/img/illustration/corner-5i.png'); background-position: left; background-size: cover;"></div>
                <div class="card-body position-relative p-0">
                  <div class="position-absolute top-0 end-0 mt-2 me-3 z-1">
                    <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="card-header rounded-top-3 py-3 ps-3 pe-6">
                    <h5 class="m-0">Daftar List Tiket</h5>
                    <p class="m-0 fs--1">Daftar ticket order <strong>{{ $root.formatDateIdn(currentTime) }}</strong></p>
                  </div>
                  <div class="px-2">
                    <div class="d-block d-md-none mb-3">
                      <div v-if="showLoadingTicket" class="text-center my-1">
                        <component :is="loadingBlack"></component>
                      </div>
                      <div v-if="dataFilterAllTicket.length > 0 && !showLoadingTicket" class="scrollable-customize" style="min-height: 1vh; max-height: 45vh;">
                        <div class="card mb-3" v-for="(ticket, index) in dataFilterAllTicket" @click="clickRowTicketList(ticket)">
                          <div class="card-header px-2 py-1">
                            <div class="d-flex justify-content-between">
                              <div>
                                <u class="fs--1">member:</u>
                              </div>
                              <div>
                                <span class="fs--1">
                                  BA: {{ ticket.user.nama_lengkap }}
                                </span>
                              </div>
                            </div>
                            <h5 class="fs-0 m-0">
                              {{ ticket.member ? ticket.member.nama : 'Unknown' }}
                              ({{ ticket.member && ticket.member.no_hp }})
                            </h5>
                            
                            <div>
                              <u class="fs--1">Ticket:</u>
                              <div class="customn-scrollable-x">
                                <span class="badge badge-subtle-primary me-2" v-for="no_ticket in ticket.no_ticket">
                                  {{ no_ticket.no_ticket }}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div v-if="dataFilterAllTicket.length == 0 && !showLoadingTicket" class="text-center my-2">
                        <h5 class="fs-0"><i>Tidak ada tiket terdaftar</i></h5>
                      </div>
                    </div>

                    <div class="d-none d-md-block table-scrollable-wrapper" style="min-height: 1vh; max-height: 30vh;">
                      <table class="table table-sm table-scrollable table-hover">
                        <thead>
                          <tr>
                            <!-- <th class="bg-white">Tipe</th> -->
                            <th class="bg-white">#</th>
                            <th class="bg-white">BA</th>
                            <th class="bg-white">Member</th>
                            <th class="bg-white">No Hp</th>
                            <th class="bg-white">Tiket</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-if="showLoadingTicket">
                            <td class="text-center" colspan="5">
                              <component :is="loadingBlack"></component>
                            </td>
                          </tr>
                          <tr v-if="dataFilterAllTicket.length > 0 && !showLoadingTicket" v-for="(ticket, index) in dataFilterAllTicket" :key="ticket.no_ticket" style="cursor: pointer;" @click="clickRowTicketList(ticket)">
                            <td>{{ index+1 }}</td>
                            <td>{{ ticket.user.nama_lengkap }}</td>
                            <td>
                              <span :class="ticket.member == null && 'fst-italic'">
                                {{ ticket.member ? ticket.member.nama : 'Unknown' }}
                              </span>
                            </td>
                            <td>
                              <span :class="ticket.member == null && 'fst-italic'">
                                {{ ticket.member ? ticket.member.no_hp : 'Unknown' }}
                              </span>
                            </td>
                            <td>
                              <span class="badge badge-subtle-primary mx-1" v-for="ticket in ticket.no_ticket">
                                {{ ticket.no_ticket }}
                              </span>
                            </td>
                          </tr>
                          <tr v-if="dataFilterAllTicket.length == 0 && !showLoadingTicket">
                            <td class="text-center" colspan="5">
                              <h5 class="fs-0"><i>Tidak ada tiket terdaftar</i></h5>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal choose ticket number to execute -->
      <div class="modal fade" id="modalChooseTicketNumberToExecute" tabindex="0" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 350px">
          <div class="modal-content position-relative">
            <div class="card-header rounded-top-3 p-3 pb-0 text-center">
              <h5 class="m-0">Choose Tiket's</h5>
              <p class="m-0 fs--1">Select ticket to find</p>
            </div>
            <div v-if="selectedRowTicketOrder != null" class="modal-body pt-0">
              <hr class="my-2" />
              <div class="text-center mb-1">
                <a href="javascript:void(0)" class="fs--1" @click="clearIsSelectTicketOrderChoose(selectedRowTicketOrder)">Refresh <span class="fas fa-eraser"></span></a>
              </div>
              <div class="scrollable-customize text-center" style="min-height: 1vh; max-height: 40vh;">
                <span class="badge badge-subtle-primary fs--1 m-2 my-1 cursor-pointer" v-for="(ticket, index) in selectedRowTicketOrder.no_ticket" @click="ticket.isSelected = !ticket.isSelected">
                  No Ticket: {{ ticket.no_ticket }}
                  <span v-if="ticket.isSelected" class="badge rounded-pill badge-subtle-success"><span class="fas fa-check"></span></span>
                </span>
              </div>
            </div>
            <div class="modal-footer d-flex justify-content-center">
              <button class="btn btn-secondary btn-sm" type="button" data-bs-dismiss="modal">Batal</button>
              <button class="btn btn-primary btn-sm" type="button" @click="executeSelectedTicketOrder(selectedRowTicketOrder)">Lanjut</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal list product from ticket selected -->
      <div class="modal fade" id="modalListProductTicketSelected" tabindex="-1" role="dialog" aria-hidden="true" data-bs-keyboard="false" data-bs-backdrop="static">
        <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 1100px">
          <div class="modal-content position-relative">
            <div class="position-absolute top-0 end-0 mt-2 me-2 z-1">
              <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0 px-3">
              <div class="rounded-top-3 py-3 pe-6 bg-body-tertiary">
                <h5 class="mb-1">Product List Ticket </h5>
              </div>
              
              <div class="scrollable-customize" style="min-height: 1vh; max-height: 67vh;">
                <div class="row m-0">
                  <div class="col-md-6 p-2" v-for="(data, index) in listDataProductDetailSelectTicket">
                    <div class="card mb-2" :id="`cardProductOrderTicket_${index}`">
                      <div class="card-header p-2">
                        <div class="d-flex justify-content-between mb-1">
                          <div>
                            <span class="badge badge-subtle-secondary px-1 fs--2 fw-bold" style="font-weight: normal;">
                              {{ data.product.itemCode }}
                            </span>
                          </div>
                          <div v-if="data.is_promo_product">
                            <span class="badge rounded-pill fs--3 me-1" :class="'bg-' + data.is_promo_product.master_promo_product.master_kode_promo_product.badge">
                              {{ data.is_promo_product.master_promo_product.master_kode_promo_product.nama_promo }}
                            </span>
                            <span v-if="data.is_promo_product.master_promo_product.tipe_promo == master_coll.tipePromo.bundle" class="badge bg-warning rounded-pill fs--3">
                              {{ data.is_promo_product.master_promo_product.buy_item }} Get {{ data.is_promo_product.master_promo_product.get_item }}
                            </span>
                            <span v-if="data.is_promo_product.master_promo_product.tipe_promo == master_coll.tipePromo.percent" class="badge bg-danger rounded-pill fs--3">
                              -{{ data.is_promo_product.master_promo_product.percent }}%
                            </span>
                          </div>
                        </div>
                        <h5 class="fs-0 mb-0">
                          {{ index + 1 }}.
                          {{ data.product.itemName }}
                        </h5>
                        <!-- <span class="text-warning fw-semi-bold">
                          Rp {{ $root.formatPrice(data.product.all_product_price[0].price) }}
                        </span> -->
                        
                        <div>
                          <div class="d-flex justify-content-between mb-1">
                            <!-- <div><label class="m-0">Batch:</label></div> -->
                            <div>
                              <span class="fs--2 me-1">Req.Qty: </span>
                              <strong>{{ data.qty }}</strong>
                              <!-- <div class="d-flex">
                                <input class="form-control p-0 ps-2 fs--1 set-text-bold" type="number" min="1" :value="data.qty" style="width: 60px;">
                              </div> -->
                            </div>
                            <a href="javascript:void(0)" class="text-warning px-2 py-0 fs--1" @click="searchFindBatchProductListOrderTicket(data)">
                              Batch <span class="fas fa-receipt"></span>
                            </a>
                          </div>
                          <div class="table-scrollable-wrapper" style="min-height: 1vh; max-height: 15vh;">
                            <table class="table table-scrollable table-sm">
                              <thead>
                                <tr class="fs--1">
                                  <th class="bg-white">#</th>
                                  <th class="bg-white">Batch Number</th>
                                  <th class="bg-white">Exp.Date</th>
                                  <th class="bg-white">Qty</th>
                                  <th class="bg-white text-end">
                                    <a href="javascript:void(0)" @click="emptySelecteBatchProductOrderList(data)" class="p-0 ms-2 text-danger">
                                      <span class="fas fa-trash-alt"></span>
                                    </a>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-if="!data.selectBatch || data.selectBatch.length === 0">
                                  <td class="text-center" style="border: none;" colspan="4">
                                    <i class="m-0 fs--1">No product batch add</i>
                                  </td>
                                </tr>
                                <tr class="fs--1" v-for="(dataBatch, index) in data.selectBatch">
                                  <td>{{ index + 1 }}</td>
                                  <td>{{ dataBatch.batch.batchNo }}</td>
                                  <td>{{ dataBatch.batch.expiredDate }}</td>
                                  <td>
                                    <input v-model="dataBatch.qty" class="form-control p-0 ps-2 fs--1 set-text-bold" type="number" min="1" style="width: 60px;">
                                  </td>
                                  <td class="text-end">
                                    <a href="javascript:void(0)" @click="deleteSelecteBatchProductOrderList(data, dataBatch, index)" class="p-0 ms-2 text-danger">
                                      <span class="fas fa-window-close"></span>
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer mb-1">
              <button class="btn btn-secondary btn-sm" type="button" data-bs-dismiss="modal" aria-label="Close">Tutup</button>
              <button class="btn btn-primary btn-sm" type="button" @click="moveOrderListTicketProductToCart()">Selesai</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Modal show batch product order list ticket -->
      <div class="modal fade" id="modalShowBatchProductOrderListTicket" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 500px">
          <div class="modal-content position-relative">
            <div class="position-absolute top-0 end-0 mt-2 me-2 z-1">
              <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0">
              <div class="rounded-top-3 py-3 ps-4 pe-6 bg-body-tertiary">
                <h5 class="mb-1" id="modalExampleDemoLabel">Batch product </h5>
              </div>
              <div v-if="dataShowBatchProductOrdetTicketToSelect != null" class="px-3 pb-3">
                <div class="scrollable-customize mb-2" style="min-height: 1vh; max-height: 70vh;">
                  <!-- For Promo Product -->
                  <div v-if="dataShowBatchProductOrdetTicketToSelect.is_promo_product">
                    <div v-if="dataShowBatchProductOrdetTicketToSelect.batch.length > 0" class="card cursor-pointer mt-3" v-for="batch in dataShowBatchProductOrdetTicketToSelect.batch" @click="addSelectBatchProductListOrderTicket(dataShowBatchProductOrdetTicketToSelect, batch)">
                      <div class="bg-holder bg-card" style="background-image:url('assets/img/illustration/corner-4.png'); background-size: auto;"></div>
                      <div class="card-header position-relative py-2 px-3">
                        <div class="row align-items-center">
                          <div class="col-md-4">
                            <span class="fs--2"><u>Batch Number:</u></span>
                            <h4 class="mb-0">{{ batch.batchNo ?? '-' }}</h4>
                            <span v-if="batch.isSelected" class="badge rounded-pill fw-medium badge-subtle-success py-1 fs--2 me-1">
                              <span class="fas fa-check"></span> Dipilih
                              <!-- <a href="javascript:void(0)" class="text-danger" @click="deleteProductFromListOrderTicket(product)">
                                <span class="fas fa-window-close"></span>
                              </a> -->
                            </span>
                          </div>
                          <div class="col-md-8 text-end fs--1">
                            <p class="m-0">Exp Date: <strong>{{ batch.expiredDate ? $root.formatDate(batch.expiredDate) : '-' }}</strong></p>
                            <p class="m-0">Warehouse: <strong>{{ batch.master_warehouse ? `${batch.master_warehouse.whsName} (${batch.master_warehouse.whsCode})` : '-' }}</strong></p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else class="text-center mt-3">
                      <span><i>Product Batch Not Found!</i></span>
                    </div>
                  </div>
      
                  <!-- For Regular Product -->
                  <div v-else>
                    <div v-if="dataShowBatchProductOrdetTicketToSelect.batch.length > 0" class="card cursor-pointer mt-3" v-for="batch in dataShowBatchProductOrdetTicketToSelect.batch" @click="addSelectBatchProductListOrderTicket(dataShowBatchProductOrdetTicketToSelect, batch)">
                      <div class="bg-holder bg-card" style="background-image:url('assets/img/illustration/corner-4.png'); background-size: auto;"></div>
                      <div class="card-header position-relative py-2 px-3">
                        <div class="row align-items-center">
                          <div class="col-md-4">
                            <span class="fs--2"><u>Batch Number:</u></span>
                            <h4 class="mb-0">{{ batch.batchNo ?? '-' }}</h4>
                            <span v-if="batch.isSelected" class="badge rounded-pill fw-medium badge-subtle-success py-1 fs--2 me-1">
                              <span class="fas fa-check"></span> Dipilih
                              <!-- <a href="javascript:void(0)" class="text-danger" @click="deleteProductFromListOrderTicket(product)">
                                <span class="fas fa-window-close"></span>
                              </a> -->
                            </span>
                          </div>
                          <div class="col-md-8 text-end fs--1">
                            <p class="m-0">Exp Date: <strong>{{ batch.expiredDate ? $root.formatDate(batch.expiredDate) : '-' }}</strong></p>
                            <p class="m-0">Warehouse: <strong>{{ batch.master_warehouse ? `${batch.master_warehouse.whsName} (${batch.master_warehouse.whsCode})` : '-' }}</strong></p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else class="text-center mt-3">
                      <span><i>Product Batch Not Found!</i></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="offcanvas offcanvas-end" id="canvasShowDetailProduct" tabindex="-1" aria-labelledby="canvasShowDetailProductLabel">
        <!-- Header nama product dan btn close -->
        <div v-if="productShowDetail" class="offcanvas-header pb-0 align-items-start">
          <h5>
            {{ productShowDetail.promo_product_id ? productShowDetail.for_product.itemName : productShowDetail.itemName }}
            <span class="badge badge-subtle-secondary fs--1 fw-bold mb-3" style="font-weight: normal;">
              {{ productShowDetail.promo_product_id ? productShowDetail.for_product.itemCode : productShowDetail.itemCode }}
            </span>
            
            <!-- <button @click="$root.copyTextClipboard(productShowDetail.promo_product_id ? productShowDetail.for_product.itemCode : productShowDetail.itemCode, 'Item code')" class="btn btn-sm p-0 ps-1" style="border: none;">
              <span class="fas fa-copy"></span>
            </button> -->
          </h5>
          <button class="btn-close text-reset mt-1" type="button" data-bs-dismiss="offcanvas" aria-label="Close" @click="productShowDetail = null"></button>
        </div>
        
        <!-- Image gambar product -->
        <div v-if="productShowDetail">
          <div v-if="productShowDetail.promo_product_id">
            <img v-if="productShowDetail.for_product.imageUrl != null && productShowDetail.for_product.imageUrl.trim() != ''" class="img-fluid rounded" :src="productShowDetail.for_product.imageUrl" style="width: 100%; height: 200px;" alt="" />
            <img v-else class="img-fluid rounded" src="@/assets/img/product/no_image.jpg" style="width: 100%; height: 200px; object-fit: fill;" alt="" />
          </div>
          <div v-else>
            <img v-if="productShowDetail.imageUrl != null && productShowDetail.imageUrl.trim() != ''" class="img-fluid rounded" :src="productShowDetail.imageUrl" style="width: 100%; height: 200px;" alt="" />
            <img v-else class="img-fluid rounded" src="@/assets/img/product/no_image.jpg" style="width: 100%; height: 200px; object-fit: fill;" alt="" />
          </div>
        </div>
        
        <!-- Budge juka product mempunyai promo atau diskon -->
        <div v-if="productShowDetail" class="offcanvas-header justify-content-start pt-1 pb-1">
          <div v-if="productShowDetail.promo_product_id">
            <span v-if="productShowDetail.master_promo_product.tipe_promo == master_coll.tipePromo.bundle" class="badge bg-warning rounded-pill px-2 fs--2">
              Buy {{ productShowDetail.master_promo_product.buy_item }} Get {{ productShowDetail.master_promo_product.get_item }}
            </span>
            <span v-if="productShowDetail.master_promo_product.tipe_promo == master_coll.tipePromo.percent" class="badge bg-danger rounded-pill px-2 fs--2">
              -{{ productShowDetail.master_promo_product.percent }}%
            </span>
            
            <span class="badge rounded-pill px-2 fs--2 ms-1" :class="'bg-' + productShowDetail.master_promo_product.master_kode_promo_product.badge">
              {{ productShowDetail.master_promo_product.master_kode_promo_product.nama_promo }}
            </span>
          </div>
          <div v-else>
            <span v-if="$root.filterDiskonProduct(productShowDetail).discCode != master_code.diskon.tanpa_diskon_code" class="badge bg-danger rounded-pill px-2 fs--2">
              -{{ productShowDetail.product_diskon.discount }}%
            </span>
          </div>
        </div>

        <!-- Detail info product dan stok -->
        <div v-if="productShowDetail" class="offcanvas-header align-items-start justify-content-between pt-0 pb-2">
          <div v-if="productShowDetail.promo_product_id">
            <div v-for="detail in productShowDetail.for_product.all_product_detail">
              <span class="fs--1 mb-0">{{ detail.optionalName }} Produk: </span>
              <p class="mb-1">
                <strong>
                  {{ detail.optDtlName }} ({{ detail.optDtlCode }})
                </strong>
              </p>
            </div>
          </div>
          <div v-else>
            <div v-for="detail in productShowDetail.all_product_detail">
              <span class="fs--1 mb-0">{{ detail.optionalName }} Produk: </span>
              <p class="mb-1">
                <strong>
                  {{ detail.optDtlName }} ({{ detail.optDtlCode }})
                </strong>
              </p>
            </div>
          </div>
          <div class="text-end">
            <span class="fs--1 mb-0">Stok Tersedia: </span>
            <p class="mb-1">
              <span class="badge badge-subtle-success fs-0">{{ productShowDetail.promo_product_id ? productShowDetail.for_product.all_inventory_stok[0].onHand : $root.filterStokProduct(productShowDetail).onHand }}</span>
            </p>
          </div>
        </div>

        <!-- Header text label deskripsi -->
        <div v-if="productShowDetail" class="offcanvas-header py-0">
          <span class="fs--1 mb-1">Deskripsi Produk: </span>
        </div>

        <!-- Deskripsi -->
        <div v-if="productShowDetail" class="offcanvas-body pt-0">
          <p v-if="productShowDetail.deskripsi == null || productShowDetail.deskripsi.trim() == ''" class="mb-1">
            {{ productShowDetail.promo_product_id ? productShowDetail.for_product.deskripsi : 'Deskripsi tidak ditemukan!' }}
          </p>
          <p v-else>
            {{ productShowDetail.deskripsi }}
          </p>
        </div>

        <!-- Footer harga, quntity, dan btn tambah -->
        <div v-if="productShowDetail" class="d-flex justify-content-between align-items-center p-3">
          <div v-if="productShowDetail.promo_product_id">
            <h5 v-if="productShowDetail.master_promo_product.tipe_promo == master_coll.tipePromo.bundle" class="text-warning mb-0">
              Rp {{ $root.formatPrice(productShowDetail.for_product.all_product_price[0].price) }}
            </h5>
            <span v-if="productShowDetail.master_promo_product.tipe_promo == master_coll.tipePromo.percent" class="fs--1">
              <del>Rp {{ $root.formatPrice(productShowDetail.for_product.all_product_price[0].price) }}</del>
            </span>
            <h5 v-if="productShowDetail.master_promo_product.tipe_promo == master_coll.tipePromo.percent" class="text-warning mb-0">
              Rp {{ $root.formatPrice(productShowDetail.for_product.all_product_price[0].price - (productShowDetail.for_product.all_product_price[0].price * (productShowDetail.master_promo_product.percent/100))) }}
            </h5>
          </div>
          <div v-else>
            <div v-if="$root.filterDiskonProduct(productShowDetail).discCode != master_code.diskon.tanpa_diskon_code">
              <span class="fs--1">
                <del>Rp {{ $root.formatPrice(productShowDetail.product_price.price) }}</del>
              </span>
              <h5 class="text-warning mb-0">
                Rp {{ $root.formatPrice(productShowDetail.product_price.price - (productShowDetail.product_price.price * (productShowDetail.product_diskon.discount/100))) }}
              </h5>
            </div>
            <div v-else>
              <h5 class="text-warning mb-0">
                Rp {{ $root.formatPrice($root.filterPriceProduct(productShowDetail).price) }}
              </h5>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <input class="form-control p-0 ps-2 me-2" type="number" min="1" :value="qtyProductShowDetail" style="width: 60px;" @input="incDecQtyInputCanvas($event)" @change="incDecQtyChangeCanvas($event)">
            <button v-on:click="validateModalBatchProduct(productShowDetail, qtyProductShowDetail)" class="btn btn-primary px-2" type="button" data-bs-dismiss="offcanvas" aria-label="Close">
              Tambah <span class="fas fa-cart-plus" data-fa-transform="shrink-3"></span>
            </button>
          </div>
        </div>
      </div>

      <!-- Canvas List Product In Order -->
      <div class="offcanvas offcanvas-end" id="offcanvasListOrderProduct" data-bs-scroll="true" tabindex="-1" aria-labelledby="offcanvasListOrderProductLabel">
        <div class="offcanvas-header align-items-start pb-0">
          <h5 class="offcanvas-title mb-0" id="offcanvasListOrderProductLabel">
            Order item list
            <p class="fs--1 m-0">
              {{ dataProductInList.length > 0 ? dataProductInList.length : '0' }} item{{ dataProductInList.length > 1 ? 's' : '' }} <span v-if="dataProductInList.length > 0">({{ totalPcsItemOrder }} pcs)</span>
            </p>
          </h5>
          <button class="btn-close text-reset mt-1" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body pt-0">
          <div class="text-end">
            <a href="javascript:void(0)" class="fs--1 mb-1 text-danger" @click="emptyProductList()"><u>Remove <span class="fas fa-trash-alt"></span></u></a>
          </div>

          <div class="text-center border-top border-400" v-if="!dataProductInList || dataProductInList.length === 0">
            <img class="pt-4 pb-1" src="@/assets/img/mtsiconland.png" width="200" alt="" />
            <p><i>Tidak ada product dalam list</i></p>
          </div>

          <div class="d-none d-md-block">
            <div v-for="(data, index) in dataProductInList" :key="index" class="row border-bottom border-top border-400 py-2">
              <div class="col-3">
                <div v-if="data.is_promo_product">
                  <img v-if="data.is_promo_product.for_product.imageUrl != null && data.is_promo_product.for_product.imageUrl.trim() != ''" class="img-fluid rounded" :src="data.is_promo_product.for_product.imageUrl" style="width: 100%; height: 70px; object-fit: cover" alt="" />
                  <img v-else class="img-fluid rounded" src="@/assets/img/product/no_image.jpg" style="width: 100%; height: 70px; object-fit: cover" alt="" />
                </div>
                <div v-else>
                  <img v-if="data.product.imageUrl != null && data.product.imageUrl.trim() != ''" class="img-fluid rounded" :src="data.product.imageUrl" style="width: 100%; height: 70px; object-fit: cover" alt="" />
                  <img v-else class="img-fluid rounded" src="@/assets/img/product/no_image.jpg" style="width: 100%; height: 70px; object-fit: cover" alt="" />
                </div>
              </div>
              <div class="col-9">
                <h5 class="text-900 fs-0 mb-0"> 
                  {{ data.product.itemName }}
                  <span v-if="data.is_promo_product" class="badge rounded-pill p-1 px-2 fs--3 ms-1" :class="'bg-' + data.is_promo_product.master_promo_product.master_kode_promo_product.badge">
                    {{ data.is_promo_product.master_promo_product.master_kode_promo_product.nama_promo }}
                  </span>
                </h5>
                <div class="d-flex justify-content-between">
                  <div>
                    <span class="badge badge-subtle-secondary fw-bold py-1">
                      {{ data.product.itemCode }}
                    </span>
                  </div>
                  <span class="text-warning">
                    Rp 
                    <span v-if="data.is_promo_product">
                      <span v-if="data.is_promo_product.master_promo_product.tipe_promo == master_coll.tipePromo.bundle">
                        {{ $root.formatPrice(data.is_promo_product.for_product.all_product_price[0].price) }}
                      </span>
                      <span v-if="data.is_promo_product.master_promo_product.tipe_promo == master_coll.tipePromo.percent">
                        {{ $root.formatPrice(data.is_promo_product.for_product.all_product_price[0].price - (data.is_promo_product.for_product.all_product_price[0].price * (data.is_promo_product.master_promo_product.percent/100))) }}
                      </span>
                    </span>
                    <span v-else>
                      <span v-if="$root.filterDiskonProduct(data.product).discCode == master_code.diskon.tanpa_diskon_code">
                        {{ $root.formatPrice($root.filterPriceProduct(data.product).price) }}
                      </span>
                      <span v-else>
                        {{ $root.formatPrice($root.filterPriceProduct(data.product).price - ($root.filterPriceProduct(data.product).price * ($root.filterDiskonProduct(data.product).discount/100))) }}
                      </span>
                    </span>
                  </span>
                </div>
              </div>
  
              <div class="col-12 mt-2">
                <p class="d-flex justify-content-between align-items-center my-0">
                  <div class="fs--1">Info Tambahan</div>
                  <div class="fs--1">
                    <span v-if="data.is_free_product" class="badge bg-danger rounded-pill p-1">
                      FREE
                    </span>
                    <span v-if="data.is_promo_product">
                      <span v-if="data.is_promo_product.master_promo_product.tipe_promo == master_coll.tipePromo.percent" class="badge badge-subtle-danger rounded-pill p-1 fs--2">
                        -{{ data.is_promo_product.master_promo_product.percent }}%
                      </span>
                      <span v-if="data.is_promo_product.master_promo_product.tipe_promo == master_coll.tipePromo.bundle" class="badge badge-subtle-warning rounded-pill p-1 fs--2">
                        Buy {{ data.is_promo_product.master_promo_product.buy_item }} Get {{ data.is_promo_product.master_promo_product.get_item }}
                      </span>
                    </span>
                    <span v-else>
                      <span v-if="$root.filterDiskonProduct(data.product).discCode != master_code.diskon.tanpa_diskon_code" class="badge badge-subtle-danger rounded-pill p-1 fs--2">
                        -{{ $root.filterDiskonProduct(data.product).discount }}%
                      </span>
                      <strong v-else>-</strong>
                    </span>
                  </div>
                </p>
                <p class="d-flex justify-content-between align-items-center my-0">
                  <span class="fs--1">Batch Number</span>
                  <span class="fs--1">
                    <strong>{{ data.batch.batchNo }}</strong>
                  </span>
                </p>
                <p class="d-flex justify-content-between align-items-center my-0">
                  <span class="fs--1">Exp Date</span>
                  <span class="fs--1">
                    <strong>{{ $root.formatDate(data.batch.expiredDate) }}</strong>
                  </span>
                </p>
                <p class="d-flex justify-content-between align-items-center my-0">
                  <div>
                    <a v-if="data.is_ticket" href="javascript:void(0)" class="p-0 fs--1 text-secondary" style="cursor: not-allowed;">
                      Remove
                    </a>
                    <a v-else href="javascript:void(0)" @click="deleteProductById(data, data.batch, index)" class="p-0 fs--1 text-danger">
                      Remove
                    </a>
                  </div>
                  <div>
                    <input class="form-control p-0 ps-2 set-text-bold" type="number" min="1" :value="data.qty" style="width: 60px;" 
                    @input="incDecQtyInput($event, data, data.batch)"
                    @change="incDecQtyChange($event, data, data.batch)"
                    :disabled="data.is_ticket">
                  </div>
                </p>
              </div>
            </div>
          </div>
          
          <div class="d-xl-none">
            <div class="scrollable-customize" style="min-height: 1vh; max-height: 50vh;">
              <div v-for="(data, index) in dataProductInList" :key="index" class="row gx-1 mx-0 border-bottom border-top border-400 py-2">
                <div class="col-3">
                  <div v-if="data.is_promo_product">
                    <img v-if="data.is_promo_product.for_product.imageUrl != null && data.is_promo_product.for_product.imageUrl.trim() != ''" class="img-fluid rounded" :src="data.is_promo_product.for_product.imageUrl" style="width: 100%; height: 70px; object-fit: cover" alt="" />
                    <img v-else class="img-fluid rounded" src="@/assets/img/product/no_image.jpg" style="width: 100%; height: 70px; object-fit: cover" alt="" />
                  </div>
                  <div v-else>
                    <img v-if="data.product.imageUrl != null && data.product.imageUrl.trim() != ''" class="img-fluid rounded" :src="data.product.imageUrl" style="width: 100%; height: 70px; object-fit: cover" alt="" />
                    <img v-else class="img-fluid rounded" src="@/assets/img/product/no_image.jpg" style="width: 100%; height: 70px; object-fit: cover" alt="" />
                  </div>
                </div>
                <div class="col-9">
                  <h5 class="text-900 fs-0 mb-0"> 
                    {{ data.product.itemName }}
                    <span v-if="data.is_promo_product" class="badge rounded-pill p-1 px-2 fs--3 ms-1" :class="'bg-' + data.is_promo_product.master_promo_product.master_kode_promo_product.badge">
                      {{ data.is_promo_product.master_promo_product.master_kode_promo_product.nama_promo }}
                    </span>
                  </h5>
                  <div class="d-flex justify-content-between">
                    <div>
                      <span class="badge badge-subtle-secondary fw-bold py-1">
                        {{ data.product.itemCode }}
                      </span>
                    </div>
                    <span class="text-warning">
                      Rp 
                      <span v-if="data.is_promo_product">
                        <span v-if="data.is_promo_product.master_promo_product.tipe_promo == master_coll.tipePromo.bundle">
                          {{ $root.formatPrice(data.is_promo_product.for_product.all_product_price[0].price) }}
                        </span>
                        <span v-if="data.is_promo_product.master_promo_product.tipe_promo == master_coll.tipePromo.percent">
                          {{ $root.formatPrice(data.is_promo_product.for_product.all_product_price[0].price - (data.is_promo_product.for_product.all_product_price[0].price * (data.is_promo_product.master_promo_product.percent/100))) }}
                        </span>
                      </span>
                      <span v-else>
                        <span v-if="$root.filterDiskonProduct(data.product).discCode == master_code.diskon.tanpa_diskon_code">
                          {{ $root.formatPrice($root.filterPriceProduct(data.product).price) }}
                        </span>
                        <span v-else>
                          {{ $root.formatPrice($root.filterPriceProduct(data.product).price - ($root.filterPriceProduct(data.product).price * ($root.filterDiskonProduct(data.product).discount/100))) }}
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
    
                <div class="col-12 mt-2">
                  <p class="d-flex justify-content-between align-items-center my-0">
                    <div class="fs--1">Info Tambahan</div>
                    <div class="fs--1">
                      <span v-if="data.is_free_product" class="badge bg-danger rounded-pill p-1">
                        FREE
                      </span>
                      <span v-if="data.is_promo_product">
                        <span v-if="data.is_promo_product.master_promo_product.tipe_promo == master_coll.tipePromo.percent" class="badge badge-subtle-danger rounded-pill p-1 fs--2">
                          -{{ data.is_promo_product.master_promo_product.percent }}%
                        </span>
                        <span v-if="data.is_promo_product.master_promo_product.tipe_promo == master_coll.tipePromo.bundle" class="badge badge-subtle-warning rounded-pill p-1 fs--2">
                          Buy {{ data.is_promo_product.master_promo_product.buy_item }} Get {{ data.is_promo_product.master_promo_product.get_item }}
                        </span>
                      </span>
                      <span v-else>
                        <span v-if="$root.filterDiskonProduct(data.product).discCode != master_code.diskon.tanpa_diskon_code" class="badge badge-subtle-danger rounded-pill p-1 fs--2">
                          -{{ $root.filterDiskonProduct(data.product).discount }}%
                        </span>
                        <strong v-else>-</strong>
                      </span>
                    </div>
                  </p>
                  <p class="d-flex justify-content-between align-items-center my-0">
                    <span class="fs--1">Batch Number</span>
                    <span class="fs--1">
                      <strong>{{ data.batch.batchNo }}</strong>
                    </span>
                  </p>
                  <p class="d-flex justify-content-between align-items-center my-0">
                    <span class="fs--1">Exp Date</span>
                    <span class="fs--1">
                      <strong>{{ $root.formatDate(data.batch.expiredDate) }}</strong>
                    </span>
                  </p>
                  <p class="d-flex justify-content-between align-items-center my-0">
                    <div>
                      <a v-if="data.is_ticket" href="javascript:void(0)" class="p-0 fs--1 text-secondary" style="cursor: not-allowed;">
                        Remove
                      </a>
                      <a v-else href="javascript:void(0)" @click="deleteProductById(data, data.batch, index)" class="p-0 fs--1 text-danger">
                        Remove
                      </a>
                    </div>
                    <div>
                      <input class="form-control p-0 ps-2 set-text-bold" type="number" min="1" :value="data.qty" style="width: 60px;" 
                      @input="incDecQtyInput($event, data, data.batch)"
                      @change="incDecQtyChange($event, data, data.batch)"
                      :disabled="data.is_ticket">
                    </div>
                  </p>
                </div>
              </div>
            </div>
            <hr />
            <h5 class="card-title text-center mb-1 fs-0">Member Overview</h5>
            <div class="text-center mb-2">
              <button @click="openModalFindOrRegis()" class="btn btn-outline-primary btn-sm me-1" type="button">
                Find Member
                <span class="fas fa-search"></span>
              </button>
              <button @click="memberOverview = null; switchBoxSendEamil = false" class="btn btn-outline-secondary btn-sm me-1" type="button">
                <span class="fas fa-redo-alt"></span>
              </button>
            </div>

            <div class="card mb-3" :class="{'border-red' : invalidMemberSelect}">
              <div class="bg-holder bg-card" style="background-image:url('assets/img/illustration/corner-4.png'); background-size: cover;"></div>
              <div class="card-body position-relative p-2">
                <div class="d-flex justify-content-between mb-0">
                  <p class="mb-0 fs--1">No.Member</p>
                  <span class="text-dark">{{ memberOverview ? memberOverview.member_id : "-" }}</span>
                </div>
                <div class="d-flex justify-content-between mb-0">
                  <p class="mb-0 fs--1">Nama</p>
                  <span class="text-dark">{{ memberOverview ? memberOverview.nama : "-" }}</span>
                </div>
                <div class="d-flex justify-content-between mb-0">
                  <p class="mb-0 fs--1">No Hp</p>
                  <span class="text-dark">
                    {{ memberOverview ? $root.formatPhoneNumber(memberOverview.no_hp) : "-" }}
                    <button v-if="memberOverview" v-on:click="$root.copyTextClipboard(memberOverview.no_hp, 'Nomor handphone')" class="btn btn-sm p-0 ps-1" style="border: none;">
                      <span class="fas fa-copy"></span>
                    </button>
                  </span>
                </div>
                <div class="d-flex justify-content-between mb-0">
                  <p class="mb-0 fs--1">Point</p>
                  <span class="text-dark">{{ memberOverview ? $root.formatPrice(memberOverview.point) : "-" }}</span>
                </div>
                <div class="d-flex justify-content-between mb-0">
                  <p class="mb-0 fs--1">Tipe Member</p>
                  <span v-if="memberOverview" class="badge rounded-pill" :class="memberOverview.tipe_konsumen.slug == master_code.tipeKonsumen.member ? 'badge-subtle-success' : memberOverview.tipe_konsumen.slug == master_code.tipeKonsumen.reseller ? 'badge-subtle-primary' : memberOverview.tipe_konsumen.slug == master_code.tipeKonsumen.karyawan ? 'badge-subtle-warning' : ''">
                    {{ memberOverview.tipe_konsumen.nama_tipe }}
                  </span>
                  <span class="text-dark" v-else>-</span>
                </div>
              </div>
            </div>
            
            <h5 class="card-title text-center mb-1 fs-0">Billing Detail</h5>
            <div class="input-group mb-3">
              <input class="form-control" type="text" placeholder="Voucher code">
              <button class="btn btn-primary card-link">Rp</button>
            </div>
            <hr class="m-0">
            <table class="table fs-0 mb-1">
              <tbody>
                <tr class="border-bottom">
                  <th class="ps-0 py-1" style="font-weight: normal;">Subtotal</th>
                  <th class="pe-0 py-1 text-end text-dark">Rp {{ $root.formatPrice(subTotalPrice) }}</th>
                </tr>
                <tr class="border-bottom">
                  <th class="ps-0 py-1" style="font-weight: normal;">Diskon Voucher </th>
                  <th class="pe-0 py-1 text-end text-dark">
                    <span v-if="diskonPrice > 0">-Rp {{ $root.formatPrice(diskonPrice) }}</span>
                    <span v-else>-</span>
                  </th>
                </tr>
                <tr class="border-bottom">
                  <th class="ps-0 py-1" style="font-weight: normal;">Total </th>
                  <th class="pe-0 py-1 text-end text-warning">Rp {{ $root.formatPrice(totalBayarPrice) }}</th>
                </tr>
              </tbody>
            </table>
            
            <div class="mb-3">
              <div>
                <label class="form-label mb-0 fs--1" for="selectSalesBy">Sales By:</label>
                <select v-model="selectSalesBy" @change="selectMethodPayment = ''" class="form-select mb-0" id="selectSalesBy">
                  <option v-for="sales in dataAllMasterSalesBy" :value="sales.slug">{{ sales.nama_sales }}</option>
                </select>
              </div>
              <div>
                <label class="form-label mb-0 fs--1" for="selectMethodPayment">Metode Pembayaran:</label>
                <select v-model="selectMethodPayment" class="form-select mb-0" :class="{'border-red' : invalidMetodePembayaran}" v-on:change="onChangeSelectedMetodeBayar" id="selectMethodPayment">
                  <option value="">Pilih Metode Bayar</option>
                  <option v-if="selectSalesBy == master_code.salesBy.wi" :value="metodeBayarCash.id">{{ metodeBayarCash.nama }}</option>
                  <option v-if="memberOverview != null && memberOverview.tipe_konsumen.slug == master_code.tipeKonsumen.karyawan" :value="metodeBayarKaryawan.id">
                    {{ metodeBayarKaryawan.nama }}
                  </option>
                  <option v-if="memberOverview != null" :value="metodeBayarRedeemPoint.id">{{ metodeBayarRedeemPoint.nama }}</option>
                  <optgroup label="Transfer Bank">
                    <option v-for="metode in dataMetodeBayarTF" :value="metode.id">{{ metode.nama }}</option>
                  </optgroup>
                  <optgroup v-if="selectSalesBy != master_code.salesBy.selly" label="E-Wallet">
                    <option v-for="metode in dataMetodeBayarEWal" :value="metode.id">{{ metode.nama }}</option>
                  </optgroup>
                  <optgroup v-if="selectSalesBy != master_code.salesBy.selly" label="Kartu Kredit">
                    <option v-for="metode in dataMetodeBayarCC" :value="metode.id">{{ metode.nama }}</option>
                  </optgroup>
                </select>
              </div>
              <div>
                <label class="form-label mb-0 fs--1" for="keterangan_detail">Keterangan:</label>
                <input v-model="keteranganTransaksi" class="form-control" id="keterangan_detail" placeholder="Keterangan jika ada" />
              </div>
            </div>

            <div v-if="$root.deviceInfoAccess != null && $root.deviceInfoAccess.isActive == true">
              <div class="d-grid gap-2">
                <button class="btn btn-success" type="submit" @click="checkConfirmationPayment()">Confirm &amp; Pay</button>
              </div>
              <hr class="mb-2 mt-2">
            </div>
            <!-- <div class="d-grid gap-2">
              <button class="btn btn-info" type="button" data-bs-toggle="modal" data-bs-target="#modalSelectProductForTicket">
                <span class="fas fa-ticket-alt"></span>
                <span class="ms-2 me-1">Buatkan Tiket</span>
                <span v-if="listDataProductForCreateTicket.length > 0" class="badge rounded-pill bg-danger py-1">{{ listDataProductForCreateTicket.length }}</span>
              </button>
            </div> -->
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import axios from "axios";
import { markRaw } from 'vue';
import { IonPage } from '@ionic/vue';

import LoadingBlack from '@/views/components/LoadingBlack.vue';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import imageMts from '@/assets/img/mtsiconland.png';

export default {
  components: { IonPage },
  name: 'Sales',
  data() {
    return {
      master_code: this.$root.master_code,
      master_coll: this.$root.master_coll,
      local_storage: this.$root.local_storage,

      loadingBlack: markRaw(LoadingBlack),
      currentTime: new Date(),

      memberFindOrRegis: true,
      dataAllProducts: [],
      currentPageProduct: 1,
      perPageProduct: 12,
      totalPageProduct: 0,

      allMasterPromoProduct: [],
      dataAllPromoProduct: [],
      currentPagePromoProduct: 1,
      perPagePromoProduct: 10,
      totalPagePromoProduct: 0,
      
      dataFindSubmitDataProduct: [],
      currentPageFindSubmitProduct: 1,
      perPageFindSubmitProduct: 12,
      totalPageFindSubmitProduct: 0,

      dataAllProductsPromo: [],
      dataProductInList: [],
      dataProductListForStruk: [],
      dataAllGelars: [],
      dataAllKodeResellers: [],
      dataAllMasterSalesBy: [],

      dataAllMembers: [],
      currentPageMember: 1,
      perPageMember: 10,
      totalPageMember: 0,

      dataAllTicket: [],
      dataFilterAllTicket: [],

      dataAllMetodeBayar: [],
      metodeBayarCash: {},
      metodeBayarKaryawan: {},
      metodeBayarRedeemPoint: {},
      dataMetodeBayarTF: [],
      dataMetodeBayarEWal: [],
      dataMetodeBayarCC: [],
      dataMoreMetodeBayar: [],
      selectedMetodeBayar: null,
      modelInputSelectedMetodeBayar: '',
      modelInputMoreMetodeBayar:[],
      validasiMetodePembayaran: [],
      checkMetodeCashSelect: false,

      memberOverview: null,

      subTotalPrice: 0,
      diskonPrice: 0,
      totalBayarPrice: 0,
      totalDiscountPromo: 0,
      afterDiscountPromo: 0,
      discountPromoAdditional: 0,
      calculateTotalBayarPrice: 0,
      tempValueInputMoreMetode: 0,
      totalPcsItemOrder: 0,
      totalPriceRingkasanProduct: 0,
      totalHematDiskon: 0,
      totalDiskonPercentReseller: 0,
      nominalMoreMetodeBayar: [],
      checkboxMemberPotonganPoint: false,
      inputNominalMethodCash: null,
      totalKembalianMetodeCash: 0,

      // For register new member
      dataInputMember: {
        id: '',
        nama: '',
        no_hp: '',
        email: '',
        jenis_kelamin: '',
        tanggal_lahir: '',
        jenis_member: null,
      },

      inputSearchProduct: '',
      select_kode_reseller: '',

      inputSearchFreeProduct: '',
      allDataFindProductFree: [],
      
      selectMethodPayment: '',
      keteranganTransaksi: '',
      switchBoxSendEamil: false,

      selectedFilterBrand: null,
      inputSearchMember: '',
      selectSalesBy: this.$root.master_code.salesBy.wi,
      selectedBscWa: '',

      invalidMemberSelect: false,
      invalidMetodePembayaran: false,
      invalidSelectSalesBsc: false,

      productSelectBatch: null,
      productShowDetail: null,
      qtyProductShowDetail: 1,

      getCheckGelarPembelian: null,

      isCheckBoxPromo: false,
      isCheckBoxFlushOut: false,
      isCheckBoxKaryawan: false,

      checkboxProducts: {
        bestSellerAll: false,
        bestSellerToko: false,
        topThisMonth: false,
        promo: false,
        flushOut: false,
        promoKaryawan: false
      },

      numberTicketOrder: '',
      inputFindNoTiket: '',
      allTicketInOrder: [],
      showLoadingTicket: true,
      
      selectedRowTicketOrder: null,
      listDataProductForCreateTicket: [],
      inputSearchProductOrderTicket: '',
      dataAllPromoProductOrderTicket: [],
      dataAllProductOrderTicket: [],
      displayedPageProductOrderTicket: [],
      totalDisplayedPageProductOrderTicket: 3,
      currentPageProductOrderTicket: 1,
      perPageProductOrderTicket: 12,
      totalPageProductOrderTicket: 0,
      tabActivePillTicketOrder: 'reguler',
      listPillTicketOrder: {
        reguler: 'reguler',
        promo: 'promo',
        listadd: 'listadd'
      },
      listDataProductDetailSelectTicket: [],
      dataShowBatchProductOrdetTicketToSelect: null,
      selectPriorityOrderTicket: '',
      descriptionOrderTicket: null,
      
      dataMasterOptionInfoCode: [],
      dataMasterOptionInfo: [],
      allProductFindSearchBtn: [],

      dataActiveMasterPromo: [],
      displayedPagesPromoDiskon: [],
      totalDisplayedPagesPromoDiskon: 3,
      currentPagePromoDiskon: 1,
      perPagePromoDiskon: 6,
      totalPagePromoDiskon: 0,
      selectedActivePromo: null,
      inputSearchKodePromo: '',
      
      dataDataDetailPromoDiskon: [],
      displayedPagesDetailPromoDiskon: [],
      totalDisplayedPagesDetailPromoDiskon: 3,
      currentPageDetailPromoDiskon: 1,
      perPageDetailPromoDiskon: 6,
      totalPageDetailPromoDiskon: 0,

      productSingleGWP: null,
      
      selectedAllPromoMinValGwp: [],
      productSelectBatchMinValGwp: null,

      dataAllProductsMinValGwp: [],
      displayedPagesMinValGwp: [],
      totalDisplayedPagesMinValGwp: 3,
      currentPageMinValGwp: 1,
      perPageMinValGwp: 10,
      totalPageMinValGwp: 0,
      inputSearchProductInMinValGwp: '',

      headerModalInfoPlafon: '',
      bodyModalInfoPlafon: '',
    };
  },

  async beforeMount(){
    await this.loadAlldatas();
  },

  mounted() {
    this.currentTime = new Date();
  },

  computed: {
    filteredProducts() {
      // console.log(this.dataAllProducts);
      const queryInput = this.inputSearchProduct.toLowerCase().trim();
      const valueSeletedBrand = this.selectedFilterBrand ? this.selectedFilterBrand.optDtlCode.toLowerCase().trim() : null;
      const hasTruecheckboxProducts = Object.values(this.checkboxProducts).some(value => value);

      return this.dataAllProducts.filter(product => {
        const checkProduct = product.promo_product_id ? product.for_product : product;
        // const brandProduct = checkProduct.all_product_detail.find((detail) => detail.optionalCode == this.master_code.productOptInfo.brand_code);

        let filterExpression = checkProduct.itemName.toLowerCase().includes(queryInput) || 
        checkProduct.itemCode.toLowerCase().includes(queryInput) ||
        checkProduct.barCode.toLowerCase().includes(queryInput);
        if(valueSeletedBrand){
          filterExpression = filterExpression && brandProduct.optDtlCode.toLowerCase().includes(valueSeletedBrand);
        }

        if(hasTruecheckboxProducts){ // Filter jika ada checkbox promo yang true
          if(product.promo_product_id){
            if(this.checkboxProducts.bestSellerAll){ // Filter Checkbox Best Seller All
              if(product.master_promo_product.kode_promo_product == this.master_code.kodePromo.best_seller_toko){
                return filterExpression;
              }
            }
            if(this.checkboxProducts.bestSellerToko){ // Filter Checkbox Best Seller Toko
              if(product.master_promo_product.kode_promo_product == this.master_code.kodePromo.best_seller_all){
                return filterExpression;
              }
            }
            if(this.checkboxProducts.topThisMonth){ // Filter Checkbox Top This Month
              if(product.master_promo_product.kode_promo_product == this.master_code.kodePromo.top_this_month){
                return filterExpression;
              }
            }
            if(this.checkboxProducts.promo){
              if(product.master_promo_product.kode_promo_product == this.master_code.kodePromo.promo){ // Filter Checkbox Promo
                return filterExpression;
              }
            }
            if(this.checkboxProducts.flushOut){
              if(product.master_promo_product.kode_promo_product == this.master_code.kodePromo.flush_out){ // Filter Checkbox Flushout
                return filterExpression;
              }
            }
            if(this.checkboxProducts.promoKaryawan){
              if(product.master_promo_product.kode_promo_product == this.master_code.kodePromo.promo_karyawan){ // Filter Checkbox Promo Karyawan
                return filterExpression;
              }
            }
          }
        }else{
          if(product.promo_product_id){
            if (
              (this.memberOverview != null && this.memberOverview.tipe_konsumen.slug == this.master_code.tipeKonsumen.karyawan) ||
              product.master_promo_product.kode_promo_product != this.master_code.kodePromo.promo_karyawan
            ) {
              return filterExpression;
            }
          }else{
            return filterExpression;
          }
        }
      });
    },
    
    filteredOptionsInfoProduct() {
      return (optionalCode) => {
        return this.dataMasterOptionInfo.filter(option => option.optionalCode === optionalCode);
      }
    },
    
    filteredMembers() {
      const query = this.inputSearchMember.toLowerCase();
      return this.dataAllMembers.filter(member => {
        return (
          member.no_hp.toLowerCase().includes(query) ||
          member.email.toLowerCase().includes(query)
        );
      });
    },

    formattedTimeNow() {
      const hours = this.currentTime.getHours().toString().padStart(2, '0');
      const minutes = this.currentTime.getMinutes().toString().padStart(2, '0');
      const seconds = this.currentTime.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    },

    formattedDateNow() {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return this.currentTime.toLocaleDateString('id-ID', options);
    },
  },

  methods: {
    clickScrollToChecout: function(){
      const targetElement = document.getElementById('checkoutDetailPanelSales');
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
        });
      }
    },

    loadAlldatas: async function(){
      this.$root.showLoading();
      const cacheStoreAccess = JSON.parse(localStorage.getItem(this.local_storage.access_store));
      try {
        const getAllDataSales = await axios({
          method: 'get',
          url: this.$root.API_ERP + '/pos/app/sales',
        });
        const allData = getAllDataSales.data;
        this.dataAllGelars = allData.getAllGelar; //All Gelar
        this.dataAllKodeResellers = allData.getAllKodeReseller; //All Kode Reseller
        this.dataAllMetodeBayar = allData.getAllMetodeBayar; //All Metode Bayar
        this.dataAllMasterSalesBy = allData.getAllMasterSalesBy; //All Master Sales By
        allData.getAllMetodeBayar.some(metode => {
          if(metode.kode == this.master_code.metodeBayar.cash){
            this.metodeBayarCash = metode;
            return false;
          }
          if(metode.kode == this.master_code.metodeBayar.karyawan){
            this.metodeBayarKaryawan = metode;
            return false;
          }
          if(metode.kode == this.master_code.metodeBayar.redeem){
            this.metodeBayarRedeemPoint = metode;
            return false;
          }

          if(metode.kode === this.master_code.metodeBayar.tf){
            this.dataMetodeBayarTF.push(metode);
          }
          if(metode.kode === this.master_code.metodeBayar.ewal){
            this.dataMetodeBayarEWal.push(metode);
          }
          if(metode.kode === this.master_code.metodeBayar.cc){
            this.dataMetodeBayarCC.push(metode);
          }
        });

        const getAllDataOptInfo = await axios({
          method: 'get',
          url: this.$root.API_ERP + '/pos/app/sales/getMasterOptInfoData',
        });
        const dataMasterOptInfo = getAllDataOptInfo.data;
        this.dataMasterOptionInfoCode = dataMasterOptInfo.getAllMasterOptionInfoCode; //All Option Info Code
        this.dataMasterOptionInfo = dataMasterOptInfo.getAllMasterOptionInfo; //All Option Info
        
        await this.fatchAllDataPromoProduct();
      } catch (error) {
        console.log(error);
      }

      this.$root.hideLoading();
    },

    fatchDataProduct: async function(page = 1){
      const cacheStoreAccess = JSON.parse(localStorage.getItem(this.local_storage.access_store));
      this.$root.showLoading();
      try{
        const getAllProduct = await axios({
          method: 'get',
          url: this.$root.API_ERP + '/pos/app/sales/getAllProduct',
          params: {
            page: page,
            per_page: this.perPageProduct,
            store_outlet: cacheStoreAccess.store_outlet
          },
        });
        const response = getAllProduct.data;
        this.currentPageProduct = response.current_page;
        this.totalPageProduct = response.last_page;

        var getDataProduct = response.data;
        this.dataAllProducts = this.dataAllProducts.concat(getDataProduct);

        // For list product order ticket
        this.currentPageProductOrderTicket = response.current_page;
        this.totalPageProductOrderTicket = response.last_page;
        this.updateDisplayedPagesProductOrderTicket();
        this.dataAllProductOrderTicket = getDataProduct.map((data) => {
          const ifHaveInListSelect = this.listDataProductForCreateTicket.some((y) => y.product.itemCode === data.itemCode);
          if(ifHaveInListSelect){
            data.isSelectedProductTicket = true;
          }
          return data;
        });
      }catch(e){
        console.log(e);
      }
      this.$root.hideLoading();
    },

    fatchAllDataProduct: async function(){
      const cacheStoreAccess = JSON.parse(localStorage.getItem(this.local_storage.access_store));
      $('#modalLoadingGetProduct').modal('show');
      try{
        const getAllProduct = await axios({
          method: 'get',
          url: this.$root.API_ERP + '/pos/app/sales/getAllProduct',
          params: {
            page: this.currentPageProduct,
            per_page: this.perPageProduct,
            store_outlet: cacheStoreAccess.store_outlet
          },
        });

        if(getAllProduct.status == 200 || getAllProduct.status == 201){
          this.dataAllProducts = [];
          await this.fatchAllDataPromoProduct();
          const resDataProduct = getAllProduct.data;
          for (let i = 1; i <= resDataProduct.last_page; i++) {
            try{
              const getAllProductPage = await axios({
                method: 'get',
                url: this.$root.API_ERP + '/pos/app/sales/getAllProduct',
                params: {
                  page: i,
                  per_page: this.perPageProduct,
                  store_outlet: cacheStoreAccess.store_outlet
                },
              });
              const resDataProductPage = getAllProductPage.data.data;
              this.dataAllProducts = this.dataAllProducts.concat(resDataProductPage);
            } catch(e){
              console.log(e);
            }
          }
        }else{
          this.$root.showAlertFunction('warning', 'Permintaan Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
        }
      } catch(e){
        this.$root.showAlertFunction('warning', 'Permintaan Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
        console.log(e);
      }
      $('#modalLoadingGetProduct').modal('hide');
    },

    fatchAllDataPromoProduct: async function(){
      const cacheStoreAccess = JSON.parse(localStorage.getItem(this.local_storage.access_store));
      try{
        const today = new Date();
        const resData = await axios({
          method: 'get',
          url: this.$root.API_ERP + '/pos/app/sales/getAllMasterPromo',
          params: {
            page: this.currentPagePromoProduct,
            per_page: this.perPagePromoProduct,
            store_outlet: cacheStoreAccess.store_outlet
          }
        });

        if(resData.status == 200 || resData.status == 201){
          const resDataPromo = resData.data;
          let responseAllDataPromoDetail = [];
          for (let i = 1; i <= resDataPromo.last_page; i++) {
            try{
              const getAllProductPromo = await axios({
                method: 'get',
                url: this.$root.API_ERP + '/pos/app/sales/getAllMasterPromoProductDetail',
                params: {
                  page: i,
                  per_page: this.perPagePromoProduct,
                  store_outlet: cacheStoreAccess.store_outlet,
                },
              });
              if(getAllProductPromo.status == 200){
                const resDataAllProductPromo = getAllProductPromo.data;
                resDataAllProductPromo.forEach(resDataProductPromo => {
                  const masterPromoProduct = resDataProductPromo.master_promo_product;
                  const masterPromo = resDataProductPromo.master_promo_product.master_promo;
  
                  const setObj = {
                    id: resDataProductPromo.id,
                    promo_product_id: resDataProductPromo.promo_product_id,
                    for_product_code: resDataProductPromo.for_product_code,
                    get_product_code: resDataProductPromo.get_product_code,
                    for_product_whs: resDataProductPromo.for_product_whs,
                    get_product_whs: resDataProductPromo.get_product_whs,
                    // for_product_price: resDataProductPromo.for_product_price,
                    // get_product_price: resDataProductPromo.get_product_price,
                    isActive: resDataProductPromo.isActive,
                    master_promo_product: resDataProductPromo.master_promo_product,
                    for_product: resDataProductPromo.for_product,
                    get_product: resDataProductPromo.get_product ?? null,
                  };
                  setObj.for_product.all_product_price = resDataProductPromo.for_product_price;
                  setObj.for_product.all_inventory_stok = resDataProductPromo.for_inventory_stok;
                  // setObj.for_product.all_inventory_batch = resDataProductPromo.for_inventory_batch;
                  setObj.for_product.all_product_diskon = resDataProductPromo.for_product_diskon;
                  setObj.for_product.all_product_detail = resDataProductPromo.for_product_detail;
                  
                  if(masterPromoProduct.tipe_promo == this.master_coll.tipePromo.bundle){
                    setObj.get_product.all_product_price = resDataProductPromo.get_product_price;
                    setObj.get_product.all_inventory_stok = resDataProductPromo.get_inventory_stok;
                    // setObj.get_product.all_inventory_batch = resDataProductPromo.get_inventory_batch;
                    setObj.get_product.all_product_diskon = resDataProductPromo.get_product_diskon;
                    // setObj.get_product.all_product_detail = resDataProductPromo.get_product_diskon;
                  }
  
                  responseAllDataPromoDetail.push(setObj);
                  // const startDate = new Date(masterPromo.start_date);
                  // const endDate = new Date(masterPromo.end_date);
                  // if(today >= startDate && today <= endDate){
                  // }
                });
              }
            } catch(e){
              console.log(e);
            }
          }
          
          this.dataAllProducts = this.dataAllProducts.concat(responseAllDataPromoDetail);
          this.dataAllPromoProductOrderTicket = responseAllDataPromoDetail;
          await this.fatchDataProduct();
          // this.allMasterPromoProduct = this.allMasterPromoProduct.concat(responseAllDataPromoDetail);
          // for (let i in this.allMasterPromoProduct) {
          //   const masterPromo = this.allMasterPromoProduct[i].master_promo_product;
          //   const startDate = new Date(masterPromo.master_promo.start_date);
          //   const endDate = new Date(masterPromo.master_promo.end_date);
          //   if(today >= startDate && today <= endDate){
          //     if(masterPromo.kode_promo_product == this.master_code.kodePromo.promo){ // Promo
          //       this.isCheckBoxPromo = true;
          //     };
          //     if(masterPromo.kode_promo_product == this.master_code.kodePromo.flush_out){ // Flushout
          //       this.isCheckBoxFlushOut = true;
          //     };
          //     if(masterPromo.kode_promo_product == this.master_code.kodePromo.promo_karyawan){ // Karyawan
          //       this.isCheckBoxKaryawan = true;
          //     };
          //   }
          // }
        }
      }catch(e){
        console.log(e);
      }
    },
    
    fatchDataProductOrderTicket: async function(page = 1){
      const cacheStoreAccess = JSON.parse(localStorage.getItem(this.local_storage.access_store));
      this.$root.showLoading();
      try{
        const getAllProduct = await axios({
          method: 'get',
          url: this.$root.API_ERP + '/pos/app/sales/getAllProduct',
          params: {
            page: page,
            per_page: this.perPageProduct,
            store_outlet: cacheStoreAccess.store_outlet,
            search: this.inputSearchProductOrderTicket.trim(),
          },
        });
        const response = getAllProduct.data;
        this.currentPageProductOrderTicket = response.current_page;
        this.totalPageProductOrderTicket = response.last_page;
        
        this.dataAllProductOrderTicket = response.data.map((data) => {
          const ifHaveInListSelect = this.listDataProductForCreateTicket.some((y) => y.product.itemCode === data.itemCode);
          if(ifHaveInListSelect){
            data.isSelectedProductTicket = true;
          }
          return data;
        });

        this.updateDisplayedPagesProductOrderTicket();
      }catch(e){
        console.log(e);
      }
      this.$root.hideLoading();
    },

    updateDisplayedPagesProductOrderTicket() {
      const halfDisplayedPages = Math.floor(this.totalDisplayedPageProductOrderTicket / 2);

      let startPage = Math.max(1, this.currentPageProductOrderTicket - halfDisplayedPages);
      let endPage = Math.min(this.totalPageProductOrderTicket, startPage + this.totalDisplayedPageProductOrderTicket - 1);

      if (endPage - startPage + 1 < this.totalDisplayedPageProductOrderTicket) {
        startPage = Math.max(1, endPage - this.totalDisplayedPageProductOrderTicket + 1);
      }

      this.displayedPageProductOrderTicket = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    },

    fatchDataMember: async function(page){
      this.$root.showLoading();
      try{
        const getAllMember = await axios({
          method: 'get',
          url: this.$root.API_ERP + '/pos/app/sales/getAllMember',
          params: {
            page: page,
            per_page: this.perPageMember,
          },
        });

        const response = getAllMember.data;
        this.currentPageMember = response.current_page;
        this.totalPageMember = response.last_page;
        this.dataAllMembers = response.data;
      }catch(e){
        console.log(e);
      }
      this.$root.hideLoading();
    },

    fatchDataPromoDiskon: async function(page = 1){
      this.$root.showLoading();
      try{
        const checkPromo = await axios({
          method: 'get',
          url: this.$root.API_ERP + '/pos/getActivePromoDiskon',
          params: {
            page: page,
            per_page: this.perPagePromoDiskon,
            search: this.inputSearchKodePromo.trim()
          }
        });
        
        const resData = checkPromo.data;
        const dataPromo = resData.data;
        
        this.currentPagePromoDiskon = resData.current_page;
        this.totalPagePromoDiskon = resData.last_page;
        this.dataActiveMasterPromo = dataPromo;
        this.updateDisplayedPagesPromoDiskon();
      }catch(e){
        console.log(e);
      }
      this.$root.hideLoading();
    },

    updateDisplayedPagesPromoDiskon() {
      const halfDisplayedPages = Math.floor(this.totalDisplayedPagesPromoDiskon / 2);

      let startPage = Math.max(1, this.currentPagePromoDiskon - halfDisplayedPages);
      let endPage = Math.min(this.totalPagePromoDiskon, startPage + this.totalDisplayedPagesPromoDiskon - 1);

      if (endPage - startPage + 1 < this.totalDisplayedPagesPromoDiskon) {
        startPage = Math.max(1, endPage - this.totalDisplayedPagesPromoDiskon + 1);
      }

      this.displayedPagesPromoDiskon = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    },
    
    onChangeCheckVal: function(event){
      var inputId = event.target;
      var valueInput = inputId.value;
      
      if (valueInput || valueInput.length > 0){
        inputId.classList.remove('border-red');
      }else{
        inputId.classList.add('border-red');
      }
    },

    onChangeCheckNumberVal: function(event){
      var inputId = event.target;
      var valueInput = inputId.value;

      const numberInput = valueInput.replace(/[^0-9]/g, '');
      
      if (numberInput === null || numberInput.trim() === "") {
        inputId.classList.add('border-red');
        return;
      }
      
      if (valueInput || valueInput.length > 0){
        inputId.classList.remove('border-red');
      }else{
        inputId.classList.add('border-red');
      }

      return numberInput;
    },

    calculateAmoutPrice: function(){
      this.subTotalPrice = 0;
      this.totalBayarPrice = 0;
      this.totalPriceRingkasanProduct = 0;
      this.totalHematDiskon = 0;

      this.dataProductInList.forEach((product) => {
        if(!product.is_free_product){
          var getProduct = product.product;
          
          let formatHarga = 0;
          let resultTotalPriceRingkas = 0;
          if(product.is_promo_product){
            const isPromoProduct = product.is_promo_product;
            if(isPromoProduct.master_promo_product.tipe_promo == this.master_coll.tipePromo.bundle){
              formatHarga = parseInt(isPromoProduct.for_product.all_product_price[0].price);
            }
            if(isPromoProduct.master_promo_product.tipe_promo == this.master_coll.tipePromo.percent) {
              formatHarga = parseInt(isPromoProduct.for_product.all_product_price[0].price - (isPromoProduct.for_product.all_product_price[0].price * (isPromoProduct.master_promo_product.percent/100)));
            }
          }else{
            if(this.$root.filterDiskonProduct(getProduct).discCode == this.master_code.diskon.tanpa_diskon_code){
              formatHarga = parseInt(this.$root.filterPriceProduct(getProduct).price);
            }else{
              formatHarga = parseInt(this.$root.filterPriceProduct(getProduct).price  - (this.$root.filterPriceProduct(getProduct).price * (this.$root.filterDiskonProduct(getProduct).discount/100)));
            }
          }
          var calculatePrice = formatHarga * product.qty;
          this.subTotalPrice += calculatePrice;

          this.totalPriceRingkasanProduct += parseInt(getProduct.all_product_price[0].price * product.qty);
        }
      });
      
      var tatalUntukBayar = this.subTotalPrice;
      this.totalBayarPrice = tatalUntukBayar;
      this.calculateTotalBayarPrice = tatalUntukBayar;

      this.totalHematDiskon = this.totalPriceRingkasanProduct - this.totalBayarPrice;
    },

    calculatePcsItemOrderList: function(){
      this.totalPcsItemOrder = 0;
      let qtyPcs = 0;

      this.dataProductInList.forEach(item => {
        qtyPcs += item.qty;
      });

      if(!isNaN(qtyPcs) || qtyPcs > 0){
        this.totalPcsItemOrder = qtyPcs;
      }
    },

    findDataProductFree: async function(){
      const cacheStoreAccess = JSON.parse(localStorage.getItem(this.local_storage.access_store));
      this.$root.showLoading();
      try{
        const reqData = await axios({
          method: 'get',
          url: this.$root.API_ERP + '/pos/app/sales/findProductForFree',
          params: {
            search: this.inputSearchFreeProduct.trim(),
            store_outlet: cacheStoreAccess.store_outlet
          },
        });

        const resData = reqData.data;
        this.allDataFindProductFree = resData;
      }catch(e){
        console.log(e);
      }
      this.$root.hideLoading();
    },

    clickAddToListFreeProduct: function(product, batch){
      if(product.all_inventory_batch === 0){
        return false;
      }

      const findSelectInventory = product.all_inventory_stok.find((x) => x.whsCode == batch.whsCode && x.storeCode == batch.storeCode);
      product.all_inventory_stok = [];
      product.all_inventory_stok.push(findSelectInventory);

      const productObj = {
        product: product,
        qty: 1,
        batch: batch,
        is_promo_product: null,
        is_free_product: true,
      };
      this.dataProductInList.push(productObj);

      this.inputSearchFreeProduct = '';
      this.allDataFindProductFree = [];
      this.calculatePcsItemOrderList();
      $('#modalFindProductFree').modal('hide');
      // if(parseInt(batch.onHand) > 0){
      // }else{
      //   this.$root.showAlertFunction('warning', 'Stok Invalid!', 'Gagal menambahkan stok tidak cukup.');
      // }
    },
    
    // Logic Product In Order List
    checkInventoryBatchProduct: async function(product){
      this.$root.showLoading();
      try{
        const cacheStoreAccess = JSON.parse(localStorage.getItem(this.local_storage.access_store));

        const request = await axios({
          method: 'get',
          url: this.$root.API_ERP + '/pos/app/sales/checkInventoryBatchProduct',
          params: {
            id_product: product.id,
            store_outlet: cacheStoreAccess.store_outlet,
            is_promo_product: product.hasOwnProperty('promo_product_id') && product.promo_product_id ? {
              for_product_whs: product.for_product_whs,
              get_product_whs: product.get_product_whs ?? null
            } : null,
          }
        });

        const reqData = request.data;

        if(product.promo_product_id){
          product.for_product.all_inventory_stok = reqData.for_inventory_stok;
          product.for_product.all_inventory_batch = reqData.for_inventory_batch;
          if(product.get_product){
            product.get_product.all_inventory_stok = reqData.get_inventory_stok;
            product.get_product.all_inventory_batch = reqData.get_inventory_batch;
          }
        }else{
          product.all_inventory_stok = reqData.all_inventory_stok;
          product.all_inventory_batch = reqData.all_inventory_batch;
        }
      }catch(e){
        console.log(e);
      }

      this.$root.hideLoading();
      return product;
    },

    validateModalBatchProduct: async function(product, qty = 1){
      const checkProduct = await this.checkInventoryBatchProduct(product);

      this.productSelectBatch = null;
      this.productSelectBatch = {
        product: checkProduct,
        qty: qty
      };
      $('#modalShowBatchProduct').modal('show');
    },

    addProductToList: function(product, batch, qty = 1){
      // console.log(product);
      // return false;
      if(qty > 0){
        let existingProduct = null;

        if(product.promo_product_id){ // Jika product promo
          try{
            existingProduct = this.dataProductInList.find( (p) => {
              if(p.is_promo_product){ // Jika sudah ada di list product yang diorder
                return p.is_promo_product.promo_product_id === product.promo_product_id &&
                p.is_promo_product.for_product.itemCode === product.for_product.itemCode && 
                p.batch.batchNo.trim() === batch.batchNo.trim()
              }
            });
          }catch(error){
            existingProduct = null;
            console.log(error);
          }
        }else{ // Jika product reguler
          existingProduct = this.dataProductInList.find((p) => !p.is_promo_product && p.product.itemCode === product.itemCode && p.batch.batchNo.trim() === batch.batchNo.trim());
        }

        if (existingProduct) {
          existingProduct.qty += qty;
        }else{
          const productObj = {
            product: product.promo_product_id ? product.for_product : product,
            qty: qty,
            batch: batch,
            is_promo_product: product.promo_product_id ? product : null,
          };
          this.dataProductInList.push(productObj);
          // if(parseInt(batch.onHand) > 0){
          // }else{
          //   this.$root.showAlertFunction('warning', 'Stok Invalid!', 'Gagal menambahkan stok tidak cukup.');
          // }
        }
        
        this.qtyProductShowDetail = 1;
        this.calculatePcsItemOrderList();
        this.calculateAmoutPrice();
        $('#modalShowBatchProduct').modal('hide');
      }
    },

    deleteProductById: function (product, batch, index = null){
      let indexToDelete = index;

      if(index == null){
        if(product.is_promo_product){ // Jika product promo
          try{
            indexToDelete = this.dataProductInList.findIndex((p) => {
              if(p.is_promo_product){
                return p.is_promo_product.promo_product_id === product.is_promo_product.promo_product_id &&
                p.is_promo_product.for_product.itemCode === product.product.itemCode && 
                p.batch.batchNo.trim() === batch.batchNo.trim()
              }
            });
          }catch(error){
            indexToDelete = null;
            console.log(error);
          }
        }else{ // Jika product reguler
          indexToDelete = this.dataProductInList.findIndex((p) => !p.is_promo_product && p.product.itemCode === product.product.itemCode && p.batch.batchNo.trim() === batch.batchNo.trim());
        }
      }
      
      if (indexToDelete != null) {
        this.dataProductInList.splice(indexToDelete, 1);

        // if(product.is_ticket){
        //   const findTiket = this.allTicketInOrder.findIndex((tiket) => tiket.tiket === product.is_ticket.no_ticket);
        //   if(findTiket >= 0){
        //     this.allTicketInOrder.splice(findTiket, 1);
        //   }
        // }
      } else {
        console.log('Product not found');
      }
      
      this.calculatePcsItemOrderList();
      this.calculateAmoutPrice();
    },
    
    emptyProductList: function(){
      this.dataProductInList = [];
      this.allTicketInOrder = [];
      this.selectedRowTicketOrder = null;
      this.listDataProductDetailSelectTicket = [];
      this.calculatePcsItemOrderList();
      this.calculateAmoutPrice();
    },

    incDecQtyInput: function(event, product, batch){
      const newValue = parseInt(event.target.value);
      let existingProduct = null;
      
      if(product.is_promo_product){ // Jika product promo
        try{
          existingProduct = this.dataProductInList.find((p) => {
            if(p.is_promo_product){
              return p.is_promo_product.promo_product_id === product.is_promo_product.promo_product_id &&
              p.is_promo_product.for_product.itemCode === product.product.itemCode && 
              p.batch.batchNo.trim() === batch.batchNo.trim()
            }
          });
        }catch(error){
          existingProduct = null;
          console.log(error);
        }
      }else{ // Jika product reguler
        existingProduct = this.dataProductInList.find((p) => !p.is_promo_product && p.product.itemCode === product.product.itemCode && p.batch.batchNo.trim() === batch.batchNo.trim());
      }

      if(existingProduct){
        if (!isNaN(newValue) || newValue > 0) {
          existingProduct.qty = newValue;
          this.calculatePcsItemOrderList();
          this.calculateAmoutPrice();
        }
      }
    },
    
    incDecQtyChange: function(event, product, batch){
      const newValue = parseInt(event.target.value);
      let existingProduct = null;

      if(product.is_promo_product){ // Jika product promo
        try{
          existingProduct = this.dataProductInList.find((p) => {
            if(p.is_promo_product){
              return p.is_promo_product.promo_product_id === product.is_promo_product.promo_product_id &&
              p.is_promo_product.for_product.itemCode === product.product.itemCode && 
              p.batch.batchNo.trim() === batch.batchNo.trim()
            }
          });
        }catch(error){
          existingProduct = null;
          console.log(error);
        }
      }else{ // Jika product reguler
        existingProduct = this.dataProductInList.find((p) => !p.is_promo_product && p.product.itemCode === product.product.itemCode && p.batch.batchNo.trim() === batch.batchNo.trim());
      }

      if(existingProduct){
        if (!isNaN(newValue) || newValue > 0) {
          existingProduct.qty = newValue;
        }else{
          existingProduct.qty = 1;
        }
      }
      
      this.calculatePcsItemOrderList();
      this.calculateAmoutPrice();
    },
    
    incDecQtyInputCanvas: function(event){
      const newValue = parseInt(event.target.value);
      this.qtyProductShowDetail = newValue;
      this.calculatePcsItemOrderList();
    },
    
    incDecQtyChangeCanvas: function(event){
      const newValue = parseInt(event.target.value);
      if (isNaN(newValue) || newValue < 1) {
        this.qtyProductShowDetail = 1;
      }
      this.calculatePcsItemOrderList();
    },
    
    disableBackspace: function(event, product) {
      if (product.qty <= 1 && event.key === 'Backspace') {
        event.preventDefault();
      }
    },
    // End Logic

    // Logic Handle Member
    storeNewMember: async function(){
      this.$root.showLoading();
      try{
        this.dataInputMember.user_login = this.$root.dataAuthToken;
        const store = await axios({
          method: 'post',
          url: this.$root.API_ERP + '/pos/app/sales/storeNewMember',
          data: this.dataInputMember,
        });

        if(store.status == 201 || store.status == 200){
          var getResponsStore = store.data;
          var getDataUser = getResponsStore.data;
          
          this.memberOverview = getDataUser;
          this.dataAllMembers.push(getDataUser);

          for (let prop in this.dataInputMember) {
            this.dataInputMember[prop] = '';
          }
          
          this.invalidMemberSelect = false;
          this.$root.showAlertFunction('success', 'Pendaftaran Berhasil!', 'Selamat, Member baru telah berhasil ditambahkan.');
          $('#modalFindMember').modal('hide');
        }else{
          this.$root.showAlertFunction('warning', 'Pendaftaran Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
        }
      } catch (error) {
        if(error.response.data.status == 101){
          this.$root.showAlertFunction('warning', 'Pendaftaran Gagal!', error.response.data.message);
        }else{
          this.$root.showAlertFunction('warning', 'Pendaftaran Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
        }
        this.$root.hideLoading();
        console.log(error);
      }
      this.$root.hideLoading();
    },

    updateEditDataMember: async function (){
      try{
        $('#modalEditMember').modal('hide');
        this.$root.showLoading();
        const store = await axios({
          method: 'put',
          url: this.$root.API_ERP + '/pos/app/sales/updateDataMember',
          data: this.dataInputMember,
        });
        
        if(store.status == 201 || store.status == 200){
          var getDataStore = store.data.data;
          var findIndexMember = this.dataAllMembers.findIndex((member) => member.id == getDataStore.id);
          this.dataAllMembers[findIndexMember] = getDataStore;

          this.$root.showAlertFunction('success', 'Update Berhasil!', 'Selamat, Data member telah berhasil diperbaharui.');
        }else{
          this.$root.showAlertFunction('warning', 'Mengubah Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
        }
        
        this.memberOverview = null;
        this.$root.hideLoading();
      } catch (error) {
        this.$root.showAlertFunction('warning', 'Update Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
        this.$root.hideLoading();
        console.log(error);
      }
    },
    
    selectMemberOverview: function(member){
      // if(this.memberOverview != null && this.memberOverview.member_id != member.member_id){
      //   this.dataProductInList = [];
      // }
      this.memberOverview = member;
      this.invalidMemberSelect = false;
      $('#modalFindMember').modal('hide');
    },

    openModalFindOrRegis: async function(){
      this.memberFindOrRegis = true;
      await this.fatchDataMember(this.currentPageMember);
      for (let prop in this.dataInputMember) {
        this.dataInputMember[prop] = '';
      }
      $('#modalEditMember').modal('hide');
      $('#modalFindMember').modal('show');
    },
    
    selectEditMemberForm: function(member){
      for (let prop in this.dataInputMember) {
        this.dataInputMember[prop] = member[prop];
      }

      $('#modalFindMember').modal('hide');
      $('#modalEditMember').modal('show');
    },
    // End Logic

    // Logic Metode Bayar
    onChangeSelectedMetodeBayar: function(){
      this.validasiMetodePembayaran = [];
      this.selectedMetodeBayar = null;
      this.invalidMetodePembayaran = false;
      this.inputNominalMethodCash = null;
    },

    addMoreMetodeBayar: function(metode){
      // Metode pembayaran yang sama tidak boleh bertambah
      const existingMetode = this.dataMoreMetodeBayar.find((m) => m.id === metode.id);
      if(existingMetode || metode.id === this.selectedMetodeBayar.id){
        return false;
      }

      // Validasi jika ada metode pembayaran cash
      if(metode.kode == 'cash'){
        this.checkMetodeCashSelect = true;
      }

      this.dataMoreMetodeBayar.push(metode);
    },
    // End Logic

    // Logic Tiket Booking
    clickAddProductOrderTicket: function(product){
      const findProduct = this.listDataProductForCreateTicket.find((x) => x.product == product);
      
      if(findProduct){
        findProduct.qty += 1;
      }else{
        product.isSelectedProductTicket = true;
        const addObj = {
          product: product,
          qty: 1,
          is_promo_product: product.promo_product_id ? true : false,
        }
        this.listDataProductForCreateTicket.push(addObj);
      }
    },

    deleteProductFromListOrderTicket: function(product){
      if(product.promo_product_id){
        const findInListProduct = this.dataAllPromoProductOrderTicket.find((x) => x == product);
        delete findInListProduct.isSelectedProductTicket;
      }else{
        const findInListProduct = this.dataAllProductOrderTicket.find((x) => x == product);
        delete findInListProduct.isSelectedProductTicket;
      }

      const findIndex = this.listDataProductForCreateTicket.findIndex((x) => x.product == product);
      this.listDataProductForCreateTicket.splice(findIndex, 1);
    },

    clearAllAddedProductListOrderTicket: function(){
      this.dataAllPromoProductOrderTicket.filter((x) => {
        if(x.isSelectedProductTicket){
          delete x.isSelectedProductTicket;
        }
      });
      this.dataAllProductOrderTicket.filter((x) => {
        if(x.isSelectedProductTicket){
          delete x.isSelectedProductTicket;
        }
      });

      this.listDataProductForCreateTicket = [];
      this.selectPriorityOrderTicket = '';
      this.descriptionOrderTicket = null;
    },

    btnContinueCreateTicketOrder: function(){
      $('#modalConfirmCreateTicket').modal('show');
    },

    confirmasiBuatTiket: async function (){
      try{
        $('#modalConfirmCreateTicket').modal('hide');
        this.$root.showLoading();

        const storeActive = JSON.parse(localStorage.getItem(this.local_storage.access_store));
        const dataProduct = this.listDataProductForCreateTicket.map((x) => {
          return {
            qty: x.qty,
            itemCode: x.product.promo_product_id ? null : x.product.itemCode,
            promoProductId: x.product.promo_product_id ? x.product.master_promo_product.id : null,
            promoProductDetailId: x.product.promo_product_id ? x.product.id : null,
          };
        });

        const dataPost = {
          member: this.memberOverview,
          products: dataProduct,
          access_store: storeActive.store_outlet,
          user_login: this.$root.dataAuthToken,
          priority: this.selectPriorityOrderTicket.trim() != '' ? this.selectPriorityOrderTicket : null,
          description: this.descriptionOrderTicket ? this.descriptionOrderTicket.trim() != '' ? this.descriptionOrderTicket : null : null,
        };

        const store = await axios({
          method: 'post',
          url: this.$root.API_ERP + '/pos/app/sales/storeNewTicket',
          data: dataPost,
        });
        
        if(store.status == 201 || store.status == 200){
          this.numberTicketOrder = store.data.data.no_ticket;
          $('#modalSelectProductForTicket').modal('hide');
          $('#showCreateNoTicket').modal('show');

          this.memberOverview = null;
          this.dataProductInList = [];
          this.clearAllAddedProductListOrderTicket();
          this.tabActivePillTicketOrder = this.listPillTicketOrder.reguler;
        }else{
          this.$root.showAlertFunction('warning', 'Tiket Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
        }

        this.$root.hideLoading();
      } catch (error) {
        this.$root.showAlertFunction('warning', 'Tiket Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
        this.$root.hideLoading();
        console.log(error);
      }
    },

    showListModalTiket: async function (){
      try{
        this.dataFilterAllTicket = [];
        this.showLoadingTicket = true;
        $('#modalListTicket').modal('show');

        const storeActive = JSON.parse(localStorage.getItem(this.local_storage.access_store));
        const params = {
          page: 1,
          per_page: 15,
          store_outlet: storeActive.store_outlet
        }

        const reqPageTicket = await axios({
          method: 'get',
          url: this.$root.API_ERP + '/pos/app/sales/getAllTicketPage',
          params: params
        });

        const pagesTicket = parseInt(reqPageTicket.data);

        let listTickets = [];
        for(let i = 1; i <= pagesTicket; i++){
          listTickets = [];
          params.page = i;
          const store = await axios({
            method: 'get',
            url: this.$root.API_ERP + '/pos/app/sales/getAllTicket',
            params: params
          });

          const dataProduct = store.data.data;
          this.dataAllTicket = dataProduct;

          const groupedData = {};
          dataProduct.forEach((data) => {
            const member_id = data.member_id;
            const findExistingTicket = this.dataFilterAllTicket.find((x) => x.member_id == member_id);
            if(findExistingTicket){
              findExistingTicket.no_ticket.push({
                no_ticket: data.no_ticket,
                ticket_id: data.id
              });
            }else{
              if (!groupedData[member_id]) {
                groupedData[member_id] = {
                  member_id: member_id,
                  member: data.member,
                  user: data.user,
                  no_ticket: [],
                };
              }
              groupedData[member_id].no_ticket.push({
                no_ticket: data.no_ticket,
                ticket_id: data.id
              });
            }
          });

          const finishDataFilter = Object.values(groupedData);
          listTickets = listTickets.concat(finishDataFilter);
        }
        this.dataFilterAllTicket = this.dataFilterAllTicket.concat(listTickets);
        
        this.showLoadingTicket = false;
      } catch (error) {
        this.$root.showAlertFunction('warning', 'Tiket Gagal!', 'Terjadi kesalahan saat mengambil data! Coba beberapa saat lagi.');
        this.showLoadingTicket = false;
        console.log(error);
      }
    },

    submitFindOrderWithTiket: async function (){
      try{
        this.$root.showLoading();
        const cacheStoreAccess = JSON.parse(localStorage.getItem(this.local_storage.access_store));

        const store = await axios({
          method: 'get',
          url: this.$root.API_ERP + '/pos/app/sales/findOrderWithTicket',
          params: {
            no_tiket: this.inputFindNoTiket,
            store_outlet: cacheStoreAccess.store_outlet,
          }
        });

        if(store.status == 200){
          const responseData = store.data.data;
          this.inputFindNoTiket = '';

          const findInTiketOder = this.allTicketInOrder.find((tiket) => tiket.tiket == responseData.no_ticket);
          if(findInTiketOder){
            this.$root.showAlertFunction('warning', 'Tiket Gagal!', 'Tiket booking sudah masuk kedalam antrian');
          }else{
            if(this.memberOverview != null){
              if(responseData.member != null && this.memberOverview.member_id != responseData.member.member_id){
                this.$root.hideLoading();
                this.$root.showAlertFunction('warning', 'Tiket Gagal!', 'Member pemlik tiket booking tidak sesuai');
                return false;
              }
            }else{
              this.memberOverview = responseData.member ?? null;
            }

            const objToAddOrder = {
              ticket_id: responseData.id,
              member: responseData.member,
              user: responseData.user,
              tiket: responseData.no_ticket,
              tiket_detail: responseData.tiket_detail,
            };
            this.allTicketInOrder.push(objToAddOrder);
            responseData.tiket_detail.forEach(data => {
              var product = data.product;
              const batch = data.batch;
              const findProduct = this.dataProductInList.find((p) => !p.is_promo_product && p.product.itemCode === product.itemCode && p.batch.batchNo.trim() === batch.batchNo.trim());
              if(findProduct){
                findProduct.qty = findProduct.qty + data.qty;
              }else{
                const productObj = {
                  product: product,
                  qty: data.qty,
                  batch: data.batch,
                  is_promo_product: product.master_promo_id ? product : null,
                  is_ticket: data,
                };
                this.dataProductInList.push(productObj);
                // if(parseInt(batch.onHand) > 0){
                // }else{
                //   this.$root.showAlertFunction('warning', 'Stok Invalid!', 'Gagal menambahkan stok tidak cukup.');
                // }
              }
            });

            this.calculateAmoutPrice();
            this.calculatePcsItemOrderList();
            this.$root.showAlertFunction('success', 'Tiket Ditemukan!', 'Tiket pesanan telah berhasil ditambahkan.');
          }
        }
        else{
          this.$root.showAlertFunction('warning', 'Pencarian Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
        }
      } catch (error) {
        if(error.response.status == 404){
          this.$root.showAlertFunction('warning', 'Tiket Gagal!', 'Maaf, Tiket pesanan tidak ditemukan.');
        }else{
          this.$root.showAlertFunction('warning', 'Pencarian Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
        }
        console.log(error);
      }

      this.$root.hideLoading();
    },

    clickRowTicketList: async function (ticket){
      ticket.no_ticket = ticket.no_ticket.map(item => {
        return { ...item, isSelected: true };
      });

      this.selectedRowTicketOrder = ticket;
      if(ticket.no_ticket.length > 1){
        $('#modalChooseTicketNumberToExecute').modal('show');
      }else{
        await this.executeSelectedTicketOrder(ticket);
      }
    },

    clearIsSelectTicketOrderChoose: function(ticket){
      ticket.no_ticket.forEach(item => {
        item.isSelected = false;
      });
    },

    executeSelectedTicketOrder: async function(ticket){
      if(ticket.no_ticket.every((x) => x.isSelected === false)){
        this.$root.showAlertFunction('warning', 'Gagal Melanjutkan!', 'Pilih setidaknya satu tiket atau lebih');
        return false;
      }

      $('#modalChooseTicketNumberToExecute').modal('hide');
      this.$root.showLoading();
      const cacheStoreAccess = JSON.parse(localStorage.getItem(this.local_storage.access_store));
      const params = {
        page: 1,
        per_page: 15,
        ticket_id: 0,
        store_outlet: cacheStoreAccess.store_outlet,
      };

      let listDataProduct = [];
      for(let i = 0; i < ticket.no_ticket.length; i++){
        const dataTicket = ticket.no_ticket[i];
        if(dataTicket.isSelected){
          params.ticket_id = dataTicket.ticket_id;
          const request = await axios({
            method: 'get',
            url: this.$root.API_ERP + '/pos/app/sales/getDataDetailListTicketPages',
            params: params
          });

          const pageDetail = parseInt(request.data);
          for(let i = 1; i <= pageDetail; i++){
            params.page = i;
            const requestDetail = await axios({
              method: 'get',
              url: this.$root.API_ERP + '/pos/app/sales/getDataDetailListTicket',
              params: params
            });

            const resDataDetail = requestDetail.data.data;
            listDataProduct = listDataProduct.concat(resDataDetail);
          }
        }
      }

      const dataForAddToList = listDataProduct.map((x) => {
        const product = x.product;
        const productObj = {
          product: null,
          qty: x.qty,
          batch: [],
          selectBatch:[],
          is_promo_product: null,
          is_ticket: x.tiket,
        };
        if(x.promoProductDetailId){
          const findPromoProduct = this.dataAllPromoProductOrderTicket.find((y) => y.id == x.promoProductDetailId);
          productObj.product = findPromoProduct.for_product;
          productObj.is_promo_product = findPromoProduct;
        }else{
          productObj.product = product;
        }

        return productObj;
      });
      this.listDataProductDetailSelectTicket = dataForAddToList;

      $('#modalListTicket').modal('hide');
      $('#modalListProductTicketSelected').modal('show');
      this.memberOverview = ticket.member ?? null;
      
      this.$root.hideLoading();
    },

    searchFindBatchProductListOrderTicket: async function(data){
      if(data.batch.length == 0){
        this.$root.showLoading();
        const product = data.is_promo_product ?? data.product;
        const getBatch = await this.checkInventoryBatchProduct(product);

        if(data.is_promo_product){
          data.product.all_inventory_stok = getBatch.for_product.all_inventory_stok;
          data.product.all_inventory_batch = getBatch.for_product.all_inventory_batch;

          data.is_promo_product.for_product.all_inventory_stok = getBatch.for_product.all_inventory_stok;
          data.is_promo_product.for_product.all_inventory_batch = getBatch.for_product.all_inventory_batch;
          if(data.is_promo_product.get_product){
            data.is_promo_product.get_product.all_inventory_stok = getBatch.get_product.all_inventory_stok;
            data.is_promo_product.get_product.all_inventory_batch = getBatch.get_product.all_inventory_batch;
          }
          
          data.batch = getBatch.for_product.all_inventory_batch;
        }else{
          data.product.all_inventory_stok = getBatch.all_inventory_stok;
          data.product.all_inventory_batch = getBatch.all_inventory_batch;
          
          data.batch = getBatch.all_inventory_batch;
        }

        this.$root.hideLoading();
      }

      this.dataShowBatchProductOrdetTicketToSelect = data;
      $('#modalShowBatchProductOrderListTicket').modal('show');
    },

    addSelectBatchProductListOrderTicket: function(data, batch, qty = 1){
      const findIndexData = this.listDataProductDetailSelectTicket.findIndex((x) => x == data);
      const findIfExist = data.selectBatch.find((x) => x.batch == batch);
      if(findIfExist){
        findIfExist.qty += 1;
      }else{
        batch.isSelected = true;
        const batchNew = {
          batch: batch,
          qty: qty
        }
        data.selectBatch.push(batchNew);
        $('#modalListProductTicketSelected').find(`#cardProductOrderTicket_${findIndexData}`).removeClass('border-red');
      }
    },

    emptySelecteBatchProductOrderList: function(data){
      data.selectBatch.forEach(x => {
        const findBatch = data.batch.find((y) => y.id == x.batch.id);
        delete findBatch.isSelected;
      });
      data.selectBatch = [];
    },

    deleteSelecteBatchProductOrderList: function(data, batch, index){
      data.selectBatch.splice(index, 1);
      
      const findBatch = data.batch.find((x) => x.id == batch.batch.id);
      delete findBatch.isSelected;
    },

    moveOrderListTicketProductToCart: function(){
      let resValidate = true;
      const elementModal = $('#modalListProductTicketSelected');

      let listCreateProduct = [];
      let listTicketOrder = [];
      for(let i = 0; i < this.listDataProductDetailSelectTicket.length; i++){
        const data = this.listDataProductDetailSelectTicket[i];
        const elementCard = elementModal.find(`#cardProductOrderTicket_${i}`);
        if(data.selectBatch.length == 0){
          elementCard.addClass('border-red');
          resValidate = false;
        }else{
          elementCard.removeClass('border-red');
        }

        let addedProducts = [];
        data.selectBatch.forEach(x => {
          const productObj = {
            product: data.product,
            qty: x.qty,
            batch: x.batch,
            is_promo_product: data.is_promo_product ? data.is_promo_product : null,
            is_ticket: data.is_ticket,
          };
          addedProducts.push(productObj);
        });

        listCreateProduct = listCreateProduct.concat(addedProducts);
        const checkTicketInList = listTicketOrder.find((x) => x.id == data.is_ticket.id && x.no_ticket == data.is_ticket.no_ticket);
        if(!checkTicketInList){
          listTicketOrder.push(data.is_ticket);
        }
      };

      if(resValidate == false){
        this.$root.showAlertFunction('warning', 'Batch Invalid!', 'Gagal Melanjutkan! Lengkapi semua batch product.');
        return false;
      }
      
      this.dataProductInList = listCreateProduct;
      this.allTicketInOrder = listTicketOrder;
      this.calculateAmoutPrice();
      this.calculatePcsItemOrderList();

      $('#modalListProductTicketSelected').modal('hide');
      this.selectedRowTicketOrder = null;
      this.listDataProductDetailSelectTicket = [];
    },

    deleteOrderTiketByIdx: function (index){
      const getTiket = this.allTicketInOrder[index];
      getTiket.tiket_detail.forEach(product => {
        const batch = product.batch;
        const findProduct = this.dataProductInList.find((p) => !p.is_promo_product && p.product.itemCode === product.itemCode && p.batch.batchNo.trim() === batch.batchNo.trim());
        if(product.qty == findProduct.qty){
          this.deleteProductById(product, batch);
        }else{
          findProduct.qty = findProduct.qty - product.qty;
        }
      });
      this.allTicketInOrder.splice(index, 1);

      if(getTiket.member != null){
        this.memberOverview = null;
      }
    },
    // End Logic

    batalModalCheckoutConfirm: function(){
      this.dataProductListForStruk = [];
      this.dataMoreMetodeBayar = [];
      this.validasiMetodePembayaran = [];
      this.nominalMoreMetodeBayar = [];
      this.getCheckGelarPembelian = null;
      
      this.selectedActivePromo = null;
      this.productSingleGWP = null;
      this.inputNominalMethodCash = null;
      this.totalKembalianMetodeCash = 0;
      this.checkboxMemberPotonganPoint = false;
      this.totalHematDiskon = 0;
      this.totalDiskonPercentReseller = 0;
      this.totalDiscountPromo = 0;
      this.afterDiscountPromo = 0;
      this.discountPromoAdditional = 0;
      this.productSingleGWP = null;

      this.calculateAmoutPrice();
      $('#modalBatalConfirm').modal('hide');
      $('#modalConfirmPay').modal('hide');
    },

    checkTotalPriceNonPromo: function(){
      let result = 0;
      this.dataProductInList.forEach((product) => {
        if(!product.is_promo_product){
          var getProduct = product.product;
          let formatHarga;

          if(this.$root.filterDiskonProduct(getProduct).discCode == this.master_code.diskon.tanpa_diskon_code){
            formatHarga = parseInt(getProduct.all_product_price[0].price);
          }else{
            formatHarga = parseInt(getProduct.all_product_price[0].price  - (getProduct.all_product_price[0].price * (this.$root.filterDiskonProduct(getProduct).discount/100)));
          }
        
          var calculatePrice = formatHarga * product.qty;
          result += calculatePrice;
        }
      });

      return result;
    },

    // changeCheckboxMemberPotonganPoint(){
    //   const priceToPay = this.calculateTotalBayarPrice;
    //   const pointMember = this.memberOverview ? parseInt(this.memberOverview.point) : 0;
    //   if (this.checkboxMemberPotonganPoint) {
    //     this.calculateTotalBayarPrice = priceToPay - pointMember;
    //   } else {
    //     this.calculateTotalBayarPrice = priceToPay + pointMember;
    //   }
      
    //   this.checkInputNominalMethodCash();
    // },

    checkInputNominalMethodCash: function(){
      const inputElement = document.getElementById('inputNominalMethodCash');
      if(inputElement === null){
        return false;
      }

      const price = inputElement.value;
      const numericPrice = price.replace(/[^0-9]/g, '');
      
      if (numericPrice === null || numericPrice.trim() === "") {
        this.totalKembalianMetodeCash = 0;
        return;
      }
      
      const number = parseFloat(numericPrice);
      if(number > this.calculateTotalBayarPrice){
        this.totalKembalianMetodeCash = number - this.calculateTotalBayarPrice;
        inputElement.classList.remove('border-red');
      }else{
        this.totalKembalianMetodeCash = 0;
        inputElement.classList.add('border-red');
      }

      const hasFormat = this.$root.formatPrice(number);
      return hasFormat;
    },

    checkValidasiGelarMember: function(){
      let gelarTerpilih = this.dataAllGelars.find((gelar) => {
        const minimalNilai = parseFloat(gelar.minimal_nilai);
        const maksimalNilai = parseFloat(gelar.maksimal_nilai);
        var totalPriceNonPromo = parseFloat(this.checkTotalPriceNonPromo());

        if (gelar.minimal_nilai !== null && gelar.maksimal_nilai !== null) {
          return totalPriceNonPromo >= minimalNilai && totalPriceNonPromo <= maksimalNilai;
        } else if (gelar.minimal_nilai !== null) {
          return totalPriceNonPromo >= minimalNilai;
        } else if (gelar.maksimal_nilai !== null) {
          return totalPriceNonPromo <= maksimalNilai;
        }

        return false;
      });

      // if (!gelarTerpilih) {
      //   gelarTerpilih = this.dataAllGelars.find((gelar) => gelar.slug === this.master_code.gelarBeli.reguler);
      // }

      return gelarTerpilih;
    },

    validationBeforeContinueBtnBilling: function(){
      if(this.dataProductInList.length < 1){
        this.$root.showAlertFunction('warning', 'Order List', 'Tidak ada product yang ditambahkan dalam Order List!');
        return false;
      }

      // if(this.memberOverview == null){
      //   this.$root.showAlertFunction('warning', 'Validasi Transaksi', 'Silahkan pilih dan tentukan member!');
      //   this.invalidMemberSelect = true;
      //   return false;
      // }

      if(this.selectMethodPayment == ''){
        this.$root.showAlertFunction('warning', 'Validasi Transaksi', 'Silahkan pilih metode pembayaran!');
        this.invalidMetodePembayaran = true;
        return false;
      }else{
        this.invalidMemberSelect = false;
        const findMetodeBayar = this.dataAllMetodeBayar.find((metode) => metode.id === this.selectMethodPayment);
        if(findMetodeBayar.kode == this.master_code.metodeBayar.redeem){
          if(this.memberOverview != null){
            if(parseInt(this.memberOverview.point) < parseInt(this.totalBayarPrice)){
              this.$root.showAlertFunction('warning', 'Transaksi Invalid', 'Point member tidak cukup!');
              this.invalidMemberSelect = true;
              return false;
            }
          }else{
              this.$root.showAlertFunction('warning', 'Transaksi Invalid', 'Metode bayar redeem memperlukan member!');
              this.invalidMemberSelect = true;
              return false;
          }
        }
      }

    },

    btnSearchSubmitProduct: function(){
      this.allProductFindSearchBtn = [];
      const query = this.inputSearchProduct.trim();
      if(query != ''){
        const checkAllProduct = this.dataAllProducts.filter(product => {
          const checkProduct = product.promo_product_id ? product.for_product : product;
          const filterValidate = checkProduct.barCode.includes(query);
          return filterValidate;
        });

        if(checkAllProduct.length > 0) {
          this.allProductFindSearchBtn = checkAllProduct;
          if(checkAllProduct.length > 1){
            $('#modalSearchFoundProductMore').modal('show');
          }else{
            console.log(checkAllProduct[0]);
            this.validateModalBatchProduct(checkAllProduct[0]);
          }
          this.inputSearchProduct = '';
        }
      }
    },

    // Logic GWP
    closeModalSelectActivePromo: function(){
      this.selectedActivePromo = null;
      this.productSingleGWP = null;
      this.selectedAllPromoMinValGwp = [];
      this.productSelectBatchMinValGwp = null;

      $('#modalShowActivePromoDiskon').modal('show');
    },

    clickAddToListSingleGwpProduct: function(product, batch){
      if(product.all_inventory_batch === 0){
        return false;
      }

      const productObj = {
        product: product,
        qty: 1,
        batch: batch,
        is_promo_product: null,
        is_free_product: true,
        isGwpProduct: true,
      };
      this.dataProductListForStruk.push(productObj);

      this.confirmationPayment();
      $('#modalProductSingleGwp').modal('hide');
      $('#modalShowActivePromoDiskon').modal('hide');
      // if(parseInt(batch.onHand) > 0){
      // }else{
      //   this.$root.showAlertFunction('warning', 'Stok Invalid!', 'Gagal menambahkan stok tidak cukup.');
      // }
    },

    fatchDataProductMinValueGwp: async function(page = 1){
      const cacheStoreAccess = JSON.parse(localStorage.getItem(this.local_storage.access_store));
      this.$root.showLoading();
      try{
        const getAllProduct = await axios({
          method: 'get',
          url: this.$root.API_ERP + '/pos/app/sales/getAllProduct',
          params: {
            page: page,
            per_page: this.perPageMinValGwp,
            store_outlet: cacheStoreAccess.store_outlet,
            search: this.inputSearchProductInMinValGwp.trim(),
          },
        });
        this.dataAllProductsMinValGwp = [];

        const response = getAllProduct.data;
        this.currentPageMinValGwp = response.current_page;
        this.totalPageMinValGwp = response.last_page;
        this.updateDisplayedPagesMinValueGwp();
        
        var getDataProduct = response.data;
        this.dataAllProductsMinValGwp = getDataProduct.filter((x) => {
          const ifHaveInListSelect = this.selectedAllPromoMinValGwp.some((y) => y.product.itemCode === x.itemCode);
          if(ifHaveInListSelect){
            x.isSelectedGwpMinVal = true;
          }
          return x;
        });
      }catch(e){
        console.log(e);
      }
      this.$root.hideLoading();
    },

    fatchDataProductMultiGwp: async function(promo, page = 1){
      const cacheStoreAccess = JSON.parse(localStorage.getItem(this.local_storage.access_store));
      this.$root.showLoading();
      try{
        const reqDataPage = await axios({
          method: 'get',
          url: this.$root.API_ERP + '/pos/getPageOfPromoDiskonDetail',
          params: {
            promo_code: promo.promo_code,
            store_code: cacheStoreAccess.store_code,
            page: page,
            per_page: this.perPageDetailPromoDiskon,
          }
        });
        const resPage = reqDataPage.data;
        this.currentPageDetailPromoDiskon = resPage.current_page;
        this.totalPageDetailPromoDiskon = resPage.last_page;
        this.updateDisplayedPagesDetailPromoDiskon();
        
        const reqData = await axios({
          method: 'get',
          url: this.$root.API_ERP + '/pos/getPromoDiskonDetailById',
          params: {
            promo_code: promo.promo_code,
            store_code: cacheStoreAccess.store_code,
            page: page,
            per_page: this.perPageDetailPromoDiskon,
          }
        });

        const resData = reqData.data;
        this.dataAllProductsMinValGwp = resData.map((data) => {
          const x = data.item;
          const ifHaveInListSelect = this.selectedAllPromoMinValGwp.some((y) => y.product.itemCode === x.itemCode);
          if(ifHaveInListSelect){
            x.isSelectedGwpMinVal = true;
          }
          return x;
        });
      }catch(e){
        console.log(e);
      }
      this.$root.hideLoading();
    },

    fatchDataProductSingleGwp: async function(promo, page = 1){
      this.$root.showLoading();
      const cacheStoreAccess = JSON.parse(localStorage.getItem(this.local_storage.access_store));
      try{
        const reqData = await axios({
          method: 'get',
          url: this.$root.API_ERP + '/pos/getPromoDiskonDetailById',
          params: {
            promo_code: promo.promo_code,
            store_code: cacheStoreAccess.store_code,
            page: page,
            per_page: 1,
          }
        });

        const resData = reqData.data;
        const getInvBatch = await this.checkInventoryBatchProduct(resData[0].item);
        resData[0].item.all_inventory_batch = getInvBatch.all_inventory_batch;
        return resData;
      }catch(e){
        console.log(e);
      }
      this.$root.hideLoading();
    },
    
    updateDisplayedPagesMinValueGwp() {
      const halfDisplayedPages = Math.floor(this.totalDisplayedPagesMinValGwp / 2);

      let startPage = Math.max(1, this.currentPageMinValGwp - halfDisplayedPages);
      let endPage = Math.min(this.totalPageMinValGwp, startPage + this.totalDisplayedPagesMinValGwp - 1);

      if (endPage - startPage + 1 < this.totalDisplayedPagesMinValGwp) {
        startPage = Math.max(1, endPage - this.totalDisplayedPagesMinValGwp + 1);
      }
      
      this.displayedPagesMinValGwp = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    },
    
    updateDisplayedPagesDetailPromoDiskon() {
      const halfDisplayedPages = Math.floor(this.totalDisplayedPagesDetailPromoDiskon / 2);

      let startPage = Math.max(1, this.currentPageDetailPromoDiskon - halfDisplayedPages);
      let endPage = Math.min(this.totalPageDetailPromoDiskon, startPage + this.totalDisplayedPagesDetailPromoDiskon - 1);

      if (endPage - startPage + 1 < this.totalDisplayedPagesDetailPromoDiskon) {
        startPage = Math.max(1, endPage - this.totalDisplayedPagesDetailPromoDiskon + 1);
      }

      this.displayedPagesDetailPromoDiskon = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    },

    validateModalBatchProductMinValGwp: async function(product, qty = 1){
      const checkProduct = await this.checkInventoryBatchProduct(product);

      this.productSelectBatchMinValGwp = null;
      this.productSelectBatchMinValGwp = {
        product: checkProduct,
        qty: qty
      };
      $('#modalShowBatchProductMinValGwp').modal('show');
    },

    updateQtySelectProductGwp: function(event, data, promo){
      const newValue = parseInt(event.target.value);
      if (isNaN(newValue) || newValue < 1) {
        event.target.value = data.qty;
        return;
      }

      if(newValue > data.qty){
        if(promo.tipe_gwp == this.master_coll.tipe_gwp.secound){
          const getTotalInList = this.checkTotalPriceProductMinValGwp();
          const getTotalWithAdd = parseInt(getTotalInList) + parseInt(data.product.all_product_price[0].price);
          if(
            (parseInt(data.product.all_product_price[0].price) > parseInt(promo.min_value_product)) ||
            (getTotalWithAdd > parseInt(promo.min_value_product))
          ){
            event.target.value = data.qty;
            return false;
          }
        }

        if(promo.tipe_gwp == this.master_coll.tipe_gwp.three){
          const getQtyInList = this.getTotalQtyProductSelectGwp();
          if (getQtyInList >= parseInt(promo.mix_get_pcs_gwp)) {
            event.target.value = data.qty;
            return;
          }
        }
      }

      data.qty = newValue;
    },

    checkTotalPriceProductMinValGwp: function(){
      let result = 0;
      this.selectedAllPromoMinValGwp.forEach((product) => {
        if(!product.is_promo_product){
          var getProduct = product.product;
          let formatHarga;

          if(this.$root.filterDiskonProduct(getProduct).discCode == this.master_code.diskon.tanpa_diskon_code){
            formatHarga = parseInt(getProduct.all_product_price[0].price);
          }else{
            formatHarga = parseInt(getProduct.all_product_price[0].price  - (getProduct.all_product_price[0].price * (this.$root.filterDiskonProduct(getProduct).discount/100)));
          }
        
          var calculatePrice = formatHarga * product.qty;
          result += calculatePrice;
        }
      });

      return result;
    },

    getTotalQtyProductSelectGwp: function(){
      let result = 0;
      this.selectedAllPromoMinValGwp.forEach((product) => {
        if(!product.is_promo_product){
          result += product.qty;
        }
      });

      return result;
    },

    selectBatchProductMinValGwp: function(product, batch, qty = 1){
      if(product.all_inventory_batch === 0){
        return false;
      }

      if(this.selectedActivePromo.tipe_gwp == this.master_coll.tipe_gwp.secound){
        const getTotalInList = this.checkTotalPriceProductMinValGwp();
        const getTotalWithAdd = parseInt(getTotalInList) + parseInt(product.all_product_price[0].price);
        if(
          (parseInt(product.all_product_price[0].price) > parseInt(this.selectedActivePromo.min_value_product)) ||
          (getTotalWithAdd > parseInt(this.selectedActivePromo.min_value_product))
        ){
          $('#modalShowBatchProductMinValGwp').modal('hide');
          this.$root.showAlertFunction('warning', 'Gagal Menambahkan!', 'Total value melebihi maksimal.');
          return false;
        }
      }

      if(this.selectedActivePromo.tipe_gwp == this.master_coll.tipe_gwp.three){
        const getQtyInList = this.getTotalQtyProductSelectGwp();
        if(getQtyInList >= this.selectedActivePromo.mix_get_pcs_gwp){
          $('#modalShowBatchProductMinValGwp').modal('hide');
          this.$root.showAlertFunction('warning', 'Gagal Menambahkan!', 'Total pieces melebihi maksimal.');
          return false;
        }
      }
      
      const findInList = this.selectedAllPromoMinValGwp.find((x) => x.product.itemCode == product.itemCode);
      if(findInList){
        findInList.qty += 1;
      }else{
        const productObj = {
          product: product,
          qty: 1,
          batch: batch,
          is_promo_product: null,
          is_free_product: true,
          isGwpProduct: true,
        };
        this.selectedAllPromoMinValGwp.push(productObj);
        product.isSelectedGwpMinVal = true;
      }

      $('#modalShowBatchProductMinValGwp').modal('hide');
      this.productSelectBatchMinValGwp = null;
      // if(parseInt(batch.onHand) > 0){
      // }else{
      //   this.$root.showAlertFunction('warning', 'Stok Invalid!', 'Gagal menambahkan stok tidak cukup.');
      // }
    },

    deleteDataProductMinValGwp: function(data, index){
      const findDataInList = this.dataAllProductsMinValGwp.find((x) => x.itemCode == data.product.itemCode);
      if(findDataInList) delete findDataInList.isSelectedGwpMinVal;
      this.selectedAllPromoMinValGwp.splice(index, 1);
    },

    btnContinueSelectMinValGwp: function(){
      this.dataProductListForStruk = this.dataProductListForStruk.concat(this.selectedAllPromoMinValGwp);
      $('#modalSelectProductFreeGwp').modal('hide');
      
      this.selectedAllPromoMinValGwp = [];
      this.productSelectBatchMinValGwp = null;
      this.confirmationPayment();
    },
    // End Logic GWP
    
    // Control all modal confirm transaksi
    openModalCancelConfirm: function(){
      $('#modalBatalConfirm').modal('show');
    },

    checkConfirmationPayment: async function(){
      if(this.validationBeforeContinueBtnBilling() == false){
        return false;
      }

      this.$root.showLoading();

      const dataProductList = this.dataProductInList.slice();
      for (let i = dataProductList.length - 1; i >= 0; i--) {
        let dataList = dataProductList[i];
        let dataPromo = dataList.is_promo_product;
        if(dataPromo){
          let mPromoProduct = dataPromo.master_promo_product;
          if (dataPromo !== null && mPromoProduct.tipe_promo === this.master_coll.tipePromo.bundle) {
            const getProduct = dataPromo.get_product;
            const calculateBuyGet = parseInt(dataList.qty) / parseInt(mPromoProduct.buy_item);
            if(getProduct.all_inventory_batch.length > 0 && calculateBuyGet >= 1){
              const batch = getProduct.all_inventory_batch[0];
              const productObj = {
                product: getProduct,
                qty: parseInt(Math.floor(calculateBuyGet)),
                batch: batch,
                is_promo_product: dataPromo,
                is_free_product: true,
              };
              if(dataList.is_ticket){
                productObj.is_ticket = dataList.is_ticket;
              }
  
              dataProductList.splice(i + 1, 0, productObj);
            }
          }
        }
      }
      this.dataProductListForStruk = dataProductList;

      const cacheStoreAccess = JSON.parse(localStorage.getItem(this.local_storage.access_store));
      try{
        const checkPromo = await axios({
          method: 'get',
          url: this.$root.API_ERP + '/pos/getActivePromoDiskon',
          params: {
            page: 1,
            per_page: this.perPagePromoDiskon,
            store_outlet: cacheStoreAccess.store_outlet
          }
        });
        
        const resData = checkPromo.data;
        const dataPromo = resData.data;
        
        if(dataPromo.length > 0){
          this.currentPagePromoDiskon = resData.current_page;
          this.totalPagePromoDiskon = resData.last_page;
          this.dataActiveMasterPromo = dataPromo;
          this.updateDisplayedPagesPromoDiskon();
          
          $('#modalShowActivePromoDiskon').modal('show');
        }else{
          this.confirmationPayment();
        }
      }catch(e){
        console.log(e);
      }

      this.$root.hideLoading();
    },

    clickPromoConfirmationPromo: async function(promo){
      if(promo.min_buy != null){
        if(this.totalPcsItemOrder < promo.min_buy){
          this.$root.showAlertFunction('warning', 'Promo Gagal!', 'Syarat dan ketentuan tidak terpenuhi.');
          this.$root.hideLoading();
          return false;
        }
      }
      if(promo.min_value != null){
        if(this.totalBayarPrice < parseInt(promo.min_value)){
          this.$root.showAlertFunction('warning', 'Promo Gagal!', 'Syarat dan ketentuan tidak terpenuhi.');
          this.$root.hideLoading();
          return false;
        }
      }

      if(promo.promo_member_for != 'all'){
        if(this.memberOverview == null){
          this.$root.showAlertFunction('warning', 'Promo Gagal!', 'Promo ini hanya berlaku untuk member');
          this.$root.hideLoading();
          return false;
        }
        if(this.memberOverview.tipe_konsumen.slug.toLowerCase() != promo.promo_member_for.toLowerCase()){
          this.$root.showAlertFunction('warning', 'Promo Gagal!', `Promo ini hanya berlaku untuk konsumen ${promo.promo_member_for}`);
          this.$root.hideLoading();
          return false;
        }
      }

      // const filterProductNoPromo = this.dataProductInList.filter((product) => !product.is_promo_product);
      var totalPriceNonPromo = this.checkTotalPriceNonPromo();

      if(totalPriceNonPromo > 0){
        const calculateDiscount = totalPriceNonPromo * (promo.percent/100);
        this.totalDiscountPromo = calculateDiscount;

        if(promo.percent_after_dic != null && promo.percent_after_dic > 0){
          const afterDiscValue = totalPriceNonPromo - calculateDiscount;
          const calculateAfterDiscValue = afterDiscValue * (promo.percent_after_dic/100);
          this.afterDiscountPromo = calculateAfterDiscValue;
        }
        if(promo.percent_additional != null && promo.percent_additional > 0){
          const totalMinimal = totalPriceNonPromo - calculateDiscount;
          if(totalMinimal > parseInt(promo.min_value)){
            const totalAfterMinimal = totalMinimal - this.afterDiscountPromo;
            const calculateAfterMinimal = totalAfterMinimal * (promo.percent_additional/100);
            this.discountPromoAdditional = calculateAfterMinimal;
          }
        }
        // this.totalBayarPrice = this.totalBayarPrice - calculateDiscount;
      }else{
          this.$root.showAlertFunction('warning', 'Promo Gagal!', 'Promo berlaku untuk product reguler');
          this.$root.hideLoading();
          return false;
      }

      
      this.selectedActivePromo = promo;
      
      if(promo.is_gwp == true){
        if(promo.tipe_gwp == this.master_coll.tipe_gwp.first){
          const dataAllGwpDetail = await this.fatchDataProductSingleGwp(promo);
          const fisrtProd = dataAllGwpDetail[0].item;
          this.productSingleGWP = fisrtProd;
          $('#modalProductSingleGwp').modal('show');
          this.$root.showAlertFunction('success', 'Promo Berhasil!', 'Selamat!! Promo berlaku dengan GWP.');
        }
        if(promo.tipe_gwp == this.master_coll.tipe_gwp.secound){
          await this.fatchDataProductMinValueGwp();
          $('#modalSelectProductFreeGwp').modal('show');
        }
        if(promo.tipe_gwp == this.master_coll.tipe_gwp.three){
          await this.fatchDataProductMultiGwp(promo);
          $('#modalSelectProductFreeGwp').modal('show');
        }
      }else{
        this.confirmationPayment();
      }

      $('#modalShowActivePromoDiskon').modal('hide');
    },

    confirmationPayment: function(){
      this.calculateAmoutPrice();
      this.currentTime = new Date();
      
      const findMetodeBayar = this.dataAllMetodeBayar.find((metode) => metode.id === this.selectMethodPayment);

      // Penentuan tambahan metode pembayaran pada struk checkout apa saja berdasarkan logic
      this.validasiMetodePembayaran = this.dataAllMetodeBayar.filter((metode) => {
        if(this.selectSalesBy == this.master_code.salesBy.selly){
          return metode.kode == this.master_code.metodeBayar.tf;
        }else{
          if(findMetodeBayar.kode != this.master_code.metodeBayar.cc && findMetodeBayar.kode != this.master_code.metodeBayar.karyawan){
            if(this.selectSalesBy != this.master_code.salesBy.wi){
              return metode.kode != this.master_code.metodeBayar.cash && metode.kode != this.master_code.metodeBayar.cc && metode.kode != this.master_code.metodeBayar.karyawan;
            }else{
              return metode.kode != this.master_code.metodeBayar.cc && metode.kode != this.master_code.metodeBayar.karyawan;
            }
          }
        }
      });

      // Tentukan metode pembayaran pertama
      if(findMetodeBayar){
        this.selectedMetodeBayar = findMetodeBayar;
      }

      // Validasi jika ada metode pembayaran cash
      if(findMetodeBayar.kode == this.master_code.metodeBayar.cash){
        this.checkMetodeCashSelect = true;
      }else{
        this.checkMetodeCashSelect = false;
      }
      
      // Check total belaja untuk reseller
      if(this.selectedActivePromo == null){
        var checkGelarPembelian = this.checkValidasiGelarMember();
        if(checkGelarPembelian){
          var totalPriceNonPromo = this.checkTotalPriceNonPromo();
          if(totalPriceNonPromo > parseInt(checkGelarPembelian.minimal_nilai)){
            this.getCheckGelarPembelian = checkGelarPembelian;
            if(checkGelarPembelian.slug === this.master_code.gelarBeli.silver){
              const totalDiskon = totalPriceNonPromo * (checkGelarPembelian.amount/100);
              this.totalDiskonPercentReseller = totalDiskon;
            }
          }
        }
      }

      this.calculateTotalBayarPrice = this.calculateTotalBayarPrice - (this.totalDiskonPercentReseller + this.totalDiscountPromo + this.afterDiscountPromo + this.discountPromoAdditional);
      $('#modalConfirmPay').modal('show');

      // this.generatePdfCheckout();
    },
    
    openModalCheckoutConfirm: function(){
      this.invalidSelectSalesBsc = false;

      if(this.selectedMetodeBayar.kode != this.master_code.metodeBayar.cash && this.selectedMetodeBayar.kode != this.master_code.metodeBayar.karyawan && this.selectedMetodeBayar.kode != this.master_code.metodeBayar.redeem){
        var inputSelectedMetodeBayar = $("#inputSelectedMetodeBayar");
        var inputSelectedMetodeBayarVal = inputSelectedMetodeBayar.val().trim();

        if (inputSelectedMetodeBayarVal === "" ){
          inputSelectedMetodeBayar.addClass('border-red');
          return false;
        }
      }

      if(this.selectSalesBy == this.master_code.salesBy.wa && this.selectedBscWa == ''){
        this.invalidSelectSalesBsc = true;
        return false;
      }
      $('#modalCheckoutConfirm').modal('show');
    },

    checkoutBtn: async function(){
      try{
        this.$root.showLoading();

        // Check plafon if member karyawan metode karyawan
        const findMetodeBayar = this.dataAllMetodeBayar.find((metode) => metode.id === this.selectMethodPayment);
        if(findMetodeBayar.kode == this.master_code.metodeBayar.karyawan){
          try{
            const reqPlafon = await axios({
              method: 'get',
              url: this.$root.API_ERP + '/pos/app/sales/getPlafonMemberKaryawan',
              params: {
                memberId: this.memberOverview.member_id,
              }
            });

            const resPlafon = reqPlafon.data;
            if(parseInt(this.calculateTotalBayarPrice) > parseInt(resPlafon.balance)){
              this.$root.hideLoading();
              this.headerModalInfoPlafon = 'Balance plafon invalid';
              this.bodyModalInfoPlafon = 'Balance plafon per-bulan ini tidak cukup. Gunakan metode lainnya!';
              $('#modalInfoCheckPlafonKaryawan').modal('show');
              return false;
            }
          }catch(e){
            this.$root.hideLoading();
            if(e.response.status == 404){
              this.headerModalInfoPlafon = 'Plafon not-Found!';
              this.bodyModalInfoPlafon = 'Plafon member karyawan tidak terdaftar. Gunakan metode lainnya!';
              $('#modalInfoCheckPlafonKaryawan').modal('show');
            }else{
              this.$root.showAlertFunction('warning', 'Payment Invalid', 'Ops..! Terjadi kesalahan, Metode pambayaran karyawan tidak dapat digunakan');
              console.log(e);
            }

            return false;
          }
        }
        // End logic
        
        const user_login = {
          user_uuid: this.$root.dataAuthToken.user_uuid,
          nama_lengkap: this.$root.dataAuthToken.nama_lengkap
        };
        const activeStore = JSON.parse(localStorage.getItem(this.local_storage.access_store));

        const dataTr = {
          user_login: user_login,
          
          storeCode: this.$root.selectedStoreAccess.store_code,
          memberId: this.memberOverview != null ? this.memberOverview : null,
          salesBy: this.selectSalesBy,
          salesByWaName: this.selectedBscWa != null ? this.selectedBscWa.trim() != '' ? this.selectedBscWa : null : null,

          totalQty: this.totalPcsItemOrder > 0 ? parseInt(this.totalPcsItemOrder) : null,

          subTotalAmount: this.totalPriceRingkasanProduct > 0 ? parseInt(this.totalPriceRingkasanProduct) : null,
          totalDicountAmount: this.totalHematDiskon > 0 ? parseInt(this.totalHematDiskon) : null,
          afterTotalDicountAmount: this.totalBayarPrice > 0 ? parseInt(this.totalBayarPrice) : null,
          extraDiscountAmount: this.totalDiskonPercentReseller > 0 ? parseInt(this.totalDiskonPercentReseller) : null,
          
          amountDiskonPoint: this.selectedMetodeBayar.kode == this.master_code.metodeBayar.redeem ? parseInt(this.memberOverview.point) : null,
          gelarPembalian: this.getCheckGelarPembelian,

          paymentAmount: this.calculateTotalBayarPrice > 0 ? parseInt(this.calculateTotalBayarPrice) : null,

          description: this.keteranganTransaksi.trim() != '' ? this.keteranganTransaksi : null,

          paymentMethodCode: this.selectedMetodeBayar != null ? this.selectedMetodeBayar : null,
          uniquePayment: this.modelInputSelectedMetodeBayar.trim() != '' ? this.modelInputSelectedMetodeBayar : null,

          cashValue: this.inputNominalMethodCash ? parseInt(this.$root.formatCurrencyRemoveSeparator(this.inputNominalMethodCash)) : null,
          returnCashValue: this.totalKembalianMetodeCash > 0 ? parseInt(this.totalKembalianMetodeCash) : null,

          discountPromo: this.selectedActivePromo != null ? this.selectedActivePromo : null,
          discountPromoValue : this.selectedActivePromo != null ? parseInt(this.totalDiscountPromo) : null,

          products: this.dataProductListForStruk,
          activeStore: activeStore.store_outlet,
          isTicket: this.allTicketInOrder.length > 0 ? this.allTicketInOrder : null,
          objTypeCode: this.selectedMetodeBayar.kode == this.master_code.metodeBayar.redeem ? parseInt(this.master_coll.masterObjType.salesredeem) : parseInt(this.master_coll.masterObjType.salestoko),
        }
        
        const storeTr = await axios({
          method: 'post',
          url: this.$root.API_ERP + '/pos/app/sales/storeNewTransaction',
          data: dataTr,
        });
    
        if(storeTr.status == 201 || storeTr.status == 200){
          const dataStoreTr = storeTr.data.data;

          try{
            if(this.selectedMetodeBayar.kode == this.master_code.metodeBayar.redeem){
              this.generatePdfRedeem(dataStoreTr);
            }else{
              if(this.memberOverview != null){
                this.memberOverview = this.dataAllMembers.find((m) => m.member_id === this.memberOverview.member_id);
              }
              this.generatePdfCheckout(dataStoreTr);
            }
          }catch(e){
            console.log(e);
          }
          
          if(this.switchBoxSendEamil == true && this.memberOverview != null){
            try{
              this.$root.sendEmailInvoice(dataStoreTr.ducNum, this.memberOverview.email, true);
            }catch(e){
              console.log(e);
            }
          }
          
          this.finishSuccessTransaction();
          // window.location.reload();
        }else{
          this.$root.showAlertFunction('warning', 'Traksaksi Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
        }
      } catch (error) {
        this.$root.showAlertFunction('warning', 'Traksaksi Gagal!', 'Terjadi kesalahan! Coba beberapa saat lagi atau hubungi Administrator.');
        console.log(error);
      }
      this.$root.hideLoading();
    },

    finishSuccessTransaction: function(){
      this.dataProductInList = [];
      this.dataProductListForStruk = [];
      this.allTicketInOrder = [];
      this.memberOverview = null;

      this.selectedActivePromo = null;
      this.dataMoreMetodeBayar = [];
      this.nominalMoreMetodeBayar = [];
      this.selectedMetodeBayar = {};
      this.selectMethodPayment = '';
      this.modelInputSelectedMetodeBayar = '';
      this.modelInputMoreMetodeBayar = [];

      this.selectedFilterBrand = null;
      this.selectedBscWa = '';
      this.inputSearchMember = '';
      this.keteranganTransaksi = '';
      this.checkboxMemberPotonganPoint = false;

      this.productSingleGWP = null;
      this.selectedAllPromoMinValGwp = [];
      this.productSelectBatchMinValGwp = null;

      this.validasiMetodePembayaran = [];
      this.getCheckGelarPembelian = null;
      
      this.inputNominalMethodCash = null;
      this.totalKembalianMetodeCash = 0;
      this.totalHematDiskon = 0;
      this.totalDiskonPercentReseller = 0;
      this.totalDiscountPromo = 0;
      this.afterDiscountPromo = 0;
      this.discountPromoAdditional = 0;
      
      this.selectedRowTicketOrder = null;
      this.listDataProductDetailSelectTicket = [];

      this.calculateAmoutPrice();
      $('#modalCheckoutConfirm').modal('hide');
      $('#modalConfirmPay').modal('hide');
      $('#modalTransactionFinishSuccess').modal('show');
    },

    generatePdfCheckout: function(dataTr){
      const docStruk = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [72, 297],
      });
      const sizeFont = 6;
      const callPadding = [0, 0, 0, 0];
      const callPaddingProduct = [0.5, 0, 0.5, 0];
      const marginPaper = [0, 1, 0, 1];
      const startLine = 1;
      const endLine = 71;
      const plusHeightLine = 3;

      // Logo martha tilaar shop
      const logoImg = new Image();
      logoImg.src = imageMts;
      const pageWidth = docStruk.internal.pageSize.getWidth();
      const imageWidth = 30;
      const imageHeight = 6;
      const x = (pageWidth - imageWidth) / 2;
      // docStruk.addImage(logoImg, 'PNG', x, 0, imageWidth, imageHeight);

      const storeActive = JSON.parse(localStorage.getItem(this.local_storage.access_store));
      const storeDetail = storeActive.store_outlet;


      // Nama Toko dan Alamat dibagian atas
      autoTable(docStruk, {
        body: [
          [
            {
              content: storeDetail.storeName.toUpperCase(),
              styles: {
                halign: 'center',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            }
          ],

          [
            {
              content: 'MITRA USAHA: PT. TARA PARAMA SEMESTA',
              styles: {
                halign: 'center',
                fontSize: sizeFont,
                cellPadding: [0, 0, 1.5, 0],
              }
            }
          ],


          [
            {
              content: storeDetail.address.toUpperCase(),
              styles: {
                halign: 'center',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            }
          ],

          [
            {
              content: 'No telp. ' + storeDetail.phone,
              styles: {
                halign: 'center',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            }
          ],
        ],
        margin: marginPaper,
        // startY: imageHeight + 3,
        theme: 'plain',
      });

      // Nama bsc dan tanggal transaksi
      autoTable(docStruk, {
        body: [
          [
            {
              content: 'Bon:',
              styles: {
                halign: 'left',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            },
            {
              content: 'Member:',
              styles: {
                halign: 'right',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            }
          ],
          [
            {
              content: dataTr.bonStruk,
              styles: {
                halign: 'left',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            },
            {
              content: this.memberOverview ? this.memberOverview.nama.toUpperCase() : '-',
              styles: {
                halign: 'right',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            }
          ],
          

          [
            {
              content: 'Kasir:',
              styles: {
                halign: 'left',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            },
            {
              content: 'Point:',
              styles: {
                halign: 'right',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            }
          ],
          [
            {
              content: this.$root.dataAuthToken.nama_lengkap.toUpperCase(),
              styles: {
                halign: 'left',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            },
            {
              content: this.memberOverview ? this.$root.formatPrice(this.memberOverview.point) : '-',
              styles: {
                halign: 'right',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            }
          ],
        ],
        margin: marginPaper,
        theme: 'plain',
      });

      const startY1 = docStruk.autoTable.previous.finalY;
      const lineY1 = startY1 + plusHeightLine;
      docStruk.setDrawColor(0);
      docStruk.setLineWidth(0);
      docStruk.line(startLine, lineY1, endLine, lineY1);

      const bodyRinkasanProduct = [
        [
          {
            content: 'Ringkasan Produk:',
            colSpan: 4,
            styles: {
              halign: 'left',
              fontSize: sizeFont,
              cellPadding: [0, 2, 0, 0],
            }
          }
        ]
      ];

      // Add data to ringkasan
      this.dataProductListForStruk.forEach(data => {
        const product = data.product;

        if(data.is_promo_product){
          const promoProduct = data.is_promo_product;
          if(promoProduct.master_promo_product.tipe_promo == this.master_coll.tipePromo.percent){
            const objNameProduct = [
              {
                content: product.itemNameShort,
                colSpan: 4,
                styles: {
                  halign: 'left',
                  fontSize: sizeFont,
                  cellPadding: [0.5, 0, 0, 0],
                }
              },
            ];
            bodyRinkasanProduct.push(objNameProduct);
            
            const discValue = parseInt(promoProduct.master_promo_product.percent);
            const priceProduct = promoProduct.for_product.all_product_price[0].price;
            const discPrice = priceProduct - (priceProduct * (discValue/100));
            const objDiskonInfo = [
              {
                content: `Diskon ${discValue}%`,
                styles: {
                  halign: 'left',
                  fontSize: sizeFont,
                  cellPadding: [0, 1.5, 0.5, 0],
                }
              },
              {
                content: data.qty,
                styles: {
                  halign: 'center',
                  fontSize: sizeFont,
                  cellPadding: callPaddingProduct,
                }
              },
              {
                content: this.$root.formatPrice(discPrice),
                styles: {
                  halign: 'left',
                  fontSize: sizeFont,
                  cellPadding: [0.5, 0, 0.5, 1],
                }
              },
              {
                content: this.$root.formatPrice(discPrice * data.qty),
                styles: {
                  halign: 'right',
                  fontSize: sizeFont,
                  cellPadding: [0.5, 0, 0.5, 0.5],
                }
              }
            ];
            bodyRinkasanProduct.push(objDiskonInfo);
          }
          if(promoProduct.master_promo_product.tipe_promo == this.master_coll.tipePromo.bundle){
            let objProdPromo;
            if(data.is_free_product){
              objProdPromo = [
                {
                  content: product.itemNameShort,
                  styles: {
                    halign: 'left',
                    fontSize: sizeFont,
                    cellPadding: [0.5, 1.5, 0.5, 0],
                  }
                },
                {
                  content: data.qty,
                  styles: {
                    halign: 'center',
                    fontSize: sizeFont,
                    cellPadding: callPaddingProduct,
                  }
                },
                {
                  content: 'FREE',
                  colSpan: 2,
                  styles: {
                    halign: 'right',
                    fontSize: sizeFont,
                    cellPadding: [0.5, 0, 0.5, 0.5],
                  }
                }
              ];
            }else{
              objProdPromo = [
                {
                  content: product.itemNameShort,
                  styles: {
                    halign: 'left',
                    fontSize: sizeFont,
                    cellPadding: [0.5, 1.5, 0.5, 0],
                  }
                },
                {
                  content: data.qty,
                  styles: {
                    halign: 'center',
                    fontSize: sizeFont,
                    cellPadding: callPaddingProduct,
                  }
                },
                {
                  content: this.$root.formatPrice(product.all_product_price[0].price),
                  styles: {
                    halign: 'left',
                    fontSize: sizeFont,
                    cellPadding: [0.5, 0, 0.5, 1],
                  }
                },
                {
                  content: this.$root.formatPrice(product.all_product_price[0].price * data.qty),
                  styles: {
                    halign: 'right',
                    fontSize: sizeFont,
                    cellPadding: [0.5, 0, 0.5, 0.5],
                  }
                }
              ];
            }
            bodyRinkasanProduct.push(objProdPromo);
          }
        }else{
          let objProdPromo;
          if(data.is_free_product){
            objProdPromo = [
              {
                content: product.itemNameShort,
                styles: {
                  halign: 'left',
                  fontSize: sizeFont,
                  cellPadding: [0.5, 1.5, 0.5, 0],
                }
              },
              {
                content: data.qty,
                styles: {
                  halign: 'center',
                  fontSize: sizeFont,
                  cellPadding: callPaddingProduct,
                }
              },
              {
                content: 'FREE',
                colSpan: 2,
                styles: {
                  halign: 'right',
                  fontSize: sizeFont,
                  cellPadding: [0.5, 0, 0.5, 0.5],
                }
              }
            ];
          }else{
            objProdPromo = [
              {
                content: product.itemNameShort,
                styles: {
                  halign: 'left',
                  fontSize: sizeFont,
                  cellPadding: [0.5, 1.5, 0.5, 0],
                }
              },
              {
                content: data.qty,
                styles: {
                  halign: 'center',
                  fontSize: sizeFont,
                  cellPadding: callPaddingProduct,
                }
              },
              {
                content: this.$root.formatPrice(product.all_product_price[0].price),
                styles: {
                  halign: 'left',
                  fontSize: sizeFont,
                  cellPadding: [0.5, 0, 0.5, 1],
                }
              },
              {
                content: this.$root.formatPrice(product.all_product_price[0].price * data.qty),
                styles: {
                  halign: 'right',
                  fontSize: sizeFont,
                  cellPadding: [0.5, 0, 0.5, 0.5],
                }
              }
            ];
          }
          bodyRinkasanProduct.push(objProdPromo);
        }
      });

      // for (let i = 0; i < this.dataProductListForStruk.length; i++) {
      //   const data = this.dataProductListForStruk[i];
      //   const product = data.product;

      //   if(data.is_promo_product){
      //     const promoProduct = data.is_promo_product;
      //     if(promoProduct.master_promo_product.tipe_promo == this.master_coll.tipePromo.percent){
      //       const objNameProduct = [
      //         {
      //           content: product.itemNameShort,
      //           colSpan: 4,
      //           styles: {
      //             halign: 'left',
      //             fontSize: sizeFont,
      //             cellPadding: [0.5, 0, 0, 0],
      //           }
      //         },
      //       ];
      //       bodyRinkasanProduct.push(objNameProduct);
            
      //       const discValue = parseInt(promoProduct.master_promo_product.percent);
      //       const priceProduct = promoProduct.for_product.all_product_price[0].price;
      //       const discPrice = priceProduct - (priceProduct * (discValue/100));
      //       const objDiskonInfo = [
      //         {
      //           content: `Diskon ${discValue}%`,
      //           styles: {
      //             halign: 'left',
      //             fontSize: sizeFont,
      //             cellPadding: [0, 1.5, 0.5, 0],
      //           }
      //         },
      //         {
      //           content: data.qty,
      //           styles: {
      //             halign: 'center',
      //             fontSize: sizeFont,
      //             cellPadding: callPaddingProduct,
      //           }
      //         },
      //         {
      //           content: this.$root.formatPrice(discPrice),
      //           styles: {
      //             halign: 'left',
      //             fontSize: sizeFont,
      //             cellPadding: [0.5, 0, 0.5, 1],
      //           }
      //         },
      //         {
      //           content: this.$root.formatPrice(discPrice * data.qty),
      //           styles: {
      //             halign: 'right',
      //             fontSize: sizeFont,
      //             cellPadding: [0.5, 0, 0.5, 0.5],
      //           }
      //         }
      //       ];
      //       bodyRinkasanProduct.push(objDiskonInfo);

      //       continue;
      //     }
      //   }
        
      //   let objProdPromo;
      //   if(data.is_free_product){
      //     objProdPromo = [
      //       {
      //         content: product.itemNameShort,
      //         styles: {
      //           halign: 'left',
      //           fontSize: sizeFont,
      //           cellPadding: [0.5, 1.5, 0.5, 0],
      //         }
      //       },
      //       {
      //         content: data.qty,
      //         styles: {
      //           halign: 'center',
      //           fontSize: sizeFont,
      //           cellPadding: callPaddingProduct,
      //         }
      //       },
      //       {
      //         content: 'FREE',
      //         colSpan: 2,
      //         styles: {
      //           halign: 'right',
      //           fontSize: sizeFont,
      //           cellPadding: [0.5, 0, 0.5, 0.5],
      //         }
      //       }
      //     ];
      //   }else{
      //     objProdPromo = [
      //       {
      //         content: product.itemNameShort,
      //         styles: {
      //           halign: 'left',
      //           fontSize: sizeFont,
      //           cellPadding: [0.5, 1.5, 0.5, 0],
      //         }
      //       },
      //       {
      //         content: data.qty,
      //         styles: {
      //           halign: 'center',
      //           fontSize: sizeFont,
      //           cellPadding: callPaddingProduct,
      //         }
      //       },
      //       {
      //         content: this.$root.formatPrice(product.all_product_price[0].price),
      //         styles: {
      //           halign: 'left',
      //           fontSize: sizeFont,
      //           cellPadding: [0.5, 0, 0.5, 1],
      //         }
      //       },
      //       {
      //         content: this.$root.formatPrice(product.all_product_price[0].price * data.qty),
      //         styles: {
      //           halign: 'right',
      //           fontSize: sizeFont,
      //           cellPadding: [0.5, 0, 0.5, 0.5],
      //         }
      //       }
      //     ];
      //   }
      //   bodyRinkasanProduct.push(objProdPromo);
      // }

      // Ringkasan product
      
      autoTable(docStruk, {
        head: bodyRinkasanProduct,
        margin: marginPaper,
        theme: 'plain',
      });

      const startY2 = docStruk.autoTable.previous.finalY;
      const lineY2 = startY2 + plusHeightLine;
      docStruk.setDrawColor(0);
      docStruk.setLineWidth(0);
      docStruk.line(startLine, lineY2, endLine, lineY2);

      // Total Ringkasan Product
      const textTotalBayarProduct = `Total Bayar Produk: ${this.totalPcsItemOrder} pcs`;
      autoTable(docStruk, {
        head: [
          [
            {
              content: textTotalBayarProduct,
              styles: {
                halign: 'left',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            },
            {
              content: `Rp ${this.$root.formatPrice(this.totalPriceRingkasanProduct)}`,
              styles: {
                halign: 'right',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            }
          ],
        ],
        margin: marginPaper,
        theme: 'plain',
      });

      const dataBillindDetail = [
        [
          {
            content: 'Billing Detail:',
            styles: {
              halign: 'left',
              fontSize: sizeFont,
              cellPadding: [0, 0, 1, 0],
            }
          },
          {
            content: '',
            styles: {
              halign: 'right',
              fontSize: sizeFont,
              cellPadding: callPadding,
            }
          }
        ]
      ];

      // Total Member Reseller Billing
      if(this.getCheckGelarPembelian){
        const forContentTipe = this.getCheckGelarPembelian.slug == this.master_code.gelarBeli.silver ? ` ${this.getCheckGelarPembelian.amount}%` : '';
        const forContentAmount = this.getCheckGelarPembelian.slug == this.master_code.gelarBeli.silver ? `-Rp ${this.$root.formatPrice(this.totalDiskonPercentReseller)}` : `Buy ${this.getCheckGelarPembelian.amount} Get 1`;
        dataBillindDetail.push([
          {
            content: 'Member Reseller' + forContentTipe,
            styles: {
              halign: 'left',
              fontSize: sizeFont,
              cellPadding: callPadding,
            }
          },
          {
            content: forContentAmount,
            styles: {
              halign: 'right',
              fontSize: sizeFont,
              cellPadding: callPadding,
            }
          }
        ]);
      }

      // Total Hemat Diskon Billing
      if(this.totalHematDiskon > 0){
        dataBillindDetail.push([
          {
            content: 'Hemat Diskon',
            styles: {
              halign: 'left',
              fontSize: sizeFont,
              cellPadding: callPadding,
            }
          },
          {
            content: `-Rp ${this.$root.formatPrice(this.totalHematDiskon)}`,
            styles: {
              halign: 'right',
              fontSize: sizeFont,
              cellPadding: callPadding,
            }
          }
        ]);
      }

      // Diskon percent active promo
      if(this.selectedActivePromo != null){
        dataBillindDetail.push([
          {
            content: `${this.selectedActivePromo.nama_promo.toUpperCase()} (${this.selectedActivePromo.percent} %)`,
            styles: {
              halign: 'left',
              fontSize: sizeFont,
              cellPadding: callPadding,
            }
          },
          {
            content: `-Rp ${this.$root.formatPrice(this.totalDiscountPromo)}`,
            styles: {
              halign: 'right',
              fontSize: sizeFont,
              cellPadding: callPadding,
            }
          }
        ]);
      }

      // Total Bayar Billing
      dataBillindDetail.push([
        {
          content: 'Total Bayar',
          styles: {
            halign: 'left',
            fontSize: sizeFont,
            cellPadding: callPadding,
          }
        },
        {
          content: this.$root.formatPrice(this.calculateTotalBayarPrice),
          styles: {
            halign: 'right',
            fontSize: sizeFont,
            cellPadding: callPadding,
          }
        }
      ]);
      
      // Metode Pembayaran
      dataBillindDetail.push([
        {
          content: 'Metode Bayar',
          styles: {
            halign: 'left',
            fontSize: sizeFont,
            cellPadding: callPadding,
          }
        },
        {
          content: this.selectedMetodeBayar.nama,
          styles: {
            halign: 'right',
            fontSize: sizeFont,
            cellPadding: callPadding,
          }
        }
      ]);
      // Metode bayar cash/tunai
      if(this.selectedMetodeBayar.kode == this.master_code.metodeBayar.cash){
        dataBillindDetail.push([
          {
            content: 'Cash Diberikan',
            styles: {
              halign: 'left',
              fontSize: sizeFont,
              cellPadding: callPadding,
            }
          },
          {
            content: this.inputNominalMethodCash,
            styles: {
              halign: 'right',
              fontSize: sizeFont,
              cellPadding: callPadding,
            }
          }
        ]);
        dataBillindDetail.push([
          {
            content: 'Kembalian',
            styles: {
              halign: 'left',
              fontSize: sizeFont,
              cellPadding: callPadding,
            }
          },
          {
            content: this.$root.formatPrice(this.totalKembalianMetodeCash),
            styles: {
              halign: 'right',
              fontSize: sizeFont,
              cellPadding: callPadding,
            }
          }
        ]);
      }

      // PPN
      dataBillindDetail.push([
        {
          content: 'PPN (11%)',
          colSpan: 2,
          styles: {
            halign: 'left',
            fontSize: sizeFont,
            cellPadding: callPadding,
          }
        },
      ]);

      // Billing detail
      autoTable(docStruk, {
        head: dataBillindDetail,
        margin: marginPaper,
        theme: 'plain',
      });
      
      const startY3 = docStruk.autoTable.previous.finalY;
      const lineY3 = startY3 + plusHeightLine;
      docStruk.setDrawColor(0);
      docStruk.setLineWidth(0);
      docStruk.line(startLine, lineY3, endLine, lineY3);
      
      autoTable(docStruk, {
        body: [
          [
            {
              content: 'Tanggal Transaksi',
              styles: {
                halign: 'left',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            },
            {
              content: this.getDateTimeForStruk(dataTr.docDate),
              styles: {
                halign: 'right',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            }
          ],
        ],
        margin: marginPaper,
        theme: 'plain',
      });
      
      const startY4 = docStruk.autoTable.previous.finalY;
      const lineY4 = startY4 + plusHeightLine;
      docStruk.setDrawColor(0);
      docStruk.setLineWidth(0);
      docStruk.line(startLine, lineY4, endLine, lineY4);

      // Alamat dibawah
      var alamatPusat = "Jl. Pulo Kambing II No.1, RW.11, Jatinegara, Kec. Cakung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13930";
      var npwp = "NPWP: 93.194.943.2 – 004.000";
      var web = "www.marthatilaarshop.com";
      autoTable(docStruk, {
        body: [
          [
            {
              content: npwp,
              styles: {
                halign: 'center',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            },
          ],
          [
            {
              content: alamatPusat.toUpperCase(),
              styles: {
                halign: 'center',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            },
          ],
          [
            {
              content: web.toUpperCase(),
              styles: {
                halign: 'center',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            },
          ],
        ],
        margin: marginPaper,
        theme: 'plain',
      });

      // --MTS--
      autoTable(docStruk, {
        body: [
          [
            {
              content: '--MTS--',
              styles: {
                halign: 'center',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            }
          ],
        ],
        margin: marginPaper,
        theme: 'plain',
      });
      
      autoTable(docStruk, {
        body: [
          [
            {
              content: '-',
              styles: {
                halign: 'center',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            }
          ],
        ],
        margin: marginPaper,
        theme: 'plain',
      });

      // return docStruk.save('Struk Belanja');
      const pdfDataUri = docStruk.output('datauristring');

      // const iframe = this.$refs["pdf_struk_transaksi"];
      // iframe.src = pdfDataUri;

      const newWindow = window.open();
      if (newWindow) {
        const iframe = document.createElement('iframe');
        iframe.src = pdfDataUri;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        newWindow.document.body.style.margin = '0';
        newWindow.document.body.appendChild(iframe);
      } else {
        alert('Pop-up windows are blocked. Please enable pop-ups for this site.');
      }
    },

    generatePdfRedeem: function(dataTr = null){
      const docStruk = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [72, 297],
      });
      const sizeFont = 6;
      const callPadding = [0, 0, 0, 0];
      const callPaddingProduct = [0.5, 0, 0.5, 0];
      const marginPaper = [0, 1, 0, 1];
      const startLine = 1;
      const endLine = 71;
      const plusHeightLine = 3;

      const storeActive = JSON.parse(localStorage.getItem(this.local_storage.access_store));
      const storeDetail = storeActive.store_outlet;

      // Nama Toko dan Alamat dibagian atas
      autoTable(docStruk, {
        body: [
          [
            {
              content: `MARTHA TILAAR SHOP ${storeDetail.storeName.toUpperCase()}`,
              styles: {
                halign: 'center',
                fontSize: sizeFont,
                cellPadding: [1, 0, 2, 0],
              }
            }
          ],


          [
            {
              content: storeDetail.address.toUpperCase(),
              styles: {
                halign: 'center',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            }
          ],
          [
            {
              content: 'No Unit: ' + storeDetail.level,
              styles: {
                halign: 'center',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            }
          ],
          [
            {
              content: 'No telp: ' + storeDetail.phone,
              styles: {
                halign: 'center',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            }
          ],
        ],
        margin: marginPaper,
        // startY: imageHeight + 3,
        theme: 'plain',
      });

      const startY1 = docStruk.autoTable.previous.finalY;
      const lineY1 = startY1 + plusHeightLine;
      docStruk.setDrawColor(0);
      docStruk.setLineWidth(0);
      docStruk.line(startLine, lineY1, endLine, lineY1);

      // Bon Redeem dan Waktu Transaksi
      autoTable(docStruk, {
        body: [
          [
            {
              content: `No Bon: ${dataTr.bonStruk}`,
              styles: {
                halign: 'left',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            },
            {
              content: `Waktu: ${this.getDateTimeForStruk(dataTr.docDate)}`,
              styles: {
                halign: 'right',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            },
          ],
        ],
        margin: marginPaper,
        // startY: imageHeight + 3,
        theme: 'plain',
      });

      const startY2 = docStruk.autoTable.previous.finalY;
      const lineY2 = startY2 + plusHeightLine;
      docStruk.setDrawColor(0);
      docStruk.setLineWidth(0);
      docStruk.line(startLine, lineY2, endLine, lineY2);

      const bodyRinkasanProduct = [
        [
          {
            content: 'Ringkasan Produk:',
            colSpan: 4,
            styles: {
              halign: 'left',
              fontSize: sizeFont,
              cellPadding: [0, 2, 0, 0],
            }
          }
        ]
      ];

      this.dataProductListForStruk.forEach(data => {
        const product = data.product;

        if(data.is_promo_product){
          const promoProduct = data.is_promo_product;
          if(promoProduct.master_promo_product.tipe_promo == this.master_coll.tipePromo.percent){
            const objNameProduct = [
              {
                content: product.itemNameShort,
                colSpan: 4,
                styles: {
                  halign: 'left',
                  fontSize: sizeFont,
                  cellPadding: [0.5, 0, 0, 0],
                }
              },
            ];
            bodyRinkasanProduct.push(objNameProduct);
            
            const discValue = parseInt(promoProduct.master_promo_product.percent);
            const priceProduct = promoProduct.for_product.all_product_price[0].price;
            const discPrice = priceProduct - (priceProduct * (discValue/100));
            const objDiskonInfo = [
              {
                content: `Diskon ${discValue}%`,
                styles: {
                  halign: 'left',
                  fontSize: sizeFont,
                  cellPadding: [0, 1.5, 0.5, 0],
                }
              },
              {
                content: data.qty,
                styles: {
                  halign: 'center',
                  fontSize: sizeFont,
                  cellPadding: callPaddingProduct,
                }
              },
              {
                content: this.$root.formatPrice(discPrice),
                styles: {
                  halign: 'left',
                  fontSize: sizeFont,
                  cellPadding: [0.5, 0, 0.5, 1],
                }
              },
              {
                content: this.$root.formatPrice(discPrice * data.qty),
                styles: {
                  halign: 'right',
                  fontSize: sizeFont,
                  cellPadding: [0.5, 0, 0.5, 0.5],
                }
              }
            ];
            bodyRinkasanProduct.push(objDiskonInfo);
          }
          if(promoProduct.master_promo_product.tipe_promo == this.master_coll.tipePromo.bundle){
            let objProdPromo;
            if(data.is_free_product){
              objProdPromo = [
                {
                  content: product.itemNameShort,
                  styles: {
                    halign: 'left',
                    fontSize: sizeFont,
                    cellPadding: [0.5, 1.5, 0.5, 0],
                  }
                },
                {
                  content: data.qty,
                  styles: {
                    halign: 'center',
                    fontSize: sizeFont,
                    cellPadding: callPaddingProduct,
                  }
                },
                {
                  content: 'FREE',
                  colSpan: 2,
                  styles: {
                    halign: 'right',
                    fontSize: sizeFont,
                    cellPadding: [0.5, 0, 0.5, 0.5],
                  }
                }
              ];
            }else{
              objProdPromo = [
                {
                  content: product.itemNameShort,
                  styles: {
                    halign: 'left',
                    fontSize: sizeFont,
                    cellPadding: [0.5, 1.5, 0.5, 0],
                  }
                },
                {
                  content: data.qty,
                  styles: {
                    halign: 'center',
                    fontSize: sizeFont,
                    cellPadding: callPaddingProduct,
                  }
                },
                {
                  content: this.$root.formatPrice(product.all_product_price[0].price),
                  styles: {
                    halign: 'left',
                    fontSize: sizeFont,
                    cellPadding: [0.5, 0, 0.5, 1],
                  }
                },
                {
                  content: this.$root.formatPrice(product.all_product_price[0].price * data.qty),
                  styles: {
                    halign: 'right',
                    fontSize: sizeFont,
                    cellPadding: [0.5, 0, 0.5, 0.5],
                  }
                }
              ];
            }
            bodyRinkasanProduct.push(objProdPromo);
          }
        }else{
          let objProdPromo;
          if(data.is_free_product){
            objProdPromo = [
              {
                content: product.itemNameShort,
                styles: {
                  halign: 'left',
                  fontSize: sizeFont,
                  cellPadding: [0.5, 1.5, 0.5, 0],
                }
              },
              {
                content: data.qty,
                styles: {
                  halign: 'center',
                  fontSize: sizeFont,
                  cellPadding: callPaddingProduct,
                }
              },
              {
                content: 'FREE',
                colSpan: 2,
                styles: {
                  halign: 'right',
                  fontSize: sizeFont,
                  cellPadding: [0.5, 0, 0.5, 0.5],
                }
              }
            ];
          }else{
            objProdPromo = [
              {
                content: product.itemNameShort,
                styles: {
                  halign: 'left',
                  fontSize: sizeFont,
                  cellPadding: [0.5, 1.5, 0.5, 0],
                }
              },
              {
                content: data.qty,
                styles: {
                  halign: 'center',
                  fontSize: sizeFont,
                  cellPadding: callPaddingProduct,
                }
              },
              {
                content: this.$root.formatPrice(product.all_product_price[0].price),
                styles: {
                  halign: 'left',
                  fontSize: sizeFont,
                  cellPadding: [0.5, 0, 0.5, 1],
                }
              },
              {
                content: this.$root.formatPrice(product.all_product_price[0].price * data.qty),
                styles: {
                  halign: 'right',
                  fontSize: sizeFont,
                  cellPadding: [0.5, 0, 0.5, 0.5],
                }
              }
            ];
          }
          bodyRinkasanProduct.push(objProdPromo);
        }
      });

      // for (let i = 0; i < this.dataProductListForStruk.length; i++) {
      //   const data = this.dataProductListForStruk[i];
      //   const product = data.product;

      //   if(data.is_promo_product){
      //     const promoProduct = data.is_promo_product;
      //     if(promoProduct.master_promo_product.tipe_promo == this.master_coll.tipePromo.percent){
      //       const objNameProduct = [
      //         {
      //           content: product.itemNameShort,
      //           colSpan: 4,
      //           styles: {
      //             halign: 'left',
      //             fontSize: sizeFont,
      //             cellPadding: [0.5, 0, 0, 0],
      //           }
      //         },
      //       ];
      //       bodyRinkasanProduct.push(objNameProduct);
            
      //       const discValue = parseInt(promoProduct.master_promo_product.percent);
      //       const priceProduct = promoProduct.for_product.all_product_price[0].price;
      //       const discPrice = priceProduct - (priceProduct * (discValue/100));
      //       const objDiskonInfo = [
      //         {
      //           content: `Diskon ${discValue}%`,
      //           styles: {
      //             halign: 'left',
      //             fontSize: sizeFont,
      //             cellPadding: [0, 1.5, 0.5, 0],
      //           }
      //         },
      //         {
      //           content: data.qty,
      //           styles: {
      //             halign: 'center',
      //             fontSize: sizeFont,
      //             cellPadding: callPaddingProduct,
      //           }
      //         },
      //         {
      //           content: this.$root.formatPrice(discPrice),
      //           styles: {
      //             halign: 'left',
      //             fontSize: sizeFont,
      //             cellPadding: [0.5, 0, 0.5, 1],
      //           }
      //         },
      //         {
      //           content: this.$root.formatPrice(discPrice * data.qty),
      //           styles: {
      //             halign: 'right',
      //             fontSize: sizeFont,
      //             cellPadding: [0.5, 0, 0.5, 0.5],
      //           }
      //         }
      //       ];

      //       bodyRinkasanProduct.push(objDiskonInfo);
      //       continue;
      //     }
      //   }

      //   let objProdPromo;
      //   if(data.is_free_product){
      //     objProdPromo = [
      //       {
      //         content: product.itemNameShort,
      //         styles: {
      //           halign: 'left',
      //           fontSize: sizeFont,
      //           cellPadding: [0.5, 1.5, 0.5, 0],
      //         }
      //       },
      //       {
      //         content: data.qty,
      //         styles: {
      //           halign: 'center',
      //           fontSize: sizeFont,
      //           cellPadding: callPaddingProduct,
      //         }
      //       },
      //       {
      //         content: 'FREE',
      //         colSpan: 2,
      //         styles: {
      //           halign: 'right',
      //           fontSize: sizeFont,
      //           cellPadding: [0.5, 0, 0.5, 0.5],
      //         }
      //       }
      //     ];
      //   }else{
      //     objProdPromo = [
      //       {
      //         content: product.itemNameShort,
      //         styles: {
      //           halign: 'left',
      //           fontSize: sizeFont,
      //           cellPadding: [0.5, 1.5, 0.5, 0],
      //         }
      //       },
      //       {
      //         content: data.qty,
      //         styles: {
      //           halign: 'center',
      //           fontSize: sizeFont,
      //           cellPadding: callPaddingProduct,
      //         }
      //       },
      //       {
      //         content: this.$root.formatPrice(product.all_product_price[0].price),
      //         styles: {
      //           halign: 'left',
      //           fontSize: sizeFont,
      //           cellPadding: [0.5, 0, 0.5, 1],
      //         }
      //       },
      //       {
      //         content: this.$root.formatPrice(product.all_product_price[0].price * data.qty),
      //         styles: {
      //           halign: 'right',
      //           fontSize: sizeFont,
      //           cellPadding: [0.5, 0, 0.5, 0.5],
      //         }
      //       }
      //     ];
      //   }
      //   bodyRinkasanProduct.push(objProdPromo);
      // }

      // Ringkasan product
      
      autoTable(docStruk, {
        head: bodyRinkasanProduct,
        margin: marginPaper,
        theme: 'plain',
      });

      const startY3 = docStruk.autoTable.previous.finalY;
      const lineY3 = startY3 + plusHeightLine;
      docStruk.setDrawColor(0);
      docStruk.setLineWidth(0);
      docStruk.line(startLine, lineY3, endLine, lineY3);
      
      // Total Ringkasan Product
      const textTotalBayarProduct = `Total Bayar Produk: ${this.totalPcsItemOrder} pcs`;
      autoTable(docStruk, {
        head: [
          [
            {
              content: textTotalBayarProduct,
              styles: {
                halign: 'left',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            },
            {
              content: `Rp ${this.$root.formatPrice(this.totalPriceRingkasanProduct)}`,
              styles: {
                halign: 'right',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            }
          ],
        ],
        margin: marginPaper,
        theme: 'plain',
      });

      var bodyBillingDetail = [];
      // Diskon percent active promo
      if(this.selectedActivePromo != null){
        bodyBillingDetail.push([
          {
              content: `${this.selectedActivePromo.nama_promo.toUpperCase()} (${this.selectedActivePromo.percent} %)`,
              styles: {
                halign: 'left',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            },
            {
              content: `-Rp ${this.$root.formatPrice(this.totalDiscountPromo)}`,
              styles: {
                halign: 'right',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            },
        ]);
      }

      bodyBillingDetail = bodyBillingDetail.concat([
        [
          {
            content: 'Nama Kasir : ',
            styles: {
              halign: 'left',
              fontSize: sizeFont,
              cellPadding: callPadding,
            }
          },
          {
            content: this.$root.dataAuthToken.nama_lengkap.toUpperCase(),
            styles: {
              halign: 'right',
              fontSize: sizeFont,
              cellPadding: callPadding,
            }
          },
        ],
        [
          {
            content: 'Nama Member : ',
            styles: {
              halign: 'left',
              fontSize: sizeFont,
              cellPadding: callPadding,
            }
          },
          {
            content: this.memberOverview ? this.memberOverview.nama.toUpperCase() : '-',
            styles: {
              halign: 'right',
              fontSize: sizeFont,
              cellPadding: callPadding,
            }
          },
        ],
        [
          {
            content: 'Point Awal : ',
            styles: {
              halign: 'left',
              fontSize: sizeFont,
              cellPadding: callPadding,
            }
          },
          {
            content: this.memberOverview ? `Rp ${this.$root.formatPrice(this.memberOverview.point)}` : '-',
            styles: {
              halign: 'right',
              fontSize: sizeFont,
              cellPadding: callPadding,
            }
          },
        ],
        [
          {
            content: 'Point Setelah Redeem : ',
            styles: {
              halign: 'left',
              fontSize: sizeFont,
              cellPadding: callPadding,
            }
          },
          {
            content: this.memberOverview ? `Rp ${this.$root.formatPrice(parseInt(this.memberOverview.point) - parseInt(this.calculateTotalBayarPrice))}` : '-',
            styles: {
              halign: 'right',
              fontSize: sizeFont,
              cellPadding: callPadding,
            }
          },
        ],
      ]);
      
      // Kasir, Member, dan Billing Detail
      autoTable(docStruk, {
        body: bodyBillingDetail,
        margin: marginPaper,
        // startY: imageHeight + 3,
        theme: 'plain',
      });

      const startY4 = docStruk.autoTable.previous.finalY;
      const lineY4 = startY4 + plusHeightLine;
      docStruk.setDrawColor(0);
      docStruk.setLineWidth(0);
      docStruk.line(startLine, lineY4, endLine, lineY4);

      // Alamat pusat bagian bawah
      autoTable(docStruk, {
        body: [
          [
            {
              content: 'PT. Tara Parama Semesta'.toUpperCase(),
              styles: {
                halign: 'center',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            },
          ],
          [
            {
              content: 'Jl. Pulo Kambing 2 No. 1 Pulogadung Jaktim'.toUpperCase(),
              styles: {
                halign: 'center',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            }
          ],
          [
            {
              content: 'www.marthatilaarshop.com',
              styles: {
                halign: 'center',
                fontSize: sizeFont,
                cellPadding: callPadding,
              }
            }
          ],
        ],
        margin: marginPaper,
        // startY: imageHeight + 3,
        theme: 'plain',
      });
      
      const pdfDataUri = docStruk.output('datauristring');
      const newWindow = window.open();
      if (newWindow) {
        const iframe = document.createElement('iframe');
        iframe.src = pdfDataUri;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        newWindow.document.body.style.margin = '0';
        newWindow.document.body.appendChild(iframe);
      } else {
        alert('Pop-up windows are blocked. Please enable pop-ups for this site.');
      }
    },

    getDateTimeForStruk: function(inputDate){
      const dateObj = new Date(inputDate);
      
      const day = String(dateObj.getDate()).padStart(2, '0');
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const year = dateObj.getFullYear();
      const hours = String(dateObj.getHours()).padStart(2, '0');
      const minutes = String(dateObj.getMinutes()).padStart(2, '0');
      const seconds = String(dateObj.getSeconds()).padStart(2, '0');
      
      const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
      return formattedDateTime;
    }
  },
}
</script>

<style scoped>
.img-icon-po1{
  height: 22px;
  width: 80px;
  object-fit: contain;
}
.img-icon-po2{
  height: 22px;
  width: 90px;
  object-fit: contain;
}

.set-text-bold{
  font-weight: bold !important;
}

.max-width-text-truncate{
  max-width: 140px;
}

@media (min-width: 600px) and (max-width: 1024px) {
  .max-width-text-truncate{
    max-width: 200px;
  }
}
</style>