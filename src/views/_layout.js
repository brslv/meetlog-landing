module.exports = function index({ content, meta, title }) {
  return `
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    ${meta || ''}

    <title>${title || 'Meetlog :: Meeting logs. Simplified.'}</title>
    <link rel="stylesheet" type="text/css" href="/css/index.css">
    <link href="https://pagecdn.io/lib/normalize/8.0.1/normalize.min.css" rel="stylesheet" crossorigin="anonymous">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,200;0,300;0,400;0,700;0,800;1,200;1,300;1,400;1,700;1,800&display=swap"
          rel="stylesheet">

    <link rel="apple-touch-icon" sizes="180x180" href="/images/favico/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/images/favico/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/images/favico/favicon-16x16.png">
    <link rel="manifest" href="/images/favico/site.webmanifest">
    <link rel="mask-icon" href="/images/favico/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
    <script async defer data-domain="meetlog.io" src="https://plausible.io/js/plausible.js"></script>
</head>
<body class="body">
${content || ''}
<script src="/js/client.js"></script>
</body>
</html>
  `
}
