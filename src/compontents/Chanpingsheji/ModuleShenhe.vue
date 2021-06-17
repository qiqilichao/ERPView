<template>
    <div id="ModuleShenhe">
      <el-table
        :data="moduletable"
        style="width: 100%"
        height="250">

        <el-table-column prop="designId" label="设计单编号" width="120"></el-table-column>
        <el-table-column prop="productId" label="产品编号" width="120"></el-table-column>
        <el-table-column prop="productName" label="产品名称" width="120"></el-table-column>
        <el-table-column prop="register" label="设计人" width="120"></el-table-column>
        <el-table-column prop="registerTime" label="登记时间" width="120"></el-table-column>
        <el-table-column prop="costPriceSum" label="物料总成本" width="120"></el-table-column>
        <el-table-column
          fixed="right"
          label="审核"
          width="100">
          <template slot-scope="scope">
            <el-button type="warning" @click="shejiopeneditwin(scope.row.id)" size="small">审核</el-button>
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
    </div>
</template>

<script>
    export default {
        name: "ModuleShenhe",
      data(){
        return {
          moduletable: [],
          pageno: 1,
          pagesize: 5,
          total: 0,
        }
        },
      methods:{
        getmenudata() {
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          this.$axios.get("module/moduleshenghe.action", params).then((response) => {
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
        }
      },
      created(){
        this.getmenudata();
      },
    }
</script>

<style scoped>

</style>
