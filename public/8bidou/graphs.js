const ctx = document.getElementById("myChart");

let dataList = [];
for (const date in listingsAndSales) {
    let dataItem = {};
    dataItem = listingsAndSales[date];
    dataItem["date"] = date;
    dataList.push(dataItem);
}
dataList.sort((a, b) => new Date(a.date) - new Date(b.date));

let labels = [];
let sales = [];
let listings = [];

let dateOptions = {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute:'2-digit'
};

for (let item of dataList) {
    labels.push(item.date);
    labels = labels.map((date) =>
        new Date(date).toLocaleTimeString('en-US', dateOptions)
    );
    sales.push(item.numSales);
    listings.push(item.numListings);
}
const myChart = new Chart(ctx, {
    type: "bar",
    data: {
        datasets: [
            {
                label: "Number of listings",
                data: listings,
                borderWidth: 1,
                backgroundColor: "lightblue",
            },
            {
                label: "Number of sales",
                data: sales,
                borderWidth: 1,
                backgroundColor: "lightgreen",
            },
        ],
        labels,
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: '8x8 listings vs sales'
            }
        }
    }
});
