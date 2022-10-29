#!/bin/bash

rm -rf production/
npx gulp build
find production/ -name ".DS_Store" -delete
aws s3 sync --profile gb-deploy --acl public-read --sse --delete production/ s3://www.gingerbreadvillagect.com
aws configure set preview.cloudfront true --profile gb-deploy
aws cloudfront create-invalidation --distribution-id E2T4L0EV8WQEB2 --paths '/*' --profile gb-deploy
