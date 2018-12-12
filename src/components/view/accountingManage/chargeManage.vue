<template>
    <div id="chargeManage">
        <el-tabs v-model="active">
            <el-tab-pane label="自助直销" name="1"></el-tab-pane>
            <el-tab-pane label="渠道" name="2"></el-tab-pane>
            <div class="search">
                <ul>
                    <li>
                        <span class="demonstration">400号码：</span>
                        <el-input v-model="form.name" placeholder="请输入内容" size="mini" style="min-width:200px;">
                        </el-input>
                    </li>
                    <li>
                        <span class="demonstration">企业名称：</span>
                        <el-input v-model="form.person" placeholder="请输入内容" size="mini">
                        </el-input>
                    </li>
                </ul>
                <div class="block left">
                    <span class="demonstration">充值时间：</span>
                    <el-date-picker
                    style="margin-right:15px;"
                    v-model="form.date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    size="mini">
                    </el-date-picker>
                    <el-button type="primary" size="mini" style="width:80px;">搜索</el-button>
                    <el-button type="primary" plain size="mini" style="width:80px;">重置</el-button>
                </div>
            </div>
            <section class="right block lineTop">
                <el-button type="primary" style="float:left" size="mini" @click="showcharge(true)"><i class="el-icon-plus"></i> 新增充值</el-button>
                <el-button type="primary" plain size="mini">导出</el-button>
            </section>
            <el-table
            :data="tableData"
            style="width: 100%;margin-bottom:15px;">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="企业名称"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="400号码"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="number"
                    label="时长包"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="person"
                    label="数量"
                    min-width="80">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="充值金额"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="充值时间"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="操作员"
                    min-width="100">
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.num"
                :page-sizes="$global.pageSize"
                :page-size="page.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total">
            </el-pagination>
        </el-tabs>
        <charge :show="addcharge" @close="showcharge(false)"></charge>
    </div>
</template>
<style lang="scss" scoped>
@import './common.scss';
</style>
<script>
import charge from './component/charge.vue';
export default {
    name:'chargeManage',
    components:{
        charge
    },
    data(){
        return {
            active:'1',
            addcharge:false,
            form:{
                name:'',
                person:'',
                number:'',
                date:null,
                status
            },
            options: [{
                value: '',
                label: '全部'
            }, {
                value: '选项2',
                label: '等待送审'
            }, {
                value: '选项3',
                label: '待审核'
            }, {
                value: '选项4',
                label: '审核通过'
            }, {
                value: '选项5',
                label: '被驳回'
            }],
            tableData:[],
            page:{
                num:1,
                size:10,
                total:1
            }
        }
    },
    methods:{
        showcharge(bol){
            console.log(bol)
            this.addcharge=bol;
        },
        handleSizeChange(){

        },
        handleCurrentChange(){

        }
    }
}
</script>

