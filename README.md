# posts

There are 2 important branches
- node10
- node14

The difference between these branches are:
- what version of node is used to build the Docker image
- how modules are imported (`import` vs `require`)

### DOCKER IMAGES ###
In the `images` directory are 3 compressed images. To load the image into Docker you simply run one or more of the following depending on which docker image you want to load:
```
docker load -i ./images/posts_node10_test.tar.gz
docker load -i ./images/posts_node10tar.gz
docker load -i ./images/posts_node14.tar.gz
```
Once the image(s) are loaded into Docker, you run a container from the image.

#### Running docker image ####
If you run the docker image, the format for both are the same (tag is either 'node10' or 'node14':
```
docker run -it -v $(pwd)/in:/node/app/in -v $(pwd)/out:/node/app/out posts:<tag> -f ./in/posts.csv
```

Notice you need to bind-mount 2 volumes - the `in` and `out` directories.

There are a number of other options available; you can see them via
```
docker run -it posts:<tag> --help
```

Simply add the optional arguments to the end of the docker run command.

#### Running test(s) in docker ####
I've included an image that allows one to run the included test(s) directly using docker.  
```
docker run posts:node10-test
```
Note that the node14 image does not have the option to run tests because of module loading issues with Jest. It's possible the issue is related to something that is schedule for Jest version 27; I did not spend much time tracking down the issue since I have example test in node10 branch/image. 

### RUNNING DIRECTLY ###
If you want to run the code base directly you should
- run `npm ci`
- run `node ./index.js -f ./in/posts.csv`

Like the docker option above, you can see the other command line options via
```
node ./index.js --help
```
