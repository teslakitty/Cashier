const video = document.getElementById('webcam');
const totalDisplay = document.getElementById('total');
const itemList = document.getElementById('item-list');

let total = 0;

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            video.srcObject = stream;

            Quagga.init({
                inputStream: {
                    name: "Live",
                    type: "LiveStream",
                    target: video,
                },
                decoder: {
                    readers: ["ean_reader"],
                },
            });

            Quagga.onDetected(function (result) {
                const barcode = result.codeResult.code;
                const itemName = getItemNameByBarcode(barcode);
                if (itemName) {
                    addItem(itemName, getItemPrice(itemName));
                }
            });

            Quagga.start();
        })
        .catch(function (error) {
            console.error("Error accessing the webcam:", error);
        });
} else {
    console.error("Webcam access not supported in this browser.");
}

function getItemNameByBarcode(barcode) {
    // Simulated product database
    const products = {
        '1234567890123': 'cat food',
        '9876543210987': 'dog food',
        // Add more products as needed
    };

    return products[barcode] || 'Unknown Product';
}

function getItemPrice(itemName) {
    // Simulated price lookup
    const prices = {
        'cat food': 2.99,
        'dog food': 1.99,
        // Add more prices as needed
    };

    return prices[itemName] || 0;
}

function addItem(itemName, itemPrice) {
    const li = document.createElement('li');
    li.innerText = `${itemName} - $${itemPrice.toFixed(2)}`;
    itemList.appendChild(li);
    total += itemPrice;
    totalDisplay.innerText = total.toFixed(2);
}
