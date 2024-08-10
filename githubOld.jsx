// name: Deploy

// on:
//   push:
//     branches: ["main"]
//   pull_request:
//     branches: ["main"]

// jobs:
//   deploy:
//     runs-on: ubuntu-latest
//     steps:
//       - uses: actions/checkout@v3
//       - name: Deploy to Server
//         uses: appleboy/ssh-action@master
//         with:
//           host: ${{ secrets.SERVER }}
//           username: ${{ secrets.USER_NAME }}
//           password: ${{ secrets.PASSWORD }}
//           port: 22
//           script: "cd /var/www/sped-frontend && ./.scripts/deploy.sh"
