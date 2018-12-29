<template>
    <div id="usingNum">
        <div class="search">
            <el-form ref="usingNumForm" :model="usingNumForm">
                <el-form-item style="float: left;margin-left: 10px;">
                    <el-input v-model="usingNumForm.number" placeholder="请输入内容" size="mini" style="width:300px;">
                        <template slot="prepend" style="width:80px;">400号码：</template>
                    </el-input>
                    <el-input v-model="usingNumForm.citationNumber" placeholder="请输入内容" size="mini"
                              style="width:300px;">
                        <template slot="prepend" style="width:80px;">引示号码：</template>
                    </el-input>
                    <el-input v-model="usingNumForm.company" placeholder="请输入内容" size="mini" style="width:300px;">
                        <template slot="prepend" style="width:80px;">企业名称：</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="受理渠道：" style="clear: both;margin-left: 15px;">
                    <el-checkbox-group v-model="usingNumForm.checkList" style=" float: left;margin-left: 15px">
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

        <div style="border-top: 1px solid #eee;margin-top: 15px;padding-top: 15px;">
            <div style="float: right;">
                <el-button type="primary" plain size="mini" @click="exportInfo">导出</el-button>
            </div>
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
                usingNumForm: {
                    number: '',
                    citationNumber: '',
                    company: '',
                    checkList: []
                },
                tableData: [],
                page: {
                    currentPage: 1,
                    size: 10,
                    total: 1
                }
            }
        },
        methods: {
            // 修改页面显示数据大小
            handleSizeChange(val) {
                this.page.size = val;
                this.loadData();
            },

            // 修改当前显示页面
            handleCurrentChange(val) {
                this.page.currentPage = val;
                this.loadData();
            },

            search() {
                let str = '';
                if (this.usingNumForm.checkList.length == 2) {
                    str = "self+channel";
                }
                if (this.usingNumForm.checkList.length == 1 && this.usingNumForm.checkList[0] == "自助直销") {
                    str = "self";
                }
                if (this.usingNumForm.checkList.length == 1 && this.usingNumForm.checkList[0] == "渠道") {
                    str = "channel";
                }
                this.$ajax.post('/vos/number400/search', {
                    "page": {
                        "pageNo": this.page.currentPage,
                        "pageSize": this.page.size
                    },
                    "number400": {
                        "number400": this.usingNumForm.number,
                        "channel": str,
                        "status": "Used",
                        "companyName": this.usingNumForm.company,
                        "guideNumber": this.usingNumForm.citationNumber
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
                        }
                    }
                });
            },
            reset() {
                this.usingNumForm.number = '';
                this.usingNumForm.citationNumber = '';
                this.usingNumForm.company = '';
                this.usingNumForm.checkList = [];
            },
            exportInfo() {

            },

            loadData() {
                this.$ajax.post('/vos/number400/getAll', {
                    "page": {
                        "pageNo": this.page.currentPage,
                        "pageSize": this.page.size
                    },
                    "number400": {
                        "number400": "",
                        "channel": "",
                        "status": "Used",
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

                            if (this.tableData[i].status == 'Used') {
                                this.tableData[i].status = '使用中';
                            }
                        }
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
    @import "./usingNum";
</style>
