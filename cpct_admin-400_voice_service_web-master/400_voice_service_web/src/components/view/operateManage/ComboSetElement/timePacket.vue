<template>
    <div>
        <div>
            <el-button type="primary" style="float: left;" @click="showAddTimePacket"><i
                class="el-icon-plus">&nbsp;新增时长包方案</i>
            </el-button>
        </div>
        <div style="clear: both;"></div>
        <div style="margin-top: 15px;">
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="自助直销" name="7">
                    <div>
                        <el-row>
                            <el-col :span="4" v-for="(o, index) in dTotalCount1" :key="o" :offset="1"
                                    style="margin-top: 10px;">
                                <el-card :body-style="{ padding: '0px'}" shadow="hover">
                                    <div class="add-title">{{dTableData1[index].timePacketName}}</div>
                                    <div class="add-body">
                                        <el-form label-width="100px">
                                            <el-form-item label="充值额度：" class="add-item">
                                                {{dTableData1[index].rechargeLimit}}元
                                            </el-form-item>
                                            <el-form-item label="拨打时长：" class="add-item">
                                                {{dTableData1[index].dialingTime}}分钟
                                            </el-form-item>
                                            <div style="border-top: 1px solid #f5f5f5;">
                                                <div style="float: right;">
                                                    <el-button type="text" class="button"
                                                               @click="updateTimePacket(0,index)">编辑
                                                    </el-button>
                                                    <el-button type="text" class="button"
                                                               @click="deleteInfo(dTableData1[index].id,'delTimePacket')">
                                                        删除
                                                    </el-button>
                                                </div>
                                            </div>
                                        </el-form>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="渠道" name="8">
                    <div>
                        <el-row>
                            <el-col :span="4" v-for="(o, index) in dTotalCount2" :key="o" :offset="1"
                                    style="margin-top: 10px;">
                                <el-card :body-style="{ padding: '0px'}" shadow="hover">
                                    <div class="add-title">{{dTableData2[index].timePacketName}}</div>
                                    <div class="add-body">
                                        <el-form label-width="100px">
                                            <el-form-item label="充值额度：" class="add-item">
                                                {{dTableData2[index].rechargeLimit}}元
                                            </el-form-item>
                                            <el-form-item label="拨打时长：" class="add-item">
                                                {{dTableData2[index].dialingTime}}分钟
                                            </el-form-item>
                                            <div style="border-top: 1px solid #f5f5f5;">
                                                <div style="float: right;">
                                                    <el-button type="text" class="button"
                                                               @click="updateTimePacket(1,index)">编辑
                                                    </el-button>
                                                    <el-button type="text" class="button"
                                                               @click="deleteInfo(dTableData2[index].id,'delTimePacket')">
                                                        删除
                                                    </el-button>
                                                </div>
                                            </div>
                                        </el-form>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>

        <div class="addTimePacketDialog">
            <el-dialog
                title="新增/编辑时长包方案"
                :visible.sync="addTimePacketFormDialogVisible"
                width="30%"
                :before-close="handleClose">
                <div>
                    <el-form ref="addDiscountForm" :model="addTimePacketForm" label-width="100px">

                        <el-form-item label="时长包名：">
                            <el-input v-model="addTimePacketForm.timePacketName" size="mini"
                                      class="el-input"></el-input>
                            <span class="span">元</span>
                        </el-form-item>

                        <el-form-item label="充值额度：">
                            <el-input v-model="addTimePacketForm.rechargeLimit" size="mini" class="el-input"></el-input>
                            <span class="span">元</span>
                        </el-form-item>

                        <el-form-item label="拨打时长：">
                            <el-input v-model="addTimePacketForm.dialingTime" size="mini" class="el-input"></el-input>
                            <span class="span">分钟</span>
                        </el-form-item>

                        <el-form-item label="渠道：">
                            <el-checkbox-group v-model="addTimePacketForm.checkList">
                                <el-checkbox label="自助直销" class="el-checkbox"
                                             :disabled="this.disabledSelf"></el-checkbox>
                                <el-checkbox label="渠道" :disabled="this.disabledChannel"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>

                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
          <el-button @click="addTimePacketFormDialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="addTimePacket" size="mini"
                     :style="'display:'+submitData+';'">确 定</el-button>
          <el-button type="primary" @click="handleUpdateTimePacket" size="mini"
                     :style="'display:'+updateData+';'">编 辑</el-button>
      </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                addTimePacketFormDialogVisible: false,
                activeNames: ['7', '8'],
                buttonShow1: 'inline-block',
                buttonShow2: 'inline-block',
                addTimePacketForm: {
                    timePacketName: '',
                    rechargeLimit: '',
                    dialingTime: '',
                    checkList: ['自助直销', '渠道'],
                    id: ''
                },
                dTotalCount1: '',
                dTotalCount2: '',
                dTableData1: [],
                dTableData2: [],

                tableData: [],

                updateData: 'none',// 编辑和新增公用一个弹窗控制按钮显示
                submitData: 'inline-block',

                disabledSelf: false,
                disabledChannel: false
            }
        },
        methods: {
            showAddTimePacket() {
                this.addTimePacketFormDialogVisible = true;

                this.addTimePacketForm.timePacketName = '';
                this.addTimePacketForm.rechargeLimit = '';
                this.addTimePacketForm.dialingTime = '';
                this.addTimePacketForm.id = '';

                this.updateData = 'none';
                this.submitData = 'inline-block';

                this.disabledSelf = false;
                this.disabledChannel = false;
            },
            // 新增时长包
            addTimePacket() {
                let str = '';
                if (this.addTimePacketForm.checkList.length == 2) {
                    str = "self+channel";
                }
                if (this.addTimePacketForm.checkList.length == 1 && this.addTimePacketForm.checkList[0] == "自助直销") {
                    str = "self";
                }
                if (this.addTimePacketForm.checkList.length == 1 && this.addTimePacketForm.checkList[0] == "渠道") {
                    str = "channel";
                }
                this.$ajax.post('/vos/tariffPackage/addTimePacket', {
                    "timePacket": {
                        "timePacketName": this.addTimePacketForm.timePacketName,
                        "rechargeLimit": this.addTimePacketForm.rechargeLimit,
                        "dialingTime": this.addTimePacketForm.dialingTime,
                        "channel": str
                    }
                }).then((res) => {
                    if (res.code == 200) {
                        this.$message({
                            message: '新增成功!',
                            type: 'success'
                        });
                        this.loadData();
                    }
                    if (res.code == 60000) {
                        this.$message({
                            message: '数据已存在!',
                            type: 'warning'
                        });
                    }
                });
                this.addTimePacketFormDialogVisible = false;
            },

            updateTimePacket(num, index) {
                this.tableData = [this.dTableData1, this.dTableData2];

                this.addTimePacketFormDialogVisible = true;

                this.addTimePacketForm.timePacketName = '';
                this.addTimePacketForm.rechargeLimit = '';
                this.addTimePacketForm.dialingTime = '';
                this.addTimePacketForm.id = '';

                this.updateData = 'inline-block';
                this.submitData = 'none';

                this.disabledSelf = true;
                this.disabledChannel = true;

                let channel = '';
                if (this.tableData[num][index].channel == 'self') {
                    channel = ['自助直销'];
                }
                if (this.tableData[num][index].channel == 'channel') {
                    channel = ['渠道'];
                }
                if (this.tableData[num][index].channel == 'self+channel') {
                    channel = ['自助直销', '渠道']
                }

                this.addTimePacketForm.timePacketName = this.tableData[num][index].timePacketName;
                this.addTimePacketForm.rechargeLimit = this.tableData[num][index].rechargeLimit;
                this.addTimePacketForm.dialingTime = this.tableData[num][index].dialingTime;
                this.addTimePacketForm.checkList = channel;
                this.addTimePacketForm.id = this.tableData[num][index].id;
            },

            handleUpdateTimePacket() {
                let str = '';
                if (this.addTimePacketForm.checkList.length == 2) {
                    str = "self+channel";
                }
                if (this.addTimePacketForm.checkList.length == 1 && this.addTimePacketForm.checkList[0] == "自助直销") {
                    str = "self";
                }
                if (this.addTimePacketForm.checkList.length == 1 && this.addTimePacketForm.checkList[0] == "渠道") {
                    str = "channel";
                }
                this.$ajax.post('/vos/tariffPackage/updateTimePacket', {
                    "timePacket": {
                        "id": this.addTimePacketForm.id,
                        "timePacketName": this.addTimePacketForm.timePacketName,
                        "rechargeLimit": this.addTimePacketForm.rechargeLimit,
                        "dialingTime": this.addTimePacketForm.dialingTime,
                        "channel": str
                    }
                }).then((res) => {
                    if (res.code == 200) {
                        this.$message({
                            message: '编辑成功!',
                            type: 'success'
                        });
                        this.loadData();
                    }
                });
                this.addTimePacketFormDialogVisible = false;
            },

            //删除信息
            deleteInfo(id, url) {
                this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.$ajax.post('/vos/tariffPackage/' + url, {
                        "id": id
                    }).then((res) => {
                        if (res.code == 200) {
                            this.$message({
                                message: '删除成功!',
                                type: 'success'
                            });
                            this.loadData();
                        }
                    });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除!'
                    });
                });
            },

            //关闭确认
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },

            handleChange() {

            },

            loadData() {
                this.$ajax.post('/vos/tariffPackage/getTimePacket', {
                    "timePacket": {
                        "channel": "self"
                    }
                }).then((res) => {
                    if (res.code == 200) {
                        this.dTotalCount1 = res.data.timePacketList.length;
                        this.dTableData1 = res.data.timePacketList;
                    }
                });
                this.$ajax.post('/vos/tariffPackage/getTimePacket', {
                    "timePacket": {
                        "channel": "channel"
                    }
                }).then((res) => {
                    if (res.code == 200) {
                        this.dTotalCount2 = res.data.timePacketList.length;
                        this.dTableData2 = res.data.timePacketList;
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
    @import "../ComboSet.scss";
</style>
