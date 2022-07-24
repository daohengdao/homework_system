<template>
<ContentBase>
  <div v-for="team in teams" :key="team.id" class="point">
    <div class="card edit-field">
      <div class="card-body">
        比赛名称:{{team.compName}}
      </div>
    </div>
    <div class="card edit-field">
      <div class="card-body">
        团队获得奖项: {{team.teamPoint}}
      </div>
    </div>
    <div class="card edit-field">
      <div class="card-body">
        <table class="table">
          <thead class="table-light">
          <tr>
            <th>用户名</th>
            <th>姓名</th>
            <th>得分</th>
            <th>排名</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(user,index) in team.memberPoint" :key="index">
            <td>{{user.username }}</td>
            <td>{{user.name}}</td>
            <td>{{user.point}}</td>
            <td>{{user.ranking}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</ContentBase>
</template>

<script>
import ContentBase from "@/components/ContentBase";
import {ref} from "vue";
import {useStore} from "vuex";
import router from "@/router";
import $ from 'jquery'
import baseUrl from "@/util/config";

export default {
  name: "PointView",
  components:{
    ContentBase
  },
  setup(){
    const store=useStore();
    let teams=ref([]);


    if(!store.state.user.is_login){
      router.push({
        name:'login',
      })
    }else if (!store.state.user.is_team){
      teams.value=null
    }else if (store.state.user.identity=='队长' || store.state.user.identity=='队员'){
      $.ajax({
        url: baseUrl + ":8083/api/comp/point",
        type:'GET',
        data:{
          teamId:store.state.user.teamId,
        },success(resp){
          teams.value=resp.points;
        }
      })

    }else {
      router.push({
        name:'404'
      })
    }


    return{
      teams
    }
  }
}
</script>

<style scoped>
.point{
  margin-top: 20px;
}
</style>