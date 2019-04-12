<template>
  <div class="">
    <Ruler :projectId="projectId" :itemId="itemId" :productId="productId"></Ruler>
  </div>
</template>

<script>
import Ruler from '@/components/Ruler'

export default {
  name: '',
  data() {
    return {
      itemId: this.$route.query.itemId ? this.$route.query.itemId : null,
      projectId: this.$route.query.projectId ? this.$route.query.projectId : null,
      productId: this.$route.query.productId ? this.$route.query.productId : null
    }
  },
  methods: {},
  components: {
    Ruler
  },
  mounted() {
    document.querySelector('html').style.height = 'initial'
    document.querySelector('body').style.height = 'initial'
    document.querySelector('#app').style.height = 'initial'
  }
}
</script>
<style scoped>
</style>
