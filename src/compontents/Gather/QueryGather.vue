<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col>
          <el-form :inline="true">
            <el-form-item label="入库单编号">
              <el-input placeholder="请输入入库单编号" clearable @clear="getGatherList"
                        v-model="queryGather.gatherId"></el-input>
            </el-form-item>

            <el-form-item label="完成时间">
              <el-date-picker @change="change"
                              v-model="queryGather.dataTime"
                              type="daterange"
                              unlink-panels
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getGatherList">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <!-- 产品列表区域 -->
      <el-table :data="gatherList" border stripe>
        <!-- stripe: 斑马条纹 border：边框-->
        <el-table-column prop="gatherId" label="入库单编号"></el-table-column>
        <el-table-column prop="reason" label="入库理由"></el-table-column>
        <el-table-column prop="amount" label="应入库总件数"></el-table-column>
        <el-table-column prop="realCount" label="已入库总件数"></el-table-column>
        <el-table-column label="入库单状态">
          <template slot-scope="scope">
            {{ scope.row.gatherTag | newGatherTag }}
          </template>
        </el-table-column>
        <el-table-column label="完成时间">
          <template slot-scope="scope">
            <span v-if="scope.row.showTime!=null">
               <i class="el-icon-time"/>
            {{ scope.row.showTime  }}
            </span>
            <span v-else-if="scope.row.showTime==null">
            未完成
            </span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="queryGather.pageNo"
                     :page-sizes="[6, 10, 15, 20]"
                     :page-size="queryGather.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "QueryGather",
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        queryGather: {
          gatherId: '',
          dataTime: '',
          pageNo: 1,
          pageSize: 6,
        },
        gatherList: [],
        total: 0,
      }
    },
    methods: {
      // 条件查询建档时间value = []
      change(value) {
        if (value == null) this.getGatherList();
      },
      getDataTime(dataTime) {//默认显示今天
        var nian = dataTime.getFullYear();
        var yue = dataTime.getMonth() + 1;
        var ri = dataTime.getDate();
        var shi = dataTime.getHours();
        var fen = dataTime.getMinutes();
        var miao = dataTime.getSeconds();
        if (yue < 10) yue = "0" + yue;
        if (ri < 10) ri = "0" + ri;
        if (miao < 10) miao = "0" + miao;
        if (fen < 10) fen = "0" + fen;
        if (shi < 10) shi = "0" + shi;
        return nian + "-" + yue + "-" + ri + " " + shi + ":" + fen + ":" + miao;
      },
      //获取入库列表
      getGatherList() {
        var params = new URLSearchParams();
        if (this.queryGather.dataTime) {
          params.append("showTime", this.getDataTime(this.queryGather.dataTime[0]))
          params.append("showTime2", this.getDataTime(this.queryGather.dataTime[1]))
        }
        Object.keys(this.queryGather).forEach((key) => {
          params.append(key, this.queryGather[key])
        });
        this.axios.post("/gath/page", params).then((resp) => {
          this.total = resp.data.total;
          this.gatherList = resp.data.list;
        }).catch(function (error) {
          return this.$message.error('获取角色列表失败！')
        })
      },

      // 监听 pagesize改变的事件
      handleSizeChange(newSize) {
        this.queryGather.pageSize = newSize
        this.getGatherList();
      },
      // 监听 页码值 改变事件
      handleCurrentChange(newSize) {
        this.queryGather.pageNo = newSize
        this.getGatherList();
      },
    },
    created() {
      this.getGatherList();
    },
    filters: {//过滤器
      newGatherTag(val) {
        if (val == 4)
          return "完成";
        else if (val == 3)
          return "等待";
        else
          return "执行";
      }
    }
  }
</script>

<style scoped>

</style>
