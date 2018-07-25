echo "Copying dist folder to Captain shared Nginx folder on remote…"
rsync -r --delete-after --quiet $TRAVIS_BUILD_DIR/dist root@blog.florimondmanca.com:/captain/nginx-shared
