# This document describes the Git workflow:

# Branches

There are 3 main branches in this repo:

## 1. `main`

This branch is for **production**. All changes that passes staging will be merged here. End users will be the ones using this branch.
There should **NOT** be any `fix/**` or `feature/**` branches merged here.

It's corresponding deployment url in vercel is https://app.jomi.com or later https://jomi.com

## 2. `staging`

This branch is for testing before it goes to production. Another way to call it is pre-production. Other members from other teams can test and use this branch.

All changes that are merged in develop branched are merge here. There should **NOT** be any `fix/**` or `feature/**` branches merged here.

It's corresponding deployment url in vercel is https://staging-app.jomi.com

## 3. `develop`

This is the integration branch and used for development testing. All `fix/**` and `feature/**` branches should be merged in this branch.
It's corresponding deployment url in vercel is https://develop-app.jomi.com

# Feature and Fix branches

## 1. `feature/**`

For every new feature/enhancement this this branch will be created and a PR should be created for it to be merged to `develop` branch. It should follow kebab-case naming. e.g.: `feature/implement-header`, `feature/implement-social-login`, `feature/this-is-a-nice-to-have-feature`.

For traceability, all features/tasks/bugfixes should be first created in https://github.com/orgs/jomijournal/projects/1

## 2. `fix/**`

Same as `feature` but for bug fixes.

# What is the general workflow in feature development or bug fixing?

1. checkout develop branch
2. create `feature` or `fix` branch.
3. do implementation
4. Create and Submit a PR **(Check steps on how to create a good PR)**
5. Ask a review from technical leader or team leader.
6. If approved, developer should follow the steps when merging a PR.

# How to create a good PR?

1. Always have a `Description` or summary on top. Mention what issues are fixed in the PR.
2. If your PR is hard to test. It steps on how to test your PR. Better to have more information
3. Add limitations/things not included if any.
4. Add screen dumps / loom recordings or screenshots if possible.

# What are the steps to merge the PR?

NOTE: This can also be done in otherways but here are the steps when using command line.

1. Open your terminal.
2. `git checkout develop`
3. `git pull`
4. `git checkout feature/your-feature-branch`
5. `git rebase -i origin/develop`
6. Merge conflicts if there are any.
7. Test your feature again.
8. `git push -f`
9. Go to github. Merge your pull request.
