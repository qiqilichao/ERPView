<template>
    <div id="ModuleShenhe">
      <template>
      <el-table
        :data="moduletable"
        style="width: 100%"
        height="500">

        <el-table-column prop="designId" label="设计单编号" width="120"></el-table-column>
        <el-table-column prop="productId" label="产品编号" width="120"></el-table-column>
        <el-table-column prop="productname" label="产品名称" width="120"></el-table-column>
        <el-table-column prop="register" label="设计人" width="120"></el-table-column>
        <el-table-column prop="registerTime" label="登记时间" width="120"></el-table-column>
        <el-table-column prop="costPriceSum" label="物料总成本" width="120"></el-table-column>
        <el-table-column
          fixed="right"
          label="审核"
          width="100">
          <template slot-scope="scope">
            <el-button type="warning" @click="moduleShenhe(scope.row.id)" size="small">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageno"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>

      <!-- 审核模态框-->
     <el-dialog title="物料组成设计单" :visible="shenheshow" id="shejishow">
        <el-button @click="yes">通过</el-button><el-button @click="no">不通过</el-button><el-button @click="fanhui">返回</el-button>
        <el-form :inline="true" label-width="80px" :modal="moduleShenheshow" class="wuliaod">
          <h3>物料组成设计单</h3>
          <el-row>
            <el-col :span="12">设计单编号: {{moduleShenheshow.designId}}</el-col>
            <el-col :span="12"> 设计人： <el-input class="hh" clearable v-model="moduleShenheshow.designer"></el-input></el-col>
          </el-row>
          <el-row>
            <el-col :span="12">产品名称: {{moduleShenheshow.productname}}</el-col>
            <el-col :span="12">产品编号：{{moduleShenheshow.productId}}</el-col>
          </el-row>

          <template>
            <el-form :inline="true" label-width="80px" :modal="wuliaodata" class="wuliaod">
              <el-table class="wuliaotab" :data="wuliaodata" stripe>
                <el-table-column  type="selection">
                  <template slot-scope="scope">
                    <el-checkbox  v-model="scope.row.checked">
                    </el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column prop="productId" label="物料编号" width="180"></el-table-column>
                <el-table-column prop="productName" label="物料名称" width="180"></el-table-column>
                <el-table-column prop="type" label="用途类型" width="180"></el-table-column>
                <el-table-column prop="productDescribe" label="描述" width="180"></el-table-column>
                <el-table-column  label="数量" width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.amount" @input="aa(scope.row.id)"></el-input>
                  </template></el-table-column>
                <el-table-column prop="costPrice" label="计划成本单价" width="180"></el-table-column>
                <el-table-column prop="subtotal" label="小计" width="180"></el-table-column>
              </el-table>
            </el-form>
          </template>
          <el-row>
            <el-col :span="12">物料总成本: {{moduleShenheshow.costPriceSum}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="审核人">
                <el-input clearable v-model="moduleShenheshow.checker"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="审核时间">
                <span>{{registerTime}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="设计要求">
                <el-input  type="textarea" clearable v-model="moduleShenheshow.moduleDescribe"></el-input>
              </el-form-item>
            </el-col>
          </el-row>


        </el-form>
      </el-dialog>
      </template>

    </div>
</template>
<style>
  #shejishow{
    width:1800px;
  }
  #shejishow2{
    width:1800px;
  }

  .wuliaod{
    border: solid 1px black;
  }
  .wuliaotab{
    border: solid 1px black;
    margin: 20px;
    width: 800px;
    height: 300px;
  }
  .el-input{
    width: 150px;
  }

</style>
<script>
    export default {
        name: "ModuleShenhe",
      data(){
        return {
          moduletable: [],
          pageno: 1,
          pagesize: 5,
          total: 0,
          shenheshow:false,
          moduleShenheshow:{},
          wuliaodata:[],
          registerTime:"",
        }
        },
      methods:{
        getmenudata() {
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          this.$axios.post("module/moduleshenghe.action", params).then((response) => {
            _this.moduletable = response.data.records;
            _this.total = response.data.total;
          }).catch();
        },
        searchcartype() {   //条件查询
          this.getmenudata();
        },
        handleSizeChange(val) {  //页size变更
          this.pagesize = val;
          this.pageno = 1;
          this.getmenudata();
        },
        handleCurrentChange(val) {  //页码变更

          this.pageno = val;
          this.getmenudata();
        },
        //审核
        moduleShenhe(id){
          this.shenheshow = true;
          //根据id查询数据，显示在编辑页面
          var _this = this;
          var params = new URLSearchParams();
          params.append("id", id);
          this.$axios.post("module/moduleShenheByid.action", params).then(function (response) {
            _this.moduleShenheshow = response.data;
          }).catch();
          this.$axios.post("moduleDetail/moduleDetailByid.action", params).then(function (response) {
            _this.wuliaodata = response.data;
          }).catch();
        },
        //返回
        fanhui(){
          this.shenheshow = false;
        },
        //通过
        yes(){
          var _this=this;
          var params = new URLSearchParams();
          //params.append("id", this.moduleShenheshow.id);
          Object.keys(this.moduleShenheshow).forEach(function (item) {
            if(_this.moduleShenheshow[item]!=null){
              params.append(item,_this.moduleShenheshow[item]);
            }
          })

          this.$axios.post("module/moduleupdate.action",params).then(function (response) {
            if (response.data == true) {
              _this.$notify({
                title: '成功',
                message: '编辑成功',
                type: 'success'
              });
            } else {
              _this.$notify({
                title: '失败',
                message: '编辑失败',
                type: 'danger'
              });
            }
            _this.shenheshow = false;
            _this.pageno = 1;
            //刷新表格数据

            _this.getmenudata();
          }).catch();
        },
        //不通过
        no(){
          var _this=this;
          var params = new URLSearchParams();
          Object.keys(this.moduleShenheshow).forEach(function (item) {
            params.append(item,_this.moduleShenheshow[item]);
          })
          this.$axios.post("module/moduleupdateno.action",params).then(function (response) {
            if (response.data == true) {
              _this.$notify({
                title: '成功',
                message: '编辑成功',
                type: 'success'
              });
            } else {
              _this.$notify({
                title: '失败',
                message: '编辑失败',
                type: 'danger'
              });
            }
            _this.shenheshow = false;
            _this.pageno = 1;
            //刷新表格数据

            _this.getmenudata();
          }).catch();
        },

      currentTime() {
        setInterval(this.formatDate, 500);
      },
      formatDate() {
        let date = new Date();
        let year = date.getFullYear(); // 年
        let month = date.getMonth() + 1; // 月
        let day = date.getDate(); // 日
//let week = date.getDay(); // 星期
//let weekArr = [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ];
        let hour = date.getHours(); // 时
        hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
        let minute = date.getMinutes(); // 分
        minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
        let second = date.getSeconds(); // 秒
        second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
        this.registerTime= `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      }
    },
      created(){
        this.getmenudata();
      },
      mounted() {
        this.currentTime();
      },
// 销毁定时器
      beforeDestroy() {
        if (this.formatDate) {
          clearInterval(this.formatDate); // 在Vue实例销毁前，清除时间定时器
        }
      }
    }
</script>

<style scoped>

</style>
