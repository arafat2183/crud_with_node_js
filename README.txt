You’ll need Node.js and npm installed on your local development machine to follow this tutorial. If you’re not sure if you have them installed, run the following commands to check their availability:

# To check if Node is installed, run:
node -v

# To check if Node is installed, run:
npm -v

Setting up the Node.js application
Let’s create a new folder for the app and navigate to the folder using the command line with the cd directive:

cd path/to/your/folder
Then, run the following command to install the dependencies required for this tutorial:

npm i express mysql dotenv hbs bcryptjs
Let me explain what each library is for:

Express.js: For creating API and web routes and setting up the app backend
MySQL: For connecting to our local MySQL server
dotenv: For storing environmental variables that should not be exposed in the app source code
hbs: For rendering HTML on the server
Bcryptjs: For hashing passwords
In addition, I recommend installing nodemon, which automatically restarts the server when file changes are detected, saving you precious time in development. Install it with the following command:

npm i nodemon --save
Finally, open your app’s package.json file with a code editor and add the following field inside the scripts object:

"start": "nodemon app.js"
Now, we’re finished with the project setup. Next, we’ll connect to our MySQL database and create a table to store user login information.

Creating a database connection in Node.js
Start by creating a new database in your MySQL environment named login-db. After that, build a users table with the ID, name, email, and password. Set the ID to INT and AUTOINCREMENT, and the name, email, and password to VARCHAR.


Then, create an .env file in your app’s root folder. Inside .env, add your database name, host domain, username, and password values to their corresponding variable names. These are the default values for MySQL:

DATABASE = login-db
DATABASE_HOST = localhost
DATABASE_ROOT = root
DATABASE_PASSWORD =