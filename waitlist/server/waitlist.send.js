require('dotenv').config();

import { Resend } from "resend";

const resend = new Resend(`${process.env.RESEND_API_KEY}`);

async function send({ email, firstname }) {

  try {
    const data = await resend.emails.send({
      from: "Payoor <hello@waitlist.payoor.shop>",
      to: [`${email}`],
      subject: "Welcome",
      html: `
      
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Payoor</title>
          <style>
              /* Define the embedded font */
              @font-face {
                  font-family: 'Inter';
                  src: url(data:font/woff2;base64,BASE64_ENCODED_INTER_FONT_DATA_HERE) format('woff2');
                  /* Add additional font formats here for broader compatibility */
              }
              @font-face {
                  font-family: 'Poppins';
                  src: url(data:font/woff2;base64,BASE64_ENCODED_POPPINS_FONT_DATA_HERE) format('woff2');
                  /* Add additional font formats here for broader compatibility */
              }
      
              body {
                  font-family: 'Inter', Arial, sans-serif;
                  background-color: #f5f5f5;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  color: #000; /* Added text color */
                  font-family: 'Inter', Arial, sans-serif; /* Changed font-family */
                  font-size: 10px; /* Added font size */
                  font-style: normal; /* Added font style */
                  font-weight: 300; /* Added font weight */
                  line-height:  20px/* Added line-height */
              }
      
              h1 {
                  color: #249B48;
              }
      
              p {
                  font-size: 14px;
                  color: #333;
              }
      
              ol {
                  padding-left: 20px;
              }
      
              li {
                  font-size: 13px;
                  color: #333;
                  margin-bottom: 20px;
              }
              span.payoor {
                  color: #249B48; /* Added text color */
                  font-family: 'Inter'; /* Added font family */
                  font-size: 16px; /* Added font size */
                  font-style: normal; /* Added font style */
                  font-weight: 300; /* Added font weight */
                  line-height:  20px/* Added line-height */
              }
      
              a {
                  text-decoration: none;
                  color: #249B48;
                  border-radius: 5px;
                  display: inline-block;
              }
      
              .signature {
                  font-weight: bold;
              }
      
              .regard {
                  margin-top: 30px;
              }
      
              .logo-area {
                  background: #249B48;
                  padding: 10px 10px;
                  display: flex;
                  justify-content: space-between;
                  height: 30px;
                  overflow: hidden;
              }
      
              .logo {
                  height: 170px;
                  width: 170px;
                  transform: translateY(-40px) translateX(-69px);
                  overflow: hidden;
              }
      
              .logo-image {
                  object-fit: contain;
                  height: 100%;
                  width: 100%;
              }
      
              .content {
                  padding: 30px 30px;
              }
          </style>
          <!-- Add the Google Fonts link -->
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600&family=Poppins:wght@100;200;300;400;500;600&display=swap">
      </head>
      <body>
          <div class="container">
              <div class="logo-area">
                  <figure class="logo">
                      <img src="${process.env.BASE_URL}/assets/payoor-green.svg" class="logo-image"/>
                  </figure>
                  <div></div>
              </div>
             
              <div class="content">
                  <p>Dear ${firstname},</p>
      
                  <p>Welcome to <span class="payoor">Payoor</span>, where grocery shopping and “market runs” are about to become your new favorite pastime! We're thrilled to have you on board and can't wait to revolutionize the way you experience food.</p>
          
                  <p>Ever find yourself juggling bags of groceries and foodstuff, wondering if you forgot the milk or onions? Or maybe you're tired of choosing between spending hours in the market or shelling out for overpriced takeouts from restaurants? We get it. We know the struggle - the endless hours lost in crowded markets, the logistics headache, and let's not even talk about the soaring food prices! We've been there, too. That's why we created <span class="payoor">Payoor</span> - to make your life a whole lot easier.</p>
          
                  <p>Here's what you can look forward to:</p>
          
                  <ol>
                      <li>Effortless Shopping, No Market Madness: Say farewell to the chaos of traditional markets. With <span class="payoor">Payoor</span>, you can browse, select, and order your groceries from the comfort of your own space, leaving you with more time for the things you love.</li>
                      <li>Recipe Wizardry: Not sure what to cook? No worries! We've got a treasure trove of recipes tailored to your taste buds. From kitchen novices to seasoned pros, we've got recipes that'll make your taste buds dance!</li>
                      <li>Groceries + Ingredients Delivered to Your Doorstep: Imagine a world where the ingredients you need for that delicious meal arrive at your doorstep, properly cleaned and ready to become a masterpiece. With <span class="payoor">Payoor</span>, it's a reality.</li>
                      <li>Automatic Restocking: Running low on essentials? We've got your back. Our intelligent system keeps track of your frequently purchased items and can even remind you when it's time for a restock.</li>
                      <li>Savings Galore: Enjoy exclusive deals, discounts, and special offers just for being a part of the <span class="payoor">Payoor</span> family. Your wallet will thank you!</li>
                      <li>Your Tastes, Your Rules: Gluten-free, organic, or just really, lactose intolerant? Tell us what you love (and what you don't!) - from organic produce to gluten-free options, we've got something for everyone.</li>
                  </ol>
          
                  <p>We're not just a service, we're a promise - to make your life simpler, your meals tastier, and your wallet happier. With <span class="payoor">Payoor</span>, you're not just a customer, you're family.</p>
          
                  <p>Stay tuned for updates and exciting news about our launch. And if you have any questions or just want to chat about food, we're all ears! Send an email to <a href="mailto:hello@payoor.shop">hello@payoor.shop</a></p>
          
                  
          
                  <section class="regard">
                      <p>To delicious days ahead!</p>
                  </section>
          
                  <section class="regard">
                      <p>Warm regards,</p>
                  </section>
          
                  <section class="regard">
                      <p>Samson Adebayo</p>
                      <p>Co-Founder, Payoor</p>
                  </section>
          
                  <section class="regard">
                      <p>P.S. Remember, Every meal deserves a great backstory!</p>
                  </section>
              </div>
      
          </div>
      </body>
      </html>
      `,
    });

    //console.log(data, 'data');
    return data;
  } catch (error) {
    //console.log(error, 'error')
    throw new Error('email sending failed, try again')
  }
}

export default send;