echo "Copying dist folder to Captain shared Nginx folder on remote…"
rsync -r --delete-after --quiet $TRAVIS_BUILD_DIR/dist root@captain.florimondmanca.com:/captain/nginx-shared

echo "Deploying using CapRover CLI…"
caprover deploy -h https://captain.florimondmanca.com -a blog -p $CAPTAIN_PASSWORD
