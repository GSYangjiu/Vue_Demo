<template>
    <div class="fillcontain">
        <head-top></head-top>

        <div class="table_container">
            <el-table :data="tableData" highlight-current-row style="width: 100%">
                <el-table-column type="index" width="100"></el-table-column>
                <el-table-column property="registe_time" label="注册时间" width="220"></el-table-column>
                <el-table-column property="username" label="用户姓名" width="220"></el-table-column>
                <el-table-column property="city" label="注册地址"></el-table-column>
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
    import {getUserList, getUserCount} from '@/api/getData'
    import {dateFormat} from '@/utils/DateUtils'

    export default {
        name: "userList",
        components: {
            headTop
        },
        data() {
            return {
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 10,
                count: 0,
                currentPage: 1,
            }
        },
        created() {
            this.initData();
        },
        methods: {
            async initData() {
                try {
                    const countData = await getUserCount();
                    if (countData.status == 10000) {
                        this.count = countData.map.count;
                    } else {
                        throw new Error('获取数据失败');
                    }
                    this.getUsers();
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
                this.getUsers()
            },
            async getUsers() {
                const Users = await getUserList({page: this.offset, size: this.limit});
                this.tableData = [];
                Users.forEach(item => {
                    const tableData = {};
                    tableData.username = item.name;
                    tableData.registe_time = dateFormat(item.createTime);
                    tableData.city = item.city;
                    this.tableData.push(tableData);
                })
            }
        },
    }
</script>

<style scoped lang="less">
    @import '../style/mixin';

    .table_container {
        padding: 20px;
    }
</style>
