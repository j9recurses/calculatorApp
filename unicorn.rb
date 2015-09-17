worker_processes 2
working_directory "/var/www/j9scalculator/"



timeout 30

# Specify path to socket unicorn listens to,
# we will use this in our nginx.conf later
listen "/var/www/j9scalculator/tmp/sockets/unicorn_j9scalculator.sock", :backlog => 64

# Set process id path
pid "/var/www/j9scalculator/tmp/pids/unicorn_j9scalculator.pid"

# Set log file paths
stderr_path "/var/www/j9scalculator/logs/unicorn.stderr.log"
stdout_path "/var/www/j9scalculator/logs/unicorn.stdout.log"
