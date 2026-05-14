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
function groupAndAggregate(data) {

    if (!data.length) {
        return {}
    }

    const groupedByRegion = Object.groupBy(data, ({ region }) => region)

    return Object.keys(groupedByRegion).reduce((result, region) => {

        const items = groupedByRegion[region]

        const totalRevenue = items.reduce(
            (total, item) => total + item.revenue,
            0
        )

        const totalOrders = items.reduce(
            (total, item) => total + item.orders,
            0
        )

        const avgOrderValue = Number(
            (totalRevenue / totalOrders).toFixed(2)
        )

        const topProduct = items.reduce((top, item) => {
            return item.revenue > top.revenue ? item : top
        }).product

        result[region] = {
            totalRevenue,
            avgOrderValue,
            topProduct
        }

        return result

    }, {})
}
console.log(groupAndAggregate(data))
module.exports = groupAndAggregate