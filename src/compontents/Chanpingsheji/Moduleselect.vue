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
        <!--<el-table-column prop="register" label="设计单状态" width="120"></el-table-column>-->
        <el-table-column prop="checkTag" label="审核状态" width="120"></el-table-column>
   <!--  <el-table-column
          label="审核状态"
          width="230">
          <template slot-scope="scope">
            {{scope.row.moduletable.checkTag | jibie}}
          </template>
        </el-table-column>-->
      <el-table-column
          fixed="right"
          label="装配树"
          width="100">
          <template slot-scope="scope">
            <el-button type="warning" @click="modulewuliaoSelect(scope.row.id)" size="small">装配树</el-button>
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
        <el-button @click="fanhui">返回</el-button>
        <el-form :inline="true" label-width="80px" :modal="wuliaodata" class="wuliaod">
          <el-table class="wuliaotab" :data="wuliaodata" stripe>
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
      </el-dialog>
    </template>

  </div>

    </template>

<script>
    export default {
        name: "Moduleselect",
      data(){
          return{
            moduletable:[],
            pageno: 1,
            pagesize: 5,
            total: 0,
            wuliaodata:[],
            modulewuliaoSelectshow:false
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
        },
        //返回
        fanhui(){
          this.modulewuliaoSelectshow = false;
        },

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
      }
    }
</script>

<style scoped>

</style>
