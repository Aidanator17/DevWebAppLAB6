#INTRO

my name is Aidan and i've put a little too much time into this lab for my Web Applications course.
this readme is basically just for troubleshooting options and some warnings.
i may add more categories to this file at some point.

#WARNINGS

these oauth methods were made using apps registered by me on each of the platforms.
to fix this, you must go register your own apps on each platform, and get your own client id and secret. please.

#TROUBLESHOOTING

for those who try to connect to the server through another device, you will get an error.
luckily, there is a fix to this.
the callbacks and routes all hostname "localhost:8000", replace this hostname with "<your host machine's IPv4 address>:8000".