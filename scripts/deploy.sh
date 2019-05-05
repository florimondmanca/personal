echo "--> Copy dist folder to data directory on remote"
rsync -r --delete-after --quiet $TRAVIS_BUILD_DIR/dist root@florimond.dev:/var/lib/dokku/data/storage/blog-build

echo "--> Deploy app"
git push --force dokku master
