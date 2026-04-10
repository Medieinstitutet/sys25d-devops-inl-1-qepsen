import { defineConfig } from 'vite'
 
export default defineConfig({
  // IMPORTANT: Replace 'salary-calc' with your actual GitHub repo name
  base: '/https://github.com/Medieinstitutet/sys25d-devops-inl-1-qepsen.git',
  test: {
    environment: 'node',
  },
})