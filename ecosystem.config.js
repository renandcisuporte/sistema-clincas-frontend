require('dotenv/config')

module.exports = {
  apps: [
    {
      name: 'daniela-fidellis-app',
      script: './node_modules/next/dist/bin/next',
      args: 'start',
      instances: 1, // ou 'max' se quiser cluster mode
      exec_mode: 'fork', // ou 'cluster' se usar mais CPUs
      version: '1.0.0',
      watch: false, // watch deve ser false em produção
      max_memory_restart: '512M', // 96M é muito baixo pra Next.js
      restart_delay: 5000,
      autorestart: true,
      env: {
        NODE_ENV: 'development',
        ...process.env
      },
      env_production: {
        NODE_ENV: 'production',
        ...process.env
      }
    }
  ]
}
