FROM mongo:3

MAINTAINER <Shannon Johnstone> shannon@shannonjohnstone.com.au

ENV AUTH yes
ENV STORAGE_ENGINE wiredTiger
ENV JOURNALING yes

ADD run.sh /run.sh
ADD set_mongodb_password.sh /set_mongodb_password.sh

# RUN chmod a+rx /docker-entrypoint.sh

CMD ["/run.sh"]
