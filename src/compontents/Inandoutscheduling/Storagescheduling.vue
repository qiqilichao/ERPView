<template>
  <div id="Storagescheduling">
    <span>当前等待做调度的入库单总数：{{total}}列</span>
    <el-table :data="storagetable" border style="width: 100%">
      <el-table-column
        prop="id"
        label="入库单编号"
        width="200">
      </el-table-column>
      <el-table-column
        label="入库理由"
        width="230">
        <template slot-scope="scope">
          {{scope.row.reason | jibie1}}
        </template>
      </el-table-column>
      <el-table-column
        prop="reasonexact"
        label="入库详情理由"
        width="180">
      </el-table-column>
      <el-table-column
        prop="registerTime"
        label="登记时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="amountSum"
        label="总件数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="costPriceSum"
        label="总金额（元）"
        width="175">
      </el-table-column>
      <el-table-column label="入库调度">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="handleEdit(scope.row.id)">入库调度
          </el-button>
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

    <el-button @click="handleEdit(1)">
      aaa
    </el-button>

    <el-dialog title="物料组成设计单" :visible="gathershow" id="shejishow">
      <el-button @click="gathershow = false">返回</el-button>
      <el-form :inline="true" label-width="80px" :modal="gatherxiang">
        <h3>入库调度单</h3>
        <el-row>
          <el-col :span="12"> 入库单编号: {{gatherxiang.gatherId}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12"> 入库理由:{{gatherxiang.reason | jibie1}}</el-col>
          <el-col :span="12"> 入库详细理由：{{gatherxiang.reasonexact}}</el-col>
        </el-row>

        <template>
          <el-form :inline="true" label-width="80px" :modal="gathermingxi" >
            <el-table class="wuliaotab" :data="gathermingxi" stripe>
              <el-table-column type="selection">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.checked">
                  </el-checkbox>
                </template>
              </el-table-column>
              <el-table-column prop="id" label="序号" width="180"></el-table-column>
              <el-table-column prop="productName" label="产品名称" width="130"></el-table-column>
              <el-table-column prop="productId" label="产品编号" width="130"></el-table-column>
              <el-table-column prop="amount" label="应入库件数" width="130"></el-table-column>
              <el-table-column prop="gatherdAmount" label="已入库件数" width="130"></el-table-column>
              <el-table-column prop="" label="存放地址集合" width="130"></el-table-column>
              <el-table-column
                label="入库标记"
                width="230">
                <template slot-scope="scope">
                  {{scope.row.gatherTag | jibie}}
                </template>
              </el-table-column>
              <el-table-column
                label="调度" width="230">
                <template slot-scope="scope">
                  <el-button type="warning" @click="gatherDetailupdate(scope.row.productId , scope.row.id)" size="small">调度</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </template>
        <el-row>
          <el-col :span="12"> 应入库总件数: {{gatherxiang.amountSum}}</el-col>
          <el-col :span="12"> 已入库总件数：{{gatherxiang.gatheredAmountSum}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12"> 应入库总成本: {{gatherxiang.costPriceSum}}</el-col>
        </el-row>


      </el-form>
    </el-dialog>

    <el-dialog title="入库调度单" :visible="ruku" id="shejishow2">
      <el-button @click="rukutijiao">提交</el-button>
      <el-button @click="rukufan">返回</el-button>
      <el-form :inline="true" label-width="80px" :model="querylianjiaBy">
        <h3>入库调度单</h3>
        <el-row>
          <el-col :span="12"> 入库单编号:{{gatherId}}</el-col>
          <el-col :span="12"> 产品编号:{{querylianjiaBy.productId}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">产品名称:{{querylianjiaBy.productName}}</el-col>
          <el-col :span="12">成本单价:{{querylianjiaBy.subtotal}}</el-col>
        </el-row>

        <template>
          <el-form :inline="true" label-width="80px"  class="kucun">
            <el-table class="wuliaotab" :data="cellbyId" stripe>
              <el-table-column prop="id" label="序号" width="180"></el-table-column>
              <el-table-column label="库房名称" width="180">
                <template slot-scope="scope">
                  成品库
                </template>
              </el-table-column>
              <el-table-column label="存储地址编号" width="180">
                <template slot-scope="scope">
                  01-01-01
                </template>
              </el-table-column>
              <el-table-column label="存储地址名称" width="180">
                <template slot-scope="scope">
                  电子-计算机-服务器
                </template>
              </el-table-column>
              <el-table-column prop="" label="存储单元简称" width="130"></el-table-column>
              <el-table-column label="当前可存放数量" width="180">
                <template slot-scope="scope">
                  {{dqcunchuliang}}
                </template>
              </el-table-column>
              <el-table-column label="本次入库数量" width="180">
                <template slot-scope="scope">
                  <el-input v-model="shu" ></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </template>
        <el-row>
          <el-col :span="12">
            <el-form-item label="登记人">
              <el-input clearable v-model="querylianjiaBy.register" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12"> 登记时间：{{registerTime}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12"> 应入库数:{{querylianjiaBy.amount}}</el-col>
          <el-col :span="12"> 已入库数：{{querylianjiaBy.gatheredAmount}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12"> 应入库总成本:{{querylianjiaBy.subtotal}}</el-col>
        </el-row>


      </el-form>
    </el-dialog>

    <el-dialog :visible="diaodufalse" id="diaodufalse">
      <el-form :inline="true" label-width="80px">
        <span>对不起，该产品尚未分配存储空间，请返回</span>
        <button @click="diaodufalse=false">返回</button>
      </el-form>
    </el-dialog>

  </div>
</template>

<style>

  #diaodufalse {
    width: 1000px;
    height: 300px;
    border: solid 1px black;
    margin: 20px;
  }

  #shejishow {
    width: 2000px;
    margin-right: 100px;

  }

  #shejishow2 {
    width: 2000px;
    margin-right: 100px;

  }
  .kucun{
    border: solid 1px black;

  }
</style>
<script>
  export default {
    name: "Storagescheduling",
    data() {
      return {
        pageno: 1,
        pagesize: 5,
        total: 0,
        storagetable: [],
        te1: 2312323,
        gathershow: false,
        gatherxiang: {},
        gathermingxi: [],
        diaodufalse: false,
        ruku: false,
        hh: 3,
        registerTime:"",
        querylianjiaBy:{},
        gatherId:"",
        cellbyId:[],
        dqcunchuliang:1,
        shu:1,
        gid:1,
        productI:""
      }
    },
    methods: {
      //查询所有的入库数据
      getgatherdata() {
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
      handleEdit(id) {
        this.gathershow = true;
        //根据id查询数据，显示在编辑页面
        var _this = this;
        this.hh = id;
        var params = new URLSearchParams();
        params.append("id", id);

        this.$axios.post("gather/gathertbyid.action", params).then(function (response) {
          _this.gatherxiang = response.data;
          _this.gatherId=_this.gatherxiang.gatherId;
        }).catch();
        this.$axios.post("gatherDetail/gatherDetailByidList.action", params).then(function (response) {
          _this.gathermingxi = response.data;
        }).catch();
    },
      gatherDetailupdate(productId,id) {
        this.gathershow = false;
        this.gid=id;
        this.productI=productId;
        var _this = this;
        var params = new URLSearchParams();
        params.append("productId", productId);

        this.$axios.post("cell/cellproductId.action", params).then(function (response) {
          if (response.data == 0) {
            _this.diaodufalse = true;
          } else {
            _this.gathershow = false;
            _this.ruku = true;

            params.append("id", id);

            _this.$axios.post("gatherDetail/querylianjiaBy.action",params).then(function (response) {
              _this.querylianjiaBy = response.data;
            }).catch();
            _this.$axios.post("cell/cellproductId.action",params).then(function (response) {
              _this.cellbyId=response.data;
              _this.cellbyId.forEach((item)=>{
                _this.dqcunchuliang=item.maxCapacityAmount-item.amount;
              })
            }).catch();
          }

        }).catch();

      },
      rukufan() {
        this.ruku = false;
        this.gathershow = true;
        //根据id查询数据，显示在编辑页面
        var _this = this;
        var params = new URLSearchParams();
        params.append("id", this.hh);

        this.$axios.post("gather/gathertbyid.action", params).then(function (response) {
          _this.gatherxiang = response.data;
        }).catch();
        this.$axios.post("gatherDetail/gatherDetailByidList.action", params).then(function (response) {
          _this.gathermingxi = response.data;
        }).catch();
      },
      //提交
      rukutijiao() {
        var _this=this;
        this.cellbyId.forEach((item)=>{
          if(item.amount-this.shu<0){
            alert("入库数量大于库存存放数量，存放失败！！！")
          }else if(this.querylianjiaBy.amount!=this.shu) {
            alert("入库数量有误，请重新输入！！！！！")
          }else{
            item["rukushu"]=this.shu;
            item["gid"] =this.gid;
            this.$axios.post("cell/dqcunchuUpdateById.action",JSON.stringify(this.cellbyId),{headers:{"Content-Type":"application/json"}}).then(response =>{

            })
            this.$axios.post("gatherDetail/rukubiaojiUpdate.action",JSON.stringify(this.cellbyId),{headers:{"Content-Type":"application/json"}}).then(response =>{

              if (response.data == "sh") {
                this.$message({
                  message: '调度成功',
                  type: 'success'
                });
                _this.ruku = false;

                _this.getgatherdata();

              }else if(response.data == "ss"){

                /*  var params = new URLSearchParams();
                  params.append("productId",_this.productI);

                  _this.$axios.post("cell/cellproductId.action", params).then(function (response) {
                    if (response.data == 0) {
                      _this.diaodufalse = true;
                    } else {
                      params.append("id", _this.gid);
                      _this.$axios.post("gatherDetail/querylianjiaBy.action",params).then(function (response) {
                        _this.querylianjiaBy = response.data;
                      }).catch();
                      _this.$axios.post("cell/cellproductId.action",params).then(function (response) {
                        _this.cellbyId=response.data;
                        _this.cellbyId.forEach((item)=>{
                          _this.dqcunchuliang=item.maxCapacityAmount-item.amount;
                        })
                      }).catch();
                    }
                  }).catch();
                _this.gathershow = true;
                _this.ruku = false;*/

                _this.ruku = false;

                _this.getgatherdata();
              }
            }).catch();
          }

        })
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
        this.registerTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      }
    },
    created() {
      this.getgatherdata();
    },
    mounted() {
      this.currentTime();
    },
// 销毁定时器
    beforeDestroy() {
      if (this.formatDate) {
        clearInterval(this.formatDate); // 在Vue实例销毁前，清除时间定时器
      }
    },
    filters: {
      jibie(val) {
        if (val == "K002-1") {
          return "未调度";
        }
        if (val == "K002-2") {
          return "已调度";
        }
      },
      jibie1(val) {
        if (val == "R001-1") {
          return "生产入库";
        }
        if (val == "R001-2") {
          return "库存初始";
        }
        if (val == "R001-3") {
          return "增送";
        }
        if (val == "R001-4") {
          return "内部归还";
        }
        if (val == "R001-5") {
          return "其他归还";
        }
      },

    }
  }
</script>

<style scoped>

</style>
