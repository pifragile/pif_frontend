let baseUrl = "https://api.tzkt.io/v1";
let dateFormat = "%Y-%m-%dT%H:%M:%S%z";

function joinUrl() {
    return [...arguments].join("/");
}

function getUrl() {
    return joinUrl(baseUrl, ...arguments);
}

function httpGet(url, params) {
    params = new URLSearchParams(params).toString();
    var xmlHttp = new XMLHttpRequest();
    let fullUrl = url + "?" + params;
    xmlHttp.open("GET", fullUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText);
}

function dateString(date) {
    return date.toISOString().split(".")[0] + "Z";
}

function fromDateString(s) {
    return new Date(s.split("Z")[0] + ".000Z");
}

function flatHours(date) {
    date.setHours(date.getHours(), 0, 0);
    return date;
}

function getSwapsAndSalesLastXHours(x, contractAddress) {
    let params = {
        type: "transaction",
        "entrypoint.in": "swap,buy",
        limit: "1000",
    };
    let minDate = new Date();
    minDate.setHours(minDate.getHours() - x - 1, 0, 0);
    let maxDate = new Date();
    maxDate.setHours(maxDate.getHours() + 1);

    let url = getUrl(
        "accounts",
        contractAddress,
        "operations"
    );

    let fullData = [];
    while (true) {
        params["timestamp.gt"] = dateString(minDate);
        params["timestamp.le"] = dateString(maxDate);

        data = httpGet(url, params);
        if (data.length === 0) break;
        params["lastId"] = data[data.length - 1]["id"];
        fullData = fullData.concat(data);
    }
    return fullData;
}

function getAggregateSwapsAndSalesLastXHours(x, contractUrl) {
    data = getSwapsAndSalesLastXHours(x, contractUrl);
    let currentDate = flatHours(fromDateString(data[0]["timestamp"]));

    let aggregateData = {};
    // init data with 0s
    let now = flatHours(new Date(Date.now()));
    for (let i = 0; i < x + 1; i++) {
        let d = new Date(now.getTime());
        d.setHours(d.getHours() - i);
        aggregateData[dateString(d)] = {numSales: 0, numSwaps: 0};

    }
    let numSales = 0
    let numSwaps = 0;
    for (let tx of data) {
        let date = flatHours(fromDateString(tx["timestamp"]));
        if (date < currentDate) {
            aggregateData[dateString(currentDate)] = {numSales, numSwaps};
            currentDate = flatHours(date);
            numSales = 0;
            numSwaps = 0;
        }

        let amount = parseInt(tx["parameter"]["value"]["nft_amount"]);
        let entrypoint = tx["parameter"]["entrypoint"];

        switch (entrypoint) {
            case "buy":
                numSales += amount;
                break;
            case "swap":
                numSwaps += amount;
                break;
            default:
        }
    }
    aggregateData[dateString(currentDate)] = {numSales, numSwaps};

    return aggregateData;
}


let swapsAndSales8x8 = getAggregateSwapsAndSalesLastXHours(12, 'KT1BvWGFENd4CXW5F3u4n31xKfJhmBGipoqF');
let swapsAndSales24x24 = getAggregateSwapsAndSalesLastXHours(12, 'KT1AHBvSo828QwscsjDjeUuep7MgApi8hXqA');
// listingsAndSales = {
//   "2022-04-07T14:00:00Z": {
//       "numSales": 14,
//       "numSwaps": 8
//   },
//   "2022-04-07T13:00:00Z": {
//       "numSales": 24,
//       "numSwaps": 2388
//   },
//   "2022-04-07T12:00:00Z": {
//       "numSales": 40,
//       "numSwaps": 232
//   },
//   "2022-04-07T11:00:00Z": {
//       "numSales": 33,
//       "numSwaps": 70
//   },
//   "2022-04-07T10:00:00Z": {
//       "numSales": 64,
//       "numSwaps": 189
//   },
//   "2022-04-07T09:00:00Z": {
//       "numSales": 19,
//       "numSwaps": 1089
//   },
//   "2022-04-07T08:00:00Z": {
//       "numSales": 23,
//       "numSwaps": 67
//   },
//   "2022-04-07T07:00:00Z": {
//       "numSales": 34,
//       "numSwaps": 88
//   },
//   "2022-04-07T06:00:00Z": {
//       "numSales": 15,
//       "numSwaps": 64
//   },
//   "2022-04-07T05:00:00Z": {
//       "numSales": 8,
//       "numSwaps": 96
//   },
//   "2022-04-07T04:00:00Z": {
//       "numSales": 15,
//       "numSwaps": 82
//   },
//   "2022-04-07T03:00:00Z": {
//       "numSales": 17,
//       "numSwaps": 49
//   },
//   "2022-04-07T02:00:00Z": {
//       "numSales": 22,
//       "numSwaps": 49
//   },
//   "2022-04-07T01:00:00Z": {
//       "numSales": 21,
//       "numSwaps": 246
//   }
// }
