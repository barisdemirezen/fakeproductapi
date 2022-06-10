
# Fake Product Api 🎉

Fake Product Api is a open-source API project to help developers fill their application with real world sample data.

## Demo ⚡️

Check out live app. It is ready to go!

[productapi.live](https://productapi.live)

*Currently Redis is not used on live site*  
## About it 📝

Fake Product Api is an outcome of one of my requirements while developing mini projects. Yet this mini projects is not a product, I still think that presentation matter. 

Filling code with data is a painful and boring process. Why don't we speed up this process?

Deploy your own project in minutes with support of Mongo and Redis. It is only required to fill .env file with your configurations. Then you are ready to go!

Still think that it is not worth to do? Then you can use our live Api to make things faster. Go check out live app!

---
If you would like to use images, you can find all of them at ```/public/bucket/```
## Install, run, dev 🏗️

Install project with npm

```bash 
  npm install
```
Start with ts-node

```bash 
  npm run start
```
Run in development mode with nodemon

```bash 
  npm run dev
```    
Run tests **will be added**

```bash 
  npm run test
```    
## API Usage ✨

#### Shows all products with or without filters

```http
  GET /api/product
  GET /api/product?{price=asc||desc}&{category=categoryName}&{q=searchTitle}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `price`      | `asc` or `desc` | Orders products by price ascending or descending.|
| `category`      | `string` | Filters categories by given category name |
| `q`      | `string` | Filters products by title that includes given parameter |

#### Shows product with given id

```http
  GET /api/product/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of product |


#### Simulates adding product to database. Returns a product with new Id.

```http
  POST /api/product/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | Title of product |
| `description`      | `string` | Description of product |
| `image`      | `string` | Image url of product |
| `price`      | `number` | Price of product |
| `category`      | `string` | Category of product |

#### Simulates updating product. Returns product with updated data.

```http
  PUT /api/product/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of product |
| `title`      | `string` | Title of product |
| `description`      | `string` | Description of product |
| `image`      | `string` | Image url of product |
| `price`      | `number` | Price of product |
| `category`      | `string` | Category of product |
 
 ```http
  DELETE /api/product/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of product |

## Environment Variables ♻️

You need to add keys below to your .env file to run project.

**Example .ENV**
```
DB_USERNAME = mongo_db_username
DB_PASSWORD = mongo_db_password
DB_DATABASE = mongo_db_database
REDIS_HOST = redis_host_ip
REDIS_DB = redis_database
REDIS_PORT = redis_port
PORT = app_port
```
## Tech Stack 🔥

**Languages:** HTML, CSS, JS, Typescript

**Client:** Node with [Pug.Js](https://pugjs.org/api/getting-started.html), [Bootstrap](https://getbootstrap.com/), [Prism.js](https://prismjs.com/)

**Server:** Node, Express

**Data Store:** Mongo Atlas Cloud, Redis

**Cloud Services:** Heroku , AWS S3  

**SSL, Traffic, Caching:** Cloudflare
## Relational Projects 🗃️

Please check out "Fake Store API" which is a inspiration.

[Fake Store API](https://fakestoreapi.com/)

*No code copied from project!*

  
## Badges 📌


![](https://img.shields.io/github/last-commit/barisdemirezen/fakeproductapi/main?style=flat-square)

![](https://img.shields.io/github/license/barisdemirezen/fakeproductapi?style=flat-square)

## License 🌐

[GPL](https://choosealicense.com/licenses/gpl-3.0/)

  