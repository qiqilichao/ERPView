<template>

  <div id="shejidan">
    <template>
      <div id="xianshi">
        <!--  条件查询-->
   <!--     <el-form :inline="true">
          <el-form-item label="类型名">
            <el-input placeholder="请输入类型名字" clearable v-model="firstKindName"></el-input>
          </el-form-item>

          <el-form-item label="备注">
            <el-input placeholder="请输入备注" clearable v-model="remark"></el-input>
          </el-form-item>

          <el-button type="success" @click="searchcartype">查询</el-button>
        </el-form>-->

        <el-table
          :data="dfiletable"
          style="width: 100%"
          height="250">

          <el-table-column prop="productId" label="产品编号" width="120"></el-table-column>
          <el-table-column prop="productName" label="产品名称" width="120"></el-table-column>
          <el-table-column prop="productClass" label="档次级别" width="120"></el-table-column>
          <el-table-column prop="firstKindName" label="一级分类" width="120"></el-table-column>
          <el-table-column prop="secondKindName" label="二级分类" width="120"></el-table-column>
          <el-table-column prop="thirdKindName" label="三级分类" width="120"></el-table-column>
          <el-table-column prop="type" label="用途类型" width="120"></el-table-column>
          <el-table-column
            fixed="right"
            label="制定设计单"
            width="100">
              <template slot-scope="scope">
                <el-button type="warning" @click="shejiopeneditwin(scope.row.id)" size="small">制定设计单</el-button>
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
        <!-- 制定设计单模态框-->
        <el-dialog title="物料组成设计单" :visible="shejishow" id="shejishow">
          至少要有一种物料（数量可为0）<el-button>PDF打印</el-button><el-button @click="wuliaobtnsave">添加物料</el-button><el-button @click="wudelete">删除物料</el-button><el-button @click="wuliaoupdate">预览</el-button><el-button  @click="shejishow = false">返回</el-button>
        <el-form :inline="true" label-width="80px" :modal="wuliaozuc" class="wuliaod">

            <h3>物料组成设计单</h3>
          <el-row>
            <el-col :span="12"> 产品名称: {{wuliaozuc.productName}}</el-col>
            <el-col :span="12"> 产品编号：{{wuliaozuc.productId}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="3">  设计人:</el-col>
            <el-col :span="12"><el-input v-model="wuliaozuc.designer"></el-input></el-col>
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
            <el-col :span="12">
              <el-form-item label="登记人">
                <el-input clearable v-model="wuliaozuc.moduleDescribe"></el-input>
              </el-form-item>
                </el-col>
            <el-col :span="12">
              <el-form-item label="时间">
                <span>{{wuliaozuc.registerTime}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="设计要求">
                <el-input  type="textarea" clearable v-model="wuliaozuc.moduleDescribe"></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          </el-form>


        </el-dialog>
        <!--添加涂料查询所有物料页面-->
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
      </div>

      <!--预览-->
        <el-dialog title="物料组成设计单预览" :visible="yulan" id="shejishow2">
            <el-button @click="wuliaosave">确定</el-button><el-button  @click="yulanfan">返回</el-button>
          <el-form :inline="true" label-width="80px" :modal="wuliaozuc" class="wuliaod">

            <h3>物料组成设计单</h3>
            <el-row>
              <el-col :span="12"> 产品名称: {{wuliaozuc.productName}}</el-col>
              <el-col :span="12"> 产品编号：{{wuliaozuc.productId}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="3">  设计人:</el-col>
              <el-col :span="12">{{wuliaozuc.designer}}</el-col>
            </el-row>

            <template>
              <el-table class="wuliaotab" :data="wuliaodata" stripe>
                <el-table-column prop="productId" label="物料编号" width="180"></el-table-column>
                <el-table-column prop="productName" label="物料名称" width="180"></el-table-column>
                <el-table-column prop="type" label="用途类型" width="180"></el-table-column>
                <el-table-column prop="productDescribe" label="描述" width="180"></el-table-column>
                <el-table-column prop="amount" label="数量" width="180"></el-table-column>
                <el-table-column prop="costPrice" label="计划成本单价" width="180"></el-table-column>
                <el-table-column prop="subtotal" label="小计" width="180"></el-table-column>
              </el-table>
            </template>
            <el-row>
              <el-col :span="12">
                <el-form-item label="登记人">
                  {{wuliaozuc.moduleDescribe}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="时间">
                  <span>{{wuliaozuc.registerTime}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="设计要求">
                  {{wuliaozuc.moduleDescribe}}
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
  el-input{
    width: 100px;
  }
  </style>
<script>
    export default {
        name: "shejidan",
        data(){
          return{
            dfiletable:[],
            pageno: 1,
            pagesize: 5,
            total: 0,
            firstKindName: "",
            shejishow:false,
            wuliaozuc:{},
            wuliaodata:[],
            wuliaobtnsaveshow:false,
            wuliaosaveform:[],
            yulan:false,

          }
        },
      methods: {
        getmenudata() {
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          params.append("firstKindName", this.firstKindName);

          this.$axios.get("dfile/cpshenghetg.action", params).then((response) => {
            _this.dfiletable = response.data.records;
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
        shejiopeneditwin(id) {
          this.shejishow = true;
          //根据id查询数据，显示在编辑页面
          var _this = this;
          var params = new URLSearchParams();
          params.append("id", id);

          this.$axios.post("dfile/shejiselectbyid.action", params).then(function (response) {
            _this.wuliaozuc = response.data;
          }).catch();
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
          if (this.wuliaodata.length>0){
            var a=this.wuliaodata.find(item =>{
              return item.id==ids
            })
            if (a==null){
              this.wuliaodata.push(this.wuliaosaveform[index]);
            }
          }else {
            this.wuliaodata.push(this.wuliaosaveform[index]);
          }
        },
        //删除物料
        wudelete(){
          var newoutapp= this.wuliaodata.filter(item => item.checked==true)
          if (newoutapp.length!=0){
            this.wuliaodata.forEach((item,index) => {
              if(item.checked){
                this.wuliaodata.splice(index,newoutapp.length)
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
          var row = this.wuliaodata.find((item)=>{return item.id == ids;});
          if (Number(row.amount)!=NaN && Number(row.costPrice) ){
            row.subtotal = Number(row.amount) * Number(row.costPrice);
          }
        },
        //预览
        wuliaoupdate(){
          var _this = this;
           var yu= this.wuliaodata.length;
           if(yu>0){
             this.wuliaobtnsaveshow = false;
             this.shejishow=false;
             this.yulan=true;
           }else {
             alert("物料不能为空，请添加物料！！！");
             this.wuliaobtnsaveshow = true;
             this.$axios.post("dfile/wuliaoselect.action").then(function (response) {
               _this.wuliaosaveform = response.data;

             }).catch();
           }

        },
        //退出预览
        yulanfan(){
          this.yulan=false;
          this.shejishow=true;
        },
        //保存数据
        wuliaosave(){
          //添加按钮按下，保存到db
          var _this =this;
          //组装数据(普通数据+特殊文件)   formData  html5提供的类型
          var params = new FormData();

          Object.keys(this.wuliaozuc).forEach((item)=>{
            params.append(item,this.wuliaozuc[item]);
          })
            this.$axios({
            method: 'post',
            url: 'moduleDetail/moduleDetailadd.action',
            data:params,
          }).then(function (response) {
              if (response.data == true) {
                _this.$notify({
                  title: '成功',
                  message: '添加成功',
                  type: 'success'
                });
              } else {
                _this.$notify({
                  title: '失败',
                  message: '添加失败',
                  type: 'danger'
                });
        }
          })
        },
        //时间
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
          this.wuliaozuc.registerTime= `${year}-${month}-${day} ${hour}:${minute}:${second}`;
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
