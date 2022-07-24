<template>
<ContentBase>
  <form @submit.prevent="point">
    <table class="table">
      <thead class="table-light">
      <tr>
        <th>序号</th>
        <th>队员</th>
        <th>用户名</th>
        <th>得分</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(person,index) in people" :key="index">
        <td>{{index+1}}</td>
        <td>{{person.name}}</td>
        <td>{{person.username}}</td>
        <td><input  type="text" v-model="person.modelName" class="form-control" id="point"></td>
      </tr>
      </tbody>
    </table>
    <button type="submit" class="btn btn-primary">确认</button>
  </form>
</ContentBase>
</template>

<script>
import ContentBase from "@/components/ContentBase";
import {useRoute} from "vue-router";
import router from "@/router";
import {ref} from "vue";
import $ from 'jquery'
import baseUrl from "@/util/config";

export default {
  name: "CompPersonView",
  components:ContentBase,
  setup(){
    let route=new useRoute();
    let teamId=route.params.teamId;
    let compId=route.params.compId;
    let uid=route.params.uid;

    if (typeof(uid)=='undefined'){
      router.push({
        name:'404'
      })
    }



    let count=0;
    let people=ref([]);

    $.ajax({
      url:baseUrl+':8083/api/comp/user',
      type: 'GET',
      data:{
        compId,
        teamId
      },success(resp){
        people.value=resp.userInfo;
        count=resp.count;
      }
    })

    const point=()=>{
      let result=ref([]);


      for (let i=0;i<count;i++) {

        if (people.value[i].modelName == '') {
          alert("第"+(i+1)+"人的分数不能为空")
          return
        }else {
          result.value[i]={
            userId:people.value[i].id,
            compId,
            point:people.value[i].modelName
          }
        }
      }

      for (let i=0;i<count;i++) {
        $.ajax({
          url:baseUrl+':8083/api/comp/user',
          type: 'PUT',
          data:{
            userId:result.value[i].id,
            compId,
            point:result.value[i].point
          },
        })
      }



      let is_person=true;

      $.ajax({
        url:baseUrl+':8083/api/comp/user/flag',
        type: 'PUT',
        data:{
          uid,
          is_person
        },
      })

    }

    return{
      people,
      point
    }

  }
}
</script>

<style scoped>
button{
  width: 100%;
}
</style>