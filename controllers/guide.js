exports.homePage = (req, res) => {
  res.render('index', { title: 'Hoşgeldiniz', data: [3, 4, 5, 6] });
};
