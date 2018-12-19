## How to use

### Start the server

```bash
nodemon
```

### Test with HTTPie
```bash
 ◒ ➜ http :3000/api
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 38
Content-Type: application/json; charset=utf-8
Date: Wed, 19 Dec 2018 11:25:41 GMT
ETag: W/"26-LkE9TPg49XdYvuHvxOg83A+4Xj4"
X-Powered-By: Express

{
    "desc": "My API. Please authenticate"
}

 ◒ ➜ http POST :3000/api/login
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 204
Content-Type: application/json; charset=utf-8
Date: Wed, 19 Dec 2018 11:25:52 GMT
ETag: W/"cc-lugd4sG9yeMT6/ggviFSVUr84ss"
X-Powered-By: Express

{
    "message": "Authenticated! Use this token in the \"Authentication\" header",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjozLCJpYXQiOjE1NDUyMTg3NTJ9.MmbwUMcXGQyCx9TMYy9zexfKZnXEiWFp2eyfQq4TeXQ"
}

 ◒ ➜ http -v :3000/api/protected
GET /api/protected HTTP/1.1
Accept: */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Host: localhost:3000
User-Agent: HTTPie/0.9.9



HTTP/1.1 403 Forbidden
Connection: keep-alive
Content-Length: 9
Content-Type: text/plain; charset=utf-8
Date: Wed, 19 Dec 2018 11:26:09 GMT
ETag: W/"9-PatfYBLj4Um1qTm5zrukoLhNyPU"
X-Powered-By: Express


No Authentication Header

```

With token
```
http -v :3000/api/protected Authentication:'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjozLCJpYXQiOjE1NDUyMTg3NTJ9.MmbwUMcXGQyCx9TMYy9zexfKZnXEiWFp2eyfQq4TeXQ'
GET /api/protected HTTP/1.1
Accept: */*
Accept-Encoding: gzip, deflate
Authentication: Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjozLCJpYXQiOjE1NDUyMTg3NTJ9.MmbwUMcXGQyCx9TMYy9zexfKZnXEiWFp2eyfQq4TeXQ
Connection: keep-alive
Host: localhost:3000
User-Agent: HTTPie/0.9.9



HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 43
Content-Type: application/json; charset=utf-8
Date: Wed, 19 Dec 2018 11:27:13 GMT
ETag: W/"2b-maVlwm1IYZm1E3TFERDpUhXUDJI"
X-Powered-By: Express

{
    "desc": "Protected information. Congrats!"
}
```

Because we generate the token without expiration. So we can still access the protected api with the old token.

