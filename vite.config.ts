import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  const isProduction = mode === 'production';
  const isDevelopment = mode === 'development';

  return {
    plugins: [
      react({
        // Enable React DevTools in development
        include: '**/*.{jsx,tsx}',
        babel: {
          plugins: isProduction ? [
            ['babel-plugin-transform-remove-console', { exclude: ['error', 'warn'] }]
          ] : undefined
        }
      })
    ],
    
    base: '/',
    
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@components': resolve(__dirname, 'src/components'),
        '@utils': resolve(__dirname, 'src/utils'),
        '@services': resolve(__dirname, 'src/services'),
        '@stores': resolve(__dirname, 'src/stores'),
        '@types': resolve(__dirname, 'src/types'),
        '@hooks': resolve(__dirname, 'src/hooks'),
        '@pages': resolve(__dirname, 'src/pages')
      }
    },

    define: {
      // Replace environment variables at build time
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
      __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
    },

    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      sourcemap: isProduction ? false : true,
      minify: isProduction ? 'terser' : false,
      
      // Performance optimizations
      target: 'es2020',
      cssCodeSplit: true,
      
      // Bundle size optimizations
      chunkSizeWarningLimit: 1000,
      
      terserOptions: isProduction ? {
        compress: {
          drop_console: ['log', 'debug'],
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.debug']
        },
        mangle: {
          safari10: true
        }
      } : undefined,

      rollupOptions: {
        output: {
          // Improved chunk splitting strategy
          manualChunks: {
            // Core React libraries
            'react-vendor': ['react', 'react-dom'],
            
            // Routing
            'router': ['react-router-dom'],
            
            // UI Libraries
            'ui-vendor': [
              'framer-motion', 
              'lucide-react', 
              '@headlessui/react', 
              '@heroicons/react'
            ],
            
            // Data management
            'data-vendor': [
              '@tanstack/react-query',
              'zustand'
            ],
            
            // Charts and visualization
            'charts-vendor': [
              'chart.js',
              'react-chartjs-2',
              'recharts',
              'd3'
            ],
            
            // Utilities
            'utils-vendor': [
              'date-fns',
              'uuid',
              'react-use'
            ],
            
            // PDF and documents
            'pdf-vendor': [
              'jspdf',
              'jspdf-autotable'
            ]
          },
          
          // Optimize asset file names
          entryFileNames: isProduction ? 'assets/[name]-[hash].js' : 'assets/[name].js',
          chunkFileNames: isProduction ? 'assets/[name]-[hash].js' : 'assets/[name].js',
          assetFileNames: isProduction ? 'assets/[name]-[hash].[ext]' : 'assets/[name].[ext]'
        },
        
        // External dependencies for CDN loading (optional)
        external: isDevelopment ? [] : [],
      }
    },

    // Development server configuration
    server: {
      port: 5173,
      host: true,
      open: false,
      cors: true,
      
      // Proxy API calls in development
      proxy: env.VITE_CS_API_BASE_URL && isDevelopment ? {
        '/api': {
          target: env.VITE_CS_API_BASE_URL,
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      } : undefined
    },

    // Preview server configuration
    preview: {
      port: 4173,
      host: true,
      cors: true
    },

    // Optimization settings
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@tanstack/react-query',
        'zustand',
        'framer-motion',
        'lucide-react'
      ],
      exclude: ['@vite/client', '@vite/env']
    },

    // CSS configuration
    css: {
      devSourcemap: isDevelopment,
      modules: {
        localsConvention: 'camelCase'
      },
      postcss: './postcss.config.js'
    },

    // Environment variables
    envPrefix: 'VITE_',
    
    // Performance and caching
    esbuild: {
      drop: isProduction ? ['console', 'debugger'] : [],
      legalComments: 'none'
    }
  };
});