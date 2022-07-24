<template>
<ContentBase>

    <div class="card edit-field">
      <div class="card-body">
        姓名:{{$store.state.user.name}}
      </div>
      <div class="card edit-field">
        <div class="card-body">
          用户名:{{$store.state.user.username}}
        </div>
      </div>
    </div>
    <div class="card edit-field">
      <div class="card-body">
        要加入的团队:{{teamName}}
      </div>
      <div class="error_msg">{{error_msg}}</div>
    </div>
    <div class="form-floating">
      <textarea class="form-control" v-model="content" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
      <label for="floatingTextarea2">自我介绍</label>
    </div>
    <button type="button"  class="btn btn-primary btn-sm" @click="getContent">确认</button>
</ContentBase>
</template>

<script>
import ContentBase from "@/components/ContentBase";
import {ref} from "vue";
import {useRoute} from "vue-router/dist/vue-router";
import router from "@/router";
import {useStore} from "vuex";
import $ from 'jquery'
import baseUrl from "@/util/config";

export default {
  name: "TeamResume",
  components: {
    ContentBase,
  },


  setup(){
    const store=useStore();

    console.log(store.state.user.name)

    let error_msg=ref('');
    const route = useRoute();

    const content=ref('');

    const teamName=route.params.teamName;
    const teamId=route.params.teamId;


    if (typeof(teamName)=='undefined' || !store.state.user.is_login){
      router.push({
        name:'404',
      });
    }

    const getContent=()=>{


      if (content.value==null || content.value==''){
        error_msg.value='简历内容不能为空';
      }else{
        let result={
          userId:store.state.user.userId,
          teamId,
          content:content.value,
          flag:true
        }

        $.ajax({
          url:baseUrl+'/api/team/sign',
          type:'POST',
          data:result,
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
      error_msg,
      teamName,
      content,
      getContent
    }
  }
}
</script>

<style scoped>
button{
  width:100%;
}
.error_msg{
  color: red;
}
</style>