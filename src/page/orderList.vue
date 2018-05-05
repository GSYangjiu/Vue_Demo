<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                @expand='expand'
                :expand-row-keys='expendRow'
                :row-key="row => row.index"
                style="width: 100%"
            >
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="用户名">
                                <span>{{ props.row.user_name }}</span>
                            </el-form-item>
                            <el-form-item label="店铺名称">
                                <span>{{ props.row.restaurant_name }}</span>
                            </el-form-item>
                            <el-form-item label="收货地址">
                                <span>{{ props.row.address }}</span>
                            </el-form-item>
                            <el-form-item label="店铺 ID">
                                <span>{{ props.row.shop_id }}</span>
                            </el-form-item>
                            <el-form-item label="店铺地址">
                                <span>{{ props.row.restaurant_address }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column property="id" label="订单 ID" width="180"></el-table-column>
                <el-table-column property="total_amount" label="总价格" width="220"></el-table-column>
                <el-table-column property="status" label="支付状态"></el-table-column>
                <el-table-column property="create_time" label="创建时间"></el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="20"
                    layout="total, prev, pager, next"
                    :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {dateFormat} from '@/utils/DateUtils'
    import {Enum} from '@/utils/Enum'
    import {getOrderList, getOrderCount, getResturantDetail, getUserInfo, getAddressById} from '@/api/getData'

    export default {
        name: "orderList",
        components: {
            headTop
        },
        data() {
            return {
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                shop_id: "",
                expendRow: [],
            }
        },
        created() {
            this.shop_id = this.$route.query.shop_id;
            this.initData();
        },
        methods: {
            async initData() {
                try {
                    const countData = await getOrderCount(this.shop_id);
                    if (countData.status == 10000) {
                        this.count = countData.map.count;
                    } else {
                        throw new Error('获取数据失败');
                    }
                    this.getOrders();
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1) * this.limit;
                this.getOrders()
            },
            async getOrders() {
                const Orders = await getOrderList({offset: this.offset, limit: this.limit, shop_id: this.shop_id});
                this.tableData = [];
                Orders.forEach((item, index) => {
                    const tableData = {};
                    tableData.id = item.id;
                    tableData.total_amount = item.price;
                    tableData.status = Enum.OrderStatus[item.status];
                    tableData.user_id = item.userId;
                    tableData.shop_id = item.shopId;
                    tableData.address_id = item.addressNum;
                    tableData.create_time = dateFormat(item.createTime);
                    tableData.index = index;
                    this.tableData.push(tableData);
                })
            },
            async expand(row, status) {
                if (status) {
                    const restaurant = await getResturantDetail(row.shop_id);
                    const userInfo = await getUserInfo(row.user_id);
                    const addressInfo = await getAddressById(row.address_id);

                    this.tableData.splice(row.index, 1, {
                        ...row, ...{
                            restaurant_name: restaurant.name,
                            restaurant_address: restaurant.address,
                            address: addressInfo.address,
                            user_name: userInfo.name
                        }
                    });
                    this.$nextTick(() => {
                        this.expendRow.push(row.index);
                    })
                } else {
                    const index = this.expendRow.indexOf(row.index);
                    this.expendRow.splice(index, 1)
                }
            },
        },
    }
</script>

<style lang="less" scoped>
    @import '../style/mixin';

    .table_container {
        padding: 20px;
    }

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
</style>
