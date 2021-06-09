<template>
      <div>

              <h1>生产计划单</h1>
        <!--主要功能 -->
        <el-row :gutter="20">
          <el-col :span="9" :offset="15">
          <div>
            <el-button @click="showadd">添加产品</el-button>
            <el-button>添加删除</el-button>
            <el-button>提交审核</el-button>
            <el-button>返回</el-button>
          </div>
          </el-col>
        </el-row>

        <div>

            <div>

              <el-input placeholder="请输入内容" :value="str" size="small">
                <template slot="prepend">生产理由:</template>
              </el-input>
              <el-input placeholder="请输入内容" size="small">
                <template slot="prepend">供货时间:</template>
              </el-input>
              <el-input placeholder="请输入内容" size="small">
                <template slot="prepend">登记人是:</template>
              </el-input>
              <el-input placeholder="请输入内容" :value="date" size="small">
                <template slot="prepend">登记时间:</template>
              </el-input>

            </div>

            <el-table>
              <el-table-column
                label="产品名称"
                width="170">
              </el-table-column>
              <el-table-column
                label="产品编号"
                width="170">
              </el-table-column>
              <el-table-column
                label="描述"
                width="170">
              </el-table-column>
              <el-table-column
                label="数量"
                width="170">
              </el-table-column>
              <el-table-column
                label="单位"
                width="170">
              </el-table-column>
              <el-table-column
                label="单价（元）"
                width="170">
              </el-table-column>
              <el-table-column
                label="小计（元）"
                width="170">
              </el-table-column>

            </el-table>
            <div>
              备注:
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 6}"
                placeholder="请输入内容"
               >
              </el-input>
            </div>
        </div>


        <!-- 打开产品模态框-->
        <el-dialog title="产品" :visible.sync="dialogTableVisible" width="1000px">
          <el-table :data="gridData">
            <el-table-column property="productId" label="产品编号" width="150"></el-table-column>
            <el-table-column property="productName" label="产品名称" width="200"></el-table-column>


            <el-table-column property="type"   label="用途类型" width="200"></el-table-column>

            <el-table-column property="amountUnit" label="单位"></el-table-column>
            <el-table-column property="listPrice" label="单价" ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="addpla(scope.row.id)">生产</el-button>
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
        </el-dialog>

      </div>
</template>

<script>
    export default {
      name: "plan",

      data() {
        return {
          str: "新发生",
          date: "",
          pagesize:5,
          pageno:1,
          total:0,
          dialogTableVisible: false,
          gridData: [],
        }
      },
      methods: {

        //当前时间获取方法
        getDate(format) {
          /**
           *获取当前时间
           *format=1精确到天
           *format=2精确到分
           */
          var now = new Date();
          var year = now.getFullYear(); //得到年份
          var month = now.getMonth();//得到月份
          var date = now.getDate();//得到日期
          var day = now.getDay();//得到周几
          var hour = now.getHours();//得到小时
          var minu = now.getMinutes();//得到分钟
          var sec = now.getSeconds();//得到秒
          month = month + 1;
          if (month < 10) month = "0" + month;
          if (date < 10) date = "0" + date;
          if (hour < 10) hour = "0" + hour;
          if (minu < 10) minu = "0" + minu;
          if (sec < 10) sec = "0" + sec;
          var time = "";
          //精确到天
          if (format == 1) {
            time = year + "/" + month + "/" + date;
          }
          //精确到分
          else if (format == 2) {
            time = year + "/" + month + "/" + date + " " + hour + ":" + minu + ":" + sec;
          }
          this.date = time;
        },

        //获取Dfile表数据
        getDfile(){
           var params=new URLSearchParams();
               params.append("pageno", this.pageno);
               params.append("pagesize",this.pagesize);
           this.$axios.post("/apply/DfilePage").then((response)=>{
                 response.data.records.forEach((item)=>{
                     if(item.type=="Y001-1"){
                       item.type="商品"
                     }else{
                       item.type="物料"
                     }
                 })
                 this.gridData=response.data.records;
                 this.total=response.data.total;
           }).catch()


        },

        //打开添加模态框
        showadd() {
          this.dialogTableVisible = true;
          this.getDfile();
        },

        //生产计划添加商品
        addpla(id){
          alert(id)
        },

        handleSizeChange(val) {  //页size变更
          this.pagesize = val;
          this.pageno = 1;
          this.getDfile();
        },
        handleCurrentChange(val) {  //页码变更
          this.pageno = val;
          this.getDfile();
        },
      },
       created() {
        this.getDate(2)
       }

    }
</script>

<style scoped>

</style>
