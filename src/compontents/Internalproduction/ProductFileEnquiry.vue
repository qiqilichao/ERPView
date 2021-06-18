<template>
    <div id="ProductFileEnquiry">
      <h1>产品档案查询</h1>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="产品名称">
          <el-input v-model="productName" placeholder="请输入产品名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格数据-->
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="productId"
          label="产品编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="产品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          label="用途类型">
        </el-table-column>
        <el-table-column
          prop="firstKindName"
          label="I级分类">
        </el-table-column>
        <el-table-column
          prop="secondKindName"
          label="II级分类">
        </el-table-column>
        <el-table-column
          prop="thirdKindName"
          label="III级分类">
        </el-table-column>
        <el-table-column
          prop="responsiblePerson"
          label="产品经理">
        </el-table-column>
      </el-table>
      <!-- 分页 -->
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
        name: "ProductFileEnquiry",
      data(){
          return{
            productName:'',
            tableData:[],
            pageno: 1,
            pagesize: 5,
            total: 0,
          }
      },
      methods:{
        getdfiledata() {
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);

          params.append("productName",this.productName)

          this.$axios.post("dfile/approved.action", params).then((response) => {
            _this.tableData = response.data.records;
            _this.total = response.data.total;
          }).catch();
        },
        onSubmit(){
          this.getdfiledata();
        },
        handleSizeChange(val) {  //页size变更
          this.pagesize = val;
          this.pageno = 1;
          this.getdfiledata();
        },
        handleCurrentChange(val) {  //页码变更

          this.pageno = val;
          this.getdfiledata();
        }
      },
      created(){
        this.getdfiledata();
      }
    }
</script>

<style scoped>

</style>
