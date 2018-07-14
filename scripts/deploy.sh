cat ~/.ssh/authorized_keys

echo "Copying dist folder to Captain shared Nginx folder on remote…"
rsync -r --delete-after --quiet $TRAVIS_BUILD_DIR/dist root@www.florimondmanca.com:/captain/nginx-shared

echo "Triggering Captain deployment…"
captainduckduck deploy -s -h https://captain.florimondmanca.com -a www -p $CAPTAIN_PASSWORD
