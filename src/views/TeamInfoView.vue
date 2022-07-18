<template>
<ContentBase>
  <table class="table">
    <thead class="table-light">
    <tr>
      <th></th>
      <th>用户名</th>
      <th>姓名</th>
      <th>性别</th>
      <th>身份</th>
      <th>学号</th>
      <th>年龄</th>
      <th>联系方式</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(team,index) in teams" :key="index">
      <td>{{index+1}}</td>
      <td>{{team.username}}</td>
      <td>{{team.name}}</td>
      <td>{{team.sex}}</td>
      <td>{{team.identity}}</td>
      <td>{{team.stuNum}}</td>
      <td>{{team.age}}</td>
      <td>{{ team.phone }}</td>
    </tr>
    </tbody>
  </table>
</ContentBase>
</template>


<script>
import ContentBase from "../components/ContentBase";
import {ref} from "vue";

export default {
  name: "TeamInfo",
  components: {
    ContentBase,
  },

  setup(){
    const test=
        [
          {
            id:1,
            username:"test",
            name:"李华",
            sex:"男",
            identity:"老师",
            stuNum:202012528,
            age:16,
            phone:1254468225
          },
          {
            id:2,
            username:"test2",
            name:"李明",
            sex:"男",
            identity:"学生",
            stuNum:202012526,
            age:16,
            phone:12544682255
          }
        ];


    let teams=ref([]);
    teams.value=test
    return{
      teams
    }
  }
}
</script>



<style scoped>

</style>