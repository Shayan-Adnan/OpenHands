OpenHands is a fundraiser platform inspired by GoFundMe, built using Node, Express, MySQL, and Bootstrap.

![screenshot1](https://github.com/user-attachments/assets/72a3f3a5-fe2b-4a76-8a80-d6db316db391)

## 🚀 Features
- User authentication (JWT-based)
- Fundraiser creation and approval system
- Payment processing via Stripe
- Email notifications for account-related actions

## 📥 Installation & Setup

**1. Clone the Repository**
```bash
git clone https://github.com/Shayan-Adnan/OpenHands.git
```

**2. Install Dependencies**
```bash
cd OpenHands
npm install
```

**3. Set Up Environment Variables**
Create a .env file in the root of the project and add these variables:
```bash
SERVER_URL=your-server-url
DATABASE_URL=your-database-url
JWT_SECRET=your-jwt-secret
PORT=your-port-number
MAIL_USER=your-email-address
APP_PASSWORD=your-email-password
STRIPE_PRIVATE_KEY=your-stripe-private-key
```

🌱 **Environment Variable Breakdown:**

- **SERVER_URL**: *Your server’s base URL (e.g., http://localhost).* 
- **DATABASE_URL**: *MySQL database connection string.*
- **JWT_SECRET**: *Secret key for JWT authentication.*
- **PORT**: *Port for the server (e.g., 3000).*
- **MAIL_USER & APP_PASSWORD**: *Email credentials for sending mail.*
- **STRIPE_PRIVATE_KEY**: *Your Stripe private API key.*

**4. Run Prisma Migration**

Run the Prisma migration to set up the database schemas:
```bash
npx prisma migrate dev
```
**5. Manually Create An Admin Account In The Database**

To approve/reject fundraiser requests, you need to create an admin account. Run the following query to create a sample account:
```bash
INSERT INTO admin (
  id,
  firstName,
  lastName,
  country,
  city,
  email,
  password,
  username
) 
VALUES (
  '84765c2b-5d91-4901-9869-3a66e345b26f', 
  'John', 
  'Doe', 
  'Pakistan', 
  'Karachi', 
  'john@gmail.com', 
  '$2b$10$p9rfuCY/jXgl321mZvRj0ONxdN8Muq.L0wKMDiQUXohJ3bGRhezC2', 
  'JohnDoe'
);
```
*The password for this account will be '1234'.*

**6. Run The App**

Enter the following command in your terminal to run the app:
```bash
npm run devStart
```
Now you can open your browser and go to http://localhost:PORT to see the app in action 😃.

## 📷 Screenshots

**Login Page**

![image](https://github.com/user-attachments/assets/dc571b5f-60cb-43e4-993a-845661dd8d63)

**Landing Page**

![screenshot1](https://github.com/user-attachments/assets/72a3f3a5-fe2b-4a76-8a80-d6db316db391)

![image](https://github.com/user-attachments/assets/848c5b07-2e24-41b7-bfe0-f637d24cd07a)

**Create Fundraiser Page**

![image](https://github.com/user-attachments/assets/6ec3637a-347b-48d4-8a5f-02c42a5fc898)

**Fundraiser Page**

![image](https://github.com/user-attachments/assets/33526d64-eefb-45f3-b101-d8cef0e95ea4)

**Stripe Payment Page**

![image](https://github.com/user-attachments/assets/f01c980a-757f-4226-b290-7d0c8b6b5c32)

**Admin Dashboard**

![image](https://github.com/user-attachments/assets/161afbd4-b300-4ad8-ab07-33e7ecb29311)


