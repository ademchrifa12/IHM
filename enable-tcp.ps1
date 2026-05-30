Set-ItemProperty "HKLM:\SOFTWARE\Microsoft\Microsoft SQL Server\MSSQL17.MSSQLSERVER\MSSQLServer\SuperSocketNetLib\Tcp" -Name Enabled -Value 1
Set-ItemProperty "HKLM:\SOFTWARE\Microsoft\Microsoft SQL Server\MSSQL17.MSSQLSERVER\MSSQLServer\SuperSocketNetLib\Tcp\IPAll" -Name TcpPort -Value "1433"
Set-ItemProperty "HKLM:\SOFTWARE\Microsoft\Microsoft SQL Server\MSSQL17.MSSQLSERVER\MSSQLServer\SuperSocketNetLib\Tcp\IPAll" -Name TcpDynamicPorts -Value ""
Restart-Service MSSQLSERVER -Force
