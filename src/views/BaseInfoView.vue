<template>
<ContentBase>
  <div class="card edit-field" >
    <div class="card-body">
      姓名:{{$store.state.user.name}}
    </div>
  </div>

  <div class="card edit-field">
    <div class="card-body">
      性别:{{$store.state.user.sex}}
    </div>
  </div>

  <div class="card edit-field" v-if="$store.state.user.identity=='队员' || $store.state.user.identity=='队长'">
    <div class="card-body">
      学号:{{$store.state.user.stuNum}}
    </div>
  </div>

  <div class="card edit-field">
    <div class="card-body">
      用户名:{{$store.state.user.username}}
    </div>
  </div>

  <div class="card edit-field" v-if="$store.state.user.identity!='老师'">
    <div class="card-body">
      所属团队:{{$store.state.user.teamName}}
    </div>
  </div>
  <div class="card edit-field">
    <div class="card-body">
      身份:{{$store.state.user.identity}}
    </div>
  </div>

  <div class="card edit-field" v-if="$store.state.user.identity=='队员' || $store.state.user.identity=='队长'">
    <div class="card-body">
      指导老师:{{$store.state.user.teacher}}
    </div>
  </div>
</ContentBase>
</template>

<script>
import ContentBase from "@/components/ContentBase";
import router from "@/router";
import {useStore} from "vuex";
export default {
  name: "BaseInfo",
  components:{
    ContentBase,
  },
  setup(){
    const store=useStore();



    if (!store.state.user.is_login){
      router.push({
        name:'login'
      });
    }

    if (store.state.user.username=='admin'){
      router.push({
        name:'home'
      });
    }


  }
}
</script>

<style scoped>

</style>