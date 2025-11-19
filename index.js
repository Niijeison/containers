const exp = require('express');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const path = require('path');
const request = require('request');
const compression = require('compression');

const app = exp();

// Environment configuration
const APP_NAME = process.env.APP_NAME || 'Chuck Norris Facts';
const ENVIRONMENT = process.env.ENVIRONMENT || 'development';

// gzip
app.use(compression());

//security
app.use(helmet());
// app.use(helmet.noCache());
app.use(helmet.hsts({
  maxAge: 31536000,
  includeSubdomains: true
}));

// static files
const p = './public';
const publicFolderPath = path.join(__dirname, p);

app.use(favicon(path.join(publicFolderPath, '/favicon.ico')));
app.use(exp.static(publicFolderPath));

// Health check endpoint
app.get('/health', function (req, res) {
  res.status(200).json({
    status: 'healthy',
    app: APP_NAME,
    environment: ENVIRONMENT,
    timestamp: new Date().toISOString()
  });
});

app.get('/', function (req, res) {

  var options = {
    method: 'GET',
    url: 'https://api.chucknorris.io/jokes/random'
  };

  request(options, function (error, response, body) {
    if (error) {
      const fallbackText = "Chuck Norris doesn't need an API. APIs need Chuck Norris.";
      const responseText = setDragonMessage(fallbackText);
      return res.send(responseText);
    }

    try {
      const data = JSON.parse(body);
      const fact = data.value || "Chuck Norris can divide by zero.";
      const w = `
Chuck Norris Fact:

${fact}
      `;
      const responseText = setDragonMessage(w);
      res.send(responseText);
    } catch (e) {
      const fallbackText = "Chuck Norris doesn't throw exceptions. He catches them.";
      const responseText = setDragonMessage(fallbackText);
      res.send(responseText);
    }
  });
});

app.get('/:text', function (req, res) {
  let text = 'xxxxxxxx';
  try {
    text = req.params.text;
  } catch (e) { }
  const responseText = setDragonMessage(text);
  res.send(responseText);
});

const setDragonMessage = (text) => {
  // Create dragon ASCII art with the message
  const dragonArt = `
${text}

                                               /===-_---~~~~~~~~~------____
                                                |===-~___                _,-'
                 -==\\\\                         \`//~\\\\   ~~~~\`---.___.-~~
             ______-==|                         | |  \\\\           _-~\`
       __--~~~  ,-/-==\\\\                        | |   \`\\        ,'
    _-~       /'    |  \\\\                      / /      \\      /
  .'        /       |   \\\\                   /' /        \\   /'
 /  ____  /         |    \\\`\\.__/-~~ ~ \\ _ _/'  /          \\/'
/-'~    ~~~~~---__  |     ~-/~         ( )   /'        _--~\`
                  \\_|      /        _)   ;  ),   __--~~
                    '~~--_/      _-~/-  / \\   '-~ \\
                   {\\__--_/}    / \\_>- )<__\\      \\
                   /'   (_/  _-~  | |__>--<__|      |
                  |0  0 _/) )-~     | |__>--<__|      |
                  / /~ ,_/       / /__>---<__/      |
                 o o _//        /-~_>---<__-~      /
                 (^(~          /~_>---<__-      _-~
                ,/|           /__>--<__/     _-~
             ,//('(          |__>--<__|     /                  .----_
            ( ( '))          |__>--<__|    |                 /' _---_~\\
         \`-)) )) (           |__>--<__|    |               /'  /     ~\\\`\\
        ,/,'//( (             \\__>--<__\\    \\            /'  //        ||
      ,( ( ((, ))              ~-__>--<_~-_  ~--____---~' _/'/        /'
    \`~/  )\` ) ,/|                 ~-_~>--<_/-__       __-~ _/
  ._-~//( )/ )) \`                    ~~-'_/_/ /~~~~~~~__--~
   ;'( ')/ ,)(                              ~~~~~~~~~~
  ' ') '( (/
    '   '  \`
  `;

  return `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="description" content="Chuck Norris Facts with Dragon">
      <meta name="author" content="DevOps Training Team">
      <link rel="icon" href="/favicon.ico">
  
      <title>Dragon Says - ${APP_NAME}</title>
    </head>
  
    <body style="background-color: #1a1a1a; color: #00ff00; font-family: monospace;">
      <div style="padding: 20px;">
        <h1>${APP_NAME}</h1>
        <p>Environment: ${ENVIRONMENT}</p>
      </div>
      <pre style="font-size: 12px; line-height: 1.1;">
${dragonArt}
      </pre>
      <br/><br/>
      <div style="padding: 20px;">
        <a href="/" style="color: #00ff00;">Get another Chuck Norris fact</a> | 
        <a href="/health" style="color: #00ff00;">Health Check</a>
      </div>
    </body>
  </html>

`;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`=> ${APP_NAME} running on 0.0.0.0:${PORT} [${ENVIRONMENT}]`));
