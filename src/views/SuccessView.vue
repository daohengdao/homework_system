<template>
<ContentBase>
  提交成功
</ContentBase>
</template>

<script>
import ContentBase from "@/components/ContentBase";
import {useRoute} from "vue-router";
import router from "@/router";

export default {
  name: "SuccessView",
  components:{
    ContentBase
  },
  setup(){
    let route=useRoute();
    let flag=route.params.flag;

    if (flag!="true"){
      router.push({
        name:'404'
      });
    }


  }
}
</script>

<style scoped>

</style>