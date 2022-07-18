<template>
<ContentBase >
  <div class="card-body">
    <label for="edit-post" class="form-label">团队招新内容</label>
    <textarea  class="form-control" id="edit-post" rows="3"></textarea>
    <div>
      开始时间:<input type="datetime-local" value="2015-09-24T13:59:59"/>
    </div>
    <div style="margin-top: 10px">
      结束时间:<input type="datetime-local" value="2015-09-24T13:59:59"/>
    </div>
    <button type="button"  class="btn btn-primary btn-sm">发布</button>
  </div>
</ContentBase>
</template>

<script>
import ContentBase from "@/components/ContentBase";

export default {
  name: "TeamRecruit",
  components:{
    ContentBase
  }
}
</script>

<style scoped>
button {
  margin-top: 10px;
  width: 100%;
}
</style>