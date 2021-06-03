<template>
  <div id="app" class="homeWrap">
    <el-container style="height: 100%;">
      <el-header>
<!--        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">-->
<!--          <el-menu-item index="1">处理中心</el-menu-item>-->
<!--          <el-submenu index="2">-->
<!--            <template slot="title">我的工作台</template>-->
<!--            <el-menu-item index="2-1">选项1</el-menu-item>-->
<!--            <el-menu-item index="2-2">选项2</el-menu-item>-->
<!--            <el-menu-item index="2-3">选项3</el-menu-item>-->
<!--            <el-submenu index="2-4">-->
<!--              <template slot="title">选项4</template>-->
<!--              <el-menu-item index="2-4-1">选项1</el-menu-item>-->
<!--              <el-menu-item index="2-4-2">选项2</el-menu-item>-->
<!--              <el-menu-item index="2-4-3">选项3</el-menu-item>-->
<!--            </el-submenu>-->
<!--          </el-submenu>-->
<!--          <el-menu-item index="3" disabled>消息中心</el-menu-item>-->
<!--          <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
<!--        </el-menu>-->
<!--        <div class="line"></div>-->
<!--        <el-menu-->
<!--          :default-active="activeIndex2"-->
<!--          class="el-menu-demo"-->
<!--          mode="horizontal"-->
<!--          @select="handleSelect"-->
<!--          background-color="#545c64"-->
<!--          text-color="#fff"-->
<!--          active-text-color="#ffd04b">-->
<!--          <el-menu-item index="1">处理中心</el-menu-item>-->
<!--          <el-submenu index="2">-->
<!--            <template slot="title">我的工作台</template>-->
<!--            <el-menu-item index="2-1">选项1</el-menu-item>-->
<!--            <el-menu-item index="2-2">选项2</el-menu-item>-->
<!--            <el-menu-item index="2-3">选项3</el-menu-item>-->
<!--            <el-submenu index="2-4">-->
<!--              <template slot="title">选项4</template>-->
<!--              <el-menu-item index="2-4-1">选项1</el-menu-item>-->
<!--              <el-menu-item index="2-4-2">选项2</el-menu-item>-->
<!--              <el-menu-item index="2-4-3">选项3</el-menu-item>-->
<!--            </el-submenu>-->
<!--          </el-submenu>-->
<!--          <el-menu-item index="3" disabled>消息中心</el-menu-item>-->
<!--          <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
<!--        </el-menu>-->

      </el-header>
      <el-container>
        <el-aside>
                  <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-submenu :index="parentmenu.id+''" v-for="parentmenu in menutable">
                      <template slot="title">
                        <i :class="parentmenu.link_url"></i>
                        <span>{{parentmenu.name}}</span>
                      </template>
                        <el-submenu :index="childmenu1.id+''" v-for="childmenu1 in parentmenu.childMenu">
                          <template slot="title">
                            <i :class="childmenu1.link_url"></i>
                            <span>{{childmenu1.name}}</span>
                          </template>

                          <el-menu-item-group>
                            <el-menu-item v-if="childmenu2.childMenu.length==0"  @click="addTab(childmenu2.name,childmenu2.link_url)" :index="childmenu2.id+''" v-for="childmenu2 in childmenu1.childMenu">
                              <i :class="childmenu2.link_url"></i>{{childmenu2.name}}
                            </el-menu-item>
                          </el-menu-item-group>
                          <el-submenu v-if="childmenu2.childMenu.length > 0" :index="childmenu2.id+''" v-for="childmenu2 in childmenu1.childMenu">
                            <template slot="title">
                              <i :class="childmenu2.link_url"></i>
                              <span>{{childmenu2.name}}</span>
                            </template>

                            <el-menu-item-group>
                              <el-menu-item   @click="addTab(childmenu3.name,childmenu3.link_url)" :index="childmenu3.id+''" v-for="childmenu3 in childmenu2.childMenu">
                                <i :class="childmenu3.link_url"></i>{{childmenu3.name}}

                              </el-menu-item>
                            </el-menu-item-group>

                          </el-submenu>
                        </el-submenu>
                    </el-submenu>
                  </el-menu>
        </el-aside>
        <el-main>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      menutable:[]
    }
  },
  methods:{
    getdata(){
      this.$axios.post("menu/query").then(response =>{
        this.menutable = response.data;
        this.menutable.forEach((item,i) =>
        {
          console.log(item.childMenu.length)
        })
      }).catch()
    },
    addTab(a,b){

    }
  },
  created() {
    this.getdata();
  }
}
</script>

<style>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;

}

.el-aside {
  background-color: #D3DCE6;
  color: #333;


}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;

}

.homeWrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
