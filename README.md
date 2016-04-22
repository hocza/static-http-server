![Sendy](http://demo.hocza.com/github/static-http-server/static-http-server.png)
# static-http-server

For now it is just a proof of concept that you could cache an entire website in memory with some line of code.

I wanted to have a fast web server for my [Hugo](http://gohugo.io) website. I hate how slowly it loads with apache or nginx.

### Usage

Well, it is quiet simple, first git clone

1. `git clone https://github.com/hocza/static-http-server.git`
2. copy your static website to static-http-server/www/ folder.
3. `node index.js`
4. Visit your site on: http://localhost:8080/

### Benchmark

These benchmarks were done from the same server to the same server with `ab -n 1000 -c 100`

For the test I used the following bootstrap theme: [startbootstrap.com's landing page](http://startbootstrap.com/template-overviews/landing-page/)

Here are the results:


```
Server Software:        Apache/2.4.7
Server Hostname:        test.dev
Server Port:            80

Document Path:          /
Document Length:        9175 bytes

Concurrency Level:      100
Time taken for tests:   4.262 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      9447000 bytes
HTML transferred:       9175000 bytes
Requests per second:    234.63 [#/sec] (mean)
Time per request:       426.196 [ms] (mean)
Time per request:       4.262 [ms] (mean, across all concurrent requests)
Transfer rate:          2164.64 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        3    3   0.2      3       6
Processing:     3  419 1020.3     62    3591
Waiting:        3  419 1020.3     62    3591
Total:          6  422 1020.3     65    3594

Percentage of the requests served within a certain time (ms)
  50%     65
  66%     78
  75%     94
  80%    140
  90%   2146
  95%   3526
  98%   3568
  99%   3580
 100%   3594 (longest request)
 ```
 
 ```
Server Software:        static-http-server 0.0.1
Server Hostname:        test.dev
Server Port:            31330

Document Path:          /
Document Length:        9175 bytes

Concurrency Level:      100
Time taken for tests:   0.169 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      9250000 bytes
HTML transferred:       9175000 bytes
Requests per second:    5914.57 [#/sec] (mean)
Time per request:       16.907 [ms] (mean)
Time per request:       0.169 [ms] (mean, across all concurrent requests)
Transfer rate:          53427.51 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        3    6   1.7      7       9
Processing:     7   10   4.0      9      28
Waiting:        7   10   4.1      8      28
Total:         14   16   2.9     15      31

Percentage of the requests served within a certain time (ms)
  50%     15
  66%     15
  75%     16
  80%     16
  90%     18
  95%     26
  98%     28
  99%     30
 100%     31 (longest request)
 ```
 
 As you can see it was 25x faster than apache.
 
 But for comparison, here is the `npm install http-server -g`
 
 ```
Server Software:        http-server
Server Hostname:        test.dev
Server Port:            8081

Document Path:          /
Document Length:        9175 bytes

Concurrency Level:      100
Time taken for tests:   0.654 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      9462000 bytes
HTML transferred:       9175000 bytes
Requests per second:    1528.66 [#/sec] (mean)
Time per request:       65.417 [ms] (mean)
Time per request:       0.654 [ms] (mean, across all concurrent requests)
Transfer rate:          14125.21 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        3    4   0.6      4       5
Processing:    48   61  15.7     55     107
Waiting:       41   55  15.5     49     103
Total:         51   65  15.6     59     110

Percentage of the requests served within a certain time (ms)
  50%     59
  66%     60
  75%     66
  80%     68
  90%    109
  95%    109
  98%    110
  99%    110
 100%    110 (longest request)
 ```

But still, of course serving from memory was still 3.8x faster. ;-)
