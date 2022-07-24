<template>
<ContentBase >
  <div class="card-body" >
    <form @submit.prevent="Submit">
      <label for="edit-post" class="form-label">团队招新内容</label>
      <textarea  class="form-control" v-model="context.post" id="edit-post" rows="3"></textarea>
      <div>
        开始时间:<input type="datetime-local" v-model="context.begin"/>
      </div>
      <div style="margin-top: 10px">
        结束时间:<input type="datetime-local" v-model="context.end"/>
      </div>
      <div class="error_msg">{{error_msg}}</div>
      <button type="submit"  class="btn btn-primary btn-sm">发布</button>
    </form>
  </div>
</ContentBase>
</template>

<script>
import ContentBase from "@/components/ContentBase";
import router from "@/router/index";
import {useStore} from "vuex";
import {ref} from "vue";
import $ from 'jquery'
import baseUrl from "@/util/config";


export default {
  name: "TeamRecruit",
  components:{
    ContentBase
  },

  setup(){
    const store=useStore();

    let identity=store.state.user.identity;

    const context={
      teamId:store.state.user.teamId,
      post:'',
      begin:new Date(),
      end:new Date()
    }

    let error_msg=ref('');

    if (identity!="队长"){
      router.push({
        name:'404',
      });
    }

    const Submit=()=>{
      console.log(new Date(Date.parse(context.begin))>new Date(Date.parse(context.end)))
      console.log(new Date(Date.parse(context.begin))<new Date())

      if(context.post=='' || context.post==null){
        error_msg.value='招新内容不能为空';
      } else if(new Date(Date.parse(context.begin))>new Date(Date.parse(context.end))){
        error_msg.value='开始时间不能比结束时间晚';
      }else if (new Date(Date.parse(context.begin))<new Date()){
        error_msg.value="开始时间不能早于当前时间";
      }else{
        console.log(context)

        $.ajax({
          url:baseUrl+':8082/api/team',
          type:'POST',
          data:context,
          success(resp){
            if (resp.status_code==200){
              router.push({
                name:'success',
                params:{
                  flag:true
                }
              })
            }
          }
        })
      }
    }

    return{
      context,
      error_msg,
      Submit
    }
  }
}
</script>

<style scoped>
button {
  margin-top: 10px;
  width: 100%;
}

.error_msg{
  color: red;
}
</style>