<template>

  <div id="shejidan">
    <template>
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
        至少要有一种物料（数量可为0）<el-button>PDF打印</el-button><el-button @click="wuliaobtnsave">添加物料</el-button><el-button>删除物料</el-button><el-button @click="wuliaoupdate">预览</el-button><el-button  @click="shejishow = false">返回</el-button>
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
          <el-table class="wuliaotab" :data="wuliaodata" stripe>
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="productId" label="物料编号" width="180"></el-table-column>
            <el-table-column prop="productName" label="物料名称" width="180"></el-table-column>
            <el-table-column prop="type" label="用途类型" width="180"></el-table-column>
            <el-table-column prop="productDescribe" label="描述" width="180"><el-input v-model="this.productDescribe"></el-input></el-table-column>
            <el-table-column prop="amount" label="数量" width="180"><el-input v-model="this.amount"></el-input></el-table-column>
            <el-table-column prop="amountUnit" label="单位" width="180"><el-input v-model="this.amountUnit"></el-input></el-table-column>
            <el-table-column prop="costPrice" label="计划成本单价" width="180"></el-table-column>
            <el-table-column prop="subtotal" label="小计" width="180"></el-table-column>
          </el-table>
        </template>
        <el-row>
          <el-col :span="12">
            <el-form-item label="登记人">
              <el-input clearable v-model="wuliaozuc.moduleDescribe"></el-input>
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
    </template>
  </div>
</template>

<style>
  #shejishow{
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
            wuliaosaveform:[]

          }
        },
      methods: {
        getmenudata() {
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          params.append("firstKindName", this.firstKindName);

          this.$axios.get("cpshenghetg.action", params).then((response) => {
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

          this.$axios.post("shejiselectbyid.action", params).then(function (response) {
            _this.wuliaozuc = response.data;
          }).catch();
        },
        //打开添加物料模态框
        wuliaobtnsave(){
          var _this = this;
          this.wuliaobtnsaveshow = true;
          this.$axios.post("wuliaoselect.action").then(function (response) {
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
        //预览
        wuliaoupdate(){

        }
      },
      created(){
        this.getmenudata();
      },
    }
</script>

<style scoped>

</style>
