var localtunnel = require('localtunnel');
localtunnel(6003, { subdomain: 'hnzxcpbgav' }, function(err, tunnel) {
  console.log('Local Tunnel is running', tunnel)
});