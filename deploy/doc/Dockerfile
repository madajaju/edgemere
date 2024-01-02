FROM jekyll/jekyll
# Create app directory:w:w
WORKDIR /srv/jekyll

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . .
ENV JEKYLL_ENV=docker

# RUN gem install jekyll
RUN gem install github-pages
RUN gem install just-the-docs

# RUN bundle exec just-the-docs rake search:init

# RUN jekyll build --config _config.yml
# EXPOSE 4000
CMD bundle exec jekyll serve --config _config-local.yml -H 0.0.0.0
