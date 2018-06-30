const keys = require('../../config/keys');
module.exports = (survey) => {
  return `
    <html>
      <head>
        <style>
        .container{
          text-align:center;
        }
        .link{
          padding:10% 2% 1% 2%;
          text-decoration:none;
          color:white;
          background-color:#4CAF50!important;
          border:1px solid #0f0
        }
        .link:hover{
          color:#4CAF50;
          background-color:white!important;
        }
        </style>
      </head>
      <body>
        <div style="text-align:center">
          <h3>${survey.subject}</h3>
          <p>${survey.body}</p>
          <div class="container">
            <a class="link" href="${keys.redirectDomain}/app/survey/${survey.id}">
              Take Survey
            </a>
          </div>
      </body>
    </html>
  `;
};
