# Supermarket POS Billing System

A browser-only Point of Sale (POS) billing system for supermarkets with product management, shopping cart, billing, QR code payment, and sales reporting features. All data is stored in browser localStorage - no server required!

## Features

- **Product Management (CRUD)**: Create, read, update, and delete products with images
- **Shopping Cart**: Add items to cart by clicking on products
- **Billing System**: Checkout with payment processing
- **QR Code Payment**: UPI QR code for payment
- **Bill Printing**: Generate and print bills
- **Clear Cart**: Remove all items from cart
- **Monthly Sales Report**: View sales statistics and daily breakdowns
- **Manage Menu**: Admin interface for product management
- **Browser-Only**: All data stored in localStorage - works offline!

## Technology Stack

- **Frontend**: React.js, React Router
- **Storage**: Browser localStorage
- **No Backend Required**: Everything runs in the browser

## Project Structure

```
pos-billing/
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   └── services/    # localStorage service layer
│   └── public/
└── README.md
```

## Installation & Setup

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will run on `http://localhost:3000`

## Usage

1. **View Products**: Browse available products on the main page
2. **Add to Cart**: Click on any product to add it to the cart
3. **Manage Cart**: View cart items, quantities, and total in the sidebar
4. **Checkout**: Click "Pay Now" to proceed with payment
5. **QR Payment**: Scan the QR code with your UPI app
6. **Print Bill**: After payment, click "Print Bill" to generate a printable bill
7. **Manage Menu**: Use the "Manage Menu" tab to add, edit, or delete products
8. **Sales Report**: View monthly sales statistics in the "Sales Report" tab

## Sample Products

The system comes with sample products pre-loaded:
- Pen (₹10.00)
- Book (₹50.00)
- Shop (₹200.00)
- Milk Powder (₹300.00)
- Tooth Brush (₹25.00)

## Data Storage

All data is stored in browser localStorage:
- **Products**: Stored in `pos_products` key
- **Cart**: Stored in `pos_cart` key
- **Transactions**: Stored in `pos_transactions` key

Data persists across browser sessions. To reset all data, clear your browser's localStorage.

## Features

- ✅ No server required - runs entirely in the browser
- ✅ Works offline after initial load
- ✅ Data persists across sessions
- ✅ Full CRUD operations for products
- ✅ Shopping cart with add/clear functionality
- ✅ Billing and checkout system
- ✅ QR code payment integration
- ✅ Bill printing
- ✅ Monthly sales reports
- ✅ Responsive design

## Notes

- QR code uses a placeholder service - replace with your actual UPI QR code in `QRPayment.jsx`
- All data is stored locally in your browser - clearing browser data will remove all products and transactions
- For production use with multiple users, consider migrating to a backend with database

## License

ISC
