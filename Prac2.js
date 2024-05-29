class ShoppingList {
    constructor() {
        this.items = [
            { name: 'Помідори', quantity: 2, bought: true },
            { name: 'Печиво', quantity: 2, bought: false },
            { name: 'Сир', quantity: 1, bought: false }
        ];
        this.initialize();
    }

    initialize() {
        document.getElementById('add-item-btn').addEventListener('click', () => this.addItem());
        document.getElementById('item-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addItem();
        });
        this.render();
    }

    addItem() {
        const input = document.getElementById('item-input');
        const name = input.value.trim();
        if (name) {
            this.items.push({ name, quantity: 1, bought: false });
            input.value = '';
            input.focus();
            this.render();
        }
    }

    deleteItem(index) {
        this.items.splice(index, 1);
        this.render();
    }

    toggleBought(index) {
        this.items[index].bought = !this.items[index].bought;
        this.render();
    }

    updateName(index, name) {
        this.items[index].name = name;
        this.render();
    }

    updateQuantity(index, quantity) {
        this.items[index].quantity = quantity;
        this.render();
    }

    render() {
        const itemsList = document.getElementById('items-list');
        itemsList.innerHTML = '';

        this.items.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item' + (item.bought ? ' bought' : '');

            const nameSpan = document.createElement('span');
            nameSpan.className = 'item-name';
            nameSpan.textContent = item.name;
            nameSpan.contentEditable = !item.bought;
            nameSpan.addEventListener('blur', () => {
                const newName = nameSpan.textContent.trim();
                if (newName) {
                    this.updateName(index, newName);
                } else {
                    nameSpan.textContent = item.name;
                }
            });

            const quantitySpan = document.createElement('span');
            quantitySpan.className = 'item-quantity';
            quantitySpan.textContent = item.quantity;

            const minusBtn = document.createElement('button');
            minusBtn.className = 'minus-btn';
            minusBtn.textContent = '-';
            minusBtn.disabled = item.quantity <= 1;
            minusBtn.setAttribute('data-tooltip', 'Зменшити кількість');
            minusBtn.addEventListener('click', () => {
                if (item.quantity > 1) {
                    this.updateQuantity(index, item.quantity - 1);
                }
            });

            const plusBtn = document.createElement('button');
            plusBtn.className = 'plus-btn';
            plusBtn.textContent = '+';
            plusBtn.setAttribute('data-tooltip', 'Збільшити кількість');
            plusBtn.addEventListener('click', () => {
                this.updateQuantity(index, item.quantity + 1);
            });

            const boughtBtn = document.createElement('button');
            boughtBtn.className = 'btn' + (item.bought ? ' bought' : '');
            boughtBtn.textContent = item.bought ? 'Не куплено' : 'Куплено';
            boughtBtn.setAttribute('data-tooltip', item.bought ? 'Позначити як не куплено' : 'Позначити як куплено');
            boughtBtn.addEventListener('click', () => this.toggleBought(index));

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = '✖';
            deleteBtn.setAttribute('data-tooltip', 'Видалити товар');
            deleteBtn.addEventListener('click', () => this.deleteItem(index));

            itemDiv.appendChild(nameSpan);
            if (!item.bought) {
                itemDiv.appendChild(minusBtn);
                itemDiv.appendChild(quantitySpan);
                itemDiv.appendChild(plusBtn);
            }
            itemDiv.appendChild(boughtBtn);
            if (!item.bought) {
                itemDiv.appendChild(deleteBtn);
            }
            itemsList.appendChild(itemDiv);
        });

        this.updateStatistics();
    }

    updateStatistics() {
        const remainingItems = document.getElementById('remaining-items');
        const boughtItems = document.getElementById('bought-items');

        remainingItems.innerHTML = '';
        boughtItems.innerHTML = '';

        this.items.filter(item => !item.bought).forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'remaining-item';
            itemDiv.textContent = `${item.name} `;
            const badgeSpan = document.createElement('span');
            badgeSpan.className = 'badge';
            badgeSpan.textContent = item.quantity;
            itemDiv.appendChild(badgeSpan);
            remainingItems.appendChild(itemDiv);
        });

        this.items.filter(item => item.bought).forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'bought-item';
            itemDiv.textContent = `${item.name} `;
            const badgeSpan = document.createElement('span');
            badgeSpan.className = 'badge';
            badgeSpan.textContent = item.quantity;
            itemDiv.appendChild(badgeSpan);
            boughtItems.appendChild(itemDiv);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ShoppingList();
});
