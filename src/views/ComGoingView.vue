<template>
<ContentBase>
  <div class="mb-3">
    <label for="username" class="form-label">github项目地址</label>
    <input  type="text" class="form-control" id="github">
  </div>

  <button type="submit" class="btn btn-primary">提交</button>
</ContentBase>
</template>

<script>
import ContentBase from "@/components/ContentBase";

export default {
  name: "ComGoing",
  components:{
    ContentBase
  }
}
</script>

<style scoped>

</style>