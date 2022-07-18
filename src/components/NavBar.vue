<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{name:'home',params:{}}">创新创业信息管理系统</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'home'}">首页</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'baseInfo'}">个人信息</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'teamSign'}">加入团队</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'compRegister'}">比赛报名</router-link>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              我的团队
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><router-link class="dropdown-item" :to="{name:'teamInfo'}">团队成员</router-link></li>
              <li><router-link class="dropdown-item" :to="{name:'teamRecruit'}">招新发布</router-link></li>
            </ul>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              我的比赛
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><router-link class="dropdown-item" :to="{name:'compRecruit'}">比赛发布</router-link></li>
              <li><router-link class="dropdown-item" :to="{name:'compReView'}">比赛审核</router-link></li>
              <li><router-link class="dropdown-item" :to="{name:'point'}">成绩查看</router-link></li>
              <li><router-link class="dropdown-item" :to="{name:'compGoing'}">提交项目</router-link></li>
            </ul>
          </li>
        </ul>


        <ul class="navbar-nav" >
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'login',params:{}}">登录</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'register',params:{}}">注册</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>

</style>