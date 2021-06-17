<template>
  <div id="app" class="homeWrap">
    <el-container style="height: 100%;">
      <el-header>
        <span style="font-size: 25px;color: #f0f8ff">后台管理系统</span>
<!-- 这是一行有用的代码-->
<!--         <el-button @click="dd"><i class="el-icon-menu"></i></el-button>
            open="handleOpen" @close="handleClose" :collapse="isCollapse"
            \handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    dd(){
      if(this.isCollapse){
        this.isCollapse=false;
      }else{
        this.isCollapse=true;
      }
    }
-->
      </el-header>
      <el-container>
        <el-aside>
                  <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-submenu :index="parentmenu.id+''" :key="parentmenu.id" v-for="parentmenu in menutable">
                      <template slot="title">
                        <i :class="parentmenu.imageUrl"></i>
                        <span>{{parentmenu.name}}</span>
                      </template>
                        <el-submenu :index="childmenu1.id+''"  :key="childmenu1.id" v-for="childmenu1 in parentmenu.childMenu">
                          <template slot="title">
                            <i :class="childmenu1.imageUrl"></i>
                            <span>{{childmenu1.name}}</span>
                          </template>

                          <el-menu-item-group>
                            <el-menu-item v-if="childmenu2.childMenu.length==0" :key="childmenu2.id"  @click="addTab(childmenu2.name,childmenu2.linkUrl)" :index="childmenu2.id+''" v-for="childmenu2 in childmenu1.childMenu">
                              <i :class="childmenu2.imageUrl"></i>{{childmenu2.name}}
                            </el-menu-item>
                          </el-menu-item-group>
                          <el-submenu v-if="childmenu2.childMenu.length > 0" :key="childmenu2.id" :index="childmenu2.id+''" v-for="childmenu2 in childmenu1.childMenu">
                            <template slot="title">
                              <i :class="childmenu2.imageUrl"></i>
                              <span>{{childmenu2.name}}</span>
                            </template>

                            <el-menu-item-group>
                              <el-menu-item   @click="addTab(childmenu3.name,childmenu3.linkUrl)" :key="childmenu3.id" :index="childmenu3.id+''" v-for="childmenu3 in childmenu2.childMenu">
                                <i :class="childmenu3.imageUrl"></i>{{childmenu3.name}}

                              </el-menu-item>
                            </el-menu-item-group>

                          </el-submenu>
                        </el-submenu>
                    </el-submenu>
                  </el-menu>
        </el-aside>
        <el-main>
          <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
            <el-tab-pane
              v-for="(item, index) in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            >
              <component :is="item.content"></component>
            </el-tab-pane>
          </el-tabs>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

  import Welcome from "./compontents/Welcome";
  import Productionquery from "./compontents/Internalproduction/Productionquery";
  import ProductRegistration from "./compontents/Internalproduction/ProductRegistration";
  import ProductRegistrationreview from "./compontents/Internalproduction/ProductRegistrationreview";
  import plan from "./compontents/productionplan/plan";
  import Outboundappregistrationquery from "./compontents/Outboundapplication/Outboundappregistrationquery";
  import Outboundappregistrationreview from "./compontents/Outboundapplication/Outboundappregistrationreview";
  import Outboundappregistration from "./compontents/Outboundapplication/Outboundappregistration";
  import Storagescheduling from "./compontents/Inandoutscheduling/Storagescheduling";
  import Outboundscheduling from "./compontents/Inandoutscheduling/Outboundscheduling";
  import Makeprocessdesignsheet from "./compontents/Productprocessdesign/Makeprocessdesignsheet";
  import Makeprocessdesignsheettoexamine from "./compontents/Productprocessdesign/Makeprocessdesignsheettoexamine";
  import Makeprocessdesignsheettoexaminequrey from "./compontents/Productprocessdesign/Makeprocessdesignsheettoexaminequrey";
  import Makeprocessdesignsheettoexaminechange from "./compontents/Productprocessdesign/Makeprocessdesignsheettoexaminechange";
  import ApplyExamine from "./compontents/productionplan/ApplyExamine"
  import QueryApply from "./compontents/productionplan/QueryApply"
  import Shejidan from "./compontents/Chanpingsheji/Shejidan"
  import ModuleShenhe from "./compontents/Chanpingsheji/ModuleShenhe"

  import ApplyExamine from "./compontents/productionplan/ApplyExamine";
  import ProductFileRegistration from "./compontents/Internalproduction/ProductFileRegistration";
  import Reviewproductfileregistration from "./compontents/Internalproduction/Reviewproductfileregistration";
  import ProductFileEnquiry from "./compontents/Internalproduction/ProductFileEnquiry";


  export default {
  name: 'app',
  data () {
    return {
      menutable:[],
      editableTabsValue: '1',  // 设置选中的
      editableTabs: [{   //tab选项卡显示的数据内容
        title: '首页',
        name: '1',
        content: 'Welcome'
      }],
      tabIndex: 1   // 设置到name属性的值
      // isCollapse:true

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
    addTab(titlename,linkurl) {

      console.log(titlename+""+linkurl)

      //判断当前页面是否存在
      var tempobj = this.editableTabs.find((item)=>{return item.title==titlename});

      //存在  active
      if(tempobj!=undefined){
        this.editableTabsValue =tempobj.name ;
      }else {
        //不存在 添加
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: titlename,
          name: newTabName,
          content: linkurl
        });
        this.editableTabsValue = newTabName;
      }

    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    }
  },
  components:{
    Welcome,ProductRegistration,ProductRegistrationreview,Productionquery,plan,Outboundappregistration,Outboundscheduling,
    Outboundappregistrationreview,Outboundappregistrationquery,Storagescheduling,Makeprocessdesignsheet,Makeprocessdesignsheettoexamine,
    Makeprocessdesignsheettoexaminequrey,Makeprocessdesignsheettoexaminechange,ApplyExamine,QueryApply,Shejidan,ModuleShenhe,
    ProductFileRegistration,Reviewproductfileregistration,ProductFileEnquiry

  },
  created() {
    this.getdata();
  }
}
</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 100%;
    min-height: 100%;
  }
.el-header, .el-footer {
  background-color: #545c64;
  color: #333;
  line-height: 60px;

}

.el-aside {
  /*background-color: rgba(33, 35, 41, 0.93);*/
  /*color: #333;*/
}

.el-main {
  /*background-color: #E9EEF3;*/
  /*color: #333;*/
  /*text-align: center;*/
}
h1{
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
