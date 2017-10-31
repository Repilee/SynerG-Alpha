@echo off
color 0f
title SynerG Discord Launcher Bot
cd "C:\Users\kylel\Desktop\synerg-alpha"
node main.js
pause
:choice
set /P c=Are you sure you want to reconnect [Y/N]?
if /I "%c%" EQU "Y" goto :somewhere
if /I "%c%" EQU "N" goto :somewhere_else
goto :choice


:somewhere

echo Reconnecting...
cd "C:\Users\kylel\Desktop\synerg-alpha"
node main.js
pause 

:somewhere_else

echo Bot is now off. Press any key to close this prompt...
pause 
exit