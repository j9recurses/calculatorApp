# encoding: utf-8
require 'multi_json'
require 'sinatra'
require 'sinatra/activerecord'

class CalculatorApp < Sinatra::Application
  #enable :sessions

  configure :development do
    set :database, "sqlite3:////tmp/my.db"
  end

end

require_relative 'helpers/init'
require_relative 'routes/init'
