<template>
  <div id="Makeprocessdesignsheettoexaminequrey">
    <el-form :inline="true" :model="Search" class="demo-form-inline">
      <el-form-item label="一级分类：">
        <el-select v-model="Search.firstKindId" clearable @change="firest" placeholder="请选择">
          <el-option
            v-for="item in firestoption" :key="item.id"
            :label="item.kindName"
            :value="item.kindId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="一级分类：">
        <el-select v-model="Search.secondKindId" clearable @change="second" placeholder="请选择">
          <el-option
            v-for="item in secondoption"
            :key="item.id"
            :label="item.kindName"
            :value="item.kindId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类：">
        <el-select v-model="Search.thirdKindId" clearable placeholder="请选择">
          <el-option
            v-for="item in thirdoption"
            :key="item.id"
            :label="item.kindName"
            :value="item.kindId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审核状态：">
        <el-select v-model="Search.checktags" clearable placeholder="请选择">
          <el-option
            v-for="item in check"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item><br>
      <el-form-item>
        <div class="block">
          <el-date-picker
            v-model="datelist"
            type="daterange"
            range-separator="至"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="getdata" type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="productlist" border style="width: 100%">
      <el-table-column
        prop="designId"
        label="设计单编号"
        width="230">
      </el-table-column>
      <el-table-column
        prop="productId"
        label="产品编号"
        width="230">
      </el-table-column>
      <el-table-column
        prop="productName"
        label="产品名称"
        width="230">
      </el-table-column>
      <el-table-column
        prop="checkTag"
        label="设计单状态"
        width="230">
        <template slot-scope="scope">
          {{scope.row.dfile.designProcedureTag | sheji}}
        </template>
      </el-table-column>
      <el-table-column label="审核状态">
        <template slot-scope="scope">
          {{scope.row.checkTag | shenghe}}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageno"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "Makeprocessdesignsheettoexaminequrey",
    data(){
      return {
        Search:{},
        firestoption:[],
        secondoption:[],
        thirdoption:[],
        pageno:1,
        pagesize:5,
        total:0,
        datelist:'',
        productlist:[],
        check:[{value:"S001-0",label:"等待"},{value:"S001-1",label:"通过"},{value:"S001-2",label:"不通过"}],
      }
    },
    methods:{
      getdata(){
        var params = new URLSearchParams();
        params.append("pageno",this.pageno);
        params.append("pagesize",this.pagesize);

        Object.keys(this.Search).forEach(item =>{
          params.append(item,this.Search[item])
        })
        if(this.datelist!=''){
          params.append("date1",this.datelist[0])
          params.append("date2",this.datelist[1])
        }

        this.$axios.post("gx/querAll",params).then(response =>{
          this.productlist=response.data.records
          this.total=response.data.total
        }).catch(e => alert("出问题了"))
      },
      handleSizeChange(val) {  //页size变更
        this.pagesize = val;
        this.pageno = 1;
        this.getdata();
      },
      handleCurrentChange(val) {  //页码变更
        this.pageno = val;
        this.getdata();
      },
      //加载一三级分类
      getKind(){
        this.$axios.post("conf/queryAll").then(response =>{
          this.firestoption=response.data
        }).catch()
      },
      //根据一级选中的值找到二级
      firest(val){
        // console.log(this.Search.firstKindId)
        if (val==''){
          this.secondoption=[];
          this.thirdoption=[];
          this.Search.secondKindId='';
          this.Search.thirdKindId='';
        }
        this.firestoption.forEach(item =>{
          if(item.kindId ==val){
            this.secondoption =item.configFileKinds
          }
        })
      },
      //根据二级选中的值找到三级
      second(val){
        if (val==''){
          this.thirdoption=[];
          this.Search.thirdKindId='';
        }
        this.secondoption.forEach(item =>{
          if(item.kindId ==val){
            this.thirdoption =item.configFileKinds
          }
          return;
        })
      },
    },
    created() {
      this.getKind()
      this.getdata()
    },
    filters:{
      sheji(val){
        if (val=="G001-1"){
          return "完成";
        }
        if (val=="G001-0"){
          return "等待";
        }
      },
      shenghe(val) {
        if (val == "S001-0") {
          return "等待";
        }
        if (val == "S001-1") {
          return "通过";
        }
        if (val == "S001-2") {
          return "未通过";
        }
      }
    }
  }
</script>

<style scoped>

</style>
