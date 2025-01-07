net stop winnat
net start winnat
netsh interface ipv4 show excludedportrange protocol=tcp
netstat -aon