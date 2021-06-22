<template>
  <div id="Moduleselect">
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
        <el-table-column prop="costPriceSum" label="物料成本" width="120"></el-table-column>
        <el-table-column
          fixed="right"
          label="变更"
          width="100">
          <template slot-scope="scope">
            <el-button type="warning" @click="modulewuliaoSelect(scope.row.id)" size="small">变更</el-button>
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
      <el-dialog :visible="modulewuliaoSelectshow" id="shejishow">
        <el-button @click="wuliaobtnsave">添加物料</el-button><el-button @click="wudelete">删除新物料</el-button><el-button @click="xinsave">重新提交</el-button> <el-button @click="fanhui">返回</el-button>
        <el-form :inline="true" label-width="80px" :modal="moduleUpdateeshow" class="wuliaod">
          <h3>物料组成设计单</h3>
          <el-row>
            <el-col :span="12">设计单编号: {{moduleUpdateeshow.designId}}</el-col>
            <el-col :span="12"> 设计人： <el-input class="hh" clearable v-model="moduleUpdateeshow.designer"></el-input></el-col>
          </el-row>
          <el-row>
            <el-col :span="12">产品名称: {{moduleUpdateeshow.productname}}</el-col>
            <el-col :span="12">产品编号：{{moduleUpdateeshow.productId}}</el-col>
          </el-row>


        <el-form :inline="true" label-width="80px" :modal="wuliaodata" class="wuliaod">
          <el-table class="wuliaotab" :data="wuliaodata" stripe>
            <el-table-column prop="id" label="序号" width="180"></el-table-column>
            <el-table-column prop="productId" label="物料编号" width="180"></el-table-column>
            <el-table-column prop="productName" label="物料名称" width="180"></el-table-column>
            <el-table-column prop="type" label="用途类型" width="180"></el-table-column>
            <el-table-column prop="productDescribe" label="描述" width="180"></el-table-column>
            <el-table-column  label="数量" width="180">
              <template slot-scope="scope">
                <el-input v-model="scope.row.amount" @input="aa(scope.row.id)"></el-input>
              </template></el-table-column>
            <el-table-column prop="costPrice" label="单价" width="180"></el-table-column>
            <el-table-column prop="subtotal" label="小计" width="180"></el-table-column>
            <el-table-column
              fixed="right"
              label="删除"
              width="100">
              <template slot-scope="scope">
                <el-button type="warning" @click="modulewuliaoDelect(scope.row.id)" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>

          <template>
            <el-form :inline="true" label-width="80px"  class="wuliaod">
              <h3>新物料</h3>
              <el-table class="wuliaotab" :data="xinwuliaodata" stripe>
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
            <el-col :span="12">
              <el-form-item label="物料总成本:">
                {{moduleUpdateeshow.costPriceSum}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="变更人：">
                <el-input class="hh" clearable v-model="moduleUpdateeshow.changer"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="时间:">
                <span>{{registerTime}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="设计要求:">
                <el-input  type="textarea" clearable v-model="moduleUpdateeshow.moduleDescribe"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>

      <el-dialog title="物料添加" :visible="wuliaobtnsaveshow">
        符合条件的物料一共有{{wuliaosaveform.length}}条 <el-button type="warning" @click="shejiopeneditwinfan" size="small">返回</el-button>
        <el-form :inline="true" label-width="80px">

          <el-table class="wuliaotab" :data="wuliaosaveform" stripe>
            <el-table-column prop="productId" label="物料编号" width="180"></el-table-column>
            <el-table-column prop="productName" label="物料名称" width="180"></el-table-column>
            <el-table-column prop="type" label="用途类型" width="180"></el-table-column>
            <el-table-column prop="productDescribe" label="物料描述" width="180"></el-table-column>
            <el-table-column prop="amountUnit" label="单位" width="180"></el-table-column>
            <el-table-column prop="costPrice" label="计划成本单价" width="180"></el-table-column>
            <el-table-column fixed="right" label="添加" width="100">
              <template slot-scope="scope">
                <el-button type="warning" @click="wuliaotianjia(scope.$index,scope.row.id)" size="small">添加</el-button>
              </template>
            </el-table-column>
          </el-table>
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
  el-input{

  }
  .hh{
    width: 100px;
  }
</style>
<script>
    export default {
        name: "Moduleupdate",
      data(){
        return{
          moduleUpdateeshow:{},
          moduletable:[],
          pageno: 1,
          pagesize: 5,
          total: 0,
          registerTime:"",
          wuliaodata:[],
          modulewuliaoSelectshow:false,
          xinwuliaodata:[],
          wuliaobtnsaveshow:false,
          wuliaosaveform:[],
        }
      },
      methods:{
        getmenudata() {
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          this.$axios.post("module/moduleSelect.action", params).then((response) => {
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
        modulewuliaoSelect(id){
          this.modulewuliaoSelectshow =true;
          var _this = this;
          var params = new URLSearchParams();
          params.append("id", id);
          this.$axios.post("moduleDetail/moduleDetailByid.action", params).then(function (response) {
            _this.wuliaodata = response.data;
          }).catch();
          this.$axios.post("module/moduleShenheByid.action", params).then(function (response) {
            _this.moduleUpdateeshow = response.data;
          }).catch();
        },
        //返回
        fanhui(){
          this.modulewuliaoSelectshow = false;
        },
        //删除物料
        modulewuliaoDelect(id){
          var hh = 0;
          var _this=this;
          var params = new URLSearchParams();
          params.append("id", id);


            hh = hh + wuliaodata.subtotal;

            aleret(hh)

          this.moduleUpdateeshow.costPriceSum = this.moduleUpdateeshow.costPriceSum - hh;


         /* Object.keys(this.moduleUpdateeshow).forEach(function (item) {
            if(_this.moduleUpdateeshow[item]!=null){
              params.append(item,_this.moduleUpdateeshow[item]);
            }
          })
          this.$axios.post("module/xinmoduleupdate.action",params).then(function (response) {

          })

          this.$axios.post("moduleDetail/moduleDetailDelect.action", params).then(function (response) {
            if (response.data == true) {
              _this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              });
            } else {
              _this.$notify({
                title: '失败',
                message: '删除失败',
                type: 'danger'
              });
            }
            //刷新表格数据

            _this.modulewuliaoSelect(this.id);
          }).catch();
          */
        },
        //打开添加物料模态框
        wuliaobtnsave(){
          var _this = this;
          this.wuliaobtnsaveshow = true;
          this.$axios.post("dfile/wuliaoselect.action").then(function (response) {
            _this.wuliaosaveform = response.data;
          }).catch();
        },
        //退出物料添加页面返回物料设计
        shejiopeneditwinfan(){
          this.wuliaobtnsaveshow=false;
        },
        //添加物料
        wuliaotianjia(index,ids){
          if (this.xinwuliaodata.length>0){
            var a=this.xinwuliaodata.find(item =>{
              return item.id==ids
            })
            if (a==null){
              this.xinwuliaodata.push(this.wuliaosaveform[index]);

            }
          }else {
            this.xinwuliaodata.push(this.wuliaosaveform[index]);
          }
        },
        //删除物料
        wudelete(){
          var newoutapp= this.xinwuliaodata.filter(item => item.checked==true)
          if (newoutapp.length!=0){
            this.xinwuliaodata.forEach((item,index) => {
              if(item.checked){
                this.xinwuliaodata.splice(index,newoutapp.length)
              }
            })
          }else {
            this.$message({
              showClose: true,
              message: '请选择一条工序删除',
              type: 'warning'
            });
          }
        },
        aa(ids){
          var row = this.xinwuliaodata.find((item)=>{return item.id == ids;});
          if (Number(row.amount)!=NaN && Number(row.costPrice) ){
            row.subtotal = Number(row.amount) * Number(row.costPrice);
          }
        },

        xinsave() {
          //添加按钮按下，保存到db
          var _this = this;
          var params = new URLSearchParams();
          var hh = 0;
          this.xinwuliaodata.forEach((item) => {
            hh = hh + item.subtotal
          })


          this.moduleUpdateeshow.costPriceSum = this.moduleUpdateeshow.costPriceSum + hh;


          Object.keys(this.moduleUpdateeshow).forEach(function (item) {
            if(_this.moduleUpdateeshow[item]!=null){
              params.append(item,_this.moduleUpdateeshow[item]);
            }
          })
          this.$axios.post("module/xinmoduleupdate.action",params).then(function (response) {

          })

            this.xinwuliaodata.forEach((item) => {
              item["mdid"] = this.moduleUpdateeshow.id;
            })

            this.$axios.post("moduleDetail/moduleDetailsadd.action",
              JSON.stringify(this.xinwuliaodata),
              {headers: {"Content-Type": "application/json"}}).then(response => {

                this.$message({
                  message: response.data?'修改成功，请去审核':"修改失败",
                  type: 'success'

                }).catch();
                _this.modulewuliaoSelectshow=false;
                _this.getmenudata();

            });



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
      filters:{
        jibie(val){
          if (val=="S001-0"){
            return "等待";
          }
          if (val=="S001-1"){
            return "通过";
          }
          if (val=="S001-2"){
            return "不通过";
          }
        }
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
