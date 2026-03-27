exports.generateInvoiceHTML = (order) => {

    const itemsHTML = order.items.map(item => `
        <tr>
            <td>${item.product}</td>
            <td>${item.quantity}</td>
            <td>₹${item.price}</td>
            <td>₹${item.price * item.quantity}</td>
        </tr>
    `).join('');

    return `
    <html>
    <head>
        <title>Invoice</title>
        <style>
            body { font-family: Arial; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            table, th, td { border: 1px solid #000; }
            th, td { padding: 10px; text-align: left; }
            h1 { text-align: center; }
        </style>
    </head>
    <body>

        <h1>Invoice</h1>

        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>

        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                ${itemsHTML}
            </tbody>
        </table>

        <h3>Total MRP: ₹${order.totalAmount}</h3>
        <h3>Discount: ₹${order.discountAmount}</h3>
        <h2>Final Amount: ₹${order.finalAmount}</h2>

    </body>
    </html>
    `;
};