module.exports = {
  apps: [
    {
      script: './app.js',
      name: 'proxy-info',
      instances: 1,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      out_file: './logs/pm2/log.log',
      error_file: './logs/pm2/error.log'
    }
  ]
};
