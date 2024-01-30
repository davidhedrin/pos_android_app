<template>
  <div v-if="showAlert" class="position-fixed top-0 end-0 p-3" style="z-index: 9999">
    <div :class="'alert-' + status" class="alert border-0 d-flex align-items-center" role="alert" style="box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);">
      <div class="me-3 w-sm-15">
        <div class="icon-item">
          <img class="rounded-circle" :src="`assets/img/Gif/${checkIconStatus}.gif`" height="40" alt="">
        </div>
      </div>
      <div class="me-3 w-100">
        <h5 class="alert-heading fw-semi-bold mb-0">{{ title }}</h5>
        <p class="m-0 fs--1 flex-1">{{ msg }}</p>
      </div>
      <button class="btn-close" type="button" v-on:click="closeAlert"></button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Alert',
    props: {
      status: String,
      title: String,
      msg: String,
      showAlert: Boolean,
    },
    watch: {
      showAlert: function(newShowAlert) {
        if (newShowAlert) {
          setTimeout(() => {
            this.$emit('close-alert');
          }, 4000);
        }
      },
    },
    computed: {
      checkIconStatus(){
        if(this.status == 'success'){
          return 'success-nobg-icon-1';
        }

        if(this.status == 'info'){
          return 'info-icon';
        }

        if(this.status == 'warning'){
          return 'warning-icon-2';
        }
        
        if(this.status == 'danger'){
          return 'danger-icon';
        }
      },
    },
    methods: {
      closeAlert() {
        this.$emit('close-alert');
      },
    },
  }
</script>