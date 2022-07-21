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
        <button type="submit" class="btn btn-primary" v-else-if="team.teacher!=$store.state.user.username" disabled>已被其他老师指导</button>
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


    const test=[
      {
        uid:1,
        teamName:'队伍1',
        teacher: "老师1",
      },
      {
        uid:2,
        teamName:'队伍2',
        teacher:"",
        result: ""
      }
    ];

    let teams=ref([]);
    teams.value=test


    const coaching=team=>{
      let req={
        team:team.uid,
        teacherId:store.state.user.userId
      }

      team.teacher=store.state.user.username

      console.log(req)
    }

    const uncoaching=team=>{
      let req={
        team:team.uid,
        teacherId:store.state.user.userId
      }

      team.teacher=''

      console.log(req)
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