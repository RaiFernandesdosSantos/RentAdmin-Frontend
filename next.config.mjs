/** @type {import('next').NextConfig} */
const nextConfig = {
  // permite rodar uma segunda instância em outra pasta de build
  // (ex.: quando a porta 3000 já está ocupada por outra instância)
  distDir: process.env.NEXT_DIST_DIR || ".next",
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
}

export default nextConfig
