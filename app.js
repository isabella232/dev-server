const bs = require('browser-sync').create();
const connectBs = require('connect-browser-sync');
const context = require('./context.js');
const express = require('express');
const nunjucks = require('nunjucks');

const app = express();
app.set('view engine', 'html');
nunjucks.configure('./', { 
  autoescape: true,
  express: app,
  watch: true
});

bs.init({
  logLevel: "silent",
  logSnippet: false,
  notify: false,
  files: ['**/*.css', '**/*.html'],
  reloadDelay: 500
});

app.use(connectBs(bs));

// routes
app.get('/', function(req, res) {
  res.render('index.html');
});

app.get('/graphics/:slug/', function(req, res) {
  const graphicsPath = `graphics/${req.params.slug}`;
  const templateContext = context.makeContext(req.params.slug, 'localhost');
  setupStaticFiles(graphicsPath);  

  res.render(`${graphicsPath}/parent_template.html`, templateContext);
});

app.get('/graphics/:slug/child.html', function(req, res) {
  const graphicsPath = `graphics/${req.params.slug}`;
  const templateContext = context.makeContext(req.params.slug, 'localhost');
  setupStaticFiles(graphicsPath);  

  res.render(`${graphicsPath}/child_template.html`, templateContext);
});

const setupStaticFiles = function(path) {
  app.use(express.static(path));
}

app.listen('8000', function() {
  console.log('app started on port 8000');
});