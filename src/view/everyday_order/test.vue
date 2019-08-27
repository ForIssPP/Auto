<template>
    <div id="app">
        <p>{{ test }}</p>
    </div>    
</template>
<script>
export default {
    data() {
        return {
            test: 'Siykt'
        }
    },
}
</script>
<style lang="scss" scoped>
   @import '../../scss/mixin/mixin';
   @import '../../scss/mixin/deletstyle';
   @import '../../scss/mixin/responsive';
   
   %fc {
       @include flexCenter;
   }
   
   %fs {
       @include createFlexBox(center, flex-start, row);
   }
   
   %fss {
       @include createFlexBox(flex-start, flex-start, row);
   }
   
   %fcs {
       @include createFlexBox(center, flex-start);
   }
   
   %fcc {
       @include flexColumnCenter;
   }
   
   div p {
       @include cfz_fw(#000, 19px, 500);
   }
   
   @include rem(750);
</style>