<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                :expand-row-keys='expendRow'
                :row-key="row => row.index"
                style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="食品名称">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item label="餐馆名称">
                                <span>{{ props.row.restaurant_name }}</span>
                            </el-form-item>
                            <el-form-item label="食品 ID">
                                <span>{{ props.row.id }}</span>
                            </el-form-item>
                            <el-form-item label="餐馆 ID">
                                <span>{{ props.row.restaurant_id }}</span>
                            </el-form-item>
                            <el-form-item label="食品介绍">
                                <span>{{ props.row.description }}</span>
                            </el-form-item>
                            <el-form-item label="餐馆地址">
                                <span>{{ props.row.restaurant_address }}</span>
                            </el-form-item>
                            <el-form-item label="食品评分">
                                <span>{{ props.row.rating }}</span>
                            </el-form-item>
                            <el-form-item label="食品分类">
                                <span>{{ props.row.type }}</span>
                            </el-form-item>
                            <el-form-item label="月销量">
                                <span>{{ props.row.month_sales }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    label="食品名称"
                    prop="name">
                </el-table-column>
                <el-table-column
                    label="食品介绍"
                    prop="description">
                </el-table-column>
                <el-table-column
                    label="评分"
                    prop="rating">
                </el-table-column>
                <el-table-column label="操作" width="160">
                    <template slot-scope="scope">
                        <el-button
                            size="small"
                            @click="handleEdit(scope.row)">编辑
                        </el-button>
                        <el-button
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="20"
                    layout="total, prev, pager, next"
                    :total="count">
                </el-pagination>
            </div>
            <el-dialog title="修改食品信息" v-model="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="食品名称" label-width="100px">
                        <el-input v-model="selectTable.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="食品介绍" label-width="100px">
                        <el-input v-model="selectTable.description"></el-input>
                    </el-form-item>
                    <el-form-item label="食品分类" label-width="100px">
                        <el-select v-model="selectIndex" :placeholder="selectMenu.label" @change="handleSelect">
                            <el-option
                                v-for="item in menuOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="食品图片" label-width="100px">
                        <el-upload
                            class="avatar-uploader"
                            :action="baseUrl + '/common/addImg/food'"
                            :show-file-list="false"
                            :on-success="handleServiceAvatarScucess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="selectTable.image_path" :src="baseImgPath + selectTable.image_path"
                                 class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <el-row style="overflow: auto; text-align: center;">
                    <el-table
                        :data="specs"
                        style="margin-bottom: 20px;"
                        :row-class-name="tableRowClassName">
                        <el-table-column
                            prop="name"
                            label="规格">
                        </el-table-column>
                        <el-table-column
                            prop="packingFee"
                            label="包装费">
                        </el-table-column>
                        <el-table-column
                            prop="price"
                            label="价格">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                    size="small"
                                    type="danger"
                                    @click="deleteSpecs(scope.$index)">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" @click="specsFormVisible = true" style="margin-bottom: 10px;">添加规格
                    </el-button>
                </el-row>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateFood">确 定</el-button>
                </div>
            </el-dialog>


            <el-dialog title="添加规格" v-model="specsFormVisible">
                <el-form :rules="specsFormrules" :model="specsForm">
                    <el-form-item label="规格" label-width="100px" prop="specs">
                        <el-input v-model="specsForm.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="包装费" label-width="100px">
                        <el-input-number v-model="specsForm.packingFee" :min="0" :max="100"></el-input-number>
                    </el-form-item>
                    <el-form-item label="价格" label-width="100px">
                        <el-input-number v-model="specsForm.price" :min="0" :max="10000"></el-input-number>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="specsFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addspecs">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {
        getFoods,
        getFoodsCount,
        getFoodTypeList,
        updateFood,
        deleteFood
    } from '@/api/getData'

    export default {
        data() {
            return {
                baseUrl,
                baseImgPath,
                restaurant_id: null,
                city: {},
                offset: 0,
                limit: 20,
                count: 0,
                tableData: [],
                currentPage: 1,
                selectTable: {},
                dialogFormVisible: false,
                menuOptions: [],
                selectMenu: {},
                selectIndex: null,
                specsForm: {
                    goodsId: null,
                    name: '',
                    packingFee: 0,
                    price: 20,
                },
                specsFormrules: {
                    name: [
                        {required: true, message: '请输入规格', trigger: 'blur'},
                    ],
                },
                specsFormVisible: false,
                expendRow: [],
            }
        },
        created() {
            this.restaurant_id = this.$route.query.restaurant_id;
            this.initData();
        },
        computed: {
            specs: function () {
                let specs = [];
                if (this.selectTable.specs) {
                    this.specsForm.goodsId = this.selectTable.specs[0].goodsId;
                    this.selectTable.specs.forEach(item => {
                        specs.push({
                            id: item.id,
                            goodsId: item.goodsId,
                            name: item.name,
                            packingFee: item.packingFee,
                            price: item.price,
                        })
                    })
                }
                return specs
            }
        },
        components: {
            headTop,
        },
        methods: {
            async initData() {
                try {
                    const countData = await getFoodsCount({restaurant_id: this.restaurant_id});
                    if (countData.status == 10000) {
                        this.count = countData.map.count;
                    } else {
                        throw new Error('获取数据失败');
                    }
                    this.getFoods();
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            async getFoods() {
                const Foods = await getFoods({
                    offset: this.offset,
                    limit: this.limit,
                    shopId: this.restaurant_id
                });
                this.tableData = [];
                Foods.forEach((item, index) => {
                    const tableData = {};
                    tableData.name = item.name;
                    tableData.id = item.id;
                    tableData.restaurant_id = item.shopId;
                    tableData.restaurant_name = item.shopName;
                    tableData.restaurant_address = item.shopAddress;
                    tableData.description = item.description;
                    tableData.rating = item.rating;
                    tableData.month_sales = item.sale;
                    tableData.type = item.type;
                    tableData.typeId = item.typeId;
                    tableData.image_path = item.image_path;
                    tableData.specs = item.specFoods;
                    tableData.index = index;
                    this.tableData.push(tableData);
                })
            },
            tableRowClassName(row, index) {
                if (index === 1) {
                    return 'info-row';
                } else if (index === 3) {
                    return 'positive-row';
                }
                return '';
            },
            addspecs() {
                this.specs.push({...this.specsForm});
                this.specsForm.name = '';
                this.specsForm.packingFee = 0;
                this.specsForm.price = 20;
                this.specsFormVisible = false;
            },
            deleteSpecs(index) {
                this.specs.splice(index, 1);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1) * this.limit;
                this.getFoods()
            },
            handleEdit(row) {
                this.dialogFormVisible = true;
                this.selectTable = row;
                this.selectMenu = {label: row.type, value: row.typeId};
                this.getType();
            },
            async getType() {
                this.menuOptions = [];
                try {
                    const menu = await getFoodTypeList();
                    menu.forEach((item, index) => {
                        this.menuOptions.push({
                            label: item.type,
                            value: item.id,
                            index,
                        })
                    })
                } catch (err) {
                    console.log('获取食品种类失败', err);
                }
            },
            handleSelect(index) {
                this.selectIndex = index;
                this.selectMenu = this.menuOptions[index];
            },
            async handleDelete(index, row) {
                try {
                    const res = await deleteFood(row.id);
                    if (res.status == 10000) {
                        this.$message({
                            type: 'success',
                            message: '删除食品成功'
                        });
                        this.tableData.splice(index, 1);
                    } else {
                        throw new Error(res.message)
                    }
                } catch (err) {
                    this.$message({
                        type: 'error',
                        message: err.message
                    });
                    console.log('删除食品失败')
                }
            },
            handleServiceAvatarScucess(res, file) {
                if (res.status == 10000) {
                    this.foodForm.image_path = res.info;
                } else {
                    this.$message.error('上传图片失败！');
                }
            },
            beforeAvatarUpload(file) {
                const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isRightType) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isRightType && isLt2M;
            },
            async updateFood() {
                this.dialogFormVisible = false;
                try {
                    const subData = {typeId: this.selectMenu.value, specFoods: this.specs};
                    const postData = {...this.selectTable, ...subData};
                    const res = await updateFood(postData);
                    if (res.status == 10000) {
                        this.$message({
                            type: 'success',
                            message: '更新食品信息成功'
                        });
                        this.getFoods();
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                } catch (err) {
                    console.log('更新餐馆信息失败', err);
                }
            },
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    .table_container {
        padding: 20px;
    }

    .Pagination {
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }

    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>

