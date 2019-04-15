<template>
  <div class="lend-wrapper">
    <BScroll class="lend">
      <section>
        <div class="huge"></div>
      </section>
    </BScroll>

    <div class="invest-btn">
      <input type="button" value="提交" />
    </div>
  </div>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'

export default {
  name: 'invest',
  mixins: [],
  components: {
    BScroll
  },
  data() {
    return {
      msg: 'invest'
    }
  },
  props: {},
  watch: {},
  methods: {},
  computed: {},
  created() {},
  mounted() {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme';
@import '../../../assets/css/mixins';

.lend-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .lend {
    flex: 1;
    overflow: hidden;
    .huge {
      @include cube(100%, 1.2rem);
      background-color: #ec5e52;
      div {
      }
    }
  }
  .invest-btn {
    @include cube(100%, 0.56rem);
    background: #ace;
  }
}
</style>
