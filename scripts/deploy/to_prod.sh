#!/bin/bash

# Simple deployment script for Gingerbread Village static site
# No build process needed - direct file deployment

# Sync files to S3
aws s3 sync --profile gb-deploy --acl public-read --sse --delete --exclude ".git/*" --exclude ".gitignore" --exclude "scripts/*" --exclude "CLAUDE.md" --exclude "README.md" --exclude "LICENSE" ./ s3://www.gingerbreadvillagect.com

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id E2T4L0EV8WQEB2 --paths '/*' --profile gb-deploy

echo "Deployment complete!"
