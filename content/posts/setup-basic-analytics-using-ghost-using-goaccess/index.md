---
title : Setup simple analytics for Ghost blog using GoAccess
url : setup-simple-analytics-for-ghost-blog-using-goaccess
summary : How to setup native simple analytics on your ghost blog using GoAccess without third party plugins which could be blocked by many browsers and ad blockers.
author: amt8u
date : 2021-04-19
draft : false
tags : ['analytics']
---

# The need
We all know how easy it is to create a google analytics account and integrate it with our sites. There are a couple of problems with these third party accounts 

* **Ad blockers** - If you are someone who knows how these analytics platform work, you should know that it needs a thirdparty js file to be downloaded along with your page. And because of ad blockers and privacy focused browsers, these files are not allowed thereby completely rendering them useless. 
* **Data** - Since you are technically sending everything about your sites visit to third party where the information is stored on their servers, its pretty clear that you are not in control. And as always, nothing come free. Here you are paying with your data.

If above two are not your concerns, any third party analytics will work for you.

Moreover I also had one use case where I just wanted to track all visits to my site. I know that every web server maintains a log which contains basic information about the visitor. I just wanted to have a simple tool that can read those logs and generate a report for me in a visual representation.

On searching over the interney, there were a few options which I learned about
* **ELK** - This looks the best solution which can maintain history and you can probably easily perform search and aggregate operations on demandm but beware! This demands a lot of resources. At least 4GB of RAM. On Digital Ocean this will cost you around 20$(Rs 1500) per month. And also it will require extensive setup.
* **Go Access** - On visiting various sites and forums, a few recommended goaccess for ghost blog. On reading more, I found that its basically a log parser written in `C` which processes server logs like apache, nginx etc and can run as a terminal process and prepare statistics real time.

# GoAccess
Quoting from the [GoAccess](https://goaccess.io/) site directly

>  GoAccess is an open source real-time web log analyzer and interactive viewer that runs in a terminal in *nix systems or through your browser. It provides fast and valuable HTTP statistics for system administrators that require a visual server report on the fly. 

Of course, since it will be installed as a unix application you would need a VPS(Virtual Private Server) to install and use it. You cannot use it on shared hosting.

# GoAccess for Ghost blog
Ghostjs is essentially nginx in the background, we can configure goaccess to process them like any other nginx server. All the steps below are done on `ubuntu 18.04` with `Ghostjs 1.4`. Since goaccess is flexible enough, the steps would be similar to almost all web servers with slight changes.

# Install
Install goaccess as an app just like you do with other apps. Depending on your OS and requirements, you can also download and compile it. More info avaiable [here](https://goaccess.io/download#distro)

For ubuntu you can use
```bash
apt-get install goaccess
```

# Run GoAccess
GoAccess generates html file which you can open in a browser. If you want the html output to be available from outside world like "example.com/admin", you would need to put it in the `www` folder and also configure your web server to point to that location.

## Create a directoy under `www`

```bash
mkdir /var/www/static/report
```

### Setup location in the server config. Add an entry in the `.conf` file of your nginx server. The conf will be located under `/var/www/ghost/system/files`. Edit the respective file according to your current config.

```bash
location /admin {
	alias /var/www/static/report;
}
```

## Test run
On running GoAccess, it should generate a html file. To test if all permissions are setup correctly, just run the below command. Do note that by default nginx logs are owned by adm user and www_data group, you might not have permission to read them. You can try using root account to run goaccess in that case. The `--log-format` parameter determines which logs you are trying to ingest. "COMBINED" will work for various logs.

```bash
sudo goaccess access.log -o /var/www/static/report/index.html --log-format=COMBINED
```

If required, you can also add permissions to the access.log so that other users can read the files too. But remember aftet log rotation, the permissions are reset because new logfile is created, while the existing one is renamed to `access.log.1`. 

```bash
cd /var/log/nginx
sudo chmod o+r access.log
```

## View report
Navigate to the path that you have given in the `.conf` file and see if the report is loading for you. In case you are getting `404`, maybe your nginx config is not proper or the output is not generated in the right directory.

# Automate report generation
You need to run GoAccess manually everytime to process the new records. To automate this so that you don't need to login to your server and the report gets generated automatically, we can use the "Cron" facility provided by the unix systems.

I referred [this article](https://www.digitalocean.com/community/tutorials/how-to-use-cron-to-automate-tasks-ubuntu-1804) for setting up cron on my server.

Check what all cron jobs you have right now

```bash
crontab -l
```

Root entries can be read from
```bash
cd /var/spool/cron/crontabs
cat root
```

Since cron jobs are user specific, and you may not have permission to the `access.log` file, it would be better if you create the cron with your root user. The alternative way would be to configure the nginx server to create log files with [custom permissions](https://serverfault.com/questions/694707/what-should-be-the-right-logs-permissions-for-nginx-on-centos).

Login as root and use crontab editor to add new cron jobs. First time it will ask you to choose an editor.
```bash
su
crontab -e
```

Setup the cron command which also constitutes the cron job expression. In this exapmle, it says that run the job every 5 minutes. You can get cron expressions easily from [here](https://crontab.tech/every-4-hours).
```bash
*/5 * * * * goaccess /var/log/nginx/access.log -o /var/www/static/report/index.html --log-format=COMBINED
```

Once you have successfully edited the file, you should be able to see the entry with
```bash
crontab -l
```

Now that you have the cron setup done, you need to check the status of the job. For this you can use the below command

```bash
systemctl status cron
```

It might happen that your cron job is running, but the command is not working properly. You can use the cron status check to see if there are any errors. You can also just execute the command directly in the terminal to see if its working fine. Sometimes you might have mixed up paths in the command.

If everything works fine, you should be able to see basic analytics generated after every 5 minutes.

# Realtime analytics
GoAccess also provides real time reporting. You need to open up a `web-socket` which should be accessible from outside. For me it didn't work. Will look into it later. But for now this static batch job works for me.

# Summary and limitations
* **Persistence** - With the above setup you can get daily analytics because your log file will contain daily logs. On executing the goaccess command, it will generate report for the current `access.log` file. But what about the history? Any analytics tool would need to store the history so that even after the logs are gone, you can see/search the entries. For this to work you need to have a complete E2E solution like ELK stack.
* **Drill down** - I don't know if its there or not, but I wasn't able to find any setting that would allow me drill down to the records where I can see indicidual entries. For example if I want to see from where do the *404* requests are coming, I cannot. I would need to `grep` the access.log file to get all the `404` entries.

Here is a screnshot of the dashboard after setup.

![GoAccessDashboard](./images/GoAccessTopBrowsers.png)

> End
