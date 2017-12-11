require 'mina/rails'
require 'mina/git'
# require 'mina/rbenv'  # for rbenv support. (https://rbenv.org)
# require 'mina/rvm'    # for rvm support. (https://rvm.io)

# Basic settings:
#   domain       - The hostname to SSH to.
#   deploy_to    - Path to deploy into.
#   repository   - Git repo to clone from. (needed by mina/git)
#   branch       - Branch name to deploy. (needed by mina/git)

set :application_name, 'desprendete'
set :domain, '104.131.189.236'
set :deploy_to, '/var/www/desprendete'
set :repository, 'https://github.com/EzeGGonzalez/desprendete.git'
set :branch, 'master'
set :user, 'desprendete'
# set :shared_dirs, fetch(:shared_dirs, []).push('node_modules')
set :shared_files, fetch(:shared_files, []).push('.env')
set :keep_releases, 2

# Optional settings:
#   set :user, 'foobar'          # Username in the server to SSH to.
#   set :port, '30000'           # SSH port number.
#   set :forward_agent, true     # SSH forward_agent.

# shared dirs and files will be symlinked into the app-folder by the 'deploy:link_shared_paths' step.
# set :shared_dirs, fetch(:shared_dirs, []).push('somedir')
# set :shared_files, fetch(:shared_files, []).push('config/database.yml', 'config/secrets.yml')

# This task is the environment that is loaded for all remote run commands, such as
# `mina deploy` or `mina rake`.
task :environment do
  # If you're using rbenv, use this to load the rbenv environment.
  # Be sure to commit your .ruby-version or .rbenv-version to your repository.
  # invoke :'rbenv:load'

  # For those using RVM, use this to load an RVM version@gemset.
  # invoke :'rvm:use', 'ruby-1.9.3-p125@default'
end

# Put any custom commands you need to run at setup
# All paths in `shared_dirs` and `shared_paths` will be created on their own.
task :setup do
  # command %{rbenv install 2.3.0}
end

task :deploy do
  deploy do
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    invoke :'deploy:cleanup'

    on :launch do
      invoke :npmbuild
      invoke :start_or_restart
    end
  end
end

task :npmbuild do
  in_path(fetch(:current_path)) do
    command %{npm install}
    command %{npm run build}
  end
end

task :start do
  invoke :start_or_restart
end

task :restart do
  invoke :start_or_restart
end

task :start_or_restart do
  in_path(fetch(:current_path)) do
    command %{APP_NAME="#{fetch :application_name}" npm run pm2}
  end
end

task :stop do
  in_path(fetch(:current_path)) do
    command %{APP_NAME="#{fetch :application_name}" npm run pm2:stop}
  end
end
