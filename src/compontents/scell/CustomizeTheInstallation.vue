<template>
  <div>
    <!--制作安全库配置单1-->
  <div id="div01">
  <el-table
    :data="tableData"
    height="250"
    border
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
    <el-table-column label="用途类型">
      <template slot-scope="scope">
        {{ scope.row.type == 1 ? "商品" : "物料" }}
      </template>
    </el-table-column>
    <el-table-column
      prop="productClass"
      label="档次级别">
      <template scope="scope">
      <span v-if="scope.row.productClass === '1'">高档</span>
      <span v-else-if="scope.row.productClass === '2'">中档</span>
      <span v-else-if="scope.row.productClass === '3'">低档</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="firstKindName"
      label="I及分类">
    </el-table-column>
    <el-table-column
      prop="firstKindName"
      label="II及分类">
    </el-table-column>
    <el-table-column
      prop="thirdKindName"
      label="III及分类">
    </el-table-column>
    <el-table-column
      label="制定"
      width="100">
      <template slot-scope="scope">
        <el-button  size="mini" round type="primary" icon="el-icon-check" @click="openeditwin(scope.row.productId)">制定</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>

    <!--制作安全库配置单2-->
    <!--    抽屉样式-->
    <el-drawer
      :visible.sync="drawer"
      size="80%">
  <div id="div02" >
    <el-form  size="small" :inline="true" :model="scellform">
      <el-row>
        <el-col :span="1">
          <el-popconfirm
            title="确定提交吗？"
            @confirm="addSCll"
          >
            <el-button slot="reference" size="mini" round type="primary" icon="el-icon-check">提交</el-button>
          </el-popconfirm>
        </el-col>
        <el-col :span="20"><h3>安全库存配置单</h3></el-col>
        <el-col :span="3">
          <el-button  @click="handleClose" size="mini" round type="primary" icon="el-icon-check">返回</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="7" :offset="3">
          <div><!--产品名称：笔记本-->
            <el-form-item label="产品名称:">
              <el-input type="text" v-model="scellform.productName" readonly="readonly"/>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7" :offset="2"><div><!--产品编号：1000000-->
          <el-form-item label="产品编号:">
            <el-input type="text" v-model="scellform.productId" readonly="readonly"/>
          </el-form-item>
        </div></el-col>
        <el-col :span="6"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1"><!--<div class="inline">库存下限数：</div>-->
          <el-form-item label="库存下限数:">
            <div class="inline div02_01"><el-input type="text" v-model="scellform.minAmount" :clearable="true"/></div>
          </el-form-item>
          <!--<div class="inline">库存报警上限数：</div>-->
          <el-form-item label="库存报警上限数:">
            <div class="inline div02_01" :clearable="true"><el-input type="text" v-model="scellform.maxAmount" class="el-input" :clearable="true"/></div>
          </el-form-item>
        </el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="1">
          <div class="inline">
            <!--设置B/N或S/N：-->
            <el-form-item label="设置B/N或S/N:">
              <el-select style="border: 1px solid #DCDFE6;" class="drop-downBox " v-model="value">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

        </el-col>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="10" >
          <!--<div class="inline">设计人：</div>-->
          <el-form-item label="设计人:">
            <div class="inline div02_01"><el-input type="text" v-model="scellform.theDesigner" :clearable="true"/></div>
          </el-form-item>
        </el-col>
      </el-row>
      <!--表格-->
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="20" :offset="2">
          <div>
            <el-table
              :data="dfileform"
              border
              height="140"
              style="width: 100%"
              :header-cell-style="{background:'#eef1f6',color:'#606266'}"
              :cell-style="cellStyle">
              <el-table-column
                width="60"
                prop="id"
                label="序号">
              </el-table-column>
              <el-table-column
                width="80"
                label="库房名称">
                <span>成品库</span>
              </el-table-column>
              <el-table-column
                width="140"
                prop="css"
                label="储存地址地址编号">
                <el-input v-model="css" readonly="readonly"></el-input>
              </el-table-column>
              <el-table-column
                prop="ass"
                label="储存地址名称">
                <el-input v-model="ass" readonly="readonly"></el-input>
              </el-table-column>
              <el-table-column
                width="100"
                label="储存单元简称">
                <template slot-scope="scope" >
                <el-input v-model="scellform.storageUnitAbbreviation"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                width="110"
                label="最大储蓄量">
               <template slot-scope="scope" >
                  <el-input v-model="scellform.maxCapacityAmount"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                width="100"
                label="储存单位">
                <template slot-scope="scope">
                  <el-input v-model="scellform.storageUnit"></el-input>
                </template>

              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="14" :push="1">
          <!--<div class="inline">登记人：</div>-->
          <el-form-item label="登记人:">
            <div class="inline div02_01"><el-input type="text" v-model="scellform.register" readonly="readonly"/></div>
          </el-form-item>
        </el-col>
        <el-col :span="7" :pull="2">
          <!--<div class="inline">登记时间：</div>-->
          <el-form-item label="登记时间:">
            <div class="inline">
              <el-input type="text" v-model="scellform.registerTime" readonly="readonly"/>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" :offset="3">
          <div class="aa">
            <el-form-item label="配置要求:" style="width: 80%; display: block;">
              <el-input type="textarea" :rows="4" resize="none"  placeholder="请输入内容" style="width: 100%" v-model="scellform.config">
              </el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div >
    </el-drawer>
  </div>
</template>

<script>
    export default {
        name: "CustomizeTheInstallation",
      data(){
          return {
            tableData: [],
            pageno: 1,
            pagesize: 5,
            total: 0,
            dfileform:[],
            dfileform1:[],
            options: [{
              value: '1',
              label: '是'
            }, {
              value: '0',
              label: '否'
            }],
            value:"否",
            show:true,
            hidden:false,
            updateTime:"",
            scellform:{
              config:"",//配置要求
              register:'',//登记人
              registerTime: '',//登记时间
              minAmount:0,//库存报警下限数
              maxAmount:0,//库存报警上限数
              maxCapacityAmount:0,//最大存储量
              amount:0,//当前存储量
              thirdKindName:"",//产品III级分类名称
              thirdKindId:"",//产品III级分类编号
              secondKindName:"",//产品II级分类名称
              secondKindId:"",//产品II级分类编号
              firstKindName:"",//产品I级分类名称
              firstKindId:"",//产品I级分类编号
              productName:"",//产品名称
              productId:"",//产品编号
              storeId:"",//库存编号
              storageUnit:"",//储存单元
              storageUnitAbbreviation:"",//储存单元简称
              theDesigner:""//设计人
            },
            ass:"",
            css:"",
            drawer: false,
            innerDrawer: false
          }
      },
      methods: {
        getdata() {   //制作安全库配置单1获取数据
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          this.$axios.post("dfile/queryAllDFile.action", params).then(function (response) {
            _this.tableData = response.data.records;
            _this.total = response.data.total;
          }).catch();
        },
        handleSizeChange(val) {  //页size变更
          this.pagesize = val;
          this.pageno = 1;
          this.getdata();
        },
        handleClose(done) {
          this.$confirm('还有未保存的工作哦确定关闭吗？')
            .then(_ => {
              done();
            })
            .catch(_ => {
              this.drawer=false;
            });
        },
        //以下方法是制作安全库配置单2的
        handleCurrentChange(val) {  //页码变更
          this.pageno = val;
          this.getdata();
        },
        //设置表头的颜色
        rowClass({row, rowIndex}) {
          console.log(rowIndex) //表头行标号为0
          return 'background:red'
        },
        //设置指定行、列、具体单元格颜色
        cellStyle({row, column, rowIndex, columnIndex}) {
          var arr=[4,5,6];
          for (var i=0;i<arr.length;i++){
            if (columnIndex === arr[i]) { //指定坐标rowIndex ：行，columnIndex ：列
              return 'background:yellow' //rgb(105,0,7)
            }
          }
        },
        //显示隐藏
        showHidden(){
              this.show=!this.show;
              this.hidden=!this.hidden;
        },
        //获取当前年月日
        addDate(){
          let date = new Date();
          let Y = date.getFullYear();
          let M = this.getStr(date.getMonth() + 1);
          let D = this.getStr(date.getDate());
          let hours = date.getHours();
          let minutes = this.getStr(date.getMinutes());
          let seconds = this.getStr(date.getSeconds());
          var date1 =Y + "/" + M + "/" + D + " " + hours + ":" + minutes + ":" + seconds;
         this.scellform.registerTime = date1;
        },
        getStr(point) {
          return ("00" + point).slice(-2); // 从字符串的倒数第二个字符开始截取，一直截取到最后一个字符；（在这里永远截取该字符串的最后两个字符）
        },
        openeditwin(productId){//获取数据
          var _this=this;
          this.showHidden();
          var params = new URLSearchParams();
          params.append("productId", productId);
          this.$axios.post("dfile/queryByIdDFile.May", params).then(function (response) {
            _this.scellform=response.data[0];
            _this.ass=_this.scellform.firstKindName+"-"+_this.scellform.secondKindName+"-"+_this.scellform.thirdKindName;
            _this.css=_this.scellform.firstKindId+"-"+_this.scellform.secondKindId+"-"+_this.scellform.thirdKindId;
            console.log(_this.scellform)
            _this.openeditwin2(productId);
            _this.addDate();
            _this.drawer = true;
          }).catch();
        },
        openeditwin2(productId){//获取数据
          var _this=this;
          var params = new URLSearchParams();
          params.append("productId", productId);
          this.$axios.post("dfile/queryByIdDFile2.May", params).then(function (response) {
            _this.dfileform=response.data;
          }).catch();
        },
        addSCll(){
          var _this=this;
          this.scellform.amount=0;
          var params = new URLSearchParams();
         /*
         this.scellform.checkTime="0000/00/00 00:00:00";
          Object.keys(this.scellform).forEach(function (item) {
            params.append(item,_this.scellform[item]);
            console.log(_this.scellform[item])
          })
          */

          params.append("register",_this.scellform.register);//登记人
          params.append("config",_this.scellform.config);//配置要求
         /* params.append("registerTime",new Date());//登记时间*/
          params.append("minAmount",_this.scellform.minAmount);//库存报警下限数
          params.append("maxAmount",_this.scellform.maxAmount);//库存报警上限数
          params.append("maxCapacityAmount",_this.scellform.maxCapacityAmount);//最大存储量
          params.append("amount",_this.scellform.amount);//当前存储量
          params.append("thirdKindName",_this.scellform.thirdKindName);//产品III级分类名称
          params.append("thirdKindId",_this.scellform.thirdKindId);//产品III级分类编号
          params.append("secondKindName",_this.scellform.secondKindName);//产品II级分类名称
          params.append("secondKindId",_this.scellform.secondKindId);//产品II级分类编号
          params.append("firstKindName",_this.scellform.firstKindName);//产品I级分类名称
          params.append("firstKindId",_this.scellform.firstKindId);//产品I级分类编号
          params.append("productName",_this.scellform.productName);//产品名称
          params.append("productId",_this.scellform.productId);//产品编号
          params.append("storeId",_this.scellform.storeId);//库存编号
          params.append("storageUnit",_this.scellform.storageUnit);//储存单元
          params.append("storageUnitAbbreviation",_this.scellform.storageUnitAbbreviation);//储存单元简称
          params.append("theDesigner",_this.scellform.theDesigner);//设计人

          this.$axios.post("Scell/addScll.May",params).then(function (response) {
            if (response.data == true) {
              _this.$notify({
                title: '成功',
                message: '提交成功',
                type: 'success'
              });
            } else {
              _this.$notify({
                title: '失败',
                message: '提交失败',
                type: 'danger'
              });
            }
            _this.getdata();
            _this.$forceUpdate();
          }).catch();
        }
      },
      created() {
        this.getdata();
      }
    }
</script>

<style>
  #div02 {
    font-weight: bold;
    margin:0 auto;
    width: 1000px;
    height: 520px;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    border-radius: 1px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .inline{/*转换行内元素*/
    display: inline-block;
  }

  .div02_01{/*div下边框*/
    border-bottom:1px solid black;
    width: 300px;
    text-align:left;
  }
  .drop-downBox{
    width: 333px;
  }
  .el-input__inner{
    border: none;
  }
  .aa .el-form-item--small .el-form-item__content,
  .el-form-item--small .el-form-item__labe {
    width: 83%;
  }
  .yanse{
    background-color:yellow;
  }
  .div03{
    position: absolute;
    left: 95px;
    background: pink;
  }
  .div04{
    position: absolute;
    left: 1200px;
  }

</style>
