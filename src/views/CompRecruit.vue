<template>
  <ContentBase>
    <div class="card-body" >
        <div class="mb-3">
          <label for="compName" class="form-label">比赛名称</label>
          <input  type="text" v-model="compName" class="form-control" id="compName">
        </div>
        <label for="edit-post" class="form-label">比赛内容</label>
        <textarea  class="form-control" v-model="content" id="edit-post" rows="3"></textarea>
        <div>
          开始时间:<input type="datetime-local" v-model="beginTime" :min="new Date().getTime()"/>
        </div>
        <div style="margin-top: 10px">
          结束时间:<input type="datetime-local" v-model="endTime" :min="new Date().getTime()"/>
        </div>

        <div class="error-msg">{{error_msg}}</div>
        <button type="button" class="btn btn-primary btn-sm" @click="submits">发布</button>
    </div>
  </ContentBase>
</template>

<script>
import ContentBase from "@/components/ContentBase";
import router from "@/router";
import {useStore} from "vuex";
import {ref} from "vue";
import $ from 'jquery'
import baseUrl from "@/util/config";

export default {
  name: "CompRecruit",
  components:{
    ContentBase
  },
  setup(){
    const store=useStore();

    const error_msg=ref('');
    const beginTime=ref('');
    const endTime=ref('');
    const content=ref('');
    const compName=ref('');

    if (store.state.user.username!="admin"){
      router.push({
        name:'404',
      });
    }


    const submits=()=>{
      if(content.value=='' || content.value==null){
        error_msg.value='比赛内容不能为空';
      } else if(new Date(Date.parse(beginTime.value))>new Date(Date.parse(endTime.value))){
        error_msg.value='开始时间不能比结束时间晚';
      }else if (new Date(Date.parse(beginTime.value))<new Date()){
        error_msg.value="开始时间不能早于当前时间";
      }else{
        $.ajax({
          url:baseUrl+'/api/comp/info/',
          type: 'POST',
          data:{
            compName:compName.value,
            content:content.value,
            beginTime:beginTime.value,
            endTime:endTime.value
          },success(resp){
            if (resp.status_code == 200){
              router.push({
                name:'success',
                params:{
                  flag:true
                }
              })
            }else {
              error_msg.value='系统错误,请重试'
            }
          }
        })
      }


    }

    return{
      compName,
      beginTime,
      endTime,
      content,
      error_msg,
      submits
    }

  }
}


</script>

<style scoped>
button {
  margin-top: 10px;
  width: 100%;
}

.error-msg{
  color: red;
}
</style>