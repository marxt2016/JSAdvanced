const express = require('express');
const fs = require('fs');
const cartRouter = require('./cartRouter');
const app = express();

app.use(express.json());
app.use('/', express.static('./public'));
app.use('/api/cart', cartRouter);

app.get('/api/products', (req, res) => {
  fs.readFile('./server/db/products.json', 'utf-8', (err, data) => {
    if (err) {
      // res.send(JSON.stringify({ result: 0, text: err }));
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      res.send(data);
    }
  });
});

const port = process.env.PORT || 5555;
app.listen(port, () => {
  console.log(`Listening ${port} port`);
});




// /**
//  * Активируем мидлвары
//  */
// app.use(express.json()); // Даем знать приложению, что работаем с json'ом
// app.use('/', express.static('./public')); // запросы в корень нашего сайт отдают содержимое public

// /**
//  * API Каталога
//  */
// app.get('/api/products', (req, res) => {
//   fs.readFile('./server/db/products.json', 'utf-8', (err, data) => {
//     if (err) {
//       res.send(JSON.stringify({ result: 0, text: err }));
//     } else {
//       res.send(data);
//     }
//   });
// });

// /**
//  * API Корзины
//  */
// app.get('/api/cart', (req, res) => {
//   fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
//     if (err) {
//       res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
//     } else {
//       res.send(data);
//     }
//   });
// });

// // Добавление нового товара в корзине
// app.post('/api/cart', (req, res) => {
//   fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
//     if (err) {
//       res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
//     } else {
//       // парсим текущую корзину
//       const cart = JSON.parse(data);
//       // добавляем новый товар
//       cart.contents.push(req.body);
//       // пишем обратно
//       fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
//         if (err) {
//           res.send('{"result": 0}');
//         } else {
//           res.send('{"result": 1}');
//         }
//       })
//     }
//   });
// });

// // Изменяем количество товара
// app.put('/api/cart/:id', (req, res) => {
//   fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
//     if (err) {
//       res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
//     } else {
//       // парсим текущую корзину
//       const cart = JSON.parse(data);
//       // ищем товар по id
//       const find = cart.contents.find(el => el.id_product === +req.params.id);
//       // изменяем количество
//       find.quantity += req.body.quantity; // 1 || -1 => 5 + -1 = 4;
//       // пишем обратно
//       fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
//         if (err) {
//           res.send('{"result": 0}');
//         } else {
//           res.send('{"result": 1}');
//         }
//       })
//     }
//   });
// });

// app.delete('/api/cart/:id', (req, res) => {
//   fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
//     if (err) {

//       res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
//     } else {
//       // парсим текущую корзину
//       const cart = JSON.parse(data);
//       // ищем товар по id
//       const find = cart.contents.find(el => el.id_product === +req.params.id);
//       // delete
//       cart.contents.splice(cart.contents.indexOf(find), 1);
//       // пишем обратно
//       fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
//         if (err) {
//           res.send('{"result": 0}');
//         } else {
//           res.send('{"result": 1}');
//         }
//       })
//     }
//   });
// });


// /**
//  * Запуск сервера
//  * @type {string|number}
//  */
// // const port = process.env.PORT || 555;
// const port = 5555; // чтобы не смущало process.env.PORT (если не стартует на 3000, то меняем на другой 8080 или 8888)
// app.listen(port, () => {
//   console.log(`Listening ${port} port`);
// });
