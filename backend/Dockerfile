FROM ruby:2.6.8
RUN mkdir -p /myapp/backend
WORKDIR /myapp/backend
COPY Gemfile /myapp/backend/Gemfile
COPY Gemfile.lock /myapp/backend/Gemfile.lock
RUN gem install bundler
RUN bundle install
EXPOSE 3000
COPY . /myapp/backend