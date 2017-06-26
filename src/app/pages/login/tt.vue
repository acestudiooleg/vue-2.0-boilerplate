<template>
  <p @click="oka" class="ololo">{{ alo }}</p>
</template>
<script>
  export default {
    props: ['msg'],
    data(){
      return {alo: this.msg};
    },
    methods: {
      oka() {
        this.alo = 'after click';
      //  console.log('alo',  this.alo);
      }
    }
  }
</script>
