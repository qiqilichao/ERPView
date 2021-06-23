<template>
    <div id="Storagescheduling">
      <span>当前等待做调度的入库单总数：{{total}}列</span>
      <el-table :data="storagetable"  border style="width: 100%">
        <el-table-column
          prop="id"
          label="入库单编号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="name"
          label="入库理由"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="入库详情理由"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="登记时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="总件数"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="总金额（元）"
          width="175">
        </el-table-column>
        <el-table-column label="入库调度">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleEdit(scope.row.id)">入库调度</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--<el-table
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
      </el-table>-->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageno"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

      <el-button @click="handleEdit(1)">
        aaa
      </el-button>

      <el-dialog title="物料组成设计单" :visible="gathershow" id="shejishow">
        <el-button  @click="gathershow = false">返回</el-button>
        <el-form :inline="true" label-width="80px" :modal="gatherxiang" class="wuliaod">
          <h3>入库调度单</h3>
          <el-row>
            <el-col :span="12"> 入库单编号: {{gatherxiang.gatherId}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="3">  入库理由:{{gatherxiang.reason}}</el-col>
            <el-col :span="12"> 入库详细理由：{{gatherxiang.reasonexact}}</el-col>
          </el-row>

          <template>
            <el-form :inline="true" label-width="80px" :modal="gathermingxi" class="wuliaod">
              <el-table class="wuliaotab" :data="gathermingxi" stripe>
                <el-table-column  type="selection">
                  <template slot-scope="scope">
                    <el-checkbox  v-model="scope.row.checked">
                    </el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column prop="id" label="序号" width="180"></el-table-column>
                <el-table-column prop="productName" label="产品名称" width="180"></el-table-column>
                <el-table-column prop="productId" label="产品编号" width="180"></el-table-column>
                <el-table-column prop="" label="应入库件数" width="180"></el-table-column>
                <el-table-column prop="" label="已入库件数" width="180"></el-table-column>
                <el-table-column prop="" label="存放地址集合" width="180"></el-table-column>
                <el-table-column fixed="gatherTag" label="调度" width="100">
                  <template slot-scope="scope">
                    <el-button type="warning" @click="gatherDetailupdate(scope.$index,scope.row.productId)" size="small">调度</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form>
          </template>
          <el-row>
            <el-col :span="12"> 应入库总件数: {{gatherxiang.amountSum}}</el-col>
            <el-col :span="12"> 已入库总件数：{{}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="12"> 应入库总成本: {{gatherxiang.costPriceSum}}</el-col>
            <el-col :span="12"> 已入库总成本：{{}}</el-col>
          </el-row>


        </el-form>
      </el-dialog>

      <el-dialog title="" :visible="diaodufalse" id="diaodufalse">
        该物料没有调度<button @click="diaodufalse=false">返回</button>
      </el-dialog>

    </div>
</template>

<style>
  #diaodufalse{
    width: 400px;
    height: 300px;
    border-style:solid;
  }
</style>
<script>
    export default {
        name: "Storagescheduling",
      data(){
          return {
            pageno: 1,
            pagesize: 5,
            total: 0,
            storagetable:[],
            te1:2312323,
            gathershow:false,
            gatherxiang:{},
            gathermingxi:[],
            diaodufalse:false,
            diao:""
          }
      },
      methods:{
          //查询所有的入库数据
        getgatherdata (){
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);

          this.$axios.post("gather/gatherselect.action", params).then((response) => {
            _this.storagetable = response.data.records;
            _this.total = response.data.total;
          }).catch();

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
        handleEdit(id){
          this.gathershow = true;
          //根据id查询数据，显示在编辑页面
          var _this = this;
          var params = new URLSearchParams();
          params.append("id", id);

          this.$axios.post("gather/gathertbyid.action", params).then(function (response) {
           _this.gatherxiang=response.data;
          }).catch();
          this.$axios.post("gatherDetail/gatherDetailByidList.action", params).then(function (response) {
            _this.gathermingxi = response.data;
          }).catch();
        },
        gatherDetailupdate(productId){
          this.gathershow = false;
          var _this = this;
          var params = new URLSearchParams();
          params.append("productId", id);

          this.$axios.post("cell/cellproductId.action", params).then(function (response) {
            if(response.data==null){
              diaodufalse=true;
            } else {
              _this.diao="hh";
            }
          }).catch();
          if(this.diao==hh){
            this.$axios.post("").then(function (response) {

            }).catch();
          }
        }
      },
      created(){
        this.getgatherdata();
      },
    }
</script>

<style scoped>

</style>
