export const master_code = {
  oulet: {
    kelapa_gading_code: '001',
    taman_anggrek_code: '002',
  },

  supplier: {
    martina_berto_code: '00MBO00',
    cedefindo_code: '00CDF00',
  },

  productOptInfo: {
    brand_code: '01',
    category_code: '02',
  },

  diskon: {
    tanpa_diskon_code: '0',
  },

  manufaktur: {
    marina_berto_code: '01',
    marina_berto_code: '02',
  },

  wshType: {
    gudang_barang_baik: '001',
    gudang_barang_baik: '002',
  },

  whsGedung: {
    gudang_utama_code: '101',
    gudang_promo_code: '102',
    gudang_flashout_code: '103',
    gudang_retur_code: '201',
  },

  priceCode: {
    hpd: 'HPD',
    het: 'HET',
    hetmop: 'HETMOP'
  },

  salesBy: {
    wi: 'wi',
    wa: 'wa',
    selly: 'selly',
    grabmart: 'grabmart',
  },

  tipeKonsumen: {
    member: 'member',
    reseller: 'reseller',
    karyawan: 'karyawan',
  },

  kodePromo: {
    best_seller_toko: 'best-seller-all',
    best_seller_all: 'best-seller-toko',
    top_this_month: 'top-this-month',
    promo: 'promo',
    flush_out: 'flush-out',
    promo_karyawan: 'promo-karyawan',
  },

  metodeBayar: {
    karyawan: 'karyawan',
    cash: 'cash',
    tf: 'tf',
    ewal: 'ewal',
    cc: 'cc',
    redeem: 'redeem',
    wa: 'wa',
    qris: 'qris',
  },

  kodeReseller: {
    kosumen_reguler: '01',
    reseller: '02',
    affiliansi: '03',
    toko: '04',
    distributor: '05',
    salon: '06',
    bank_insitusi: '07',
  },

  role: {
    super_admin: 'super_admin',
    admin: 'admin',
    kasir: 'kasir',
    sales: 'sales',
  },

  gelarBeli: {
    reguler: 'reguler',
    silver: 'silver',
    gold: 'gold',
  },

  jenisGelarBeli: {
    reguler: '1',
    silver: '2',
    gold: '3',
  },
  
  tipe_promo: {
    product: '1',
    diskon: '2',
    bundling: '3',
  },

  tipe_potongan: {
    percent: '1',
    value: '2',
  },

  buyGet: {
    buy: 'buy',
    get: 'get',
  },
  
  tipe_voucher: {
    normal: '1',
    free: '2',
  },

  tipe_pot_voucher: {
    value: '1',
    percent: '2'
  }
}

export const firebase_conf = {
  collection: {
    device_sales: 'device_sales',
  },
  doc_id: {
    update_status: 'update_status',
  }
}

export const master_coll = {
  tipePromo: {
    bundle: '1',
    percent: '2',
  },

  tipeMasterPromo: {
    first: '1', //Product
    secound: '2', //Diskon
  },

  tipe_gwp: {
    first: '1',
    secound: '2',
    three: '3',
  },

  masterObjType: {
    salestoko: 401,
    salesredeem: 402,
  },
}

export const local_storage = {
  app_token: 'app_token',
  token_sso: 'token_sso',

  current_page: 'current_page',
  data_user: 'data_user',
  access_store: 'selected_access_store',

  device_info: 'device_info',
  device_info_access: 'device_info_access',
}

export const pages = {
  splash: 'Splash',
  home: 'Home',
  login: 'Login',
  profile: 'Profile',
  sales:  'Sales',
  about:  'About',
  transaksi: 'Transaksi',
  receiptitem: 'ReceiptItem',
  receiptitemv2: 'ReceiptItemV2',
  syncdata: 'SyncData',
  transin: 'TransIn',
  transout: 'TransOut',
  kartustok: 'KartuStok',
  mutasistok: 'MutasiStok',

  // Master
  productlist: 'ProductList',
  promolist: 'PromoList',
  promoproduct: 'PromoProduct',
  userlist: 'UserList',
}