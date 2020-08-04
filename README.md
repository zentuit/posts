# posts

There are 2 important branches
- node10
- node14

The difference between these branches are:
- what version of node is used to build the Docker image
- how modules are imported (`import` vs `require`)

### DOCKER IMAGES ###
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


### RUNNING DIRECTLY ###
If you want to run the code base directly you should
- run `npm ci`
- run `node ./index.js -f ./in/posts.csv`

Like the docker option above, you can see the other command line options via
```
node ./index.js --help
```
