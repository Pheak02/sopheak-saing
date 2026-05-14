/*==================================01 Data Transformation(groupAndAggregate(data))======================
Given an array of sales records, return an object grouped by region. Each key should map to an object
containing totalRevenue, avgOrderValue, and topProduct — the product name with the highest total
revenue in that region.*/

const data = [
    { region: 'Asia', product: 'Widget A', revenue: 4200, orders: 14 },
    { region: 'Asia', product: 'Widget B', revenue: 1800, orders: 6 },
    { region: 'Asia', product: 'Widget C', revenue: 3300, orders: 11 },
    { region: 'EU', product: 'Widget A', revenue: 3100, orders: 10 },
    { region: 'EU', product: 'Widget B', revenue: 5400, orders: 18 },
    { region: 'EU', product: 'Widget C', revenue: 920, orders: 4 },
]

/* ================================== Expected output ==================================
{
    Asia: { totalRevenue: 9300, avgOrderValue: 300.00, topProduct: 'Widget A'},
    EU: { totalRevenue: 9420, avgOrderValue: 294.38, topProduct: 'Widget C'},

    – avgOrderValue = totalRevenue / totalOrders, rounded to 2 decimal places.
    – Handle an empty array — return an empty object, do not throw.
    – Export the function using module.exports.
}
*/


// ================================== Coding Part ================================== 

//reduce() into a dictionary(object)
const groupedByRegion = Object.groupBy(data, ({region}) => region)

const agreeSum = Object.keys(groupedByRegion).map(region => ({
    region,
    totalRevenue: groupedByRegion[region].reduce((total, item) => total + item.revenue, 0),
    topProduct: groupedByRegion[region].reduce((top, item) => item.revenue > top.revenue ? item : top),
}))

console.log('agreeSum', agreeSum)

const totalRevenue = data.reduce((acc, cur) =>{
    acc[cur.product] = (acc[cur.revenue] || 0) + cur.re;
    return acc;
});