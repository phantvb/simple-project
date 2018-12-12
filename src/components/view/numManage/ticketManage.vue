<template>
    <div id="ticketManage">
        <el-tabs v-model="active">
            <el-tab-pane label="自助直销" name="1"></el-tab-pane>
            <el-tab-pane label="渠道" name="2"></el-tab-pane>
            <div class="search">
                <ul>
                    <li>
                        <span class="demonstration">企业名称：</span>
                        <el-input v-model="form.name" placeholder="企业名称" size="mini">
                        </el-input>
                    </li>
                    <li>
                        <span class="demonstration">起止时间：</span>
                        <el-date-picker
                        style="margin-right:15px;"
                        v-model="form.date"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        size="mini">
                        </el-date-picker>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span class="demonstration">400号码：</span>
                        <el-input v-model="form.name" placeholder="请输入内容" size="mini">
                        </el-input>
                    </li>
                    <li>
                        <span class="demonstration">主叫号码：</span>
                        <el-input v-model="form.person" placeholder="请输入内容" size="mini">
                        </el-input>
                    </li>
                    <li>
                        <span class="demonstration">被叫号码：</span>
                        <el-input v-model="form.person" placeholder="请输入内容" size="mini">
                        </el-input>
                    </li>
                </ul>
                <div class="block left">
                    <div style="float:left;margin-right:15px;">
                        <span class="demonstration">通话时长：</span>
                        <el-input v-model="form.person" size="mini" style="max-width:100px;">
                        </el-input>
                        <span class="demonstration"> - </span>
                        <el-input v-model="form.person" size="mini" style="max-width:100px;">
                        </el-input>
                        <span class="demonstration"> 秒</span>
                    </div>
                    <el-button type="primary" size="mini" style="width:80px;">搜索</el-button>
                    <el-button type="primary" plain size="mini" style="width:80px;">重置</el-button>
                </div>
            </div>
            <section class="right block lineTop">
                <el-button type="primary" plain size="mini">导出</el-button>
            </section>
            <el-table
            :data="tableData"
            style="width: 100%;margin-bottom:15px;">
                <el-table-column
                    prop="type"
                    label="企业名称"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="400号码"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="number"
                    label="主叫号码"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="person"
                    label="被叫号码"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="时间"
                    label="套餐到期时间"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="通话时长（秒）"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="操作"
                    min-width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text">试听</el-button>
                        <el-button size="mini" type="text">详情</el-button>
                    </template>
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
    </div>
</template>
<style lang="scss" scoped>
@import './common.scss';
</style>
<script>
export default {
    name:'ticketManage',
    data(){
        return {
            active:'1',
            form:{
                name:'',
                person:'',
                number:'',
                date:null,
                status
            },
            status:'',
            options: [{
                value: '',
                label: '全部'
            }, {
                value: '选项2',
                label: '启用'
            }, {
                value: '选项3',
                label: '停用'
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
        handleSizeChange(){

        },
        handleCurrentChange(){

        },
    }
}
</script>

