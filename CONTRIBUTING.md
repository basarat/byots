# What
`package.json` points to `byots.js` and `boyts.d.ts` in the `bin` folder:

* `byots.js` simple manually authored.
* `byots.d.ts` simple manually authored.
* `typescript.d.ts`: Generated from latest TypeScript just exposing all the helpful stuff we wanted.

# How?
See `prepare.sh` for comments.

# Release

## Quickly

Quick workflow (runs `prepare` and `release` and `npm publish`):

```sh
quick.sh
```

If something goes wrong with our build we can use this to quickly do releases to see what's going on 🌹

## Manually

```sh
prepare.sh
```

Manual verification here ... then:

```sh
release.sh
npm publish
```

# Travis

This is just the documentation on how travis was setup to do automatic deploys (to help you with forks) 🌹

* install travis `gem install travis`
* go online and switch on travis on the repo
* now go to your repository directory

## Github push
* Generate a github token `settings -> personal access tokens -> generate new token` (give it `repo` access)
* run `travis encrypt -r <USER>/<REPOSITORY> GH_TOKEN=<GH-TOKEN> --add env.global`. This should setup `env.global.secure` in your `.travis.yml`

This `GH_TOKEN` is used in our `after_success` script (`release.sh` is doing the push) 🌹

```
after_success:
- git config credential.helper "store --file=.git/credentials"
- echo "https://${GH_TOKEN}:@github.com" > .git/credentials
- git config --global push.default matching
- bash release.sh
```

## NPM
* Then setup the API key using https://github.com/npm/npm/issues/8970#issuecomment-122854271 (your `.npmrc` is usually at `c:\users\<name>\.npmrc`)
* NPM deploy setup by simply running `travis setup npm`.
  * This should setup `deploy` (with `provider`,`email`,`api_key`,`on`) in your `.travis.yml`
* Since we want to deploy the `build` directory which is git ignored set `deploy.skip_cleanup: true`.

