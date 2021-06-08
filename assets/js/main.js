// Get today date
let todayDate = new Date().toDateString();
document.getElementById('today-date').innerHTML = `<h6 class="">Today Date: ${todayDate}</h6>`;

// Submit add item form
document.getElementById('itemSubmitForm').addEventListener('submit', submitItem);
function submitItem (e) {
    const itemName = document.getElementById('itemName').value;
    const id = Math.floor(Math.random() * 100000);
    const price = 0;
    const status = 'Do';
    const item = { id, itemName, price, status };
    let items = [];

    if (itemName) {
        if (localStorage.getItem('items')) {
        items = JSON.parse(localStorage.getItem('items'));
        }
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
    }
    showAll();
    this.reset();
    e.preventDefault();
    
}

// Add item price
const addItemPrice = (id) => {
    if (id) {

        if (localStorage.getItem('items')) {
            const items = JSON.parse(localStorage.getItem('items'));
            const getPrice = document.getElementById('price-'+id).value;
            const currentItem = items.find(item => item.id == id);
            if (getPrice) {
                currentItem.price = getPrice;
            }
            localStorage.setItem('items', JSON.stringify(items));
        }

        showAll();
    }
}
// Edit item price
const editItemPrice = (id) => {
    if (id) {

        if (localStorage.getItem('items')) {
            const items = JSON.parse(localStorage.getItem('items'));
            const currentItem = items.find(item => item.id == id);
            const getPrice = prompt('Edit Price', currentItem.price);
            if (getPrice) {
                currentItem.price = getPrice;
            }
            localStorage.setItem('items', JSON.stringify(items));
        }

        showAll();
    }
}
// Purchase status change purchaseComplete
const purchaseComplete = (id) => {
    if (id) {
        if (localStorage.getItem('items')) {
            const items = JSON.parse(localStorage.getItem('items'));
            const currentItem = items.find(item => item.id == id);
            currentItem.status = 'Done';

            localStorage.setItem('items', JSON.stringify(items));
        }

        showAll();
    }
}
// Delete item
const deleteItem = (id) => {
    if (id) {
        if (localStorage.getItem('items')) {
            const items = JSON.parse(localStorage.getItem('items'));
            const remainingItem = items.filter(item => item.id !== id);

            localStorage.setItem('items', JSON.stringify(remainingItem));
        }

        
    }
    showAll();
}

// Show all item
const showAll = () => {
    if (localStorage.getItem('items')) {
        const getitems = JSON.parse(localStorage.getItem('items'));

        // item counter
        document.getElementById('itemCounter').innerHTML = getitems.length;
        // Item do counter
        const doCounter = getitems.filter(item => item.status == 'Do');
        document.getElementById('itemDoCounter').innerHTML = doCounter.length;
        // Total cost
        let totalCost = 0;
        document.getElementById('itemTotalCost').innerHTML = totalCost;

        // Item done counter
        const doneCounter = getitems.filter(item => item.status == 'Done');
        document.getElementById('itemDoneCounter').innerHTML = doneCounter.length;

        const bajarListItem = document.getElementById('bajar-list-items');
        bajarListItem.innerHTML = '';

        for (let i = 0; i < getitems.length; i++) {
            const element = getitems[i];
            let totalSum = parseInt(element.price);
            totalCost = totalCost + totalSum;
            
            
            bajarListItem.innerHTML += `

                <div class="card bajar-list-item">
                    <div class="row">
                        <div class="col-4">
                            <span class="badge badge-${element.status =='Do' ?`info`:`success`}">${element.status}</span>
                        </div>
                        <div id="editItemPriceInput" class="col-8 text-right">
                            ${ element.price > 0 ?
                            `
                            <span>৳ ${element.price}  </span>
                            <button onClick="editItemPrice(${element.id})" id="editItemPriceBTN" class="btn btn-info btn-sm"><i class="fa fa-pencil"></i></button>
                            `
                            :
                            `
                            <input name="price" id="price-${element.id}" style="width: 100px"  type="number" class="btn btn-sm btn-dark m-0 text-left" placeholder="100..">
                            <button onClick="addItemPrice(${element.id})" class="btn btn-sm btn-info m-0">Add price</button>
                            `}
                            

                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-8">
                            <h5>${i + 1}. ${element.itemName}</h5>
                        </div>
                        <div class="col-4 text-right">
                            <button onClick="deleteItem(${element.id})" class="btn btn-sm btn-danger"><i class="fa fa-trash"></i></button>
                            <button onClick="purchaseComplete(${element.id})" class="btn btn-sm btn-success"><i class="fa fa-check"></i></button>
                        </div>
                    </div>
                </div>
            
            `;
            document.getElementById('itemTotalCost').innerHTML += totalCost;
            
        }
    }
}
showAll();