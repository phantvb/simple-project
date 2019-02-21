<template>
    <div id="auditNum" v-loading="loading">
        <div class="search">
            <el-form ref="auditNumForm" :model="auditNumForm" style="padding:9px 9px;">
                <el-form-item style="float: left;margin-left: 10px;">
                    <span class="demonstration">400号码：</span>
                    <el-input v-model="auditNumForm.number" placeholder="请输入内容" size="mini" style="width:300px;">
                    </el-input>
                    <span class="demonstration">引示号码：</span>
                    <el-input v-model="auditNumForm.citationNumber" placeholder="请输入内容" size="mini"
                              style="width:300px;">
                    </el-input>
                    <span class="demonstration">企业名称：</span>
                    <el-input v-model="auditNumForm.companyName" placeholder="请输入内容" size="mini" style="width:300px;">
                    </el-input>
                </el-form-item>

                <el-form-item label="受理渠道：" style="clear: both;margin-left: 15px;">
                    <el-checkbox-group v-model="auditNumForm.checkList" style=" float: left;margin-left: 15px">
                        <el-checkbox label="自助直销"></el-checkbox>
                        <el-checkbox label="渠道"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item style="margin-left: 15px;">
                    <el-button type="primary" size="mini" class="searchButton" @click="search">搜索</el-button>
                    <el-button type="primary" plain size="mini" class="resetButton" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="buttonDiv">
            <!--<a href="http://192.168.0.117:5480/vos/excel/number400" target="_blank" id="export"></a>-->
            <el-button type="primary" plain size="mini" @click="exportInfo" style="float: right;">导出</el-button>
        </div>

        <div>
            <el-table
                :data="tableData"
                style="width: 100%;margin-bottom:15px;">
                <el-table-column
                    type="selection"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="number400"
                    label="400号码"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="guideNumber"
                    label="引示号码"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="companyName"
                    label="企业名称"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="channel"
                    label="受理渠道"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    min-width="100">
                </el-table-column>
            </el-table>
            <div style="margin-top: 10px">
                <el-pagination
                    style="float:right;"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page.currentPage"
                    :page-sizes="$global.pageSize"
                    :page-size="page.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.total">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                auditNumForm: {
                    number: '',
                    citationNumber: '',
                    companyName: '',
                    checkList: []
                },
                tableData: [],
                page: {
                    currentPage: 1,
                    size: 10,
                    total: 1
                },
                status: '',
                loading:false
            }
        },

        methods: {
            // 修改页面显示数据大小
            handleSizeChange(val) {
                this.page.size = val;
                if(this.auditNumForm.number!=''||
                this.auditNumForm.citationNumber!=''||
                this.auditNumForm.companyName!=''||
                this.auditNumForm.checkList.length!=0){
                    this.search();
                }else{
                    this.loadData();
                }
            },

            // 修改当前显示页面
            handleCurrentChange(val) {
                this.page.currentPage = val;
                if(this.auditNumForm.number!=''||
                this.auditNumForm.citationNumber!=''||
                this.auditNumForm.companyName!=''||
                this.auditNumForm.checkList.length!=0){
                    this.search();
                }else{
                    this.loadData();
                }
            },

            search() {
                let str = '';
                if (this.auditNumForm.checkList.length == 2) {
                    str = "self+channel";
                }
                if (this.auditNumForm.checkList.length == 1 && this.auditNumForm.checkList[0] == "自助直销") {
                    str = "self";
                }
                if (this.auditNumForm.checkList.length == 1 && this.auditNumForm.checkList[0] == "渠道") {
                    str = "channel";
                }
                this.$ajax.post('/vos/number400/search', {
                    "page": {
                        "pageNo": '1',
                        "pageSize": this.page.size
                    },
                    "number400": {
                        "number400": this.auditNumForm.number,
                        "channel": str,
                        "status": this.status,
                        "companyName": this.auditNumForm.companyName,
                        "guideNumber": this.auditNumForm.citationNumber
                    }
                }).then((res) => {
                    if (res.code == 200) {
                        this.tableData = res.data.number400s;
                        this.page.total = res.data.totalCount;
                        for (let i = 0; i < this.tableData.length; i++) {
                            if (this.tableData[i].channel == 'self') {
                                this.tableData[i].channel = '自助直销';
                            }
                            if (this.tableData[i].channel == 'channel') {
                                this.tableData[i].channel = '渠道';
                            }
                            if (this.tableData[i].channel == 'self,channel') {
                                this.tableData[i].channel = '自助直销,渠道';
                            }

                            if (this.tableData[i].status == 'Auditing') {
                                this.tableData[i].status = '审核中';
                            }
                            if (this.tableData[i].status == 'Used') {
                                this.tableData[i].status = '使用中';
                            }
                        }
                    }
                });
            },

            reset() {
                this.auditNumForm.number = '';
                this.auditNumForm.citationNumber = '';
                this.auditNumForm.companyName = '';
                this.auditNumForm.checkList = [];
            },


            exportInfo() {
                this.$emit('exportNumber400');
            },

            loadData(status) {
                this.loading=true;
                this.reset();
                this.status = status;
                this.$ajax.post('/vos/number400/getAll', {
                    "page": {
                        "pageNo": this.page.currentPage,
                        "pageSize": this.page.size
                    },
                    "number400": {
                        "number400": "",
                        "channel": "",
                        "status": status,
                        "companyName": "",
                        "guideNumber": ""
                    }
                }).then((res) => {
                    if (res.code == 200) {
                        this.tableData = res.data.number400s;
                        this.page.total = res.data.totalCount;

                        for (let i = 0; i < this.tableData.length; i++) {
                            if (this.tableData[i].channel == 'self') {
                                this.tableData[i].channel = '自助直销';
                            }
                            if (this.tableData[i].channel == 'channel') {
                                this.tableData[i].channel = '渠道';
                            }
                            if (this.tableData[i].channel == 'self,channel') {
                                this.tableData[i].channel = '自助直销,渠道';
                            }

                            if (this.tableData[i].status == 'Used') {
                                this.tableData[i].status = '使用中';
                            }
                            if (this.tableData[i].status == 'Auditing') {
                                this.tableData[i].status = '审核中';
                            }
                        }
                        this.loading=false;
                    }
                });
            }
        },
        created() {
            this.loadData();
        }
    }
</script>

<style lang="scss" scoped>
    @import "auditAndUsedNum";
</style>
