# nikkei_sangokushi

Everything you need to complete all Ads in [http://pr.nikkei.com/campaign_event/2017_sangokushi/](http://pr.nikkei.com/campaign_event/2017_sangokushi/) is here.

heroku demo: https://pure-shelf-93909.herokuapp.com/

## to develop

```bash
git clone https://github.com/kawasin73/nikkei_sangokushi.git
cd nikkei_sangokushi
cp .env.sample .env
docker-compose up -d
npm run webpack:serve
```

### to install new gem

1. Add gem to Gemfile
2. Exec `docker-compose exec spring bundle install`

### rails console?

1. Exec `docker-compose exec spring rails c`

### to attach rails process for binding.pry

1. Exec `docker ps` and check the rails container name
2. Exec `docker attach "the container name you checked"`

### build js

1. Exec `npm run build`
2. git commit

## manual

### how to refresh station list?

See `/lib/scratches/load_stations.rb`

### where is the frontend code

frontend codes are in `/frontend/` which is isolated from rails code.
you need to run `npm run build` and git commit to deploy frontend code to heroku.
