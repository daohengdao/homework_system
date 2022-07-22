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

    const test={
      count:2,
      info:[
        {
          id:1,
          name:"张三",
          username:"test000",
          modelName:""
        },
        {
          id:2,
          name: "李四",
          username: "lisi000",
          modelName: ""
        }
      ]
    };

    let people=ref([]);
    people.value=test.info;


    console.log(teamId)
    console.log(compId)
    console.log(uid)


    const point=()=>{
      let result=ref([]);


      for (let i=0;i<test.count;i++) {

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

      for (let i=0;i<test.count;i++) {
        console.log(result.value[i])
      }

      let is_person=true;
      let review={
        uid,
        is_person
      }

      console.log(review)

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