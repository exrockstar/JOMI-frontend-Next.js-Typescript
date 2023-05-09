# Setting Up Development Environment

## 1. Download Prerequisite Software

1. [MongoDB](https://www.mongodb.com/try/download/community)
2. [MongoDB Database Tools](https://www.mongodb.com/try/download/database-tools)
3. [VSCode](https://code.visualstudio.com/download)
4. Node.JS
5. yarn
6. NVM
   a. [Windows](https://github.com/coreybutler/nvm-windows/releases)
   b. [MAC/Linux](https://github.com/nvm-sh/nvm)

## 2. Download VSCode Extensions

### Must Have

1. Prettier - Make sure to set default formatter to prettier
2. [GraphQL](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql) - For syntax highlighting
3. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### Nice To Have

1. Auto Rename Tag
2. ES7 React/GraphQL Snippets

## 3. Setting Up the Database

1. Make sure MongoDB 4.4 and MongoDB tools are properly installed. If you got Mongodb 5.0 or higher, make sure to only use commands within verrsion 4.4.
2. Make sure MongoDB server is running. If not, execute `mongod`
3. Download sample DB [here](https://drive.google.com/drive/folders/1qVacEP6RCafjmzL6YLbxC-vU0lhO70jH).
   ✅**NOTE**: If you don't have access, kindly click request access.
4. Extract the file and go to folder
5. run `mongorestore --db jomi --gzip dump`
6. Verify that you have a database db in your local mongodb server
7. Later, Modify `.env` file variable: `DATABASE_URL=mongodb://127.0.0.1:27017/jomi`

## 4. Setting Up GraphQL API

1. `git clone https://github.com/jomijournal/api6jomi.git`
2. Create `.env` file, and fill it from env.example.
   ✅**NOTE**: Make sure to modify `MONGO_URL` & `DB_NAME` to the database name you used when setting up the database
3. run `yarn && yarn dev`

## 5. Setting up Site

1. `git clone https://github.com/jomijournal/jomi6-site-tomato.git`
2. Create .env file, and fill it from env.example
   ✅**NOTE**: Make sure to modify `MONGO_URL` & `DB_NAME` to the database name you used when setting up the database
3. yarn && yarn dev

Both should now be avaialble via browser (localhost:3000, localhost:4000)

## 6. Further Reading

go to /docs folder to have more information on development
