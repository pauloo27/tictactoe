# TICTACTOE

![Home screenshot](https://i.imgur.com/Hr2tBji.png)
![In game screenshot](https://i.imgur.com/tAgfmNa.png)

Online TicTacToe with Portuguese and English locales. 

## How to run

- Clone the repository:
> $ git clone https://github.com/Pauloo27/tictactoe 

> $ cd tictactoe

- Configure and start the backend:
> $ cd backend

> $ yarn install

> $ yarn build

> $ yarn start

If the project isn't localhosted you need to set a env with the frontend URL
before starting, like so:
> $ TTT_FRONTEND="http://127.0.0.1:3000" yarn start

- Build and start the frontend:
> $ cd ../frontend

> $ yarn install

> $ yarn start

If the project isn't localhosted you need to set a env with the backend URL
before starting, like so:
> $ REACT_APP_BACKEND="http://127.0.0.1:3003" yarn start

## License

<img src="https://i.imgur.com/AuQQfiB.png" alt="GPL Logo" height="100px" />

This project is licensed under [GNU General Public License v2.0](./backend/LICENSE).

This program is free software; you can redistribute it and/or modify 
it under the terms of the GNU General Public License as published by 
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
