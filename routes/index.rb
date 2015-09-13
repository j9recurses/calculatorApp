# encoding: utf-8
class CalculatorApp < Sinatra::Application
 get '/' do
    send_file File.join('public', 'index.html')
    console.log("in here");
  end
end
