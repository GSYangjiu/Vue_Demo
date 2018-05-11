import fetch from '@/config/fetch'

/**
 * 登陆
 */

export const login = data => fetch('/admin/login', data, 'POST');

/**
 * 退出
 */

export const signout = () => fetch('/admin/singout');

/**
 * 获取用户信息
 */

export const getAdminInfo = () => fetch('/admin/info');

/**
 * api请求量
 */

export const apiCount = date => fetch('/statis/api/' + date + '/count');

/**
 * 所有api请求量
 */

export const apiAllCount = () => fetch('/statis/api/count');


/**
 * 所有api请求信息
 */

export const apiAllRecord = () => fetch('/statis/api/all');

/**
 * 管理员列表
 */

export const adminList = data => fetch('/admin/list', data);

/**
 * 管理员数量
 */

export const adminCount = data => fetch('/admin/count', {
    date: data || ""
});

/**
 * 获取定位城市
 */

export const cityGuess = () => fetch('/common/cities', {
    type: 'guess'
});

/**
 * 添加商铺
 */

export const addShop = data => fetch('/shop/addShop', data, 'POST');

/**
 * 获取搜索地址
 */

export const searchplace = (cityid, value) => fetch('/v1/pois', {
    type: 'search',
    city_id: cityid,
    keyword: value
});

/**
 * 获取当前店铺食品种类
 */

export const getCategory = restaurant_id => fetch('/shopping/getcategory/' + restaurant_id);

/**
 * 添加食品种类
 */

export const addCategory = data => fetch('/shopping/addcategory', data, 'POST');


/**
 * 添加食品
 */

export const addFood = data => fetch('/shopping/addfood', data, 'POST');


/**
 * category 种类列表
 */

export const foodCategory = () => fetch('/shop/category');

/**
 * 获取餐馆列表
 */

export const getResturants = data => fetch('/shop/list', data);

/**
 * 获取餐馆详情
 */
export const getResturantDetail = restaurant_id => fetch('/shop/' + restaurant_id);

/**
 * 获取餐馆数量
 */

export const getResturantsCount = () => fetch('/shop/count');

/**
 * 更新餐馆信息
 */

export const updateResturant = data => fetch('/shop/updateShop', data, 'PUT');

/**
 * 删除餐馆
 */

export const deleteResturant = restaurant_id => fetch('/shop/' + restaurant_id, {}, 'DELETE');

/**
 * 获取食品列表
 */

export const getFoods = data => fetch('/goods/list', data);

/**
 * 获取食品数量
 */

export const getFoodsCount = data => fetch('/goods/count', data);

/**
 * 获取食品分类列表
 */
export const getFoodTypeList = () => fetch('/goods/typeList');


/**
 * 更新食品信息
 */

export const updateFood = data => fetch('/goods/updateFood', data, 'PUT');

/**
 * 删除食品
 */

export const deleteFood = food_id => fetch('/goods/' + food_id, {}, 'DELETE');

/**
 * 获取用户列表
 */

export const getUserList = data => fetch('/user/list', data);

/**
 * 获取用户数量
 */

export const getUserCount = data => fetch('/user/count', {
    date: data || ""
});

/**
 * 获取订单列表
 */

export const getOrderList = data => fetch('/orders/list', data);

/**
 * 获取订单数量
 */

export const getOrderCount = data => fetch('/orders/count', {
    date: data || ""
});

/**
 * 获取用户信息
 */

export const getUserInfo = user_id => fetch('/user/' + user_id);

/**
 * 获取地址信息
 */

export const getAddressById = address_id => fetch('/user/address/' + address_id);

/**
 * 获取用户分布信息
 */

export const getUserCity = () => fetch('/v1/user/city/count');
