# Bulk Migrate Netlify Sites to Use the Focal Build Image

This is a small CLI to allow you to migrate all your sites to the Focal build image, which needs to be [updated by September 19](https://answers.netlify.com/t/please-read-end-of-support-for-trusty-build-image-everything-you-need-to-know/39004).

## Usage

This CLI makes multiple requests to the Netlify API, so it can take a few seconds to complete. Please be patient!

First, check which sites are not running the Focal image on your account:

```bash
npx ntl-focal-migrate --list --account "Your Account Name"
```

Next, update the build settings for your site with this command:

```bash
npx ntl-focal-migrate --update --account "Your Account Name"
```

> **Please note!** The `--account` flag takes the full account name string as it appears on app.netlify.com. Without this flag, all of your sites across all orgs will be updated. If you're only a member of one org, this is no problem. If you're in multiple orgs, make sure you don't accidentally change someone else's site settings by mistake!

### To do a few updates at a time, use the `--limit` flag

To make sure things are working as expected, you can batch update a few sites at a time by setting a `--limit` flag:

```bash
npx ntl-focal-migrate --update --account "Your Account Name" --limit 5
```

This will cause the CLI to update 5 sites at a time. This is useful if you want to verify that updated sites still build before changing everything.


## API Reference

```
❯ npx ntl-focal-migrate --help

   USAGE

  $ ntl-focal-migrate <command> [option]

   COMMANDS

  help  Print help info

   OPTIONS

  -c, --clear    Clear the console Default: false
  --noClear      Don't clear the console Default: false
  -d, --debug    Print debug info Default: false
  --account      Filter sites to a certain account Default: false
  --list         List sites that need to upgrade Default: false
  --limit        Limit the number of sites to list or update. Default: Infinity
  --update       Update all sites to the Focal build image Default: false
  -v, --version  Print CLI version Default: false
  **```**


