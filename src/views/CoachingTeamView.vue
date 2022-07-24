<template>
<ContentBase>
  <table class="table">
    <thead class="table-light">
    <tr>
      <th>序号</th>
      <th>团队名称</th>
      <th></th>

    </tr>
    </thead>
    <tbody>
    <tr v-for="(team,index) in teams" :key="index">
      <td>{{index+1}}</td>
      <td>{{team.teamName}}</td>
      <td>
        <button type="submit" class="btn btn-primary" v-if="team.teacher=='' || team.teacher== null" @click="coaching(team)">指导</button>
        <button type="submit" class="btn btn-primary" v-else @click="uncoaching(team)">取消指导</button>
      </td>
    </tr>
    </tbody>
  </table>
</ContentBase>
</template>

<script>
import ContentBase from "@/components/ContentBase";
import {useStore} from "vuex";
import router from "@/router";
import {ref} from "vue";
import $ from 'jquery'
import baseUrl from "@/util/config";

export default {
  name: "CoachingTeam",
  components:ContentBase,
  setup(){
    const store=useStore();
    let identity=store.state.user.identity;



    if (identity !='老师'){
      router.push({
        name:'404'
      })
    }




    let teams=ref([]);

    $.ajax({
      url:baseUrl+':8082/api/team',
      type:'GET',
      data:{
        teacher:store.state.user.userId
      },success(resp){
        teams.value=resp.team;
      }
    });





    const coaching=team=>{
      let req={

      }

      $.ajax({
        url:baseUrl+':8081/api/teacher',
        type:'PUT',
        data:{
          team:team.uid,
          teacher:store.state.user.userId
        },success(resp){
          if (resp.status_code == 200){
            team.teacher=store.state.user.username
          }
        }
      });



      console.log(req)
    }

    const uncoaching=team=>{
      $.ajax({
        url:baseUrl+':8081/api/teacher',
        type:'DELETE',
        data:{
          team:team.uid,
          teacher:store.state.user.userId
        },success(resp){
          if (resp.status_code == 200){
            team.teacher=''
          }
        }
      });
    }

    return{
      teams,
      coaching,
      uncoaching
    }
  }
}
</script>

<style scoped>

</style>