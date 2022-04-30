function createSwapsVsSalesChart(data, chartType) {
    const ctx = document.getElementById(`chart${chartType}`);
    let dataList = [];
    for (const date in data) {
        let dataItem = {};
        dataItem = data[date];
        dataItem["date"] = date;
        dataList.push(dataItem);
    }
    dataList.sort((a, b) => new Date(a.date) - new Date(b.date));

    let labels = [];
    let sales = [];
    let swaps = [];

    let dateOptions = {
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: '2-digit'
    };

    for (let item of dataList) {
        labels.push(item.date);
        labels = labels.map((date) =>
            new Date(date).toLocaleTimeString('en-US', dateOptions)
        );
        sales.push(item.numSales);
        swaps.push(item.numSwaps);
    }
    const chart = new Chart(ctx, {
        type: "bar",
        data: {
            datasets: [
                {
                    label: "Number of swaps",
                    data: swaps,
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
                    text: `${chartType} swaps vs sales`
                }
            }
        }
    });
}

createSwapsVsSalesChart(swapsAndSales8x8, '8x8')
createSwapsVsSalesChart(swapsAndSales24x24, '24x24')