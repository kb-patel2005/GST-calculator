function addRow() {
    const tableBody = document.getElementById("invoiceBody");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td data-label="Item"><input type="text" placeholder="Item name"></td>
        <td data-label="Qty"><input type="number" value="1"></td>
        <td data-label="Price"><input type="number" value="0"></td>
        <td data-label="GST %"><input type="number" value="18"></td>
        <td data-label="Action"><button onclick="removeRow(this)">❌</button></td>
      `;
    tableBody.appendChild(row);
}

function removeRow(button) {
    button.parentElement.parentElement.remove();
}

function calculateInvoice() {
    const rows = document.querySelectorAll("#invoiceBody tr");
    let totalBase = 0, totalGST = 0, grandTotal = 0;
    let details = "";

    rows.forEach(row => {
        const qty = parseFloat(row.cells[1].querySelector("input").value) || 0;
        const price = parseFloat(row.cells[2].querySelector("input").value) || 0;
        const gstRate = parseFloat(row.cells[3].querySelector("input").value) || 0;

        const baseAmount = qty * price;
        const gstAmount = (baseAmount * gstRate) / 100;
        const totalAmount = baseAmount + gstAmount;

        totalBase += baseAmount;
        totalGST += gstAmount;
        grandTotal += totalAmount;

        details += `<strong class="blue">${row.cells[0].querySelector("input").value || "Item"}:</strong> 
          <b>Base ₹${baseAmount.toFixed(2)} | GST ₹${gstAmount.toFixed(2)} | Total ₹${totalAmount.toFixed(2)}</b><br>`;
    });

    document.getElementById("result").innerHTML = `
        ${details}<hr>
        <strong class="blue">Total Base:</strong> <b>₹${totalBase.toFixed(2)}</b> <br>
        <strong class="blue">Total GST:</strong> <b>₹${totalGST.toFixed(2)}</b> <br>
        <strong class="blue">Grand Total:</strong> <b> ₹${grandTotal.toFixed(2)} </b>
      `;
}